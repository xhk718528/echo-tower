# 回声之塔 · 像素美术贴图规格

> 本目录用于存放游戏的**真实像素美术贴图**。把图片按下面命名放好后,游戏会自动读取并替换当前的 emoji;没有图片的格子会自动回退到 emoji,不会报错。

## 一、通用要求
- **格式**:PNG(带透明通道)。
- **风格**:像素风(Aseprite / Krita 均可)。
- **方向**:请朝上/正面朝向你,尺寸见各表。
- **调色建议**:暗色调为主,主体用高亮描边(白/亮色一圈)突出;怪物/物品加 1~2 层明暗。
- **导出**:关闭抗锯齿、保留最邻近采样(`image-rendering:pixelated` 已内置)。

## 二、装备图标(每部位 1 张,按稀有度上颜色框/光效由游戏处理)
| 文件名 | 尺寸 | 说明 |
|---|---|---|
| `eq_weapon.png` | 32×32 | 武器剪影(剑/斧/枪均可) |
| `eq_accessory.png` | 32×32 | 饰品/戒指 |
| `eq_helm.png` | 32×32 | 头盔 |
| `eq_armor.png` | 32×32 | 盔甲/胸甲 |
| `eq_pants.png` | 32×32 | 护腿/裤甲 |
| `eq_boots.png` | 32×32 | 靴子 |
| `eq_gloves.png` | 32×32 | 手套 |

> 装备有 7 个部位,每部位就用这一张基础图;稀有度(普通/优秀/稀有/史诗/传说/神器)的视觉区分由游戏的边框+光效自动完成。

## 三、怪物贴图(每个怪物 1 张)
| 文件名 | 尺寸 | 怪物 |
|---|---|---|
| `mon_slime.png` | 48×48 | 史莱姆 |
| `mon_bat.png` | 48×48 | 蝙蝠 |
| `mon_goblin.png` | 48×48 | 哥布林 |
| `mon_spider.png` | 48×48 | 毒蜘蛛 |
| `mon_archer.png` | 48×48 | 游荡弓手 |
| `mon_skeleton.png` | 48×48 | 骷髅 |
| `mon_shaman.png` | 48×48 | 萨满巫医 |
| `mon_wraith.png` | 48×48 | 暗影刺客 |
| `mon_golem.png` | 48×48 | 石像鬼 |
| `mon_boss.png` | 64×64 | 塔主·残影(BOSS) |

## 四、地面/房间贴图(格子)
| 文件名 | 尺寸 | 用途 |
|---|---|---|
| `tile_floor.png` | 32×32 | 普通地板(可选;缺省用 CSS 底色) |
| `tile_wall.png` | 32×32 | 墙壁(可选) |
| `tile_chest.png` | 32×32 | 宝箱 |
| `tile_shrine.png` | 32×32 | 祭坛 |
| `tile_shop.png` | 32×32 | 商店 |
| `tile_event.png` | 32×32 | 神秘事件 |
| `tile_stair.png` | 32×32 | 楼梯 |

## 五、圣物 / 技能 / 套装徽记
- **圣物**:`relic_<id>.png`(24×24)。ID 见游戏图鉴,如 `relic_blood`、`relic_poison`、`relic_cdr` 等。
- **技能**:`sk_<id>.png`(24×24)。如 `sk_guard_*`、`sk_mage_fireball` 等。
- **套装**:`set_<key>.png`(24×24)。key 为 `dragon/frost/storm/shadow/blood/iron/star/guardian/monsoon/flame`。
- **角色职业/皮肤**:`cls_<id>.png`、`skin_char_<id>.png`(可后加)。

## 六、命名规则(关键)
- 文件名 = 上面表格的**英文名**(小写、下划线)。
- 放在本 `assets/` 目录根下,不要子目录。
- 没有的图片→游戏照旧显示 emoji,完全不影响运行。

## 七、怎么让游戏用上这些图
1. 把图片放进本目录;
2. 强制刷新页面(Ctrl+F5);
3. 游戏自动读取并替换对应位置。

> 如需**精灵表(sprite sheet)** 或 **按稀有度给装备图标变色**(如普通灰白、史诗紫、传说橙),告诉我,我可以再补一个 `sprites.json` 配置加载器,支持一张大图自动切片 + 按颜色替换。
