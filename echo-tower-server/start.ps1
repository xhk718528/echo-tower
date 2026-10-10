# 一键启动: 先拉起 PostgreSQL 容器, 再启动本地存档后端
$ErrorActionPreference = "Stop"
$d = $PSScriptRoot

Write-Host "[1/2] 启动 PostgreSQL 容器(echo-tower-pg)..."
docker compose -f "$d\docker-compose.yml" up -d

Write-Host "[2/2] 等待数据库就绪..."
docker compose -f "$d\docker-compose.yml" exec -T db pg_isready -U echotower -d echo_tower | Out-Null
# 再等健康检查通过
& docker compose -f "$d\docker-compose.yml" exec -T db sh -c "for i in \$(seq 1 30); do pg_isready -U echotower -d echo_tower >/dev/null 2>&1 && exit 0; sleep 1; done; exit 1"
if ($LASTEXITCODE -ne 0) { Write-Warning "数据库仍未就绪, 后端仍会尝试连接." }

Write-Host ""
Write-Host "[ready] 启动存档后端: http://localhost:4200"
Write-Host "        在浏览器打开上面的地址即可游玩(游戏数据存入 PostgreSQL)。"
Push-Location $d
node server.js
