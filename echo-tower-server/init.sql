-- 回声之塔 存档表 (PostgreSQL 16)
-- 每个槽位保存: 玩家档案(meta) + 进行中的一局(run, 可空)
CREATE TABLE IF NOT EXISTS saves (
  id          SERIAL PRIMARY KEY,
  slot        TEXT UNIQUE NOT NULL,          -- 存档槽名(唯一)
  meta        JSONB NOT NULL,                -- 玩家档案(塔魂/强化/装扮/成就)
  run         JSONB,                         -- 进行中的一局(无则为 null)
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_saves_slot    ON saves(slot);
CREATE INDEX IF NOT EXISTS idx_saves_updated ON saves(updated_at DESC);
