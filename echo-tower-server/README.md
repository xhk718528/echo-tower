# 回声之塔 · 数据库存档(PostgreSQL via Docker)

把游戏的存档从纯 localStorage 升级为 **PostgreSQL 数据库存储**,支持「新建存档 / 载入存档 / 覆盖保存 / 删除存档」,并有自动存档。

## 目录结构
```
echo-tower-server/
  docker-compose.yml   # PostgreSQL 16 容器(端口 5433 映射到容器 5432)
  init.sql             # 建表脚本(首次启动自动执行)
  server.js            # 本地存档后端(HTTP API + 静态托管游戏)
  package.json         # 依赖: pg
  start.ps1            # 一键启动(先起数据库, 再起后端)
```

## 怎么启动(需要 Docker Desktop 引擎运行中)
1. **以管理员身份**启动 Docker Desktop(否则 Windows 会话无法拉起引擎)。
2. 在 `echo-tower-server` 目录运行:
   ```powershell
   .\start.ps1
   ```
3. 浏览器打开 **http://localhost:4200** —— 这就是游戏本体;存档会写入 PostgreSQL。

> 也可以只用 `docker compose up -d` 起数据库,再 `node server.js` 起后端。

## 后端 API
| 方法 | 路径               | 说明                                  |
|------|--------------------|---------------------------------------|
| GET  | `/api/health`      | 数据库连接状态                          |
| GET  | `/api/saves`       | 列出所有存档(含摘要)                    |
| GET  | `/api/saves/:slot` | 读取某个存档(meta + run)               |
| PUT  | `/api/saves/:slot` | 新建/覆盖存档(幂等 upsert)              |
| DELETE| `/api/saves/:slot` | 删除存档                                |

## 配置(环境变量)
后端默认连 `localhost:5433`、用户 `echotower`、库 `echo_tower`。
可用 `PORT / PGHOST / PGPORT / PGUSER / PGPASSWORD / PGDATABASE` 覆盖。
