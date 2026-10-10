/* 回声之塔 · 本地存档后端 (含账号鉴权 + 按用户隔离存档)
 * 提供 REST API(注册/登录/会话) 读写 PostgreSQL,并可直接在浏览器打开游戏。
 *   启动: node server.js   (默认 http://localhost:4200)
 * 环境变量可覆盖: PORT, PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { Pool } = require("pg");

const PORT = Number(process.env.PORT || 4200);
const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT || 5433),
  user: process.env.PGUSER || "echotower",
  password: process.env.PGPASSWORD || "echotower_secret",
  database: process.env.PGDATABASE || "echo_tower",
});
const GAME = path.resolve(__dirname, "..", "回声之塔.html");
const SESSION_DAYS = 30;

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function sendJson(res, code, obj) {
  const b = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json; charset=utf-8", "Content-Length": Buffer.byteLength(b), ...CORS });
  res.end(b);
}
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (c) => (data += c));
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}
function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(String(pw), salt, 64).toString("hex");
  return { salt, hash };
}
function verifyPassword(pw, salt, expected) {
  const h = crypto.scryptSync(String(pw), salt, 64);
  const e = Buffer.from(expected, "hex");
  return h.length === e.length && crypto.timingSafeEqual(h, e);
}
async function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  await pool.query("INSERT INTO sessions (token, user_id, expires_at) VALUES ($1,$2, now() + ($3||' days')::interval)", [token, userId, String(SESSION_DAYS)]);
  return token;
}
async function authUser(req) {
  const h = req.headers["authorization"] || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  if (!m) return null;
  const r = await pool.query("SELECT user_id FROM sessions WHERE token=$1 AND expires_at > now()", [m[1]]);
  if (!r.rows.length) return null;
  return r.rows[0].user_id;
}

async function ensureTables() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      salt TEXT NOT NULL,
      pass_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      expires_at TIMESTAMPTZ NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id);
    CREATE TABLE IF NOT EXISTS saves (
      id SERIAL PRIMARY KEY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      slot TEXT NOT NULL,
      meta JSONB NOT NULL,
      run JSONB,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
    ALTER TABLE saves ADD COLUMN IF NOT EXISTS user_id BIGINT;
    ALTER TABLE saves DROP CONSTRAINT IF EXISTS saves_slot_key;
    DROP INDEX IF EXISTS idx_saves_slot;
    CREATE UNIQUE INDEX IF NOT EXISTS idx_saves_user_slot ON saves(user_id, slot);
    CREATE INDEX IF NOT EXISTS idx_saves_updated ON saves(updated_at DESC);
  `);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") { res.writeHead(204, CORS); return res.end(); }
  const p = new URL(req.url, "http://x").pathname;

  // serve the game
  if ((p === "/" || p === "/game") && req.method === "GET") {
    try {
      const b = fs.readFileSync(GAME);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Content-Length": b.length, ...CORS });
      return res.end(b);
    } catch (e) { return sendJson(res, 500, { error: "game file not found: " + e.message }); }
  }

  if (p === "/api/health") {
    try { await pool.query("SELECT 1"); return sendJson(res, 200, { ok: true, db: "connected" }); }
    catch (e) { return sendJson(res, 200, { ok: false, db: e.message }); }
  }

  // ---- auth ----
  if (p === "/api/auth/register" && req.method === "POST") {
    try {
      const d = JSON.parse((await readBody(req)) || "{}");
      const u = String(d.username || "").trim(), pw = String(d.password || "");
      if (u.length < 2 || u.length > 24) return sendJson(res, 400, { error: "用户名需 2~24 个字符" });
      if (pw.length < 4) return sendJson(res, 400, { error: "密码至少 4 位" });
      const ex = await pool.query("SELECT 1 FROM users WHERE username=$1", [u]);
      if (ex.rows.length) return sendJson(res, 409, { error: "用户名已被占用" });
      const { salt, hash } = hashPassword(pw);
      const ins = await pool.query("INSERT INTO users (username, salt, pass_hash) VALUES ($1,$2,$3) RETURNING id", [u, salt, hash]);
      const token = await createSession(ins.rows[0].id);
      return sendJson(res, 200, { token, username: u });
    } catch (e) { return sendJson(res, 500, { error: e.message }); }
  }
  if (p === "/api/auth/login" && req.method === "POST") {
    try {
      const d = JSON.parse((await readBody(req)) || "{}");
      const u = String(d.username || "").trim(), pw = String(d.password || "");
      const r = await pool.query("SELECT id, username, salt, pass_hash FROM users WHERE username=$1", [u]);
      if (!r.rows.length) return sendJson(res, 401, { error: "用户名或密码错误" });
      const row = r.rows[0];
      if (!verifyPassword(pw, row.salt, row.pass_hash)) return sendJson(res, 401, { error: "用户名或密码错误" });
      const token = await createSession(row.id);
      return sendJson(res, 200, { token, username: row.username });
    } catch (e) { return sendJson(res, 500, { error: e.message }); }
  }
  if (p === "/api/auth/me" && req.method === "GET") {
    const uid = await authUser(req);
    if (!uid) return sendJson(res, 401, { error: "未登录" });
    try {
      const r = await pool.query("SELECT username FROM users WHERE id=$1", [uid]);
      return sendJson(res, 200, r.rows[0] ? { username: r.rows[0].username } : { error: "用户不存在" });
    } catch (e) { return sendJson(res, 500, { error: e.message }); }
  }
  if (p === "/api/auth/logout" && req.method === "POST") {
    const h = req.headers["authorization"] || ""; const m = h.match(/^Bearer\s+(.+)$/i);
    if (m) { try { await pool.query("DELETE FROM sessions WHERE token=$1", [m[1]]); } catch (e) {} }
    return sendJson(res, 200, { ok: true });
  }

  // ---- saves (require auth, scoped per user) ----
  if (p === "/api/saves" && req.method === "GET") {
    const uid = await authUser(req);
    if (!uid) return sendJson(res, 401, { error: "未登录" });
    try {
      const r = await pool.query("SELECT slot, meta, run IS NOT NULL AS has_run, updated_at FROM saves WHERE user_id=$1 ORDER BY updated_at DESC", [uid]);
      return sendJson(res, 200, r.rows.map((x) => ({ slot: x.slot, meta: x.meta, has_run: x.has_run, updated_at: x.updated_at })));
    } catch (e) { return sendJson(res, 500, { error: e.message }); }
  }

  const m = p.match(/^\/api\/saves\/([^\/]+)$/);
  if (m) {
    const uid = await authUser(req);
    if (!uid) return sendJson(res, 401, { error: "未登录" });
    const slot = decodeURIComponent(m[1]);
    if (req.method === "GET") {
      try {
        const r = await pool.query("SELECT slot, meta, run, updated_at FROM saves WHERE user_id=$1 AND slot=$2", [uid, slot]);
        if (!r.rows.length) return sendJson(res, 404, { error: "not found" });
        return sendJson(res, 200, r.rows[0]);
      } catch (e) { return sendJson(res, 500, { error: e.message }); }
    }
    if (req.method === "PUT" || req.method === "POST") {
      try {
        const body = await readBody(req);
        const data = JSON.parse(body || "{}");
        const meta = data.meta || {};
        const run = data.run || null;
        const r = await pool.query(
          `INSERT INTO saves (user_id, slot, meta, run, updated_at) VALUES ($1,$2,$3,$4,now())
           ON CONFLICT (user_id, slot) DO UPDATE SET meta=EXCLUDED.meta, run=EXCLUDED.run, updated_at=now()
           RETURNING slot, updated_at`,
          [uid, slot, JSON.stringify(meta), run ? JSON.stringify(run) : null]
        );
        return sendJson(res, 200, r.rows[0]);
      } catch (e) { return sendJson(res, 400, { error: e.message }); }
    }
    if (req.method === "DELETE") {
      try {
        const r = await pool.query("DELETE FROM saves WHERE user_id=$1 AND slot=$2 RETURNING slot", [uid, slot]);
        return sendJson(res, 200, { deleted: r.rowCount > 0 });
      } catch (e) { return sendJson(res, 500, { error: e.message }); }
    }
  }

  sendJson(res, 404, { error: "not found", path: p });
});

pool.on("error", (e) => console.error("[pg]", e.message));
server.listen(PORT, () => console.log("[server] echo-tower save backend: http://localhost:" + PORT));
ensureTables()
  .then(() => console.log("[db] tables ready"))
  .catch((e) => console.error("[db] ensure failed:", e.message));
