
(function(){
  "use strict";
  function el(id){ return document.getElementById(id); }
  /* ---------- pixel-art sprite loader (assets/*.png; falls back to emoji) ---------- */
  var ASSETS="assets/";
  var SPR_BASE64={"eq_accessory":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiElEQVR4nGNgGAWjYBSMgqEOREVl/w+IpTD8IDT0PzKfLpZ/PhIExiDLYRgmRlNH4LKcLo5AthyE+/O0UCwH8ZHlqe4IZAeALINhmOUwTHcHoGOaOIBYyweFI4ZnFKA7AJcjaJoLsDkC5hB0MboVRtgw3YpjGIZZSre6AJtj6G7pKBgFo2BYAQAQplclWK3b+wAAAABJRU5ErkJggg==","eq_armor":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaElEQVR4nGNgGAWjYBQMBSAqKvufHEw1y2ctWEsWpoojRh0woA4AGRAWnQHGx05cIgnD9FHkiEHvgM9HgkZ4CIw6YPg7gAGpIoIZSCymeoVEjgOoYvmoAwaFAxjIaBVR1fJRMAqGNQAAxi/1TJBaYmMAAAAASUVORK5CYII=","eq_boots":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWklEQVR4nGNgGAWjYBQMFSAqKvufFEx1y4+duEQSpqojRh0w6oBB4YCw6AyS8KgDRh0wvBzAMNCVETkOoKqjQJqzAyzIwpun5MEx2Y4YdQDDQKeBUTAKhjUAAPiWY68cMmNaAAAAAElFTkSuQmCC","eq_gloves":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAYElEQVR4nGNgGAWjYBQMFSAqKvufFEx1y4+duEQSpqojRh0wsh0AS9XkOIBiR4AMCIvOoAhT5IhRBwwqB8xasJYoeviGwMh0AMNAF0TIjhi5dcGgcADDQDfJRsEooCUAALXv9i1IfCX8AAAAAElFTkSuQmCC","eq_helm":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAbElEQVR4nGNgGAWjYBQMFSAqKvufFEx1y4+duATHYdEZWDGyGqo6YtQBg8IBsxas/W9l5QXGIDY2jCw/fB0QduwYTgeA5IZ3CJCCh6cDcGU/dDz8HABzBLEOoLrlow5AdgTd2wKjYBSMgmEPAB1r+iDx87DDAAAAAElFTkSuQmCC","eq_pants":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAXElEQVR4nGNgGAWjYBQMFSAqKvufFEx1y4+duEQSpqojRh0w6oBRBwyoA0AGhUVn/J+1YC0KBonBCh188sPHAdgwsgNwyY86YNQBow4Y+g5gwNMcI1Z+FIyCQQ0Ag+KxvzNFPl4AAAAASUVORK5CYII=","eq_weapon":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAd0lEQVR4nGNgGAUUAFFR2f8gPGCWHztxCYwHxBEwB7x8/mnUAQPrgAFzxKgDRh0w6oBRB4w6YEAdAGuIoDuALo4AWfL5SBBOTHNHDLgDGJCiYPOUPDime/sQmwPoZvmgcACyIwa0aT7qgAF3AN3yPj5HDJjl1AAA5x9C65CDqBwAAAAASUVORK5CYII=","mon_archer":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAj0lEQVR4nGNgGAWjYBQMVSAqKvsfGdPd8pcnV6BgujoClwPoEhogC7ri7cEY3QEwcZo6YsAdwIAUBcg0XRMkKYmQJo4i1gEgsc1T8v6HRWdQ1xFDwgEg/rETl4ZhCMAMRcazFqwFY2yhMOqAkesAmuWCQRkCMIwrK1K9DCDFAVQHow4YdQADUsoe0KY5tQAAHADy/pBvqBwAAAAASUVORK5CYII=","mon_bat":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAfUlEQVR4nGNgGAWjYBSMgsEKREVl/1MTk2y5lZUXVTHRjoC5mBYOIOgIkAJbpwKiMLJDSdVHNUcg+5BqDiDXEVR1ADGOeBAaiuIIZD5dHEAuHpoOoKZjyHYAtRxBtgMYcBTPyIUMOkb3AFlFMiFN+OTJsnQUjIJRMApGHAAAyy7q+nWwJGIAAAAASUVORK5CYII=","mon_boss":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAtklEQVR4nO3XQQqDMBCFYS/hspcS7KYX8EyuegFvUUrXnsCddNseoJJCFg1FTZNpZuB/8FYSnC8hglVFCCGkZOr68Epp8eH78/Du8dRF1a8rigCgETC17erg/nkIKHI3cp2A6/U2flQMEe6UKcC3F+XsfX7YBpg/AQASAPfZNA34FaEKYP4EVAGel2a1W4PtXQ8AgFaA+UsMAEAGhGvsD8xW/wbwCAAAAAAAkIyQrOjwhBBCiJYs80mleTb0Vb0AAAAASUVORK5CYII=","mon_goblin":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAnklEQVR4nGNgGAWjYBSMgsEOREVl/8NoUjFVLK8+EfcfRpOKKXIEus/JtZwsRyD7HJlPqgPQzSErBChxANkhgCtEYPjl809YLUUWp4rFuBygn22M1QHI4jR1AM1zACkOqFFTo70DGMgoiKhqOamOoJnloERGDKaJI0YdMOqAAXcAA1I23DwlDyumaTZEdgQ+B9DU8lEHIDuCbkUwrQEAFh0lrDh6bOUAAAAASUVORK5CYII=","mon_golem":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeUlEQVR4nGNgGAWjYBQMFSAqKvufFEx1y8OiM0jCVHXEqAMGpQMehIZitRgmTjUHwFI1OSFAsSNABlTX91CEKXIEMQ6YtWDtwDkAZDkMj8wQGBRpYEAcYGXlRZTY8A2BkeMAhoEuipEdMehqw1EH0NUBDAPdKh7WAACMyQIJ/MNwUgAAAABJRU5ErkJggg==","mon_mimic":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAfklEQVR4nGNgGAWjYBSMglEwmIGoqOx/amCyLe/P06IKJssRg9oBuOTwiZPlgM1T8lDw5yNBGGLYMLo6qjkAG65RUyOohiYOAFmMjunmAGyW43PE0HfAy+efUNgwy/Cxh1cIDDoH0CUXMBBZGYEspkllRIojaWrBKBgFwx4AAMm7Urprpl/VAAAAAElFTkSuQmCC","mon_shaman":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAlUlEQVR4nGNgGAUjBYiKyv4fUMvDjh37PyCOgFkOw3R1BLrlVHEESDM+TMgRFFv+8uQKvBjdAhA/O8CCOsFPiQNAeNQBVHUAPjZdHDDgIUB3B8DyOTEOQLaIKg4AaVxR8YEkDLNs1AGjDhh1wPBywOcjQWAaVLdj42NzAANSIUaW5ZSGAFXAqAMYkOKRWExVy0cBLQEAZAZxvxypqzkAAAAASUVORK5CYII=","mon_skeleton":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAjElEQVR4nGNgGAWjYBRQCERFZf8PiKUw/PL5p//IfLpYDrIUF6apIwhZTlNHgAwNi84AY1wWw+RHhgPQowObPE0cMWBpYNQBxDqC5pajY/SSkKbBf+zEJRQMsxCb+KgDRh0w/BzAgJQN0fM7LnGaOQKbRQPqgAEJAeQSkG5F8agDkB2BLQ0MSB+BUgAAMEGCEZVFKpkAAAAASUVORK5CYII=","mon_slime":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgUlEQVR4nGNgGAWjYBSMglEwCgYzEBWV/U8NTLbl1SfiqILJcgy6A/SzjanmGJIdALIchunmCJgDkC2nqyNoGQJEOQJfGnj5/BNWA3GJ48NEOwDZEhgmRpyqDoBZAAoNZMtwiQ+/EBgUaYDaeGQ4gKyKitoOwGkRPjCg1fEooBcAABd+pwCH/cv3AAAAAElFTkSuQmCC","mon_spider":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAuUlEQVR4nO2VwQ2AIAxFWYKjeziGF6YwcRo3cSE3wWDSpDalgFBO/UkPJE3/o5bq9m2NXHi/vIHPTkMtACoQ13nEFCUAyBsOAoUpSA4AgxiAAeA6v4G4wlBMAsC7AfJ+QdTcLMXUDtAcCaB7FnoAcOtxNIHRFucAwAjmAc8Gt0WbZ6K0YumruEP4dCSd1f8b0qugT3i4OQWgEPQTqJtLMzAdYoq5AdRCqJpjiNwmVDfnYKabmkwm00g9aKNJ1dmyCMUAAAAASUVORK5CYII=","mon_wraith":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZElEQVR4nGNgGAWjYBQMFSAqKvufFEx1y62svEjCVHXEqANGHYDugLBjx7Baiiw+vENg1AGjDhgQB9g6FZCERx0wKBxAFUeQYznMAVQJiVEHDBoHkNoopYkD6KEPp2H01EdXAADazTBz8Uoh+wAAAABJRU5ErkJggg==","tile_bell":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAc0lEQVR4nGNgGAWjYBSMAgqBqKjs/wGxFIY/Hwn6j8yni+UgS3FhmjqCkOU0d8TIdgCxlg8KRwzPKBg0DhiwcgBkcH+eFlGYZglwQB3AgFYH4MM0sZyByEQ46gCaV8no8U339gC6Y+jia0KOGDDLR8GwAADMhrOo/y0+hQAAAABJRU5ErkJggg==","tile_campfire":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAiUlEQVR4nGNgGAWjYBSMglEwCoY6EBWV/T+glj8IDf0/II6AWQ7DdHUEyLIPXd5gDLIcxqabI0AWfT4SBLcYhEF8ujgAZjkMwyyH4QFxBF0tH1AHgCxAxzCLkTHNLM8OsCAKU90RMJ+R4gCqOQJk0OYpeWRhqjhi1AED7gAGHNmPGEwVy0cBrQEA4P9c9WsmCB4AAAAASUVORK5CYII=","tile_chest":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZElEQVR4nGNgGAWjYBSMglEwmIGoqOx/amCyLe/P06IKJssRg94Bn48EoWCaOGDzlDycGN0B+NTSzAE1ampgPGAOGPAQGP4OGPBcMKjLAbo4AF+8koIpqg8GrDIaBaNgFNALAAC6ymOdrFiGvAAAAABJRU5ErkJggg==","tile_crack":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAYklEQVR4nGNgGAWjYBQMViAqKvufmphky8OiM6iKSXLEqAMGtQOq63vw4pHjACsrrxEeArhCYviHAEgO5GtcRS5dHIDLMLo5gNr6Rh0w6oBRB4w6YPA5AGYYOc1rqjTL6QkAwF1sB9tmjOYAAAAASUVORK5CYII=","tile_event":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAVElEQVR4nGNgGAWjYBSMgqEMREVl/w+o5SsqPvynuSNAFlCCKbbcysqLIkyRI0YdMCQcAMoJIzMEQD5HxqMOGHkOGPBESBcHMAx0ZTQKRsEooAcAAG+0snN+cA5TAAAAAElFTkSuQmCC","tile_goldpile":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAeUlEQVR4nGNgGAWjYBSMglEwCkbBKKAQiIrK/h8QS2H485Gg/8h8ulgOshQXpqkjCFlOU0cQazlNHEGs5S+ff6KNI7A5AN0ymoYCqcHfn6dFPQeQYjnIYnRMsSMG1AGUWj4oHDG0owDZEaQ6hCZ1AzEOoUulRM3aEAClJQzRXd/1LwAAAABJRU5ErkJggg==","tile_key":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAb0lEQVR4nGNgGAWjYBSMAhKAqKjs/wGzGIQ/Hwn6D2PT1XKQxeiYbo4YUAfgsnxQOAKWFmjuCFwO6M/TAmO6hAS2XEBXByA7hAFLqNC9fBh1wKBxwLETl0Z4CAy4AwYsChiQCqcBayOMglEwCqgFAOqx5XuNs88CAAAAAElFTkSuQmCC","tile_lava":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAcElEQVR4nGNgGAWjYBSMglEwCgYbEBWV/U9LTNDyD13eNMU4HQGSmOOrRhdMlCM+HwnCi2niCFgU0MMBGI6gdxTgDIEBTQfIUUB3RwybKCA28dIsCkjJPcMzCshKgKO5YNBFAa2rY7ztggFtkAwEAABoAwdzRnJHjwAAAABJRU5ErkJggg==","tile_lockdoor":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAW0lEQVR4nGNgGAWjYBQMNSAqKvsfH6a55cdOXMKLaeqIQeOAsOgMuIXobJo7AGQJPjzqgFEHjDqAbg74fCQIBY9MB8AqoJEZAgOeCAfEAQwD3SAZBaNgFNACAAAYem9/tF0LbQAAAABJRU5ErkJggg==","tile_portal":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAh0lEQVR4nGNgGAWjYBSMAgqBqKjs/wGxFIZXVHz4j8yni+UgS3FhmjqCkOU0dQQuy18+/0R7R2Cz3MrKCwPTzBHoDgg7dgyrA0DidHEANsuxhQJVHIBuua1TAV4H0CQUBjQEBqUD6J4LcDkCliYGvDAaVMUx3SqkAasNsTmG7paOglEwCqgJAA/lv9u5cefQAAAAAElFTkSuQmCC","tile_shop":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAaUlEQVR4nGNgGAWjYBSMgsEOREVl/1OCKbb8QWgo0fjzkSAUDBKjyBGjDhjZDoClYmo4gGRHgDRsnpJHVUySI0YdMOqAUQcMuAMYsFTDH7q8ScJUr5bJcQBFlg4qBzCQ0TKiquWjYFgDAJw1bKqKO8j7AAAAAElFTkSuQmCC","tile_shrine":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAZElEQVR4nGNgGAWjYBSMgqEGREVl/+PDNLd81oK1eDFNHTHoHBB27BgY09wByHGM7mNsDqBqegAZFBadAceEogBZLVUcMegcQAoedcCoA0YdMOqA4eEABiIaIQPSOBkFo4BaAAA0uRNMhCoGNQAAAABJRU5ErkJggg==","tile_spike":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGklEQVR4nO3BAQEAAACCIP+vbkhAAQAAAO8GECAAARlDNO4AAAAASUVORK5CYII=","tile_stair":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAASUlEQVR4nGNgGAWjYBSMglEwWIGoqOx/amKSLa+u76EqJskRow5goEEaGE0LQ9MBDKNpYdQBaI4Ylmlh1AEkOYBhoNsJo2BYAgCqpf6JCxn6aQAAAABJRU5ErkJggg==","tile_thorns":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAgElEQVR4nGNgGAWjYBSMgqEGREVl/w+o5frZxv+RHUF3B4EsrD4RB3YEsoPo6hCYZciOoVvIwHyLjNEdg81BVLMcZDAyRrYQGcMcM2AOoEkUDKgDsMU9Pkx1y9F9iAvTLehHlgMYsKQBXImRJpZjcwzdfI7PETRL9aNgFIyCEQUAHTHT3+EkVtoAAAAASUVORK5CYII=","tile_well":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAWklEQVR4nGNgGAWjYBSMglEwCgYrEBWV/U9NTLLl1fU9WHFYdAZejEsfSY4YdQAhB8TP/YAVjywHvHz+CYUeeSEwoA4Y8Fww6oABdQC5eGg5gGGgq+NRQE8AADo3CcS9aib2AAAAAElFTkSuQmCC"};
  var SPRITES={}, SPRT_TRY={};
  function spr(key,emoji,cls){
    var lift='<i class="spr'+(cls?" "+cls:"")+'" style="background-image:url(';
    if(SPRITES[key]) return lift+SPRITES[key]+')"></i>';
    if(!SPRT_TRY[key]){ SPRT_TRY[key]=true; loadFile(key); }
    if(SPR_BASE64[key]) return lift+SPR_BASE64[key]+')"></i>';
    return '<i class="spr none'+(cls?" "+cls:"")+'">'+(emoji||"")+'</i>';
  }
  function loadFile(key){ if(typeof Image==="undefined") return; var im=new Image(); im.onload=function(){ SPRITES[key]=ASSETS+key+".png"; afterAssets(); }; im.onerror=function(){}; im.src=ASSETS+key+".png"; }
  function afterAssets(){ try{ if(typeof RUN!=="undefined"&&RUN&&typeof render==="function") render(); }catch(e){} }

  /* =================== config =================== */
  var META_KEY="echo-tower-meta-v2", RUN_KEY="echo-tower-run-v2";
  var COLS=9, ROWS=7, BOSS_EVERY=5;

  var CLASSES={
    guard:    { id:"guard",    name:"守夜人", ico:"🛡️", hp:40, atk:5, def:1, unlock:"guard",   desc:"均衡起手,抗性好,适合新手" },
    ranger:   { id:"ranger",   name:"游侠",   ico:"🏹", hp:28, atk:8, def:0, unlock:"ranger",  desc:"高攻低血,靠技能位移拉扯" },
    berserker:{ id:"berserker",name:"狂战士", ico:"🗡️", hp:34, atk:7, def:0, unlock:"kills30", desc:"吸血爆发,越打越狠" },
    mage:     { id:"mage",     name:"法师",   ico:"🔮", hp:24, atk:9, def:1, unlock:"mage",    desc:"远程火球,控制冰冻" }
  };

  var SKILLS=[
    { id:"guard_heal",  cls:"guard",     name:"圣光",   ico:"✨", cd:5, desc:"恢复 35% 生命",        use:healSkill },
    { id:"guard_stun",  cls:"guard",     name:"盾击",   ico:"🛡️", cd:4, desc:"攻击相邻并眩晕 1 回合", use:stunSkill },
    { id:"guard_barrier",cls:"guard",    name:"铜墙铁壁",ico:"🧱", cd:6, desc:"获得 20% 生命上限护盾", use:barrierSkill },
    { id:"ranger_multi",cls:"ranger",    name:"连射",   ico:"🏹", cd:4, desc:"攻击最近 2 名敌人",     use:multiSkill },
    { id:"ranger_blink",cls:"ranger",    name:"疾风步", ico:"💨", cd:6, desc:"瞬移到随机空格",        use:blinkSkill },
    { id:"berserk_leech",cls:"berserker",name:"嗜血",   ico:"🩸", cd:4, desc:"攻击并吸取 40% 伤害",   use:leechSkill },
    { id:"berserk_rage", cls:"berserker",name:"狂暴",   ico:"🤬", cd:6, desc:"3 回合攻击 +3",          use:rageSkill },
    { id:"mage_fireball",cls:"mage",     name:"火球",   ico:"🔥", cd:4, desc:"攻击最远敌人,远程",      use:fireballSkill },
    { id:"mage_frost",  cls:"mage",      name:"冰霜",   ico:"❄️", cd:5, desc:"冻结相邻敌人 1 回合",    use:frostSkill },
    { id:"mage_storm",  cls:"mage",      name:"奥术风暴",ico:"🌀", cd:7, desc:"攻击所有敌人",          use:stormSkill }
  ];
  var SKILLCLS={ guard:"guard", ranger:"ranger", berserker:"berserker", mage:"mage" };

  var UPG=[
    { id:"hp",     name:"硬化皮肤", ico:"🧱", max:8, base:30, mult:2.1, desc:"初始生命 +10 / 级" },
    { id:"gold",   name:"富人思维", ico:"💰", max:8, base:40, mult:2.1, desc:"初始金币 +50 / 级" },
    { id:"atk",    name:"磨利刀刃", ico:"🗡️", max:8, base:50, mult:2.3, desc:"初始攻击 +1 / 级" },
    { id:"potion", name:"好运药罐", ico:"🧪", max:4, base:60, mult:3.0, desc:"开局药水 +1 / 级" },
    { id:"ranger", name:"解锁·游侠",ico:"🏹", max:1, base:150,mult:1,   desc:"解锁游侠职业" },
    { id:"mage",   name:"解锁·法师",ico:"🔮", max:1, base:350,mult:1,   desc:"解锁法师职业" },
    { id:"echo",   name:"强化回响", ico:"🫥", max:3, base:90, mult:3.2, desc:"回响伤害与治疗 +50% / 级" },
    { id:"heirloom", name:"传承圣物", ico:"🎁", max:1, base:120, mult:1, desc:"开局可从 3 件圣物中挑选 1 件" }
  ];

  var ENEMIES=[
    { id:"slime",   name:"史莱姆", ico:"🟢", hp:9,  atk:3,  def:0, minFloor:1, kind:"melee", behavior:"split" },
    { id:"bat",     name:"蝙蝠",   ico:"🦇", hp:7,  atk:4,  def:0, minFloor:2, kind:"melee" },
    { id:"goblin",  name:"哥布林", ico:"👺", hp:16, atk:6,  def:1, minFloor:4, kind:"melee" },
    { id:"spider",  name:"毒蜘蛛", ico:"🕷️", hp:14, atk:5,  def:1, minFloor:3, kind:"melee", poison:true },
    { id:"archer",  name:"游荡弓手",ico:"🏹", hp:13, atk:7,  def:1, minFloor:5, kind:"ranged", range:4, behavior:"archer" },
    { id:"skeleton",name:"骷髅",   ico:"💀", hp:24, atk:8,  def:2, minFloor:6, kind:"melee", behavior:"regen" },
    { id:"shaman",  name:"萨满巫医",ico:"🧙", hp:20, atk:5,  def:1, minFloor:7, kind:"melee", behavior:"shaman" },
    { id:"wraith",  name:"暗影刺客",ico:"👻", hp:22, atk:11, def:1, minFloor:8, kind:"melee" },
    { id:"golem",   name:"石像鬼", ico:"🗿", hp:40, atk:12, def:5, minFloor:9, kind:"melee", behavior:"charge" }
  ];

  var BOONS=[
    { id:"str",   name:"狂怒", ico:"💢", desc:"本局攻击 +2",        apply:function(r){ r.boonAtk+=2; } },
    { id:"vit",   name:"体魄", ico:"🩸", desc:"生命上限 +15 并回满", apply:function(r){ r.boonHp+=15; r.hp=r.maxHp(); } },
    { id:"def",   name:"铁壁", ico:"🧱", desc:"本局防御 +2",        apply:function(r){ r.boonDef+=2; } },
    { id:"gold",  name:"横财", ico:"🪙", desc:"获得 120 金币",      apply:function(r){ r.gold+=120; } },
    { id:"regen", name:"再生", ico:"🌿", desc:"每登一层恢复 15 生命", apply:function(r){ r.boonRegen+=15; } },
    { id:"crit",  name:"要害", ico:"🎯", desc:"暴击率 +25%",         apply:function(r){ r.boonCrit=((r.boonCrit||0)+0.25); } },
    { id:"thorn", name:"荆棘", ico:"🌵", desc:"受击时反伤 3 点",      apply:function(r){ r.boonThorn=true; } },
    { id:"fort",  name:"瑞气", ico:"🍀", desc:"开局即可使用一次「回响」", apply:function(r){ r.echoUsed=false; } }
  ];

  var RELICS=[
    { id:"rc",  name:"先祖戒", ico:"💍", atk:2,   desc:"攻击 +2" },
    { id:"rme", name:"愚者面具",ico:"🎭", crit:0.15, desc:"暴击率 +15%" },
    { id:"rst", name:"战士徽章",ico:"🎖️", hp:10,   desc:"生命上限 +10" },
    { id:"rsh", name:"守护图腾",ico:"🛡️", shield:2, desc:"每层开局 +2 护盾" },
    { id:"raven",name:"血鸦噬刃",ico:"🐦‍⬛", lee:0.2, desc:"攻击时吸取 20% 伤害" },
    { id:"skull",name:"淬毒獠牙",ico:"🗡️", poisonHit:1, desc:"攻击附加中毒(持续伤害)" },
    { id:"clock",name:"时计沙漏",ico:"⌛", cdr:0.2,  desc:"技能冷却 -20%" },
    { id:"ember",name:"余烬之核",ico:"🔥", burnDmg:0.5, desc:"灼烧伤害 +50%" },
    { id:"goldpot",name:"聚宝盆",ico:"🪙", goldKill:5, desc:"击杀金币 +5" },
    { id:"agile",name:"疾风羽",ico:"🪶", dodge:0.12, desc:"12% 概率闪避攻击" },
    { id:"rush", name:"战意勋章",ico:"🏅", atk:3, def:1, desc:"攻击 +3, 防御 +1" },
    { id:"life2",name:"生命符石",ico:"🟥", hp:20, desc:"生命上限 +20" }
  ];
  var EQUIP_SLOTS=[
    {cat:"weapon",   name:"武器", ico:"🗡️", primary:"atk"},
    {cat:"accessory",name:"饰品", ico:"💍", primary:"crit"},
    {cat:"helm",     name:"头盔", ico:"⛑️", primary:"def"},
    {cat:"armor",    name:"盔甲", ico:"🛡️", primary:"def"},
    {cat:"pants",    name:"裤子", ico:"👖", primary:"def"},
    {cat:"boots",    name:"靴子", ico:"👢", primary:"dodge"},
    {cat:"gloves",   name:"手套", ico:"🧤", primary:"atk"}
  ];
  var EQ_PRIMARY={}; EQUIP_SLOTS.forEach(function(s){ EQ_PRIMARY[s.cat]=s.primary; });
  var EQ_MATS=["铁","钢","精钢","秘银","暗铁","龙骨","星钻","寒铁","陨星","圣银"];
  var EQ_KINDS={
    weapon:["长剑","战斧","战锤","短匕","长枪","镰刀","战戟","双刃","重剑","刺剑","战矛","巨镰"],
    accessory:["戒指","项链","护符","坠饰","指环","耳环","腰坠","臂环","手镯","徽记","吊坠","宝珠"],
    helm:["头盔","兜帽","王冠","面甲","战盔","法冠","风帽","盔盔","冠盔","护目","兜盔","战盔"],
    armor:["胸甲","铠甲","战袍","鳞甲","法衣","皮甲","板甲","链甲","秘甲","战甲","法袍","重铠"],
    pants:["护腿","战裤","胫甲","绑腿","皮裤","板裤","链裤","秘裤","战裙","护胫","长裤","重腿"],
    boots:["战靴","皮靴","快靴","踏地","灵靴","重靴","秘靴","飞靴","护足","长靴","短靴","风靴"],
    gloves:["护手","手套","臂甲","护腕","拳套","指虎","腕甲","手甲","铁拳","灵护","战腕","皮护"]
  };
  var AFFIXES=[
    {k:"atk",name:"攻击"},{k:"def",name:"防御"},{k:"hp",name:"生命"},{k:"crit",name:"暴击"},
    {k:"dodge",name:"闪避"},{k:"cdr",name:"冷却"},{k:"lee",name:"吸血"},{k:"dot",name:"中毒"},
    {k:"burnDmg",name:"灼烧"},{k:"goldKill",name:"金币"},{k:"poisonHit",name:"淬毒"}
  ];
  var SETS={
    dragon:{name:"赤龙怒",ico:"🐉",tiers:{2:{atk:3},3:{atk:3,burnDmg:0.08},4:{atk:4,crit:0.04},5:{atk:5,dot:2},6:{atk:8,crit:0.06}}},
    frost:{name:"永冬",ico:"❄️",tiers:{2:{def:3},3:{def:3,hp:8},4:{def:4,dodge:0.04},5:{def:5,hp:12},6:{def:8,hp:18}}},
    storm:{name:"雷罚",ico:"⚡",tiers:{2:{crit:0.08},3:{crit:0.05,atk:2},4:{crit:0.06,cdr:0.05},5:{crit:0.07,hp:8},6:{crit:0.12,cdr:0.08,atk:3}}},
    shadow:{name:"暗影",ico:"🌑",tiers:{2:{dodge:0.06},3:{dodge:0.04,cdr:0.05},4:{dodge:0.05,lee:0.04},5:{dodge:0.06,atk:3},6:{dodge:0.11,atk:4}}},
    blood:{name:"血契",ico:"🩸",tiers:{2:{lee:0.06},3:{lee:0.04,atk:2},4:{lee:0.05,hp:6},5:{lee:0.06,crit:0.03},6:{lee:0.11,atk:4}}},
    iron:{name:"荆棘",ico:"🌵",tiers:{2:{def:3},3:{def:3,hp:10},4:{def:4,thorns:2},5:{def:4,hp:14},6:{def:8,hp:22,thorns:3}}},
    star:{name:"星辉",ico:"✨",tiers:{2:{crit:0.06},3:{crit:0.04,cdr:0.05},4:{crit:0.05,hp:10},5:{crit:0.06,dodge:0.04},6:{crit:0.09,cdr:0.08,hp:16}}},
    guardian:{name:"守护者",ico:"🛡️",tiers:{2:{hp:15},3:{hp:12,def:2},4:{hp:16,thorns:1},5:{hp:18,def:4},6:{hp:36,def:6}}},
    monsoon:{name:"疾风",ico:"🌪️",tiers:{2:{dodge:0.05,cdr:0.04},3:{dodge:0.04,cdr:0.05},4:{dodge:0.04,atk:3},5:{dodge:0.06,lee:0.03},6:{dodge:0.09,cdr:0.07,atk:4}}},
    flame:{name:"焚天",ico:"🔥",tiers:{2:{burnDmg:0.1},3:{burnDmg:0.08,atk:2},4:{burnDmg:0.12,crit:0.03},5:{burnDmg:0.12,hp:8},6:{burnDmg:0.22,atk:5}}}
  };
  function setBonusField(sd,field,count){ var st=SETS[sd]; var s=0; if(!st||!st.tiers) return 0; for(var t=2;t<=6;t++){ if(count>=t&&st.tiers[t]&&st.tiers[t][field]) s+=st.tiers[t][field]; } return s; }
  function setCounts(){ var c={}; for(var k in RUN.equip){ var it=RUN.equip[k]; if(it&&it.set) c[it.set]=(c[it.set]||0)+1; } return c; }
  function setMaxTier(n){ if(n>=6) return 6; return n>=2?n:0; }
  function fmtStat(k,v){ if(k==="crit"||k==="dodge"||k==="cdr"||k==="lee"||k==="burnDmg") return "+"+Math.round(v*100)+"% "+fieldName(k); return "+"+v+" "+fieldName(k); }
  var EQ_CATALOG={};
  (function buildEquipCatalog(){
    var seedR=mulberry32(0x510E);
    EQUIP_SLOTS.forEach(function(s,si){
      var mats=EQ_MATS, kinds=EQ_KINDS[s.cat], arr=[], seen={};
      for(var i=0;i<mats.length;i++){ for(var j=0;j<kinds.length;j++){ var nm=mats[i]+kinds[j]; if(!seen[nm]){ seen[nm]=1; arr.push({slot:s.cat,name:nm,ico:s.ico,primary:s.primary}); } } }
      var extra=0, suf=["攻","守","焰","影","星","霜","煞","武","灵","绝"];
      while(arr.length<100){ var nm=mats[extra%mats.length]+kinds[extra%kinds.length]+"·"+suf[extra%10]; if(!seen[nm]){ seen[nm]=1; arr.push({slot:s.cat,name:nm,ico:s.ico,primary:s.primary}); } extra++; }
      arr=arr.slice(0,100);
      for(var k=0;k<arr.length;k++){ var tier=Math.floor(k*7/arr.length); arr[k].tier=tier; arr[k].base=eqBaseTier(s.primary,tier,k); }
      EQ_CATALOG[s.cat]=arr;
    });
  })();
  function eqBaseTier(primary,tier,k){
    switch(primary){
      case "atk": return 2+tier*2+(k%3);
      case "def": return 1+Math.round(tier*1.6)+(k%2);
      case "dodge": return +(0.02+tier*0.02+((k%3)*0.005)).toFixed(2);
      case "crit": return +(0.03+tier*0.025+((k%4)*0.005)).toFixed(2);
      case "hp": return 4+tier*5+(k%3);
    }
    return 0;
  }
  var eq_uid=1;
  function affixVal(af,tier,rarity){
    var m=1+rarity*0.4;
    switch(af.k){
      case "atk": return Math.round((1+tier)*m);
      case "def": return Math.round((1+tier*0.8)*m);
      case "hp": return Math.round((3+tier*3)*m);
      case "crit": case "dodge": case "cdr": case "lee": case "burnDmg": return +((0.02+tier*0.012)*m).toFixed(2);
      case "dot": return Math.round((1+tier*0.5)*m);
      case "goldKill": return Math.round((2+tier)*m);
      case "poisonHit": return 1;
    }
    return 1;
  }
  function genEquip(slot,floor){
    var arr=EQ_CATALOG[slot]; if(!arr) return null;
    var tier=Math.min(6,Math.floor((floor-1)/2));
    var cand=arr.filter(function(t){return t.tier===tier;}); if(!cand.length) cand=arr;
    var t=cand[Math.floor(Math.random()*cand.length)];
    var rarity=rarPick(floor);
    var it={ uid:"eq_"+(eq_uid++), slot:slot, name:t.name, ico:t.ico, primary:t.primary, base:t.base, tier:tier, rarity:rarity, aff:[], set:null, up:0 };
    var nAff=RARITIES[rarity].aff;
    var usedK={};
    for(var i=0;i<nAff;i++){ var guard2=0; var af; do{ af=AFFIXES[Math.floor(Math.random()*AFFIXES.length)]; }while(usedK[af.k]&&++guard2<8); usedK[af.k]=1; it.aff.push({k:af.k,name:af.name,v:affixVal(af,tier,rarity)}); }
    if(Math.random()<0.12+rarity*0.05){ var sn=Object.keys(SETS); it.set=sn[Math.floor(Math.random()*sn.length)]; }
    return it;
  }
  function genBasic(slot){
    var arr=EQ_CATALOG[slot]; if(!arr) return null;
    var t=arr[0];
    return { uid:"eq_"+(eq_uid++), slot:slot, name:t.name, ico:t.ico, primary:t.primary, base:t.base, tier:0, rarity:0, aff:[], set:null, up:0 };
  }
  function eqStatItem(item,field){ if(!item) return 0; var v=0; if(item.primary===field) v+=item.base*((RARITIES[item.rarity]||RARITIES[0]).mult); (item.aff||[]).forEach(function(a){ if(a.k===field) v+=a.v; }); if(item.aff===undefined) item.aff=[]; var up=item.up||0; if(up>0) v*= (1+up*0.06); return Math.round(v*100)/100; }
  /* --- enhance / reforge --- */
  function rollAffixes(tier,rarity){ var n=RARITIES[rarity].aff; var arr=[]; var usedK={}; for(var i=0;i<n;i++){ var g=0,af; do{ af=AFFIXES[Math.floor(Math.random()*AFFIXES.length)]; }while(usedK[af.k]&&++g<8); usedK[af.k]=1; arr.push({k:af.k,name:af.name,v:affixVal(af,tier,rarity)}); } return arr; }
  function upMax(it){ return Math.min(10, 3+it.rarity*2); }
  function upCost(it){ return Math.round((25+it.tier*15+it.rarity*20)*(1+(it.up||0))); }
  function refCost(it){ return Math.round(45+it.tier*18+it.rarity*30); }
  function upgradeItem(it){ if(!it) return false; var up=it.up||0; if(up>=upMax(it)){ toast("已达强化上限(+"+up+")","warn"); return false; } var c=upCost(it); if(RUN.gold<c){ toast("金币不足("+c+" 🪙)","warn"); return false; } RUN.gold-=c; it.up=up+1; SFX.levelup(); log("强化成功:「"+it.name+"」 +"+(up+1)+"!(-"+c+" 金币)"); pop("🛠️","强化成功",it.name+" +"+(up+1)+" 攻击/属性提升","ok"); render(); renderEquip(); return true; }
  function reforgeItem(it){ if(!it) return false; var c=refCost(it); if(RUN.gold<c){ toast("金币不足("+c+" 🪙)","warn"); return false; } RUN.gold-=c; it.aff=rollAffixes(it.tier,it.rarity); SFX.relic(); addShake(0.1); log("重铸「"+it.name+"」词缀,已重塑。(-"+c+" 金币)"); pop("♻️","重铸成功",it.name+" 词缀已重新随机","ok"); render(); renderEquip(); return true; }
  function tierTag(t){ return "T"+((t||0)+1); }
  function eqDesc(it){ if(!it) return ""; var st=eqStatItem(it,it.primary); var s=rarName(it.rarity)+" "+it.ico+" "+it.name+(it.up?" +"+it.up:"")+"  T"+(it.tier+1)+" · +"+(it.primary==="dodge"||it.primary==="crit"?Math.round(st*100)+"%":st); if(it.set){ s+=" · [套装]"+SETS[it.set].name; } return s; }
  function sellPrice(it){ if(!it) return 0; var v=(10+it.base*6+it.tier*8)*(1+it.rarity*0.5)+(it.aff?it.aff.length*5:0); return Math.round(v); }
  function addToInv(it){ if(!it) return false; if(RUN.inventory.length>=100) return false; RUN.inventory.push(it); return true; }

  var RARITIES=[
    {k:0,label:"普通",cls:"rarity-common",   mult:1.0,aff:1},
    {k:1,label:"优秀",cls:"rarity-uncommon", mult:1.3,aff:2},
    {k:2,label:"稀有",cls:"rarity-rare",     mult:1.6,aff:2},
    {k:3,label:"史诗",cls:"rarity-epic",     mult:1.9,aff:3},
    {k:4,label:"传说",cls:"rarity-legendary",mult:2.3,aff:4},
    {k:5,label:"神器",cls:"rarity-mythic",   mult:2.8,aff:5}
  ];

  /* cosmetics */
  var CHAR_SKINS=[
    {id:"wanderer", ico:"🧗", name:"远行者",   unlock:function(){return true;},                  desc:"最初的你"},
    {id:"ninja",    ico:"🥷", name:"无名剑客", unlock:function(){return META.totalKills>=30;},   desc:"累计击杀 30"},
    {id:"sorcerer", ico:"🧙", name:"咒术师",   unlock:function(){return META.bestFloor>=8;},     desc:"爬到第 8 层"},
    {id:"hunter",   ico:"🤠", name:"赏金猎人", unlock:function(){return META.souls>=300;},       desc:"持有 300 塔魂"},
    {id:"mech",     ico:"🤖", name:"机械师",   unlock:function(){return META.souls>=600;},       desc:"持有 600 塔魂"},
    {id:"lich",     ico:"💀", name:"亡灵法师", unlock:function(){return META.deaths>=2;},        desc:"倒下 2 次"}
  ];
  var WEAPON_SKINS=[
    {id:"iron",  ico:"🗡️", name:"标准铁器", unlock:function(){return true;},                desc:"基础"},
    {id:"flame", ico:"🔥", name:"烈焰之刃", unlock:function(){return META.bestFloor>=6;},     desc:"爬到第 6 层"},
    {id:"frost", ico:"❄️", name:"寒霜之刃", unlock:function(){return META.souls>=200;},       desc:"持有 200 塔魂"},
    {id:"volt",  ico:"⚡", name:"雷光之刃", unlock:function(){return META.totalKills>=50;},   desc:"累计击杀 50"}
  ];
  var ENEMY_THEMES=[
    {id:"dungeon",ico:"🏰", name:"地下城", unlock:function(){return true;},
      maps:{slime:"🟢",bat:"🦇",goblin:"👺",spider:"🕷️",archer:"🏹",skeleton:"💀",wraith:"👻",golem:"🗿",boss:"👁️"}},
    {id:"candy",  ico:"🍬", name:"糖果乐园", unlock:function(){return META.souls>=300;},
      maps:{slime:"🍬",bat:"🍭",goblin:"🍩",spider:"🍬",archer:"🍭",skeleton:"🧁",wraith:"⚰️",golem:"🍪",boss:"🍰"}},
    {id:"neon",   ico:"💾", name:"赛博霓虹", unlock:function(){return META.bestFloor>=10;},
      maps:{slime:"👾",bat:"🛸",goblin:"🤖",spider:"👾",archer:"🛸",skeleton:"📟",wraith:"🕶️",golem:"💾",boss:"☄️"}},
    {id:"ghost",  ico:"🕯️", name:"幽冥鬼域", unlock:function(){return META.souls>=500;},
      maps:{slime:"👻",bat:"🦴",goblin:"🧟",spider:"🕸️",archer:"🎃",skeleton:"⚰️",wraith:"🕯️",golem:"🗿",boss:"🦇"}}
  ];

  var ACH=[
    { id:"k30",  name:"无名猎手", ico:"🗡️", desc:"累计击杀 30 名敌人",          check:function(){return META.totalKills>=30;}, souls:40 },
    { id:"f8",   name:"深入塔心", ico:"🏔️", desc:"到达第 8 层",                check:function(){return META.bestFloor>=8;},   souls:60 },
    { id:"boss", name:"弑塔主",   ico:"👁️", desc:"击败一只塔主(BOSS)",          check:function(){return META.bossKills>=1;},   souls:80 },
    { id:"rich", name:"富可敌塔", ico:"🪙", desc:"单局金币达到 500",             check:function(){return META.highGold>=500;},  souls:50 },
    { id:"rev",  name:"多重回声", ico:"🫥", desc:"使用回响 3 次",                check:function(){return META.echoUses>=3;},   souls:40 },
    { id:"d1",   name:"涅槃",    ico:"🕯️", desc:"倒下 1 次(开始你的循环)",      check:function(){return META.deaths>=1;},      souls:20 },
    { id:"noPot",name:"无药通关", ico:"🚫", desc:"不吃药水爬到第 6 层",           check:function(){return META.noPotFloor>=6;},  souls:70 }
  ];

  /* =================== meta =================== */
  function defMeta(){ return { v:2, souls:0, upz:{}, bestFloor:0, deaths:0, totalKills:0, bossKills:0, highGold:0, echoUses:0, noPotFloor:0, sound:true, runSeed:0,
    charSkin:"wanderer", weaponSkin:"iron", enemyTheme:"dungeon", lastRun:null }; }
  var META=defMeta();
  function upLevel(id){ return META.upz[id]||0; }
  function upCost(u){ return Math.floor(u.base*Math.pow(u.mult,upLevel(u.id))); }
  function buyUp(id){
    var u=UPG.find(function(x){return x.id===id;}); if(!u||upLevel(u.id)>=u.max) return;
    var c=upCost(u); if(META.souls<c){ toast("塔魂不够 "+c+" 个","warn"); return; }
    META.souls-=c; META.upz[u.id]=upLevel(u.id)+1; toast("强化:「"+u.name+"」升到 Lv"+(upLevel(u.id))+"","ok"); saveMeta(); refreshMeta();
  }
  function classUnlocked(cls){
    if(cls==="guard") return true;
    if(cls==="ranger") return upLevel("ranger")>=1;
    if(cls==="mage") return upLevel("mage")>=1;
    if(cls==="berserker") return META.totalKills>=30;
    return false;
  }
  function checkAch(){
    ACH.forEach(function(a){
      if(!META.ach || !META.ach[a.id]){
        try{ if(a.check()){ META.ach=META.ach||{}; META.ach[a.id]=true; META.souls+=a.souls; toast("🏆 达成成就:「"+a.name+"」 +"+a.souls+" 塔魂","ok"); saveMeta(); } }catch(e){}
      }
    });
  }

  /* =================== audio (WebAudio, unlocked on first gesture) =================== */
  var audio={ ctx:null, master:null };
  function soundOn(){ return META.sound!==false; }
  function ensureAudio(){
    if(!audio.ctx){
      try{ var AC=window.AudioContext||window.webkitAudioContext; if(AC){ audio.ctx=new AC(); audio.master=audio.ctx.createGain(); audio.master.gain.value=0.42; audio.master.connect(audio.ctx.destination); } }catch(e){ audio.ctx=null; }
    }
    if(audio.ctx&&audio.ctx.state==="suspended"){ try{ audio.ctx.resume(); }catch(e){} }
  }
  function tone(freq,dur,type,vol,slide){
    if(!soundOn()||!audio.ctx||!audio.master) return;
    var t=audio.ctx.currentTime, o=audio.ctx.createOscillator(), g=audio.ctx.createGain();
    o.type=type||"square"; o.frequency.setValueAtTime(freq,t);
    if(slide) o.frequency.exponentialRampToValueAtTime(slide,t+dur);
    g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(vol||0.12,t+0.008); g.gain.exponentialRampToValueAtTime(0.0001,t+dur);
    o.connect(g); g.connect(audio.master); o.start(t); o.stop(t+dur+0.03);
  }
  function noiseHit(dur,vol,cut){
    if(!soundOn()||!audio.ctx||!audio.master) return;
    var t=audio.ctx.currentTime, n=Math.max(1,Math.floor(audio.ctx.sampleRate*dur)), buf=audio.ctx.createBuffer(1,n,audio.ctx.sampleRate), d=buf.getChannelData(0);
    for(var i=0;i<n;i++) d[i]=(Math.random()*2-1)*(1-i/n);
    var src=audio.ctx.createBufferSource(); src.buffer=buf;
    var g=audio.ctx.createGain(); g.gain.value=vol||0.1;
    var f=audio.ctx.createBiquadFilter(); f.type="lowpass"; f.frequency.value=cut||1200;
    src.connect(f); f.connect(g); g.connect(audio.master); src.start(t);
  }
  var SFX={
    click:function(){ tone(660,0.05,"square",0.05); },
    move:function(){ tone(200,0.045,"triangle",0.05); },
    hit:function(){ tone(110,0.06,"square",0.11,60); noiseHit(0.05,0.07,900); },
    crit:function(){ tone(160,0.12,"square",0.17,45); noiseHit(0.1,0.13,1500); },
    hurt:function(){ tone(85,0.09,"sawtooth",0.14,50); },
    kill:function(){ tone(300,0.12,"square",0.1,60); },
    potion:function(){ tone(480,0.09,"sine",0.1,720); },
    levelup:function(){ tone(420,0.09,"triangle",0.1,840); noiseHit(0.06,0.04,2200); },
    pickup:function(){ tone(620,0.07,"square",0.08,920); },
    relic:function(){ tone(700,0.14,"sine",0.1,1180); },
    echo:function(){ tone(200,0.28,"sine",0.12,90); noiseHit(0.22,0.05,520); },
    stairs:function(){ tone(400,0.1,"triangle",0.08,620); },
    shop:function(){ tone(520,0.1,"triangle",0.09,700); },
    buy:function(){ tone(440,0.08,"square",0.1,660); },
    shrine:function(){ tone(460,0.16,"sine",0.1,940); },
    heal:function(){ tone(620,0.12,"sine",0.1,980); noiseHit(0.05,0.03,1300); },
    shift:function(){ tone(300,0.16,"sine",0.1,500); noiseHit(0.1,0.05,900); },
    roar:function(){ tone(120,0.22,"sawtooth",0.15,70); noiseHit(0.12,0.08,700); },
    block:function(){ tone(300,0.06,"square",0.06,260); },
    death:function(){ tone(150,0.5,"sawtooth",0.16,40); noiseHit(0.32,0.08,600); }
  };

  /* =================== juice: trauma shake + cell fx =================== */
  var shake={ trauma:0, t:0 };
  function addShake(amt){ shake.trauma=Math.min(1,shake.trauma+amt); }
  function shakeLoop(){
    shake.t+=0.016; var gw=el("gridwrap");
    if(gw){
      if(shake.trauma>0.001){
        var reduced=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if(!reduced){ var s=shake.trauma*shake.trauma;
          gw.style.transform="translate("+(9*s*Math.sin(shake.t*1.7)).toFixed(1)+"px,"+(7*s*Math.sin(shake.t*2.3)).toFixed(1)+"px)"; }
      } else if(gw.style.transform){ gw.style.transform=""; }
      shake.trauma=Math.max(0,shake.trauma-1.5*0.016);
    }
    if(typeof requestAnimationFrame==="function") requestAnimationFrame(shakeLoop);
  }
  function cellFx(x,y,cls,dur){ var c=el("cell_"+x+"_"+y); if(c){ c.classList.remove(cls,"pop","hitflash","killfx","shiver"); void c.offsetWidth; if(cls) c.classList.add(cls); setTimeout(function(){ c.classList.remove(cls,"pop","hitflash","killfx","shiver"); },dur||330); } }
  function gridFx(cls){ var g=el("gridwrap"); if(g){ g.classList.remove(cls,"critflash"); void g.offsetWidth; g.classList.add(cls); setTimeout(function(){ g.classList.remove(cls,"critflash"); },320); } }

  /* =================== run state =================== */
  var RUN=null;
  function relicSum(field){
    var s=0;
    if(RUN&&RUN.relics) RUN.relics.forEach(function(id){ var r=RELICS.find(function(x){return x.id===id;}); if(r&&r[field]) s+=r[field]; });
    if(RUN&&RUN.equip){ var cnt={};
      for(var k in RUN.equip){ var it=RUN.equip[k]; if(it){ s+=eqStatItem(it,field); if(it.set) cnt[it.set]=(cnt[it.set]||0)+1; } }
      for(var sd in cnt){ s+=setBonusField(sd,field,cnt[sd]); }
    }
    return s;
  }
  function applyRelic(rel){ RUN.relics.push(rel.id); if(rel.hp) RUN.hp=Math.min(RUN.maxHp(),RUN.hp+rel.hp); if(rel.shield) RUN.shield+=rel.shield; pop(rel.ico,"获得圣物",rel.name+" —— "+rel.desc,"rare"); }
  function popEq(it,title){ if(!it) return; var st=eqStatItem(it,it.primary); var v=(it.primary==="dodge"||it.primary==="crit")?Math.round(st*100)+"%":"+"+Math.round(st); var type=it.rarity>=5?"mythic":(it.rarity===4?"legendary":(it.rarity===3?"epic":(it.rarity===2?"rare":(it.rarity===1?"uncommon":"")))); pop(spr("eq_"+it.slot,it.ico),title||"获得装备",rarName(it.rarity)+" "+it.name+"  T"+(it.tier+1)+" "+v+(it.set?" · [套装] "+SETS[it.set].name:""),type); }
  function pAtk(){ if(!RUN) return 0; var b=RUN.atkBase+RUN.boonAtk+(RUN.lvl-1)+(RUN.rage>0?3:0)+relicSum("atk"); if(RUN.pWeakT&&RUN.pWeakT>0) b=Math.round(b*0.6); return b; }
  function pDef(){ if(!RUN) return 0; return RUN.defBase+RUN.boonDef+relicSum("def"); }
  function critChance(){ return (RUN.boonCrit||0)+relicSum("crit"); }
  function eqStat(field){ return relicSum(field); }
  function setActive(){ if(!RUN||!RUN.equip) return []; var cnt=setCounts(), out=[]; for(var sd in cnt){ if(cnt[sd]>=2){ out.push({set:SETS[sd],count:cnt[sd],tiers:setMaxTier(cnt[sd])}); } } return out; }
  /* ---- status helpers ---- */
  function pVulnMul(){ return (RUN.pVulnT&&RUN.pVulnT>0)?1.5:1; }
  function eWeak(e){ return (e.weakT&&e.weakT>0)?0.6:1; }
  function eVuln(e){ return (e.vulnT&&e.vulnT>0)?1.5:1; }
  function eAtk(e){ var a=e.atk; if((e.buffT||0)>0) a=Math.round(a*1.5); return Math.round(a*eWeak(e)); }
  function eDotSum(e){ var t=0; if(e.dotT&&e.dotT>0) t+=e.dot; if(e.burnT&&e.burnT>0) t+=e.burn; return t; }
  function pStatusChips(){ var s=""; if(RUN.pdotT>0)s+='<i class="chip poison">☠ 毒 '+RUN.pdot+'</i>'; if(RUN.pBurnT>0)s+='<i class="chip burn">🔥 灼 '+RUN.pBurn+'</i>'; if(RUN.pWeakT>0)s+='<i class="chip weak">💧 弱</i>'; if(RUN.pVulnT>0)s+='<i class="chip vuln">🎯 易伤</i>'; if(RUN.shield>0)s+='<i class="chip shield">🛡 '+RUN.shield+'</i>'; return s; }
  function checkBossPhase(e){ if(e.boss && e.phase===1 && e.hp<=e.maxHp*0.5){ e.phase=2; e.bossTurn=0; e.atk=Math.round(e.atk*1.3); e.shield=(e.shield||0)+Math.round(e.maxHp*0.12); SFX.crit(); addShake(0.55); log("👁️ 塔主·残影 进入了狂暴姿态!攻击 +30%,并获得护盾。"); pop("👁️","塔主狂暴!",e.name+" 攻击+30%,获得护盾,并将周期性横扫","warn"); floatText(e.x,e.y,"狂暴!","#ff5a5a","crit"); cellFx(e.x,e.y,"hitflash"); } }

  function makeRun(clsId){
    if(!classUnlocked(clsId)) clsId="guard";
    var c=CLASSES[clsId];
    var r={
      cls:clsId, floor:1, turn:0, x:0,y:0,
      hp:c.hp+upLevel("hp")*10, baseHp:c.hp+upLevel("hp")*10,
      atkBase:c.atk+upLevel("atk"), defBase:c.def,
      gold:upLevel("gold")*50, potions:1+upLevel("potion"),
      lvl:1, xp:0, equip:{ weapon:genBasic("weapon"), armor:genBasic("armor"), helm:null, pants:null, boots:null, accessory:null, gloves:null }, inventory:[], relics:[], kills:0, turn:1,
      boonAtk:0,boonDef:0,boonHp:0,boonRegen:0,boonCrit:0,boonThorn:false,
      shield:0, rage:0, pdot:0, pdotT:0, pBurn:0, pBurnT:0, pWeakT:0, pVulnT:0,
      echoUsed:!META.lastRun, echoMult:1+upLevel("echo")*0.5,
      cd:{}, grid:null, enemies:[], onStairs:false, over:false, log:[], shrineUsed:false, shopOpen:false, keys:0, bellActive:false, bellIds:null, portals:[]
    };
    r.maxHp=function(){ return r.baseHp+r.boonHp+(r.lvl-1)*4+relicSum("hp"); };
    return r;
  }
  function rewireRun(){ RUN.maxHp=function(){ return RUN.baseHp+RUN.boonHp+(RUN.lvl-1)*4+relicSum("hp"); }; RUN.over=false; }

  /* ---------- grid & spawn ---------- */
  function makeGrid(floor){
    var g=[],i,j;
    for(j=0;j<ROWS;j++){ var row=[]; for(i=0;i<COLS;i++){ row.push({type:(i===0||j===0||i===COLS-1||j===ROWS-1)?"wall":"floor"}); } g.push(row); }
    var obs=Math.min(2+Math.floor(floor/3),5);
    for(var k=0;k<obs;k++){ var ox=rint(1,COLS-2),oy=rint(1,ROWS-2); if(g[oy][ox].type==="floor") g[oy][ox].type="wall"; }
    var sx=rint(1,COLS-2); g[1][sx].type="stair";
    return {grid:g,sx:sx};
  }
  function freeTiles(g,px){ var out=[]; for(var j=2;j<ROWS-1;j++){ for(var i=1;i<COLS-1;i++){ if(g[j][i].type==="floor"&&Math.abs(i-px)>1) out.push({x:i,y:j}); } } return out; }
  function spawn(floor){
    var mg=makeGrid(floor), g=mg.grid, sx=mg.sx;
    RUN.grid=g; RUN.sx=sx; RUN.x=rint(1,COLS-2); RUN.y=ROWS-2;
    RUN.enemies=[]; RUN.onStairs=false; RUN.shrineUsed=false; RUN.shopOpen=false;
    var boss=(floor%BOSS_EVERY===0);
    var pool=ENEMIES.filter(function(e){return floor>=e.minFloor;}); shuffle(pool);
    // compose a varied encounter: distinct enemy types, scaled by depth; boss floors are boss-focused, not a swarm
    var n=Math.min(2+Math.floor(floor*0.8),pool.length,boss?3:7);
    var chosen=pool.slice(0,n);
    var scale=1+(floor-1)*0.12;
    for(var i=0;i<chosen.length;i++){
      var t=freeTiles(g,RUN.x); if(!t.length) break;
      var p=t[rint(0,t.length-1)];
      var e=chosen[i];
      var elite=(floor>=4&&rng()<0.16);
      var hp=Math.round(e.hp*scale*(elite?1.7:1)), atk=Math.round(e.atk*scale*(elite?1.5:1)), def=Math.round(e.def+(floor>2?1:0))+(elite?2:0);
      RUN.enemies.push({ id:Math.random().toString(36).slice(2), type:e.id, name:(elite?"精英·":"")+e.name, ico:e.ico,
        x:p.x,y:p.y, hp:hp,maxHp:hp, atk:atk, def:def, kind:e.kind, range:e.range||0, poison:e.poison, elite:elite, behavior:e.behavior,
        stun:0, dot:0, dotT:0, burn:0, burnT:0, weakT:0, vulnT:0, buffT:0, regen:0, regenT:0, shield:0, chargeT:0, intent:{type:"move"} });
    }
    if(boss){
      var bt=freeTiles(g,RUN.x); var bp=bt.length?bt[rint(0,bt.length-1)]:{x:Math.floor(COLS/2),y:2};
      var bscale=1+(floor-1)*0.18; var bhp=Math.round(70*bscale), batk=Math.round(14*bscale), bdef=Math.round(6+floor*0.4);
      RUN.enemies.push({ id:"boss"+floor, type:"boss", name:"塔主·残影", ico:"👁️", x:bp.x,y:bp.y, hp:bhp,maxHp:bhp, atk:batk, def:Math.round(bdef), kind:"melee", boss:true, behavior:"boss", phase:1, bossTurn:0,
        stun:0, dot:0, dotT:0, burn:0, burnT:0, weakT:0, vulnT:0, buffT:0, regen:0, regenT:0, shield:0, chargeT:0, intent:{type:"move"} });
    }
    RUN.enemies.forEach(computeIntent);
    var cN=1+(boss?0:Math.floor(rng()*2));
    for(var c=0;c<cN;c++){ var t=freeTiles(g,RUN.x); if(!t.length) break; var p2=t[rint(0,t.length-1)]; g[p2.y][p2.x].type="chest"; }
    // shrine & shop
    RUN.hasShrine=false; RUN.hasShop=false;
    if(rng()<0.75){ var st=freeTiles(g,RUN.x); if(st.length){ var sp=st[rint(0,st.length-1)]; g[sp.y][sp.x].type="shrine"; RUN.hasShrine=true; } }
    // shop: guaranteed every 4th floor, plus a random chance otherwise
    if((RUN.floor%4===0)||rng()<0.4){ var sh=freeTiles(g,RUN.x); if(sh.length){ var sq=sh[rint(0,sh.length-1)]; g[sq.y][sq.x].type="shop"; RUN.hasShop=true; } }
    // event node: a faceless choice, not on boss floors
    if(!boss&&rng()<0.5){ var et=freeTiles(g,RUN.x); if(et.length){ var ep=et[rint(0,et.length-1)]; g[ep.y][ep.x].type="event"; } }
    // --- rich map elements ---
    RUN.portals=[]; RUN.bellActive=false; RUN.bellIds=null;
    var hazCount=Math.min(2+Math.floor(floor/4),5);
    var haz=["spike","lava","thorns"];
    for(var h=0;h<hazCount;h++){ var ht=freeTilesAny(g); if(!ht.length) break; var hp=ht[rint(0,ht.length-1)]; g[hp.y][hp.x].type=haz[rint(0,2)]; }
    if(floor>=2&&rng()<0.5){ var ft=freeTilesAny(g); if(ft.length){ var fq=ft[rint(0,ft.length-1)]; g[fq.y][fq.x].type="campfire"; } }
    if(floor>=3&&rng()<0.5){ var wt=freeTilesAny(g); if(wt.length){ var wq=wt[rint(0,wt.length-1)]; g[wq.y][wq.x].type="well"; } }
    if(rng()<0.6){ var gt=freeTilesAny(g); if(gt.length){ var gq=gt[rint(0,gt.length-1)]; g[gq.y][gq.x].type="goldpile"; } }
    if(floor>=4&&rng()<0.4){ var ptt=freeTilesAny(g); if(ptt.length>=2){ var q1=ptt[rint(0,ptt.length-1)],q2=ptt[rint(0,ptt.length-1)]; if(!(q1.x===q2.x&&q1.y===q2.y)){ g[q1.y][q1.x].type="portal"; g[q2.y][q2.x].type="portal"; RUN.portals=[{x:q1.x,y:q1.y},{x:q2.x,y:q2.y}]; } } }
    // key pickups / locked doors (vault) / alarm bell challenge
    if(floor>=2&&rng()<0.5){ var kt=freeTilesAny(g); if(kt.length){ var kq=kt[rint(0,kt.length-1)]; g[kq.y][kq.x].type="key"; } }
    if(floor>=3&&rng()<0.5){ var lt=freeTilesAny(g); if(lt.length){ var lq=lt[rint(0,lt.length-1)]; g[lq.y][lq.x].type="lockdoor"; } }
    if(floor>=4&&!boss&&rng()<0.4){ var bt2=freeTilesAny(g); if(bt2.length){ var bq=bt2[rint(0,bt2.length-1)]; g[bq.y][bq.x].type="bell"; } }
    // breakable walls: convert a few random walls into cracked barriers
    var cr=0; for(var cy=1;cy<ROWS-1&&cr<3;cy++){ for(var cx=1;cx<COLS-1&&cr<3;cx++){ if(g[cy][cx].type==="wall"&&rng()<0.16){ g[cy][cx].type="crack"; cr++; } } }
    // mimic chance on chests
    for(var my=0;my<ROWS;my++){ for(var mx=0;mx<COLS;mx++){ if(g[my][mx].type==="chest"&&rng()<0.25){ g[my][mx].mimic=true; } } }
    // guarantee the stairs are reachable (carve a path through blockers if a softlock was generated)
    ensureStairReachable();
  }

  /* ---------- lookup ---------- */
  function tile(x,y){ return RUN.grid[y]&&RUN.grid[y][x]; }
  function enemyAt(x,y){ return RUN.enemies.find(function(e){return e.x===x&&e.y===y;}); }
  function inBounds(x,y){ return x>=0&&x<COLS&&y>=0&&y<ROWS; }
  function walkable(x,y){ return inBounds(x,y)&&tile(x,y).type!=="wall"&&tile(x,y).type!=="crack"&&tile(x,y).type!=="lockdoor"; }
  function rnd(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }
  /* seeded RNG for reproducible runs / daily challenge */
  function mulberry32(a){ return function(){ a|=0; a=a+0x6D2B79F5|0; var t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
  var runRand=null;
  function rng(){ return runRand?runRand():Math.random(); }
  function rint(a,b){ return Math.floor(rng()*(b-a+1))+a; }
  function shuffle(a){ for(var i=a.length-1;i>0;i--){ var j=Math.floor(rng()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
  function dist(a,b){ return Math.abs(a.x-b.x)+Math.abs(a.y-b.y); }
  function manh(x,y,tx,ty){ return Math.abs(x-tx)+Math.abs(y-ty); }

  /* ---------- combat helpers ---------- */
  function dealTo(e,dmg){
    var crit=Math.random()<critChance(); if(crit) dmg*=2;
    var d=Math.max(1,Math.round((dmg-e.def)*eVuln(e)));
    e.hp-=d; checkBossPhase(e);
    var ls=relicSum("lee"); if(ls>0){ var hl=Math.round(d*ls); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+hl); floatText(RUN.x,RUN.y,"+"+hl,"#7be08a"); log("吸血 +"+hl+"。"); }
    if(relicSum("poisonHit")>0){ e.dot=Math.max(e.dot||0,Math.round(pAtk()*0.25)); e.dotT=Math.max(e.dotT||0,2); }
    floatText(e.x,e.y,"-"+d,crit?"#ffd54f":"#fff",crit?"crit":"");
    log("攻击 "+e.name+",造成 "+d+(crit?"(暴击!)":"")+" 点伤害。");
    if(crit){ SFX.crit(); addShake(0.42); gridFx("critflash"); } else { SFX.hit(); addShake(0.24); }
    cellFx(e.x,e.y,"hitflash");
    return d;
  }
  function killEnemy(e){
    RUN.enemies=RUN.enemies.filter(function(x){return x!==e;});
    var gold=4+Math.floor(Math.random()*(e.boss?70:10))+Math.floor(RUN.floor*0.5);
    var xp=6+Math.floor(RUN.floor*1.5);
    RUN.gold+=gold+relicSum("goldKill"); RUN.xp+=xp; META.totalKills++; RUN.kills=(RUN.kills||0)+1;
    if(e.boss) META.bossKills++;
    if(RUN.gold>META.highGold) META.highGold=RUN.gold;
    if(e.boss){ var heal=Math.round(RUN.maxHp()*0.25); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+heal); log("击败塔主,恢复了 "+heal+" 点生命。"); }
    if(e.elite&&Math.random()<0.35){ RUN.keys=(RUN.keys||0)+1; log("🗝️ 精英掉落了一把钥匙。"); pop("🗝️","精英掉落","获得 1 把钥匙","ok"); }
    if(e.behavior==="split"&&!e.noSplit){ var s=makeMiniSlime(e); if(s){ RUN.enemies.push(s); log(e.name+" 分裂成了小史莱姆!"); } }
    log("击杀 "+e.name+"! +"+gold+" 金币, +"+xp+" 经验。");
    SFX.kill(); addShake(e.boss?0.6:0.3); cellFx(e.x,e.y,"killfx");
    gainXp(); checkBell();
  }
  function makeMiniSlime(p){ var spots=[]; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){ var x=p.x+d[0],y=p.y+d[1]; if(walkable(x,y)&&!enemyAt(x,y)) spots.push({x:x,y:y}); }); if(!spots.length) return null;
    var s=spots[Math.floor(Math.random()*spots.length)]; var hp=Math.max(3,Math.round(p.maxHp*0.4));
    return { id:"slime"+Math.random().toString(36).slice(2), type:"slime", name:"小史莱姆", ico:"🟢", x:s.x,y:s.y, hp:hp,maxHp:hp, atk:Math.max(1,Math.round(p.atk*0.6)), def:0, kind:"melee", behavior:"melee", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"}, noSplit:true }; }
  function gainXp(){
    var need=25+(RUN.lvl-1)*18;
    while(RUN.xp>=need){ RUN.xp-=need; RUN.lvl++; need=25+(RUN.lvl-1)*18; RUN.hp=Math.min(RUN.maxHp(),RUN.hp+6); SFX.levelup(); popCellSafe(RUN.x,RUN.y); log("✨ 升到 "+RUN.lvl+" 级! 攻击+1, 生命上限+4。"); pop("✨","升级!","升到 "+RUN.lvl+" 级 · 攻击+1, 生命上限+4","ok"); }
  }
  function popCellSafe(x,y){ cellFx(x,y,"pop",400); }
  function hurtPlayer(d){
    if(RUN&&Math.random()<Math.min(0.5,relicSum("dodge"))){ log("你灵巧地闪避了!"); floatText(RUN.x,RUN.y,"闪避!","#7dd7f5"); return; }
    d=Math.round(d*pVulnMul());
    if(RUN.shield>0){ var ab=Math.min(RUN.shield,d); RUN.shield-=ab; d-=ab; if(d<=0){ SFX.block(); floatText(RUN.x,RUN.y,"🛡️","#7dd7f5"); return; } }
    RUN.hp-=d; floatText(RUN.x,RUN.y,"-"+d,"#ff6b6b"); SFX.hurt(); addShake(0.32); cellFx(RUN.x,RUN.y,"shiver");
  }

  /* ---------- actions ---------- */
  function move(dx,dy){
    if(!RUN||RUN.over||RUN.onStairs) return;
    var nx=RUN.x+dx,ny=RUN.y+dy; if(!inBounds(nx,ny)) return;
    var tt=tile(nx,ny);
    if(tt&&tt.type==="crack"){ breakCrack(nx,ny); enemyPhase(); afterAction(); return; }
    if(tt&&tt.type==="lockdoor"){ if(tryUnlock(nx,ny)){ enemyPhase(); afterAction(); } return; }
    if(!walkable(nx,ny)) return;
    var e=enemyAt(nx,ny); if(e){ attackEnemy(e); return; }
    RUN.x=nx; RUN.y=ny; SFX.move();
    var t=tile(nx,ny);
    if(t.type==="chest"){ if(t.mimic) awakenMimic(nx,ny); else openChest(nx,ny); }
    else if(t.type==="event"){ tile(nx,ny).type="floor"; openEvent(); }
    else if(t.type==="stair"){ RUN.onStairs=true; }
    else if(t.type==="shrine"){ openShrine(); }
    else if(t.type==="shop"){ openShop(); }
    else if(t.type==="portal"){ doPortal(nx,ny); }
    else if(t.type==="campfire"){ openCampfire(); }
    else if(t.type==="well"){ openWell(); }
    else if(t.type==="goldpile"){ openGoldpile(); }
    else if(t.type==="key"){ pickKey(); }
    else if(t.type==="bell"){ ringBell(); }
    else if(t.type==="spike"||t.type==="lava"||t.type==="thorns"){ stepHazard(nx,ny); }
    enemyPhase(); afterAction();
  }
  function stepTo(tx,ty){ var dx=tx-RUN.x,dy=ty-RUN.y; if(Math.abs(dx)>=Math.abs(dy)) move(Math.sign(dx),0); else move(0,Math.sign(dy)); }

  /* ---------- map element helpers ---------- */
  function tileHazard(t){ if(!t) return 0;
    if(t.type==="spike") return Math.max(3,3+Math.floor(RUN.floor*0.6));
    if(t.type==="lava") return Math.max(4,4+Math.floor(RUN.floor*0.8));
    if(t.type==="thorns") return Math.max(2,2+Math.floor(RUN.floor*0.4));
    return 0; }
  function stepHazard(x,y){ var t=tile(x,y); var hz=tileHazard(t); if(hz>0){ RUN.hp-=hz; floatText(x,y,"-"+hz,"#ff9d6b","burn"); log("⚡ 你踩到"+hazName(t.type)+",受到 "+hz+" 点伤害。"); if(t.type==="spike"){ tile(x,y).type="floor"; } if(RUN.hp<=0){ die(); } } }
  function hazName(t){ return t==="spike"?"尖刺陷阱":(t==="lava"?"岩浆":(t==="thorns"?"荆棘":"险地")); }
  function freeTilesAny(g){ var out=[]; for(var j=1;j<ROWS-1;j++){ for(var i=1;i<COLS-1;i++){ if(g[j][i].type==="floor"&&!enemyAt(i,j)&&!(i===RUN.x&&j===RUN.y)) out.push({x:i,y:j}); } } return out; }
  /* connectivity guarantee: the stairs must always be reachable from the player (no softlocks) */
  function passableForPath(x,y){ var t=tile(x,y); if(!t) return false; var ty=t.type; return ty==="floor"||ty==="chest"||ty==="shrine"||ty==="shop"||ty==="event"||ty==="stair"||ty==="campfire"||ty==="well"||ty==="goldpile"||ty==="portal"||ty==="key"||ty==="bell"||ty==="spike"||ty==="lava"||ty==="thorns"; }
  function isBlocker(x,y){ var t=tile(x,y); return t&&(t.type==="wall"||t.type==="crack"||t.type==="lockdoor"); }
  function findStair(){ for(var j=0;j<ROWS;j++)for(var i=0;i<COLS;i++) if(tile(i,j)&&tile(i,j).type==="stair") return {x:i,y:j}; return null; }
  function reachSet(){ var seen={}, q=[[RUN.x,RUN.y]]; if(!inBounds(RUN.x,RUN.y)) return seen; seen[RUN.x+","+RUN.y]=true;
    while(q.length){ var c=q.shift(); [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var nx=c[0]+o[0],ny=c[1]+o[1],k=nx+","+ny; if(inBounds(nx,ny)&&!seen[k]&&passableForPath(nx,ny)){ seen[k]=true; q.push([nx,ny]); } }); } return seen; }
  function ensureStairReachable(){ var guard=0; while(guard<120){ guard++; var R=reachSet(); var st=findStair(); if(!st) return; if(R[st.x+","+st.y]) return; var best=null,bd=1e9;
    for(var y=1;y<ROWS-1;y++)for(var x=1;x<COLS-1;x++){ if(isBlocker(x,y)){ var adj=[[1,0],[-1,0],[0,1],[0,-1]].some(function(o){ return R[(x+o[0])+","+(y+o[1])]; }); if(adj){ var d=Math.abs(x-st.x)+Math.abs(y-st.y); if(d<bd){ bd=d; best=[x,y]; } } } }
    if(!best) break; tile(best[0],best[1]).type="floor"; } }
  /* floor-themed biomes: the map palette shifts with depth */
  var BIOMES=[
    { id:"dungeon", name:"地牢", min:1,  ico:"🏰", f:["oklch(29% 0.022 262)","oklch(24.5% 0.022 262)"], fa:["oklch(27% 0.02 262)","oklch(22.8% 0.02 262)"], w:["oklch(34% 0.02 262)","oklch(18% 0.02 262)","oklch(12% 0.02 262)"], acc:"oklch(42% 0.02 262)", gb:"oklch(11% 0.02 262)" },
    { id:"cave",   name:"洞窟", min:6,  ico:"🪨", f:["oklch(28% 0.05 170)","oklch(22% 0.05 172)"], fa:["oklch(25% 0.04 172)","oklch(20% 0.04 172)"], w:["oklch(31% 0.06 165)","oklch(16% 0.05 168)","oklch(10% 0.04 170)"], acc:"oklch(40% 0.07 165)", gb:"oklch(9% 0.04 174)" },
    { id:"lava",   name:"熔岩", min:11, ico:"🌋", f:["oklch(27% 0.06 40)","oklch(20% 0.07 36)"], fa:["oklch(24% 0.06 38)","oklch(18% 0.06 34)"], w:["oklch(30% 0.09 28)","oklch(15% 0.07 26)","oklch(9% 0.06 24)"], acc:"oklch(46% 0.11 32)", gb:"oklch(10% 0.06 28)" },
    { id:"throne", name:"王座", min:17, ico:"👑", f:["oklch(26% 0.05 300)","oklch(21% 0.06 300)"], fa:["oklch(24% 0.05 300)","oklch(19% 0.05 300)"], w:["oklch(30% 0.07 300)","oklch(15% 0.05 300)","oklch(10% 0.04 300)"], acc:"oklch(56% 0.13 285)", gb:"oklch(10% 0.05 300)" }
  ];
  function biome(floor){ floor=floor||1; for(var i=BIOMES.length-1;i>=0;i--){ if(floor>=BIOMES[i].min) return BIOMES[i]; } return BIOMES[0]; }
  function applyBiome(){ var b=biome(RUN.floor||1); var g=el("grid"); if(!g) return;
    g.style.setProperty("--f1",b.f[0]); g.style.setProperty("--f2",b.f[1]); g.style.setProperty("--fa1",b.fa[0]); g.style.setProperty("--fa2",b.fa[1]);
    g.style.setProperty("--w1",b.w[0]); g.style.setProperty("--w2",b.w[1]); g.style.setProperty("--w3",b.w[2]); g.style.setProperty("--acc",b.acc);
    var gw=el("gridwrap"); if(gw) gw.style.setProperty("--gb",b.gb); }
  function pickKey(){ var t=tile(RUN.x,RUN.y); t.type="floor"; RUN.keys=(RUN.keys||0)+1; SFX.pickup(); log("🗝️ 拾起一把钥匙(共 "+RUN.keys+" 把)。"); pop("🗝️","钥匙","获得 1 把钥匙","ok"); floatText(RUN.x,RUN.y,"+🗝️","#ffd54f"); }
  function tryUnlock(x,y){ var t=tile(x,y); if(RUN.keys>0){ RUN.keys--; t.type="floor"; SFX.stairs(); addShake(0.1); log("🗝️ 你用钥匙打开了封锁的大门。"); pop("🗝️","锁门开启","消耗 1 把钥匙","ok"); var roll=rng(); if(roll<0.4){ var g2=rnd(60,140)+Math.floor(RUN.floor*6); RUN.gold+=g2; pop("🗝️","门后宝藏","发现 +"+g2+" 金币","gold"); } else { var slot=["weapon","helm","armor","pants","boots","accessory","gloves"][rint(0,6)]; var it=genEquip(slot,RUN.floor); if(addToInv(it)){ popEq(it,"锁门宝藏"); } else { RUN.gold+=80; pop("🗝️","背包已满","转为 +80 金币","warn"); } } return true; } log("🔒 大门紧锁,需要一把钥匙。"); pop("🗝️","锁门","需要 1 把钥匙","warn"); return false; }
  function ringBell(){ var t=tile(RUN.x,RUN.y); t.type="floor"; SFX.roar(); addShake(0.2); var base=ENEMIES.filter(function(e){return RUN.floor>=e.minFloor;}); shuffle(base);
    var n=Math.min(3,1+Math.floor(RUN.floor/6),base.length); var ids=[]; var scale=1+(RUN.floor-1)*0.15;
    for(var i=0;i<n;i++){ var tp=freeTilesAny(RUN.grid); if(!tp.length) break; var p=tp[rint(0,tp.length-1)]; var et=base[i]; var hp=Math.round(et.hp*scale*1.8),atk=Math.round(et.atk*scale*1.6),def=Math.round(et.def+RUN.floor*0.4+2);
      var id=Math.random().toString(36).slice(2); ids.push(id); RUN.enemies.push({ id:id, type:et.id, name:"精英·"+et.name, ico:et.ico, x:p.x,y:p.y, hp:hp,maxHp:hp, atk:atk, def:def, kind:et.kind, range:et.range||0, poison:et.poison, elite:true, behavior:et.behavior, stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} }); }
    RUN.enemies.forEach(computeIntent); RUN.bellIds=ids; RUN.bellActive=true;
    log("🔔 你敲响警钟,精英怪自阴影中现身!全部击败可领奖励。"); pop("🔔","挑战房","警钟长鸣,引来 "+n+" 只精英!击败领奖","bad"); }
  function checkBell(){ if(!RUN.bellActive||!RUN.bellIds) return; var alive=RUN.bellIds.filter(function(id){ var e=RUN.enemies.find(function(z){return z.id===id;}); return e&&e.hp>0; }); if(alive.length===0){ RUN.bellActive=false; RUN.bellIds=null; rewardChallenge(); } }
  function rewardChallenge(){ var gold=120+RUN.floor*12; RUN.gold+=gold; SFX.relic(); addShake(0.15); log("🏆 挑战完成!+"+gold+" 金币与丰厚奖励。"); pop("🏆","挑战完成","精英已清除,获得 +"+gold+" 金币与战利品!","epic");
    if(rng()<0.5){ var rel=RELICS[rint(0,RELICS.length-1)]; applyRelic(rel); } else { var slot=["weapon","helm","armor","pants","boots","accessory","gloves"][rint(0,6)]; var it=genEquip(slot,RUN.floor+2); it.rarity=Math.max(0,Math.min(it.rarity,it.tier>=5?4:it.rarity)); if(addToInv(it)){ popEq(it,"挑战战利品"); } else { RUN.gold+=100; } } }
  function openCampfire(){ var t=tile(RUN.x,RUN.y); t.type="floor"; var heal=Math.round(RUN.maxHp()*0.4); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+heal); RUN.pdotT=0; RUN.pBurnT=0; SFX.heal(); log("🔥 篝火温暖明亮:恢复 "+heal+" 生命,并净化中毒/灼烧。"); pop("🔥","篝火","恢复 "+heal+" 生命,净化负面状态。","ok"); floatText(RUN.x,RUN.y,"+"+heal,"#7be08a","heal"); }
  function openWell(){ var t=tile(RUN.x,RUN.y); var cost=50; if(RUN.gold<cost){ log("许愿井要 "+cost+" 金币,你只有 "+RUN.gold+"。"); pop("⛲","许愿井","需要 "+cost+" 金币再许愿。","warn"); return; } t.type="floor"; RUN.gold-=cost; var r=Math.random(); SFX.relic(); addShake(0.1);
    var rewards=[ {ico:"❤️",txt:"生命上限 +12",fn:function(){RUN.boonHp+=12;RUN.hp+=12;}}, {ico:"⚔️",txt:"攻击 +2",fn:function(){RUN.boonAtk+=2;}}, {ico:"🛡️",txt:"防御 +2",fn:function(){RUN.boonDef+=2;}}, {ico:"💥",txt:"暴击率 +3%",fn:function(){RUN.boonCrit+=0.03;}}, {ico:"🪙",txt:"金币 +160",fn:function(){RUN.gold+=160;}}, {ico:"🫙",txt:"药水 +2",fn:function(){RUN.potions+=2;}} ];
    var rw=rewards[Math.floor(Math.random()*rewards.length)]; rw.fn(); log("⛲ 许愿井回应了你:"+rw.txt+"。"); pop(rw.ico,"许愿井",rw.txt,"ok"); floatText(RUN.x,RUN.y,"✦"+rw.txt,"#a5d8ff","crit"); }
  function openGoldpile(){ var t=tile(RUN.x,RUN.y); t.type="floor"; var gold=rnd(40,120)+Math.floor(RUN.floor*5); RUN.gold+=gold; SFX.pickup(); log("💰 金币堆: +"+gold+" 金币。"); pop("💰","金币堆","+"+gold+" 金币","gold"); floatText(RUN.x,RUN.y,"+"+gold,"#ffd54f"); }
  function doPortal(x,y){ var ps=RUN.portals; if(!ps||ps.length<2) return; var cur={x:x,y:y}; var other=null;
    for(var i=0;i<ps.length;i++){ if(!(ps[i].x===cur.x&&ps[i].y===cur.y)){ other=ps[i]; break; } }
    if(!other){ return; } RUN.x=other.x; RUN.y=other.y; SFX.shift(); addShake(0.1); var m=Math.round(RUN.maxHp()*0.06); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+m); log("🌀 传送门带你穿越空间,恢复 "+m+" 点生命。"); pop("🌀","传送门","空间跃迁,恢复 "+m+" 生命。","magic"); floatText(RUN.x,RUN.y,"✦","#c9a5ff","crit"); }
  function breakCrack(x,y){ var t=tile(x,y); t.type="floor"; SFX.hit(); addShake(0.1); log("🧱 你用武器敲碎了残破墙体。"); pop("🧱","残破墙","墙体碎裂,道路打通!","warn"); if(rng()<0.4){ var g=rnd(20,60); RUN.gold+=g; pop("🧱","墙后藏金","发现 +"+g+" 金币","gold"); }
    if(rng()<0.18){ var slot=["weapon","helm","armor","pants","boots","accessory","gloves"][rint(0,6)]; var it=genEquip(slot,RUN.floor); if(addToInv(it)){ popEq(it,"墙后密室"); } else { RUN.gold+=40; pop("🧱","背包已满","转为 +40 金币","warn"); } } }
  function awakenMimic(x,y){ var t=tile(x,y); t.type="floor"; SFX.roar(); addShake(0.2); var scale=1+(RUN.floor-1)*0.14; var hp=Math.round(48*scale),atk=Math.round(11*scale),def=Math.round(2+RUN.floor*0.5); var e={ id:Math.random().toString(36).slice(2), type:"mimic", name:"宝箱怪", ico:"👅", x:x,y:y, hp:hp,maxHp:hp, atk:atk, def:def, kind:"melee", elite:false, behavior:"melee", stun:0, dot:0, dotT:0, burn:0, burnT:0, weakT:0, vulnT:0, buffT:0, regen:0, regenT:0, shield:0, chargeT:0, intent:{type:"move"} }; RUN.enemies.push(e); computeIntent(e); log("👅 宝箱突然张开大嘴——是宝箱怪!HP "+hp); pop("👅","宝箱怪","宝箱变成了怪物,小心!","bad"); }
  function attackEnemy(e){
    if(!RUN||RUN.over||RUN.onStairs) return;
    dealTo(e,pAtk()+rnd(0,2));
    if(e.hp<=0) killEnemy(e);
    enemyPhase(); afterAction();
  }
  function attackAdjacent(){
    if(!RUN||RUN.onStairs||RUN.over) return;
    var adj=RUN.enemies.filter(function(e){return manh(e.x,e.y,RUN.x,RUN.y)===1;});
    if(adj.length) attackEnemy(adj[0]); else { log("身边没有敌人。"); render(); }
  }

  /* skill implementations */
  function useSkill(id){
    if(!RUN||RUN.onStairs||RUN.over) return;
    var sk=SKILLS.find(function(x){return x.id===id;}); if(!sk) return;
    if((RUN.cd[id]||0)>0){ return; }
    sk.use();
  }
  function healSkill(){ RUN.hp=Math.min(RUN.maxHp(),RUN.hp+Math.round(RUN.maxHp()*0.35)); floatText(RUN.x,RUN.y,"+"+Math.round(RUN.maxHp()*0.35),"#7be08a","heal"); log("✨ 圣光恢复 35% 生命。"); endSkill("guard_heal"); }
  function barrierSkill(){ var s=Math.round(RUN.maxHp()*0.2); RUN.shield+=s; log("🧱 铜墙铁壁,获得 "+s+" 护盾。"); SFX.block(); endSkill("guard_barrier"); enemyPhase(); afterAction(); }
  function stormSkill(){ if(!RUN.enemies.length) return; var t=0; RUN.enemies.slice().forEach(function(e){ var d=Math.max(1,Math.round(pAtk()*0.6*eVuln(e))-e.def); e.hp-=d; checkBossPhase(e); floatText(e.x,e.y,"-"+d,"#9aa8ff"); t+=d; if(e.hp<=0) killEnemy(e); else if(relicSum("poisonHit")>0){ e.dot=Math.max(e.dot||0,Math.round(pAtk()*0.25)); e.dotT=Math.max(e.dotT||0,2); } }); log("🌀 奥术风暴席卷全场,共造成 "+t+" 伤害。"); SFX.crit(); addShake(0.4); endSkill("mage_storm"); enemyPhase(); afterAction(); }
  function stunSkill(){ var e=enemyAt(RUN.x+1,RUN.y)||enemyAt(RUN.x-1,RUN.y)||enemyAt(RUN.x,RUN.y+1)||enemyAt(RUN.x,RUN.y-1); if(!e){ log("盾击落空,身边无敌人。"); return; } var d=pAtk()+rnd(0,2)-e.def; e.hp-=d; e.stun=1; floatText(e.x,e.y,"-"+d,"#fff"); log("盾击命中 "+e.name+",眩晕 1 回合。"); if(e.hp<=0) killEnemy(e); endSkill("guard_stun"); enemyPhase(); afterAction(); }
  function multiSkill(){ var sorted=RUN.enemies.slice().sort(function(a,b){return manh(a.x,a.y,RUN.x,RUN.y)-manh(b.x,b.y,RUN.x,RUN.y);}).slice(0,2); if(!sorted.length) return; var t=0; sorted.forEach(function(e){ t+=dealTo(e,Math.round(pAtk()*0.6)+rnd(0,1)); if(e.hp<=0) killEnemy(e); }); log("连射命中 "+sorted.length+" 名敌人。"); endSkill("ranger_multi"); enemyPhase(); afterAction(); }
  function blinkSkill(){ var frees=[]; for(var y=1;y<ROWS-1;y++){for(var x=1;x<COLS-1;x++){ if(walkable(x,y)&&!enemyAt(x,y)&&(Math.abs(x-RUN.x)>2||Math.abs(y-RUN.y)>2)) frees.push({x:x,y:y}); }} if(!frees.length) return; var p=frees[Math.floor(Math.random()*frees.length)]; RUN.x=p.x; RUN.y=p.y; log("💨 你瞬移到 "+p.x+","+p.y+"。"); endSkill("ranger_blink"); enemyPhase(); afterAction(); }
  function leechSkill(){ var e=enemyAt(RUN.x+1,RUN.y)||enemyAt(RUN.x-1,RUN.y)||enemyAt(RUN.x,RUN.y+1)||enemyAt(RUN.x,RUN.y-1); if(!e) return; var d=pAtk()+rnd(0,2)-e.def; e.hp-=d; var h=Math.round(d*0.4); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+h); floatText(e.x,e.y,"-"+d,"#ff8fa3"); log("嗜血造成 "+d+",吸取 "+h+" 生命。"); if(e.hp<=0) killEnemy(e); endSkill("berserk_leech"); enemyPhase(); afterAction(); }
  function rageSkill(){ RUN.rage=3; log("🤬 狂暴: 3 回合内攻击 +3。"); endSkill("berserk_rage"); enemyPhase(); afterAction(); }
  function fireballSkill(){ if(!RUN.enemies.length) return; var e=RUN.enemies.slice().sort(function(a,b){return manh(b.x,b.y,RUN.x,RUN.y)-manh(a.x,a.y,RUN.x,RUN.y);})[0]; var d=Math.round(pAtk()*1.4)+rnd(0,2)-e.def; e.hp-=d; checkBossPhase(e); floatText(e.x,e.y,"-"+d,"#ff9d6b"); e.burn=Math.max(e.burn||0,Math.round(pAtk()*0.4*(1+relicSum("burnDmg")))); e.burnT=2; log("🔥 火球命中远程的 "+e.name+",造成 "+d+",并点燃(灼烧 "+e.burn+"/2回合)。"); if(e.hp<=0) killEnemy(e); endSkill("mage_fireball"); enemyPhase(); afterAction(); }
  function frostSkill(){ var adj=RUN.enemies.filter(function(e){return manh(e.x,e.y,RUN.x,RUN.y)===1;}); if(!adj.length) return; var t=0; adj.forEach(function(e){ var d=Math.round(pAtk()*0.5)+rnd(0,1)-e.def; e.hp-=d; e.stun=1; e.vulnT=2; t+=d; floatText(e.x,e.y,"-"+d,"#7dd7f5","freeze"); if(e.hp<=0) killEnemy(e); }); log("❄️ 冰霜冻结 "+adj.length+" 名敌人("+t+" 伤害,易伤2回合)。"); endSkill("mage_frost"); enemyPhase(); afterAction(); }
  function endSkill(id){ var sk=SKILLS.find(function(x){return x.id===id;}); if(!sk) return; RUN.cd[id]=Math.max(0,Math.round(sk.cd*(1-relicSum("cdr")))); }

  function usePotion(){
    if(!RUN||RUN.onStairs||RUN.over) return;
    if(RUN.potions<=0){ return; }
    RUN.potions--; RUN.potionsUsed=(RUN.potionsUsed||0)+1;
    RUN.hp=Math.min(RUN.maxHp(),RUN.hp+Math.round(RUN.maxHp()*0.4));
    SFX.potion(); floatText(RUN.x,RUN.y,"+"+Math.round(RUN.maxHp()*0.4),"#7be08a","heal");
    log("喝下药水,恢复生命。"); pop("🧪","喝下药水","恢复 "+Math.round(RUN.maxHp()*0.4)+" 点生命","ok"); render();
  }
  function useEcho(){
    if(!RUN||RUN.onStairs||RUN.over||RUN.echoUsed) return;
    RUN.echoUsed=true; META.echoUses++; SFX.echo(); addShake(0.3);
    var mult=RUN.echoMult;
    var adj=RUN.enemies.filter(function(e){return manh(e.x,e.y,RUN.x,RUN.y)===1;});
    if(adj.length){ var total=0; adj.forEach(function(e){ var d=Math.max(1,Math.round(pAtk()*3*mult)-e.def); e.hp-=d; total+=d; if(e.hp<=0) killEnemy(e); }); log("🫥 前世的你挥出残影,重创 "+total+" 点! "); pop("🫥","回响·残影","对周围敌人造成 "+total+" 点伤害","epic"); enemyPhase(); }
    else { var heal=Math.round(RUN.maxHp()*0.33*mult); RUN.hp=Math.min(RUN.maxHp(),RUN.hp+heal); log("🫥 前世的你现身,献上 "+heal+" 点生命。"); pop("🫥","回响·庇护","恢复 "+heal+" 点生命","ok"); }
    render(); saveMeta();
  }
  function waitTurn(){ if(!RUN||RUN.onStairs||RUN.over) return; enemyPhase(); afterAction(); }

  /* ---------- enemy phase ---------- */
  function enemyPhase(){
    RUN.turn++;
    // player statuses tick
    if(RUN.pdotT>0){ var pd=pAtkDot(); RUN.hp-=pd; floatText(RUN.x,RUN.y,"-"+pd,"#8bd450","poison"); log("你中毒,受到 "+pd+" 伤害。"); RUN.pdotT--; }
    if(RUN.pBurnT>0){ RUN.hp-=RUN.pBurn; floatText(RUN.x,RUN.y,"-"+RUN.pBurn,"#ff9d6b","burn"); log("🔥 灼烧让你受 "+RUN.pBurn+" 伤。"); RUN.pBurnT--; }
    // standing-hazard tick (lava / thorns burn while you stay)
    var phz=tileHazard(tile(RUN.x,RUN.y)); if(phz>0&&(RUN.x>=0&&RUN.y>=0)){ RUN.hp-=phz; floatText(RUN.x,RUN.y,"-"+phz,"#ff9d6b","burn"); log("🌋 你站在"+hazName(tile(RUN.x,RUN.y).type)+"上,受到 "+phz+" 伤害。"); }
    if(RUN.rage>0) RUN.rage--;
    if(RUN.pWeakT>0) RUN.pWeakT--;
    if(RUN.pVulnT>0) RUN.pVulnT--;
    // enemy statuses tick (dots/regen/durations)
    RUN.enemies.slice().forEach(function(e){
      if(e.hp<=0) return;
      var dt=eDotSum(e); if(dt>0){ e.hp-=dt; floatText(e.x,e.y,"-"+dt,"#8bd450","poison"); checkBossPhase(e); if(e.hp<=0){ killEnemy(e); return; } }
      if(e.dotT>0)e.dotT--; if(e.burnT>0)e.burnT--; if(e.vulnT>0)e.vulnT--; if(e.weakT>0)e.weakT--; if((e.buffT||0)>0)e.buffT--;
      if((e.regenT||0)>0){ e.hp=Math.min(e.maxHp,e.hp+e.regen); floatText(e.x,e.y,"+"+e.regen,"#7be08a","heal"); }
    });
    // execute intents (decided last turn)
    RUN.enemies.slice().forEach(function(e){
      if(e.hp<=0) return;
      if(e.stun>0){ log(e.name+" 被眩晕,无法行动。"); e.stun--; return; }
      executeIntent(e);
    });
    // enemies standing on hazards take damage
    RUN.enemies.slice().forEach(function(e){
      if(e.hp<=0) return;
      var ehz=tileHazard(tile(e.x,e.y)); if(ehz>0){ e.hp-=ehz; floatText(e.x,e.y,"-"+ehz,"#ff9d6b","burn"); log(e.name+" 遭"+hazName(tile(e.x,e.y).type)+"灼伤,受 "+ehz+" 伤。"); checkBossPhase(e); if(e.hp<=0){ killEnemy(e); } }
    });
    // decide next turn's intents for display
    RUN.enemies.forEach(computeIntent);
    if(RUN.hp<=0){ die(); }
  }
  function computeIntent(e){
    if(e.hp<=0){ e.intent={type:"dead"}; return; }
    if(e.stun>0){ e.intent={type:"stun"}; return; }
    var d=manh(e.x,e.y,RUN.x,RUN.y);
    var beh=e.behavior||"melee";
    if(e.boss){
      e.bossTurn=(e.bossTurn||0)+1;
      if(e.phase===2 && e.bossTurn%3===0){ e.intent={type:"sweep"}; return; }
      e.intent=(d<=1?{type:"attack"}:{type:"move"}); return;
    }
    if((e.chargeT||0)>0){ e.intent={type:"strike"}; return; }
    if(beh==="charge"){ if(d>4){ e.intent={type:"move"}; return; } if(d>1){ e.chargeT=1; e.intent={type:"charge"}; return; } e.intent={type:"attack"}; return; }
    if(beh==="archer"){ if(d<=1){ e.intent={type:"retreat"}; } else if(d<=e.range){ e.intent={type:"shoot"}; } else e.intent={type:"move"}; return; }
    if(beh==="shaman"){ if(e.hp<e.maxHp*0.5){ e.intent={type:"heal"}; } else e.intent={type:"buff"}; return; }
    if(beh==="regen"){ if(e.hp<e.maxHp*0.5){ e.intent={type:"heal"}; } else e.intent=(d<=1?{type:"attack"}:{type:"move"}); return; }
    if(beh==="defend"){ if(rng()<0.4){ e.intent={type:"defend"}; } else e.intent=(d<=1?{type:"attack"}:{type:"move"}); return; }
    if(e.kind==="ranged"){ e.intent=(d<=e.range?{type:"shoot"}:{type:"move"}); }
    else e.intent=(d<=1?{type:"attack"}:{type:"move"});
  }
  function executeIntent(e){
    var it=e.intent||{type:"move"}; var d=manh(e.x,e.y,RUN.x,RUN.y);
    if(it.type==="stun"){ return; }
    if(it.type==="charge"){ log(e.name+" 正在蓄力,准备重击!"); return; }
    if(it.type==="strike"){ var dmg=Math.round(eAtk(e)*1.9); if(e.kind==="ranged"){ if(d<=e.range) hurtPlayer(dmg); else moveEnemy(e); }
      else { if(d===1) hurtPlayer(dmg);
        else if(d<=3){ var cand=[]; [[1,0],[-1,0],[0,1],[0,-1]].forEach(function(o){ var t=e.x+o[0],u=e.y+o[1]; if(t===RUN.x&&u===RUN.y){ cand.push({x:t,y:u,p:true}); } else if(walkable(t,u)&&!enemyAt(t,u)) cand.push({x:t,y:u}); }); if(cand.length){ var hit=cand.filter(function(c){return c.p;}); var n=hit.length?hit[0]:cand[Math.floor(Math.random()*cand.length)]; if(!(n.x===RUN.x&&n.y===RUN.y)){ e.x=n.x; e.y=n.y; } hurtPlayer(dmg); } else moveEnemy(e); }
        else moveEnemy(e); }
      e.chargeT=0; return; }
    if(it.type==="attack"){ hurtPlayerMelee(e); return; }
    if(it.type==="sweep"){ var sd=Math.round(eAtk(e)*1.7); if(manh(e.x,e.y,RUN.x,RUN.y)<=2){ hurtPlayer(sd); log(e.name+" 横扫命中你,造成 "+sd+" 伤害!"); } else log(e.name+" 横扫呼啸而过,你躲开了!"); e.chargeT=0; return; }
    if(it.type==="shoot"){ hurtPlayerRanged(e); return; }
    if(it.type==="move"){ moveEnemy(e); return; }
    if(it.type==="retreat"){ moveEnemy(e,true); return; }
    if(it.type==="defend"){ var s=Math.max(2,Math.round(e.maxHp*0.12)); e.shield=(e.shield||0)+s; log(e.name+" 举起盾牌防御 (+"+s+" 盾)。"); return; }
    if(it.type==="heal"){ var h=Math.round(e.maxHp*0.25); e.hp=Math.min(e.maxHp,e.hp+h); floatText(e.x,e.y,"+"+h,"#7be08a","heal"); log(e.name+" 治疗了 "+h+" 点生命。"); return; }
    if(it.type==="buff"){ RUN.enemies.forEach(function(o){ if(o!==e&&manh(o.x,o.y,e.x,e.y)<=2){ o.buffT=(o.buffT||0)+2; } }); log(e.name+" 鼓舞了附近的同伴 (攻击提升)。"); return; }
    moveEnemy(e);
  }
  function pAtkDot(){ return 3; }
  function thornDmg(){ return (RUN.boonThorn?3:0)+relicSum("thorns"); }
  function hurtPlayerMelee(e){ var d=Math.max(1,Math.round(eAtk(e)+rnd(0,2)-pDef())); var td=thornDmg(); if(td>0){ e.hp-=td; if(e.hp<=0) killEnemy(e); } hurtPlayer(d); log(e.name+" 攻击你,造成 "+d+" 伤害。");
    if(e.poison&&Math.random()<0.3){ RUN.pdot+=3; RUN.pdotT+=3; log(e.name+" 让你中毒了。"); } }
  function hurtPlayerRanged(e){ var d=Math.max(1,Math.round(eAtk(e)+rnd(0,2)-pDef())); var td=thornDmg(); if(td>0){ e.hp-=td; if(e.hp<=0) killEnemy(e); } hurtPlayer(d); log(e.name+" 射出箭矢,命中 "+d+" 伤害。"); }
  function moveEnemy(e,away){
    var vx=RUN.x>e.x?1:(RUN.x<e.x?-1:0), vy=RUN.y>e.y?1:(RUN.y<e.y?-1:0);
    if(away){ vx=-vx; vy=-vy; }
    var order=Math.random()<0.5?[[vx,0],[0,vy]]:[[0,vy],[vx,0]];
    for(var i=0;i<2;i++){ var dx=order[i][0],dy=order[i][1],tx=e.x+dx,ty=e.y+dy;
      if(tx===RUN.x&&ty===RUN.y){ break; }
      if(walkable(tx,ty)&&!enemyAt(tx,ty)){ e.x=tx; e.y=ty; break; } }
  }

  /* ---------- events ---------- */
  function openChest(x,y){
    tile(x,y).type="floor"; SFX.pickup();
    var roll=rng();
    if(roll<0.30){ var gold=rnd(30,80)+Math.floor(RUN.floor*6); RUN.gold+=gold; log("宝箱: +"+gold+" 金币。"); pop("🪙","获得金币","+"+gold+" 金币","gold"); floatText(x,y,"+"+gold,"#ffd54f"); }
    else if(roll<0.48){ RUN.potions++; log("宝箱: 药水 +1。"); pop("🧪","获得药水","药水 +1(共 "+RUN.potions+" 瓶)","ok"); floatText(x,y,"+🧪","#8bd450"); }
    else if(roll<0.58){ RUN.keys=(RUN.keys||0)+1; log("宝箱: 钥匙 +1(共 "+RUN.keys+" 把)。"); pop("🗝️","获得钥匙","钥匙 +1","ok"); floatText(x,y,"+🗝️","#ffd54f"); }
    else if(roll<0.74){ var slot=["weapon","helm","armor","pants","boots","accessory","gloves"][rint(0,6)]; var it=genEquip(slot,RUN.floor); if(addToInv(it)){ log("宝箱: 获得 "+rarName(it.rarity)+"「"+it.ico+" "+it.name+"」 "+eqDesc(it)+"。"); popEq(it,"宝箱开出装备"); floatText(x,y,"🎁 "+it.ico,"#ffd54f"); } else { RUN.gold+=40; log("背包已满,宝箱化为 +40 金币。"); pop("🎁","背包已满","宝箱化为 +40 金币","warn"); } }
    else if(roll<0.88){ var slot2=["weapon","helm","armor","pants","boots","accessory","gloves"][rint(0,6)]; var it2=genEquip(slot2,RUN.floor); if(addToInv(it2)){ log("宝箱: 获得 "+rarName(it2.rarity)+"「"+it2.ico+" "+it2.name+"」 "+eqDesc(it2)+"。"); popEq(it2,"宝箱开出装备"); floatText(x,y,"🎁 "+it2.ico,"#ffd54f"); } else { RUN.gold+=50; log("背包已满,宝箱转为 +50 金币。"); pop("🎁","背包已满","宝箱转为 +50 金币","warn"); } }
    else { var rel=RELICS[rint(0,RELICS.length-1)]; applyRelic(rel); SFX.relic(); addShake(0.2); log("圣物: "+rel.ico+" "+rel.name+" —— "+rel.desc+"。"); floatText(x,y,"✦"+rel.name,"#c9a5ff","crit"); }
  }
  function rarPick(floor){ floor=floor||RUN.floor||1;
    var maxK=0; if(floor>=3)maxK=1; if(floor>=5)maxK=2; if(floor>=7)maxK=3; if(floor>=10)maxK=4; if(floor>=14)maxK=5;
    var p=[0.42,0.24,0.18,0.10,0.045,0.015]; var sum=0,i; for(i=0;i<=maxK;i++) sum+=p[i];
    var r=rng()*sum, acc=0; for(i=0;i<=maxK;i++){ acc+=p[i]; if(r<acc) return i; } return maxK;
  }
  function rarName(k){ return RARITIES.filter(function(x){return x.k===k;})[0].label; }
  function openShrine(){
    if(RUN.shrineUsed){ log("这座祭坛已经回应过你了。"); return; }
    RUN.shrineUsed=true;
    var rewards=[
      {ico:"❤️",txt:"恢复 50% 生命",fn:function(){ RUN.hp=Math.min(RUN.maxHp(),RUN.hp+Math.round(RUN.maxHp()*0.5)); }},
      {ico:"⚔️",txt:"攻击 +2",fn:function(){ RUN.boonAtk+=2; }},
      {ico:"🧱",txt:"生命上限 +10",fn:function(){ RUN.boonHp+=10; RUN.hp+=10; }},
      {ico:"⛰️",txt:"防御 +2",fn:function(){ RUN.boonDef+=2; }},
      {ico:"🪙",txt:"100 金币",fn:function(){ RUN.gold+=100; }}
    ];
    var r=rewards[Math.floor(Math.random()*rewards.length)];
    r.fn(); SFX.shrine(); addShake(0.15); log("⛩️ 祭坛赐福: "+r.txt+"。"); pop(r.ico,"祭坛赐福",r.txt,"ok"); floatText(RUN.x,RUN.y,"✦"+r.txt,"#7dd7f5","crit");
    render();
  }
  var shopItems=null;
  function openShop(){
    if(RUN.shopOpen) return; RUN.shopOpen=true; SFX.shop();
    renderShop(); showOvl("eventScreen");
  }
  function renderShop(){
    var slots=["weapon","helm","armor","pants","boots","accessory","gloves"];
    var used={}, offers=[]; var guard=0;
    while(offers.length<3 && guard<40){ guard++; var s=slots[rint(0,slots.length-1)]; if(used[s]) continue; used[s]=1; offers.push({slot:s,it:genEquip(s,RUN.floor)}); }
    shopItems=[];
    shopItems.push({ key:"potion",cost:60,row:shopRow("🧪","药水","一次性,回复 30 生命","💼 已持有 "+RUN.potions+" 瓶",true,"potion",60),buy:function(){ RUN.potions++; log("买下药水。"); pop("🧪","购买药水","药水 +1(共 "+RUN.potions+" 瓶)","ok"); } });
    offers.forEach(function(o){ var it=o.it, price=Math.round((40+it.tier*20)*(1+it.rarity*0.6)+it.base*8);
      var slotName=(EQUIP_SLOTS.find(function(x){return x.cat===it.slot;})||{}).name||it.slot;
      shopItems.push({ key:it.uid, cost:price, row:shopRow(spr("eq_"+it.slot,it.ico),slotName+"「"+it.name+"」",eqDesc(it)+" "+affChips(it),"🎒 购入后放入背包",true,it.uid,price),
        buy:function(){ if(RUN.inventory.length>=100){ log("背包已满,无法购买!"); pop("🎒","背包已满","无法再放入装备","warn"); } else { RUN.inventory.push(it); log("购入 "+rarName(it.rarity)+"「"+it.name+"」,背包 "+RUN.inventory.length+"/100。"); popEq(it,"购入装备"); } } });
    });
    shopItems.push({ key:"relic",cost:220,row:shopRow("💍","随机圣物","可能开出吸血/淬毒/冷却/暴击/护盾等增益","🎁 未知惊喜",true,"relic",220),buy:function(){ var rel=RELICS[Math.floor(Math.random()*RELICS.length)]; applyRelic(rel); log("获得圣物 "+rel.name+" —— "+rel.desc+"。"); } });
    var box=el("eventPanel");
    var html='<h2>🛒 流浪商人</h2><p class="lead">金币难捂热,他看得很准。购入的装备会放入背包。</p><div class="list">';
    shopItems.forEach(function(it){ html+=it.row; });
    var sellables=inventorySellables();
    html+='</div><h3 style="margin:var(--space-3) 0 var(--space-1)">💰 置换·出售旧装备</h3><div class="list">';
    if(!sellables.length) html+='<div class="shopitem"><div class="n">暂无装备可卖</div></div>';
    else sellables.forEach(function(it){ var p=sellPrice(it); html+='<div class="shopitem"><div style="flex:1;min-width:0"><span class="n">'+spr("eq_"+it.slot,it.ico)+' '+it.name+'</span><div class="d">'+eqDesc(it)+'</div></div><button class="btn" data-sale="'+it.uid+'">卖 '+p+' 🪙</button></div>'; });
    html+='</div><p class="small muted" style="margin-top:var(--space-2)">💰 持有 '+RUN.gold+' 🪙 · 🎒 背包 '+RUN.inventory.length+'/100</p>';
    html+='<div style="margin-top:var(--space-3);text-align:center"><button id="eventClose" class="btn">离开</button></div>';
    box.innerHTML=html;
    box.onclick=function(e){
      var close=e.target.closest("#eventClose"); if(close){ closeEvent(); return; }
      var s=e.target.closest("button[data-sale]");
      if(s){ var ref=findSellable(s.getAttribute("data-sale")); if(ref){ removeFromInv(ref); var p=sellPrice(ref.item); RUN.gold+=p; log("卖出「"+ref.item.name+"」+"+p+" 金币"+(ref.src==="equip"?"(已卸下)":"")+"。"); SFX.buy(); render(); renderShop(); } return; }
      var b=e.target.closest("button[data-buy]");
      if(!b) return;
      var it=shopItems.find(function(x){return x.key===b.getAttribute("data-buy");});
      if(!it||RUN.gold<it.cost) return;
      RUN.gold-=it.cost; it.buy(); SFX.buy(); render(); renderShop();
    };
  }
  function shopRow(ico,name,detail,line,up,key,cost){ return '<div class="shopitem"><div style="flex:1;min-width:0"><span class="n">'+ico+' '+name+'</span><div class="d">'+detail+'</div><div class="xs '+(up?'ok':'faint')+'">'+line+'</div></div><button class="btn btn-primary" data-buy="'+key+'" '+(RUN.gold<cost?'disabled':'')+'>'+cost+' 🪙</button></div>'; }
  function affChips(it){ if(!it||!it.aff||!it.aff.length) return ""; var h=""; it.aff.forEach(function(a){ h+='<i class="chip eq">'+(a.k==="crit"||a.k==="dodge"||a.k==="cdr"||a.k==="lee"||a.k==="burnDmg"?Math.round(a.v*100)+"%":"+"+a.v)+" "+a.name+'</i>'; }); return h; }
  function findSellable(uid){ for(var i=0;i<RUN.inventory.length;i++){ if(RUN.inventory[i].uid===uid) return {item:RUN.inventory[i],src:"inv",i:i}; } for(var k in RUN.equip){ if(RUN.equip[k]&&RUN.equip[k].uid===uid) return {item:RUN.equip[k],src:"equip",slot:k}; } return null; }
  function removeFromInv(ref){ if(ref.src==="inv"){ RUN.inventory.splice(ref.i,1); } else { RUN.equip[ref.slot]=null; } }
  function inventorySellables(){ var out=[]; RUN.inventory.forEach(function(it){ out.push(it); }); for(var k in RUN.equip){ if(RUN.equip[k]) out.push(RUN.equip[k]); } return out.slice(0,20); }
  function closeEvent(){ RUN.shopOpen=false; hideOvl("eventScreen"); render(); }

  /* ---------- random events (faceless choices) ---------- */
  var EVENTS=[
    { id:"altar", ico:"⛩️", title:"神秘祭坛", desc:"符文低语着两种命运。", choices:[
      { label:"🙏 虔诚祈祷", txt:"恢复 45% 生命", fn:function(){ RUN.hp=Math.min(RUN.maxHp(),RUN.hp+Math.round(RUN.maxHp()*0.45)); } },
      { label:"⚔️ 索取力量", txt:"攻击 +2,但生命上限 -4", fn:function(){ RUN.boonAtk+=2; RUN.boonHp=Math.max(0,RUN.boonHp-4); RUN.hp=Math.max(1,RUN.hp-4); } } ]},
    { id:"stranger", ico:"🧙", title:"无名旅人", desc:"他摊开手掌,露出两样东西。", choices:[
      { label:"🪙 拿走 120 金币", txt:"立刻 +120 金币", fn:function(){ RUN.gold+=120; } },
      { label:"💍 收下神秘圣物", txt:"获得一件随机圣物", fn:function(){ var rel=RELICS[Math.floor(Math.random()*RELICS.length)]; applyRelic(rel); log("圣物: "+rel.ico+" "+rel.name+" —— "+rel.desc+"。"); } } ]},
    { id:"gamble", ico:"🎲", title:"命运之匣", desc:"一半是宝藏,一半是诅咒。", choices:[
      { label:"💰 赌一把", txt:"50% 获得 200 金币 / 50% 损失 60 生命", fn:function(){ if(Math.random()<0.5){ RUN.gold+=200; log("命运眷顾你! +200 金币。"); } else { RUN.hp=Math.max(1,RUN.hp-60); log("命运惩罚你! -60 生命。"); } } },
      { label:"🚪 谨慎离开", txt:"什么也不发生", fn:function(){} } ]},
    { id:"statue", ico:"🗿", title:"古老雕像", desc:"雕像的眼睛缓缓睁开。", choices:[
      { label:"✨ 凝聚心神", txt:"暴击率 +5%", fn:function(){ RUN.boonCrit=(RUN.boonCrit||0)+0.05; } },
      { label:"🛡️ 加固身躯", txt:"防御 +2", fn:function(){ RUN.boonDef+=2; } } ]},
    { id:"fissure", ico:"🌑", title:"深渊裂隙", desc:"黑暗深处传来召唤。", choices:[
      { label:"🕳️ 纵身一跃", txt:"生命上限 +12,但立即损失 20 生命", fn:function(){ RUN.boonHp+=12; RUN.hp=Math.max(1,RUN.hp-20); } },
      { label:"🔦 转身离开", txt:"无事发生", fn:function(){} } ]}
  ];
  function openEvent(){
    if(RUN.shopOpen) return; RUN.shopOpen=true;
    var ev=EVENTS[Math.floor(rng()*EVENTS.length)];
    renderEvent(ev); showOvl("eventScreen");
  }
  function renderEvent(ev){
    var box=el("eventPanel");
    var html='<h2>'+ev.ico+' '+ev.title+'</h2><p class="lead">'+ev.desc+'</p><div class="list">';
    ev.choices.forEach(function(ch,i){ html+='<button class="choice" data-ev="'+i+'"><span class="big">'+ch.label+'</span><span class="d">'+ch.txt+'</span></button>'; });
    html+='</div>';
    box.innerHTML=html;
    box.onclick=function(e){
      var b=e.target.closest("button[data-ev]");
      if(!b) return;
      var ch=ev.choices[+b.getAttribute("data-ev")];
      if(ch){ ch.fn(); SFX.shrine(); addShake(0.12); log("❓ "+ev.title+": "+ch.txt); pop(ev.ico,ev.title,ch.txt,"gold"); }
      closeEvent();
    };
  }

  /* ---------- boon & ascend ---------- */
  function presentBoons(){
    var dc=shuffle(BOONS.slice()).slice(0,3);
    var box=el("boonChoices"); box.innerHTML="";
    dc.forEach(function(b){ var d=document.createElement("button"); d.className="choice";
      d.innerHTML='<span class="ico">'+b.ico+'</span><span style="flex:1;min-width:0"><span class="ct">'+b.name+'</span><span class="cd">'+b.desc+'</span></span>';
      d.onclick=function(){ chooseBoon(b); }; box.appendChild(d); });
    el("boonFloor").textContent=RUN.floor+1; showOvl("boonScreen");
  }
  function chooseBoon(b){
    b.apply(RUN); RUN.floor++; RUN.onStairs=false;
    RUN.hp=Math.min(RUN.maxHp(),RUN.hp+RUN.boonRegen+5);
    RUN.shield+=relicSum("shield");
    spawn(RUN.floor); SFX.stairs(); addShake(0.2); log("登上第 "+RUN.floor+" 层,获得恩赐「"+b.name+"」。");
    hideOvl("boonScreen"); render(); saveRun();
  }
  function ascend(){ if(RUN.onStairs) presentBoons(); }
  function presentStartRelic(){
    var pool=shuffle(RELICS.slice()).slice(0,3);
    var box=el("eventPanel");
    var html='<h2>🎁 传承</h2><p class="lead">先祖留下的圣物,任选其一。</p><div class="list">';
    pool.forEach(function(r,i){ html+='<button class="choice" data-rel="'+i+'"><span class="ico">'+r.ico+'</span><span style="flex:1;min-width:0"><span class="ct">'+r.name+'</span><span class="cd">'+r.desc+'</span></span></button>'; });
    html+='</div>';
    box.innerHTML=html;
    box.onclick=function(e){ var b=e.target.closest("button[data-rel]"); if(!b) return; var r=pool[+b.getAttribute("data-rel")]; applyRelic(r); SFX.relic(); addShake(0.15); log("传承圣物: "+r.ico+" "+r.name+" —— "+r.desc+"。"); closeEvent(); };
    RUN.shopOpen=true; showOvl("eventScreen");
  }

  function afterAction(){ if(RUN.hp<=0){ return; } checkBell(); RUN.turn=(RUN.turn||1)+1; render(); saveRun(); checkAch(); }

  /* ---------- death ---------- */
  function die(){
    RUN.over=true; RUN.hp=0; META.deaths++; SFX.death(); addShake(0.7);
    var kills=RUN.kills||0;
    var souls=Math.floor(RUN.floor*15+RUN.gold*0.6+(RUN.lvl-1)*10);
    if((RUN.potionsUsed||0)===0 && RUN.floor>=6 && RUN.floor>META.noPotFloor){ META.noPotFloor=RUN.floor; }
    META.souls+=souls;
    var newBest=false;
    if(RUN.floor>META.bestFloor){ META.bestFloor=RUN.floor; newBest=true; }
    META.lastRun={ cls:RUN.cls, floor:RUN.floor };
    saveMeta(); try{ localStorage.removeItem(RUN_KEY); }catch(e){}
    checkAch();
    el("dFloor").textContent=RUN.floor;
    el("dLead").textContent="你倒在了第 "+RUN.floor+" 层,但你的回响留在了塔里。";
    el("dBest").innerHTML=newBest?("<b style='color:var(--ok)'>🎉 新纪录!</b> 刷新了你的最高层数"):("历史最佳:第 <b>"+META.bestFloor+"</b> 层");
    el("dSouls").textContent=souls;
    el("dStats").innerHTML=[
      ["🗺️","到达层数",RUN.floor],["💀","本局击杀",kills],["🪙","本局金币",RUN.gold],
      ["✨","等级",RUN.lvl],["🧪","用药次数",RUN.potionsUsed||0],["🫥","回响使用",META.echoUses]
    ].map(function(s){ return '<div class="dstat"><span class="ico">'+s[0]+'</span><span class="lbl">'+s[1]+'</span><span class="val">'+s[2]+'</span></div>'; }).join("");
    el("dDetail").textContent="累计击杀 "+META.totalKills+" · 已是第 "+(META.deaths)+" 世 · 历史最佳第 "+META.bestFloor+" 层";
    showOvl("deathScreen"); render();
  }

  /* ---------- log / toast / float ---------- */
  function log(msg){ if(!RUN) return; RUN.log.unshift({t:Date.now(),m:msg}); if(RUN.log.length>40) RUN.log.pop(); }
  function renderLog(){ if(!RUN) return; var box=el("log"); box.innerHTML=""; RUN.log.slice(0,20).forEach(function(l){ var d=document.createElement("div"); var dt=new Date(l.t); var h=("0"+dt.getHours()).slice(-2)+":"+("0"+dt.getMinutes()).slice(-2); d.innerHTML='<span class="t">'+h+'</span> '+l.m; box.appendChild(d); }); }
  function toast(msg,type){ var t=document.createElement("div"); t.className="toast"+(type?" "+type:""); t.textContent=msg; el("toasts").appendChild(t); setTimeout(function(){ if(t.parentNode) t.parentNode.removeChild(t); },3200); }
  function pop(ico,title,detail,type){ var c=el("pops"); if(!c||!document.createElement) return; var d=document.createElement("div"); d.className="pop"+(type?" "+type:""); d.innerHTML='<div class="pico">'+(ico||"")+'</div><div class="ptx"><div class="ptit">'+(title||"")+'</div>'+(detail?'<div class="pdesc">'+detail+'</div>':'')+'</div>'; c.appendChild(d); setTimeout(function(){ if(d.parentNode) d.parentNode.removeChild(d); },3400); return d; }
  function floatText(x,y,text,color,cls){ var g=el("grid"); if(!g) return; var s=document.createElement("div"); s.className="float"+(cls?" "+cls:""); s.textContent=text; s.style.color=color||"#fff"; s.style.left=(x/COLS*100)+"%"; s.style.top=(y/ROWS*100)+"%"; s.style.width=(100/COLS)+"%"; g.appendChild(s); setTimeout(function(){ if(s.parentNode) s.parentNode.removeChild(s); },950); }

  /* ---------- render ---------- */
  function render(){
    if(!RUN) return;
    applyBiome();
    var bm=biome(RUN.floor||1);
    el("floor").textContent=RUN.floor;
    el("floorTitle").textContent=bm.ico+" "+bm.name+" · 第 "+RUN.floor+" 层"+(RUN.floor%BOSS_EVERY===0?" · BOSS":"")+(RUN.hasShrine?" · ⛩️祭坛":"")+(RUN.hasShop?" · 🛒商店":"")+(RUN.bellActive?" · 🔔挑战中":"");
    el("hp").textContent=RUN.hp+"/"+RUN.maxHp();
    el("hpBar").style.width=(RUN.hp/RUN.maxHp()*100)+"%";
    el("atkdef").textContent=pAtk()+" / "+pDef()+(RUN.rage>0?" ⚡":"");
    el("gold").textContent=RUN.gold;
    if(el("keys")) el("keys").textContent=RUN.keys||0;
    el("lvl").textContent=RUN.lvl;
    var need=25+(RUN.lvl-1)*18;
    el("xpBar").style.width=Math.min(100,RUN.xp/need*100)+"%";
    el("xpTxt").textContent=RUN.xp+" / "+need;
    var sh=el("shieldRow");
    if(RUN.shield>0){ sh.style.display="block"; el("shieldN").textContent=RUN.shield; } else sh.style.display="none";
    var ps=el("pstatus"), psc=pStatusChips();
    if(psc){ ps.style.display="block"; ps.innerHTML=psc; } else ps.style.display="none";
    var gr="";
    EQUIP_SLOTS.forEach(function(s){ var it=RUN.equip[s.cat];
      if(it){ var st=eqStatItem(it,it.primary); var v=(it.primary==="dodge"||it.primary==="crit")?Math.round(st*100)+"%":"+"+Math.round(st);
        gr+='<div class="invrow gear" data-slot="'+s.cat+'" title="'+eqDesc(it)+'"><span class="ric">'+spr("eq_"+s.cat,it.ico)+'</span><span>'+s.name+'</span><span class="'+rarClass(it.rarity)+'">'+it.name+(it.up?' <span class="forge">+'+it.up+'</span>':'')+' '+v+'</span><span class="tier">'+tierTag(it.tier)+'</span>'+(it.set?' <span class="chip set">'+SETS[it.set].name+'</span>':'')+'</div>';
      } else { gr+='<div class="invrow gear faint" data-slot="'+s.cat+'"><span class="ric">'+spr("eq_"+s.cat,s.ico)+'</span><span>'+s.name+'</span><span class="faint">— 空 —</span></div>'; }
    });
    el("gearRow").innerHTML=gr;
    el("gearRow").onclick=function(e){ var r=e.target.closest("[data-slot]"); if(r) openEquip(r.getAttribute("data-slot")); };
    if(el("invCount")) el("invCount").textContent=RUN.inventory.length+"/100";
    el("potions").textContent=RUN.potions; el("potionN").textContent="×"+RUN.potions;
    el("echoState").textContent=RUN.echoUsed?(META.lastRun?"已用过":"无前世"):"已就绪";
    var echoAvail=!!META.lastRun&&!RUN.echoUsed; el("echoBtn").disabled=!echoAvail;
    el("potionBtn").disabled=RUN.potions<=0;
    var bl=""; if(RUN.boonAtk) bl+="⚔️+"+RUN.boonAtk+" "; if(RUN.boonDef) bl+="🛡️+"+RUN.boonDef+" "; if(RUN.boonHp) bl+="🩸+"+RUN.boonHp+" "; if(RUN.boonRegen) bl+="🌿+"+RUN.boonRegen+"/层 "; if(RUN.boonCrit) bl+="🎯"+Math.round(RUN.boonCrit*100)+"% "; if(RUN.boonThorn) bl+="🌵反伤 ";
    el("boonList").textContent="恩赐: "+(bl||"无");
    el("turnPill").textContent=RUN.over?"🕯️ 已阵亡":(RUN.onStairs?"🔺 本层已清":"⚡ 到你行动");
    if(el("turn")) el("turn").textContent=RUN.turn||1;
    if(el("killTxt")) el("killTxt").textContent="击杀 "+(RUN.kills||0);
    var relHtml="";
    RUN.relics.forEach(function(id){ var r=RELICS.find(function(x){return x.id===id;}); if(r) relHtml+='<div class="invrow"><span class="ric">'+spr("relic_"+r.id,r.ico)+'</span><span style="flex:1;min-width:0;font-weight:600">'+r.name+'</span><span class="xs faint">'+r.desc+'</span></div>'; });
    el("relicList").innerHTML=relHtml || '<div class="xs faint">暂无圣物</div>';
    var os=el("onStairs");
    if(RUN.onStairs){ os.innerHTML='<button class="btn btn-primary" id="upBtn">↑ 登上第 '+(RUN.floor+1)+' 层</button>'; el("upBtn").onclick=ascend; } else os.innerHTML="";
    renderSkills(); renderGrid(); renderLog();
  }
  function rarClass(k){ return "rarity-"+RARITIES.filter(function(x){return x.k===k;})[0].cls.split("-")[1]; }
  function renderSkills(){
    var row=el("skillRow"); row.innerHTML="";
    var sk=SKILLS.filter(function(s){return s.cls===RUN.cls;});
    sk.forEach(function(s){
      var cd=RUN.cd[s.id]||0;
      var d=document.createElement("button"); d.className="btn"+(cd>0?"":" btn-accent");
      d.innerHTML=spr("sk_"+s.id,s.ico)+" "+s.name+(cd>0?' <span class="cd">'+cd+'</span>':' <span class="cd">'+s.cd+'</span>');
      d.title=s.desc; d.disabled=cd>0;
      d.onclick=function(){ useSkill(s.id); };
      row.appendChild(d);
    });
  }
  var CLASS_ACC={ guard:"var(--amber)", ranger:"var(--teal)", berserker:"var(--danger)", mage:"var(--violet)" };
  var ENEMY_ACC={ slime:"#7ccf5a", bat:"#b08be0", goblin:"#d0b04a", spider:"#c874e0", archer:"#5ac8d0", skeleton:"#c9c9c9", shaman:"#a06be0", wraith:"#9aa8d0", golem:"#a9885f", boss:"#ff5a5a" };
  var INTENT_ICON={ attack:"⚔", shoot:"🏹", move:"→", charge:"⚡", strike:"💥", sweep:"🌪️", defend:"🛡", heal:"✚", buff:"📣", retreat:"↩", stun:"💫", dead:"·", summon:"◉" };
  var INTENT_LABEL={ attack:"将攻击你", shoot:"将远程射击", move:"将移动", charge:"蓄力(下回合重击!)", strike:"即将重击!", sweep:"将横扫(范围重击)", defend:"将防御", heal:"将治疗自己", buff:"将鼓舞同伴", retreat:"将后撤", stun:"被眩晕", dead:"已阵亡", summon:"将召唤" };
  function eStatusChips(e){ var s=""; if(e.dotT>0)s+='<i class="chip poison">☠</i>'; if(e.burnT>0)s+='<i class="chip burn">🔥</i>'; if(e.stun>0)s+='<i class="chip freeze">💫</i>'; if(e.weakT>0)s+='<i class="chip weak">💧</i>'; if(e.vulnT>0)s+='<i class="chip vuln">🎯</i>'; if((e.buffT||0)>0)s+='<i class="chip buff">📣</i>'; if((e.shield||0)>0)s+='<i class="chip shield">🛡</i>'; return s; }
  function renderGrid(){
    var g=el("grid"); g.style.setProperty("--cols",COLS); g.innerHTML="";
    var theme=ENEMY_THEMES.find(function(x){return x.id===META.enemyTheme;})||ENEMY_THEMES[0];
    var cskin=CHAR_SKINS.find(function(x){return x.id===META.charSkin;})||CHAR_SKINS[0];
    var c=CLASSES[RUN.cls]||CLASSES.guard;
    for(var y=0;y<ROWS;y++){ for(var x=0;x<COLS;x++){ (function(x,y){
      var t=RUN.grid[y][x], d=document.createElement("div"); d.className="cell "+t.type; d.id="cell_"+x+"_"+y;
      if(t.type==="floor"&&((x+y)%2===1)) d.classList.add("alt");
      var e=enemyAt(x,y);
      if(x===RUN.x&&y===RUN.y){ d.classList.add("player"); d.style.setProperty("--acc",CLASS_ACC[RUN.cls]||"#ffcf5a");
        d.innerHTML='<span class="fig"><i class="halo"></i><b class="icon">'+cskin.ico+'</b><s class="wpn">'+(c.ico||"")+"</s></span>"; }
      else if(e){ d.classList.add("enemy"); if(e.elite) d.classList.add("elite"); if(e.boss) d.classList.add("boss");
        var icon=theme.maps[e.type]||e.ico;
        d.style.setProperty("--acc",ENEMY_ACC[e.type]||"#e06060");
        var dm=manh(e.x,e.y,RUN.x,RUN.y), threat=(e.kind==="ranged")?(dm>0&&dm<=e.range):(dm===1);
        if(threat){ d.classList.add("threat"); if(e.kind==="ranged") d.classList.add("ranged"); if(e.boss) d.classList.add("boss"); }
        var it=e.intent||{type:"move"}, chips=eStatusChips(e);
        d.innerHTML='<span class="fig"><i class="halo"></i><b class="icon">'+spr("mon_"+e.type,icon)+'</b></span>'+
          (chips?'<div class="statuses">'+chips+'</div>':'')+
          '<div class="intent" title="'+INTENT_LABEL[it.type]+'">'+INTENT_ICON[it.type]+'</div>'+
          (e.stun>0?'<div class="dot">💫</div>':'')+'<div class="hpbar"><span style="width:'+Math.max(8,Math.min(100,e.hp/e.maxHp*100))+'%"></span></div>';
        d.title=e.name+"  HP "+e.hp+"/"+e.maxHp+"  攻"+eAtk(e)+"  防"+e.def+(e.boss?"  👁BOSS":"")+"  · 意图:"+INTENT_LABEL[it.type]+(e.poison?"  ☠毒":"")+(e.kind==="ranged"?"  🏹远程":""); }
      else if(t.type==="chest"){ d.classList.add(t.mimic?"mimic":"chest"); d.innerHTML=spr("tile_chest","🎁","tile"); d.title=t.mimic?"宝箱(似乎有些不对劲…)":"宝箱 · 打开得奖励"; }
      else if(t.type==="shrine"){ d.classList.add("shrine"); d.innerHTML=spr("tile_shrine","⛩️","tile"); d.title="祭坛 · 获得一次赐福"; }
      else if(t.type==="shop"){ d.classList.add("shop"); d.innerHTML=spr("tile_shop","🛒","tile"); d.title="商店 · 购入装备/药水/圣物"; }
      else if(t.type==="event"){ d.classList.add("event"); d.innerHTML=spr("tile_event","❓","tile"); d.title="神秘事件 · 一次抉择"; }
      else if(t.type==="stair"){ d.classList.add("stair"); d.innerHTML=spr("tile_stair","🔺","tile"); d.title="楼梯 · 前往下一层"; }
      else if(t.type==="spike"){ d.classList.add("hazard","spike"); d.innerHTML=spr("tile_spike","⚠️","tile"); d.title="尖刺陷阱 · 踩上会受伤"; }
      else if(t.type==="lava"){ d.classList.add("hazard","lava"); d.innerHTML=spr("tile_lava","🌋","tile"); d.title="岩浆 · 灼烧你与敌人"; }
      else if(t.type==="thorns"){ d.classList.add("hazard","thorns"); d.innerHTML=spr("tile_thorns","🌵","tile"); d.title="荆棘 · 踩上会受伤"; }
      else if(t.type==="campfire"){ d.classList.add("campfire"); d.innerHTML=spr("tile_campfire","🔥","tile"); d.title="篝火 · 恢复大量生命并净化"; }
      else if(t.type==="well"){ d.classList.add("well"); d.innerHTML=spr("tile_well","⛲","tile"); d.title="许愿井 · 花 50 金币换取祝福"; }
      else if(t.type==="goldpile"){ d.classList.add("goldpile"); d.innerHTML=spr("tile_goldpile","💰","tile"); d.title="金币堆 · 免费金币"; }
      else if(t.type==="portal"){ d.classList.add("portal"); d.innerHTML=spr("tile_portal","🌀","tile"); d.title="传送门 · 跃迁到另一处"; }
      else if(t.type==="crack"){ d.classList.add("crack"); d.innerHTML=spr("tile_crack","🧱","tile"); d.title="残破墙 · 朝它移动可打碎"; }
      else if(t.type==="key"){ d.classList.add("key"); d.innerHTML=spr("tile_key","🗝️","tile"); d.title="钥匙 · 拾取后开启锁门"; }
      else if(t.type==="lockdoor"){ d.classList.add("lockdoor"); d.innerHTML=spr("tile_lockdoor","🔒","tile"); d.title="锁门 · 需要钥匙才能打开"; }
      else if(t.type==="bell"){ d.classList.add("bell"); d.innerHTML=spr("tile_bell","🔔","tile"); d.title="警钟 · 敲响引来精英挑战(击败得奖励)"; }
      d.onclick=function(){ if(e) attackEnemy(e); else if(x!==RUN.x||y!==RUN.y) stepTo(x,y); };
      g.appendChild(d);
    })(x,y); } }
  }

  /* ---------- wardrobe ---------- */
  var wardTab="char";
  function renderWardrobe(){    var grid=el("skinGrid"); grid.innerHTML="";
    var items;
    if(wardTab==="char") items=CHAR_SKINS.map(function(s){ return {id:s.id,big:s.ico,name:s.name,desc:s.desc,unlock:s.unlock(),on:META.charSkin===s.id,type:"char"}; });
    else if(wardTab==="weapon") items=WEAPON_SKINS.map(function(s){ return {id:s.id,big:s.ico,name:s.name,desc:s.desc,unlock:s.unlock(),on:META.weaponSkin===s.id,type:"weapon"}; });
    else items=ENEMY_THEMES.map(function(s){ return {id:s.id,big:s.ico,name:s.name,desc:s.desc+((s.id==="dungeon")?"(默认)":""),unlock:s.unlock(),on:META.enemyTheme===s.id,type:"enemy"}; });
    items.forEach(function(it){
      var d=document.createElement("div");
      d.className="skin"+(it.on?" on":"")+(it.unlock?"":" locked");
      d.innerHTML='<span class="big">'+it.big+'</span><span class="info"><span class="sn">'+it.name+'</span><span class="sd">'+it.desc+(it.unlock?"":(" · 未解锁"))+'</span></span>'+
        '<span class="equip">'+(it.on?"✓已佩戴":(it.unlock?"装备":"🔒"))+'</span>';
      d.onclick=function(){ if(!it.unlock){ toast("尚未解锁:"+it.desc,"warn"); return; } equipSkin(it.type,it.id); };
      grid.appendChild(d);
    });
  }
  function equipSkin(type,id){
    if(type==="char") META.charSkin=id;
    else if(type==="weapon") META.weaponSkin=id;
    else META.enemyTheme=id;
    saveMeta(); renderWardrobe(); render(); renderPreview(); toast("已换上装扮 ✓","ok");
  }
  function renderPreview(){ var c=CHAR_SKINS.find(function(x){return x.id===META.charSkin;})||CHAR_SKINS[0]; el("skinPreview").textContent=c.ico; }
  /* ---------- compendium ---------- */
  var ENEMY_BEHAVIOR={ slime:"死亡时分裂成小史莱姆", bat:"高速移动,近身撕咬", goblin:"近身劈砍", spider:"攻击有概率使你中毒", archer:"远程射击,贴身后会后撤", skeleton:"生命过低会自我修复", shaman:"会治疗自己或鼓舞同伴", wraith:"近身致命", golem:"蓄力后发动毁灭重击" };
  function renderCompendium(){
    var box=el("compost"); if(!box) return; var html="";
    html+='<div class="csec"><h3>👾 怪物图鉴</h3>';
    ENEMIES.forEach(function(e){ html+='<div class="crow"><span class="ico">'+spr("mon_"+e.id,e.ico)+'</span><span class="info"><span class="n">'+e.name+'</span><span class="d">HP '+e.hp+' · 攻 '+e.atk+' · 防 '+e.def+' · '+ENEMY_BEHAVIOR[e.id]+'</span></span><span class="xs faint">第 '+e.minFloor+' 层起</span></div>'; });
    html+='<div class="crow"><span class="ico">👁️</span><span class="info"><span class="n">塔主·残影</span><span class="d">半血狂暴(+攻+盾),周期性横扫,范围 2 格</span></span><span class="xs faint">每 5 层</span></div>';
    html+='</div>';
    html+='<div class="csec"><h3>💍 圣物</h3>';
    RELICS.forEach(function(r){ html+='<div class="crow"><span class="ico">'+spr("relic_"+r.id,r.ico)+'</span><span class="info"><span class="n">'+r.name+'</span><span class="d">'+r.desc+'</span></span></div>'; });
    html+='</div>';
    html+='<div class="csec"><h3>🗡️ 装备图鉴 <span class="xs faint">(每类约 100 件 · 六等稀有度 · 阶级 T1~T7)</span></h3>';
    EQUIP_SLOTS.forEach(function(s){ html+='<div class="csub">'+s.ico+' '+s.name+' ('+EQ_CATALOG[s.cat].length+' 种)</div>'; html+='<div class="crow dense"><span class="d">'+EQ_CATALOG[s.cat].slice(0,6).map(function(t){ return t.name+" +"+(s.primary==="dodge"||s.primary==="crit"?Math.round(t.base*1.8*100)+"%":Math.round(t.base*1.8)); }).join(" · ")+' …</span></div>'; });
    html+='</div>';
    html+='<div class="csec"><h3>🎴 传说套装 <span class="xs faint">(集齐 2 件生效)</span></h3>';
    Object.keys(SETS).forEach(function(sd){ var st=SETS[sd]; var b=""; for(var t=2;t<=6;t++){ if(st.tiers[t]){ b+="<b>"+t+"件:</b> "; for(var k in st.tiers[t]){ b+=fmtStat(k,st.tiers[t][k])+" "; } b+="&nbsp;&nbsp;"; } } html+='<div class="crow"><span class="ico">'+spr("set_"+sd,st.ico)+'</span><span class="info"><span class="n">'+st.name+'</span><span class="d">'+b+'</span></span></div>'; });
    html+='</div>';
    html+='<div class="csec"><h3>🧬 随机词缀</h3>';
    var affs=[]; AFFIXES.forEach(function(a){ affs.push('<span class="chip eq">'+a.name+'</span>'); }); html+='<div class="crow"><span class="d">'+affs.join(" ")+'</span></div>';
    html+='</div>';
    html+='<div class="csec"><h3>💠 稀有度</h3>';
    [["⚪","<span class='rarity-common'>普通</span>","基础 ×1.0 · 1 词缀 · 任何层数"],["🟢","<span class='rarity-uncommon'>优秀</span>","基础 ×1.3 · 2 词缀 · 第 3 层起"],["🔵","<span class='rarity-rare'>稀有</span>","基础 ×1.6 · 2 词缀 · 第 5 层起"],["🟣","<span class='rarity-epic'>史诗</span>","基础 ×1.9 · 3 词缀 · 第 7 层起"],["🟠","<span class='rarity-legendary'>传说</span>","基础 ×2.3 · 4 词缀 · 第 10 层起"],["🔴","<span class='rarity-mythic'>神器</span>","基础 ×2.8 · 5 词缀 · 第 14 层起"]].forEach(function(s){ html+='<div class="crow"><span class="ico">'+s[0]+'</span><span class="info"><span class="n">'+s[1]+'</span><span class="d">'+s[2]+'</span></span></div>'; });
    html+='</div>';
    html+='<div class="csec"><h3>⚔️ 技能</h3>';
    ["guard","ranger","berserker","mage"].forEach(function(cls){ var c=CLASSES[cls]; if(!c) return; html+='<div class="csub">'+c.ico+' '+c.name+'</div>'; SKILLS.filter(function(s){return s.cls===cls;}).forEach(function(s){ html+='<div class="crow"><span class="ico">'+spr("sk_"+s.id,s.ico)+'</span><span class="info"><span class="n">'+s.name+'</span><span class="d">冷却 '+s.cd+' · '+s.desc+'</span></span></div>'; }); });
    html+='</div>';
    html+='<div class="csec"><h3>✨ 状态效果</h3>';
    [["☠","中毒","每回合损失生命"],["🔥","灼烧","每回合损失更高生命"],["💫","冻结 / 眩晕","跳过一回合行动"],["💧","虚弱","造成的伤害降低 40%"],["🎯","易伤","受到的伤害提升 50%"],["📣","鼓舞","攻击提升"],["🛡","护盾","抵挡伤害"]].forEach(function(s){ html+='<div class="crow"><span class="ico">'+s[0]+'</span><span class="info"><span class="n">'+s[1]+'</span><span class="d">'+s[2]+'</span></span></div>'; });
    html+='</div>';
    box.innerHTML=html;
  }
  function openCompendium(){ renderCompendium(); showOvl("compendiumScreen"); }
  function closeCompendium(){ hideOvl("compendiumScreen"); }
  /* ---------- equipment & backpack ---------- */
  var eqSel=null;
  function openEquip(slot){ renderEquip(slot); showOvl("equipmentScreen"); }
  function closeEquip(){ hideOvl("equipmentScreen"); }
  function renderEquip(slot){
    eqSel=null;
    var slotsHtml="";
    EQUIP_SLOTS.forEach(function(s){
      var it=RUN.equip[s.cat]; var body;
      if(it){ var st=eqStatItem(it,it.primary); var v=(it.primary==="dodge"||it.primary==="crit")?Math.round(st*100)+"%":"+"+Math.round(st);
        body='<div class="eqslot rar '+rarClass(it.rarity)+'" data-slot="'+s.cat+'"><div class="eqll"><span class="eqico">'+spr("eq_"+s.cat,it.ico)+'</span><span class="eqn">'+it.name+(it.up?' <span class="forge">+'+it.up+'</span>':'')+'</span><span class="eqs">'+v+(it.set?' · '+SETS[it.set].name:'')+'</span></div><div class="eqmeta">'+tierTag(it.tier)+affChips(it)+'</div></div>';
      } else { body='<div class="eqslot empty" data-slot="'+s.cat+'"><div class="eqll"><span class="eqico">'+spr("eq_"+s.cat,s.ico)+'</span><span class="eqn faint">'+s.name+'</span><span class="eqs faint">— 空 —</span></div></div>'; }
      slotsHtml+=body;
    });
    el("eqSlots").innerHTML=slotsHtml;
    var grid="";
    for(var i=0;i<100;i++){ var it2=RUN.inventory[i];
      if(it2){ var st2=eqStatItem(it2,it2.primary); var v2=(it2.primary==="dodge"||it2.primary==="crit")?Math.round(st2*100)+"%":"+"+Math.round(st2);
        grid+='<div class="eqmini rar '+rarClass(it2.rarity)+'" data-uid="'+it2.uid+'" title="'+eqDesc(it2)+'"><span class="eqico">'+spr("eq_"+it2.slot,it2.ico)+'</span><span class="eqmn">'+it2.name+'</span><span class="eqms">'+tierTag(it2.tier)+' · '+v2+'</span></div>';
      } else { grid+='<div class="eqmini empty"></div>'; }
    }
    el("eqGrid").innerHTML=grid;
    el("eqCap").textContent=RUN.inventory.length+"/100";
    el("eqSlots").onclick=function(e){ var r=e.target.closest("[data-slot]"); if(r){ var sl=r.getAttribute("data-slot"); var it=RUN.equip[sl]; if(it){ eqSel={type:"equip",slot:sl,item:it}; } renderEquipDetail(); } };
    el("eqGrid").onclick=function(e){ var r=e.target.closest("[data-uid]"); if(r){ var uid=r.getAttribute("data-uid"); var it=RUN.inventory.find(function(x){return x.uid===uid;}); if(it){ eqSel={type:"inv",uid:uid,item:it}; } renderEquipDetail(); } };
    renderSetProgress();
    renderEquipDetail();
  }
  function renderSetProgress(){
    var box=el("eqSets"); if(!box) return;
    var c=setCounts(), html="", any=false;
    Object.keys(SETS).forEach(function(sd){
      var n=c[sd]||0; if(n===0) return; any=true; var st=SETS[sd];
      var chip="";
      for(var t=2;t<=6;t++){ chip+='<span class="chiptier '+(n>=t?'on':'off')+'">'+t+'件套</span>'; }
      var lbs=[]; for(var t=6;t>=2;t--){ if(n>=t&&st.tiers[t]){ var b=""; for(var k in st.tiers[t]){ b+=fmtStat(k,st.tiers[t][k])+" "; } lbs.push(t+"件:"+b); } }
      var next=setMaxTier(n)>=6?null:(setMaxTier(n)+1);
      var hint=next?(' &nbsp;<span class="xs faint">再 '+(next-n)+' 件激活 '+next+'件套 · '+setBonusHint(st,next)+'</span>'):' <span class="xs ok">已满编!</span>';
      html+='<div class="setprog"><div class="sphead"><span class="spico">'+spr("set_"+sd,st.ico)+'</span> '+st.name+' <span class="spn">'+n+'/7</span></div><div class="sptiers">'+chip+'</div><div class="spbonus">'+lbs.join(" · ")+hint+'</div></div>';
    });
    if(!any) html='<div class="xs faint">尚未收集套装。同套装装备 ≥2 件即可激活;2/3/4/5/6 件套逐级增强。</div>';
    box.innerHTML='<h3 style="margin:0 0 var(--space-2)">🎴 套装激活</h3>'+html;
  }
  function setBonusHint(st,next){ var t=st.tiers[next]; if(!t) return ""; var b=""; for(var k in t){ b+=fmtStat(k,t[k])+" "; } return b; }
  function renderEquipDetail(){
    var d=el("eqDetail"); if(!d) return;
    if(!eqSel){ d.innerHTML='<div class="xs faint">选中一件装备查看详情。</div>'; return; }
    var it=eqSel.item; var st=eqStatItem(it,it.primary); var v=(it.primary==="dodge"||it.primary==="crit")?Math.round(st*100)+"%":"+"+Math.round(st);
    var slotName=(EQUIP_SLOTS.find(function(x){return x.cat===it.slot;})||{}).name||it.slot;
    var detail='<div class="eqcard rar '+rarClass(it.rarity)+'"><div class="eqhead"><span class="eqico big">'+spr("eq_"+it.slot,it.ico)+'</span><div><div class="eqn big">'+rarName(it.rarity)+' '+slotName+' · '+it.name+(it.up?' <span class="forge">+'+it.up+'</span>':'')+'</div><div class="eqs">'+tierTag(it.tier)+' · '+v+(it.set?' · [套装]'+SETS[it.set].name:'')+'</div></div></div><div class="eqaff">'+affChips(it)+'</div><div class="eqbtns">'+
      (eqSel.type==="inv"?'<button class="btn btn-primary" data-act="equip">✨ 穿戴</button>':'<button class="btn" data-act="unequip">📤 卸下</button>')+
      '<button class="btn" data-act="sell">💰 卖 '+sellPrice(it)+' 🪙</button></div></div>';
    // forge / reforge panel
    var up=it.up||0, umax=upMax(it), uc=upCost(it), rc=refCost(it);
    detail+='<div class="eqforge"><div class="fgt"><span class="fgico">🛠️</span><div><div class="fgl">强化 <span class="mono">+'+(it.up||0)+'/'+umax+'</span><span class="xs faint"> 每级 +6% 全属性</span></div><div class="fgbf"><button class="btn" data-act="upgrade" '+(up>=umax?'disabled':'')+'>强化 → +'+(up+1)+' (<span class="mono">'+uc+' 🪙</span>)</button></div></div></div><div class="fgt"><span class="fgico">♻️</span><div><div class="fgl">重铸词缀 <span class="xs faint"> 随机重塑属性条</span></div><div class="fgbf"><button class="btn" data-act="reforge">重铸 (<span class="mono">'+rc+' 🪙</span>)</button></div></div></div></div>';
    if(eqSel.type==="inv"){
      var old=RUN.equip[it.slot];
      detail+=old?equipCompareHtml(old,it):'<div class="eqcmp"><div class="cmphead"><span class="ct">⚖️ 装备对比</span></div><div class="cmpempty">该槽位目前为空,穿上即可获得这些属性。</div></div>';
    }
    d.innerHTML=detail;
    d.onclick=function(e){ var b=e.target.closest("button[data-act]"); if(!b) return; var act=b.getAttribute("data-act");
      if(act==="equip"){ equipItem(eqSel.uid); } else if(act==="unequip"){ unequipSlot(eqSel.slot); } else if(act==="sell"){ sellItem(eqSel); } else if(act==="upgrade"){ upgradeItem(eqSel.item); renderEquipDetail(); } else if(act==="reforge"){ reforgeItem(eqSel.item); renderEquipDetail(); } };
  }
  var COMPARE_FIELDS=["atk","def","hp","crit","dodge","cdr","lee","burnDmg","dot","goldKill","poisonHit"];
  function fieldName(k){ return {atk:"攻击",def:"防御",hp:"生命",crit:"暴击",dodge:"闪避",cdr:"冷却",lee:"吸血",burnDmg:"灼烧",dot:"中毒",goldKill:"金币",poisonHit:"淬毒"}[k]||k; }
  function fieldFmt(k,v){ if(k==="crit"||k==="dodge"||k==="cdr"||k==="lee"||k==="burnDmg") return Math.round(v*100)+"%"; return (Math.round(v*10)/10); }
  function powerScore(it){ if(!it) return 0; var s=0; COMPARE_FIELDS.forEach(function(k){ var v=eqStatItem(it,k); if(k==="crit"||k==="dodge"||k==="cdr"||k==="lee"||k==="burnDmg") s+=v*100; else if(k==="atk") s+=v*2.5; else if(k==="def") s+=v*2.8; else if(k==="hp") s+=v*0.6; else if(k==="dot") s+=v*2; else if(k==="poisonHit") s+=v*3; else s+=v*1; }); return Math.round(s); }
  function cmpStats(it){ var s=[]; var st=eqStatItem(it,it.primary); s.push("T"+(it.tier+1)+(it.up?" +"+it.up:"")+" · "+(it.primary==="dodge"||it.primary==="crit"?Math.round(st*100)+"%":"+"+Math.round(st))+" "+fieldName(it.primary)); if(it.set) s.push("[套装] "+SETS[it.set].name); (it.aff||[]).forEach(function(a){ s.push((a.k==="crit"||a.k==="dodge"||a.k==="cdr"||a.k==="lee"||a.k==="burnDmg"?Math.round(a.v*100)+"%":"+"+a.v)+" "+a.name); }); return s.join(" · "); }
  function equipCompareHtml(old,it){
    var po=powerScore(old), pn=powerScore(it), pc=pn>po?"up":(pn<po?"down":"faint");
    var h='<div class="eqcmp"><div class="cmphead"><span class="ct">⚖️ 装备对比</span><span class="cs">评分 '+po+' → <b class="'+pc+'">'+pn+'</b></span></div>';
    h+='<div class="cmpcols"><div class="cmpcol '+rarClass(old.rarity)+'"><div class="ccname">'+spr("eq_"+old.slot,old.ico)+' '+old.name+' <span class="cctag">当前</span></div><div class="ccstats">'+cmpStats(old)+'</div></div>';
    h+='<div class="cmpcol '+rarClass(it.rarity)+'"><div class="ccname">'+spr("eq_"+it.slot,it.ico)+' '+it.name+' <span class="cctag new">待换</span></div><div class="ccstats">'+cmpStats(it)+'</div></div></div>';
    h+='<div class="cmpd">';
    COMPARE_FIELDS.forEach(function(k){ var a=eqStatItem(old,k), b=eqStatItem(it,k); if(a>0||b>0){ var d=b-a; var cls=d>0?"up":(d<0?"down":"faint"); h+='<div class="cmprow"><span class="fn">'+fieldName(k)+'</span><span class="fv">'+fieldFmt(k,a)+'</span><span class="fv">'+fieldFmt(k,b)+'</span><span class="fd '+cls+'">'+(d>0?"+":"")+(d<0?"":(d===0?"±":"−"))+fieldFmt(k,Math.abs(d))+'</span></div>'; } });
    h+='</div></div>';
    return h;
  }
  function equipItem(uid){
    var idx=RUN.inventory.findIndex(function(x){return x.uid===uid;}); if(idx<0) return;
    var it=RUN.inventory[idx]; var slot=it.slot; var old=RUN.equip[slot];
    if(old && RUN.inventory.length>=100){ log("背包已满,无法交换旧装备!"); return; }
    RUN.equip[slot]=it; RUN.inventory.splice(idx,1);
    if(old){ RUN.inventory.push(old); log("穿戴「"+it.name+"」,旧装备放入背包。"); } else log("穿戴「"+it.name+"」。");
    SFX.buy(); render(); renderEquip();
  }
  function unequipSlot(slot){ var it=RUN.equip[slot]; if(!it) return; if(RUN.inventory.length>=100){ log("背包已满!"); return; } RUN.equip[slot]=null; RUN.inventory.push(it); log("卸下「"+it.name+"」。"); SFX.buy(); render(); renderEquip(); }
  function sellItem(sel){ var ref=sel.type==="inv"?{src:"inv",i:RUN.inventory.findIndex(function(x){return x.uid===sel.uid;})}:{src:"equip",slot:sel.slot}; if(ref.src==="inv"&&ref.i<0) return; var it=sel.item; var p=sellPrice(it); removeFromInv(ref); RUN.gold+=p; log("卖出「"+it.name+"」+"+p+" 金币"+(ref.src==="equip"?"(已卸下)":"")+"。"); SFX.buy(); render(); renderEquip(); }
  function openWardrobe(){ if(!RUN) return; wardTab="char"; renderWardrobe(); showOvl("wardrobeScreen"); }
  function closeWardrobe(){ hideOvl("wardrobeScreen"); }

  /* ---------- achievements panel ---------- */
  function renderAch(){
    var box=el("achList"); box.innerHTML="";
    ACH.forEach(function(a){
      var done=META.ach&&META.ach[a.id];
      var d=document.createElement("div"); d.className="ach"+(done?"":"");
      d.style.cssText="display:flex;gap:10px;align-items:center;padding:8px;border-bottom:1px dashed var(--line)";
      d.innerHTML='<span style="font-size:20px">'+a.ico+'</span><span style="flex:1;min-width:0"><span style="font-weight:700;font-size:0.85rem;display:block">'+a.name+'</span><span class="xs faint">'+a.desc+'</span></span><span class="xs">'+(done?"✓ 已达成":"+"+a.souls+" 魂")+'</span>';
      box.appendChild(d);
    });
  }

  /* ---------- save / load ---------- */
  function saveMeta(){ try{ localStorage.setItem(META_KEY,JSON.stringify(META)); }catch(e){} dbAutosave(); }
  function loadMeta(){
    try{ var r=localStorage.getItem(META_KEY); if(r){ var d=JSON.parse(r); var f=defMeta(); for(var k in f){ if(d[k]!==undefined) f[k]=d[k]; } META=f; META.upz=META.upz||{}; META.ach=META.ach||{}; } }catch(e){}
  }
  function saveRun(){ if(!RUN||RUN.over) return; var copy=Object.assign({},RUN); delete copy.maxHp; copy.v=3; copy.log=copy.log.slice(0,30);
    copy.potionsUsed=RUN.potionsUsed||0; try{ localStorage.setItem(RUN_KEY,JSON.stringify(copy)); }catch(e){} dbAutosave(); }
  function loadRun(){ try{ var r=localStorage.getItem(RUN_KEY); if(r){ var d=JSON.parse(r); if(d&&d.grid&&(!d.v||d.v<=3)){ RUN=d; rewireRun(); RUN.cd=RUN.cd||{}; migrateRun(); RUN.portals=RUN.portals||[]; RUN.bellActive=false; RUN.bellIds=null; ensureStairReachable(); if(RUN.enemies) RUN.enemies.forEach(computeIntent); return true; } } }catch(e){} return false; }
  function migrateRun(){
    if(!RUN.equip){ RUN.equip={}; EQUIP_SLOTS.forEach(function(s){ RUN.equip[s.cat]=null; }); }
    EQUIP_SLOTS.forEach(function(s){ if(!RUN.equip[s.cat]) RUN.equip[s.cat]=null; });
    if(!Array.isArray(RUN.inventory)) RUN.inventory=[];
    var v=RUN.v||0;
    if(v<3){
      if(typeof RUN.weapon==="string"){ RUN.equip.weapon=genBasic("weapon"); }
      if(typeof RUN.armor==="string"){ RUN.equip.armor=genBasic("armor"); }
      delete RUN.weapon; delete RUN.armor; delete RUN.rarW; delete RUN.rarA;
    }
    RUN.v=3;
  }

  /* ---------- settings / save io ---------- */
  function openSettings(){ renderSettingsInfo(); updateSoundBtn(); showOvl("settingsScreen"); }
  function closeSettings(){ hideOvl("settingsScreen"); }
  function updateSoundBtn(){ var on=soundOn(); el("soundBtn").textContent=on?"🔊":"🔇"; el("sndToggle").textContent=on?"开启":"关闭"; }
  function renderSettingsInfo(){ el("saveInfo").textContent=RUN&&!RUN.over?("第 "+RUN.floor+" 层 · 正在进行"):(META.lastRun?"已结束一局(可开新局)":"暂无进行中"); }
  function exportSave(){
    var runData=(RUN&&!RUN.over)?(function(){ var c=Object.assign({},RUN); delete c.maxHp; c.log=[ ]; return c; })():null;
    var s=JSON.stringify({ v:2, meta:META, run:runData });
    el("saveBox").value=s;
    try{ if(typeof navigator!=="undefined"&&navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(s); } toast("已生成存档串(已尝试复制)","ok"); }catch(e){ toast("已生成存档串,请手动复制","ok"); }
  }
  function importSave(){
    var s=el("saveBox").value.trim(); if(!s){ toast("请先粘贴存档串到文本框","warn"); return; }
    try{ var d=JSON.parse(s); if(!d||!d.meta){ toast("这不是有效的存档串","warn"); return; }
      var f=defMeta(); for(var k in f){ if(d.meta[k]!==undefined) f[k]=d.meta[k]; } META=f; META.upz=META.upz||{}; META.ach=META.ach||{};
      saveMeta();
      if(d.run&&d.run.grid&&(!d.run.v||d.run.v<=2)){ try{ localStorage.setItem(RUN_KEY,JSON.stringify(d.run)); }catch(e){} }
      else { try{ localStorage.removeItem(RUN_KEY); }catch(e){} }
      toast("导入成功,正在刷新…","ok"); setTimeout(function(){ try{ location.reload(); }catch(e){} }, 500);
    }catch(e){ toast("导入失败:存档串损坏","warn"); }
  }
  function confirmReset(){
    if(!window.confirm("确定清空所有进度(塔魂、强化、装扮、成就、当前局)?此操作不可恢复。")) return;
    try{ localStorage.removeItem(META_KEY); localStorage.removeItem(RUN_KEY); }catch(e){}
    META=defMeta(); RUN=null; saveMeta();
    renderClassChoices(); refreshMeta(); renderAch(); renderWardrobe(); updateSoundBtn(); showStart(); renderPreview(); toast("已清空,一切重新开始","ok");
  }

  /* ---------- database saves (PostgreSQL via local backend) ---------- */
  var SLOT_KEY="echo-tower-slot-v1";
  var API_BASE=(typeof location!=="undefined"&&location.protocol==="file:")?"http://localhost:4200":"";
  var SAVE_SLOT=null, dbOnline=false, _dbTimer=null;
  /* --- account auth (per-user save isolation) --- */
  var TOKEN_KEY="echo-tower-token-v1", USER_KEY="echo-tower-user-v1";
  var AUTH={ token:null, username:null };
  function loadAuth(){ try{ AUTH.token=localStorage.getItem(TOKEN_KEY); AUTH.username=localStorage.getItem(USER_KEY); }catch(e){} }
  function persistAuth(u){ AUTH.username=u; try{ localStorage.setItem(USER_KEY,u); }catch(e){} }
  function clearAuth(){ AUTH.token=null; AUTH.username=null; try{ localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); }catch(e){} }
  function authHeaders(){ return AUTH.token?{"Authorization":"Bearer "+AUTH.token}:{}; }
  async function apiRegister(u,p){ var r=await fetch(apiPath("/api/auth/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u,password:p})}); return await r.json(); }
  async function apiLogin(u,p){ var r=await fetch(apiPath("/api/auth/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u,password:p})}); return await r.json(); }
  async function apiMe(){ var r=await fetch(apiPath("/api/auth/me"),{headers:authHeaders()}); return await r.json(); }
  async function apiLogout(){ var r=await fetch(apiPath("/api/auth/logout"),{method:"POST",headers:authHeaders()}); return await r.json(); }
  function setAuthToken(t){ AUTH.token=t; try{ localStorage.setItem(TOKEN_KEY,t); }catch(e){} }
  function onAuthSuccess(d){ if(d&&d.token){ setAuthToken(d.token); persistAuth(d.username||""); renderAuthUI(); renderSaveList(); } }
  function renderAuthUI(){
    var box=el("authBox"); if(!box) return;
    if(AUTH.token&&AUTH.username){ box.innerHTML='<div class="authline"><span class="xs"><b>👤 '+esc(AUTH.username)+'</b> 已登录(存档隔离)</span><button id="logoutBtn" class="btn btn-quiet sm">登出</button></div>'; var b=el("logoutBtn"); if(b) b.onclick=logout; }
    else { box.innerHTML='<div class="authline"><input id="authUser" placeholder="用户名" maxlength="24" autocomplete="username"><input id="authPass" type="password" placeholder="密码(≥4位)" maxlength="64" autocomplete="current-password"><button id="loginBtn" class="btn">登录</button><button id="regBtn" class="btn btn-accent">注册</button></div><div id="authMsg" class="xs warn"></div>'; wireAuth(); }
  }
  function wireAuth(){
    var lu=el("authUser"), lp=el("authPass"), lm=el("authMsg"), lb=el("loginBtn"), rb=el("regBtn");
    function go(fn){ var u=(lu.value||"").trim(); if(!u){ lm.textContent="请输入用户名"; return; } if((lp.value||"").length<4){ lm.textContent="密码至少 4 位"; return; } lm.textContent="…"; fn(u,lp.value).then(function(d){ if(d&&d.token){ onAuthSuccess(d); lm.textContent=""; toast("欢迎,"+d.username,"ok"); } else lm.textContent=(d&&d.error)||"失败"; }); }
    if(lb) lb.onclick=function(){ go(apiLogin); };
    if(rb) rb.onclick=function(){ go(apiRegister); };
  }
  function logout(){ apiLogout().then(function(){ clearAuth(); SAVE_SLOT=null; try{ localStorage.removeItem(SLOT_KEY); }catch(e){} renderAuthUI(); renderSaveList(); saveStatus(); toast("已登出,服务器存档已隔离","ok"); }); }
  function esc(s){ return String(s||"").replace(/[&<>"']/g,function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function requireAuth(){ if(!AUTH.token){ toast("请先登录后再管理服务器存档","warn"); renderAuthUI(); return false; } return true; }
  function apiPath(p){ return API_BASE+p; }
  async function apiHealth(){ try{ var r=await fetch(apiPath("/api/health")); var j=await r.json(); return !!(j&&j.ok); }catch(e){ return false; } }
  async function apiList(){ var r=await fetch(apiPath("/api/saves"),{headers:authHeaders()}); return await r.json(); }
  async function apiGet(slot){ var r=await fetch(apiPath("/api/saves/"+encodeURIComponent(slot)),{headers:authHeaders()}); return await r.json(); }
  async function apiPut(slot,meta,run){ var r=await fetch(apiPath("/api/saves/"+encodeURIComponent(slot)),{method:"PUT",headers:Object.assign({"Content-Type":"application/json"},authHeaders()),body:JSON.stringify({meta:meta,run:run})}); return await r.json(); }
  async function apiDel(slot){ var r=await fetch(apiPath("/api/saves/"+encodeURIComponent(slot)),{method:"DELETE",headers:authHeaders()}); return await r.json(); }
  function runCopy(){ if(!RUN||RUN.over) return null; var c=Object.assign({},RUN); delete c.maxHp; c.log=c.log.slice(0,30); return c; }
  async function checkDb(){ dbOnline=await apiHealth(); saveStatus(); return dbOnline; }
  function dbAutosave(){
    if(!SAVE_SLOT||!dbOnline) return;
    if(_dbTimer) clearTimeout(_dbTimer);
    _dbTimer=setTimeout(function(){ apiPut(SAVE_SLOT,META,runCopy()).catch(function(){}).then(saveStatus); },700);
  }
  function saveStatus(){ var s=el("saveStatus"); if(!s) return; var txt=dbOnline?("数据库已连接 · 当前存档: "+(SAVE_SLOT||"未选择")):"数据库未连接(暂用本地存档)"; s.textContent=txt; s.className="save-status "+(dbOnline?"ok":"err"); }
  function fmtTime(iso){ if(!iso) return ""; try{ return new Date(iso).toLocaleString(); }catch(e){ return iso; } }
  function saveSummary(s){ var m=s.meta||{}, fl=(m.lastRun&&m.lastRun.floor)?(" · 第 "+m.lastRun.floor+" 层"):(s.has_run?" · 进行中":""); return "塔魂 "+(m.souls!=null?m.souls:0)+fl; }
  function renderSaveList(){
    var box=el("saveList"); box.innerHTML="";
    if(!AUTH.token){ box.innerHTML='<div class="xs faint" style="text-align:center;padding:var(--space-4)">请先在上方登录/注册,才能查看该账号的存档。</div>'; return; }
    apiList().then(function(list){
      if(!Array.isArray(list)) list=[];
      el("saveCount").textContent=list.length?(list.length+" 个"):"";
      if(!list.length){ box.innerHTML='<div class="xs faint" style="text-align:center;padding:var(--space-4)">还没有存档,先在上方「新建存档」。</div>'; return; }
      list.forEach(function(s){
        var row=document.createElement("div"); row.className="saverow";
        var isCur=(s.slot===SAVE_SLOT);
        row.innerHTML='<div><div class="un">'+(isCur?"⭐ ":"")+s.slot+'</div><div class="um">'+saveSummary(s)+" · "+fmtTime(s.updated_at)+'</div></div>'+
          '<div class="ops"><button class="btn" data-op="load">载入</button><button class="btn" data-op="over">覆盖</button><button class="btn" data-op="del" style="color:var(--danger)">删除</button></div>';
        row.querySelector("button[data-op=load]").onclick=function(){ dbLoadSlot(s.slot); };
        row.querySelector("button[data-op=over]").onclick=function(){ dbOverwriteSlot(s.slot); };
        row.querySelector("button[data-op=del]").onclick=function(){ dbDeleteSlot(s.slot); };
        box.appendChild(row);
      });
    }).catch(function(){ box.innerHTML='<div class="xs" style="text-align:center;padding:var(--space-4)">无法连接存档后端 ('+API_BASE+'),请确认已运行。</div>'; });
  }
  function dbCreateSlot(){
    if(!requireAuth()){ renderAuthUI(); return; }
    var name=el("newSlot").value.trim(); if(!name){ toast("请输入存档名","warn"); return; }
    checkDb().then(function(){ if(!dbOnline){ toast("后端未连接,无法新建存档","warn"); return; }
      META=defMeta(); RUN=null; try{ localStorage.removeItem(META_KEY); localStorage.removeItem(RUN_KEY); }catch(e){}
      SAVE_SLOT=name; try{ localStorage.setItem(SLOT_KEY,name); }catch(e){}
      apiPut(name,META,null).then(function(){ toast("已新建存档「"+name+"」,选一个职业开始吧","ok"); try{ location.reload(); }catch(e){} });
    });
  }
  function dbLoadSlot(slot){
    if(!requireAuth()){ renderAuthUI(); return; }
    checkDb().then(function(){ if(!dbOnline){ toast("后端未连接","warn"); return; }
      apiGet(slot).then(function(d){
        if(!d||!d.meta){ toast("读取存档失败","warn"); return; }
        var f=defMeta(); for(var k in f){ if(d.meta[k]!==undefined) f[k]=d.meta[k]; } META=f; META.upz=META.upz||{}; META.ach=META.ach||{};
        try{ localStorage.setItem(META_KEY,JSON.stringify(META)); }catch(e){}
        if(d.run&&d.run.grid&&(!d.run.v||d.run.v<=2)){ try{ localStorage.setItem(RUN_KEY,JSON.stringify(d.run)); }catch(e){} }
        else { try{ localStorage.removeItem(RUN_KEY); }catch(e){} }
        SAVE_SLOT=slot; try{ localStorage.setItem(SLOT_KEY,slot); }catch(e){}
        toast("已载入「"+slot+"」,正在刷新…","ok");
        setTimeout(function(){ try{ location.reload(); }catch(e){} },400);
      });
    });
  }
  function dbOverwriteSlot(slot){
    if(!requireAuth()){ renderAuthUI(); return; }
    checkDb().then(function(){ if(!dbOnline){ toast("后端未连接","warn"); return; }
      apiPut(slot,META,runCopy()).then(function(){ toast("已把当前进度覆盖到「"+slot+"」","ok"); renderSaveList(); saveStatus(); });
    });
  }
  function dbDeleteSlot(slot){
    if(!requireAuth()){ renderAuthUI(); return; }
    if(!window.confirm("确定删除存档「"+slot+"」?不可恢复。")) return;
    apiDel(slot).then(function(){ toast("已删除「"+slot+"」","ok");
      if(slot===SAVE_SLOT){ SAVE_SLOT=null; try{ localStorage.removeItem(SLOT_KEY); }catch(e){} }
      renderSaveList(); saveStatus(); });
  }
  function openSaves(){ checkDb(); el("newSlot").value=""; renderAuthUI(); renderSaveList(); showOvl("saveScreen"); }
  function closeSaves(){ hideOvl("saveScreen"); }

  /* ---------- screens ---------- */
  function showOvl(id){ el(id).classList.add("on"); }
  function hideOvl(id){ el(id).classList.remove("on"); }
  function panel(id,on){ el(id).style.display=on?"":"none"; }
  function showGame(){ panel("gameArea",true); panel("startScreen",false); hideOvl("deathScreen"); hideOvl("boonScreen"); hideOvl("eventScreen"); }
  function showStart(){ panel("gameArea",false); panel("startScreen",true); hideOvl("deathScreen"); hideOvl("boonScreen"); hideOvl("eventScreen"); hideOvl("wardrobeScreen"); panel("metaPanel",false); panel("achPanel",false); el("hideMetaBtn").style.display="none"; renderResume(); renderPreview(); }
  function renderResume(){ var b=el("continueBtn"); if(RUN&&!RUN.over){ b.style.display="inline-block"; b.textContent="▶ 继续当前攀塔 (第 "+(RUN.floor||1)+" 层)"; } else b.style.display="none"; }
  function continueRun(){ if(RUN&&!RUN.over){ showGame(); render(); } else renderResume(); }

  function renderClassChoices(){
    var box=el("classChoices"); box.innerHTML="";
    Object.keys(CLASSES).forEach(function(id){
      var c=CLASSES[id], locked=!classUnlocked(id), unlockHint="";
      if(id==="ranger") unlockHint=" · 塔魂解锁";
      if(id==="mage") unlockHint=" · 塔魂解锁";
      if(id==="berserker") unlockHint=" · 累计击杀 30";
      var d=document.createElement("button"); d.className="choice";
      d.innerHTML='<span class="ico">'+c.ico+'</span><span style="flex:1;min-width:0"><span class="ct">'+c.name+' <span class="tag '+(locked?"lock":"cls")+'">'+c.hp+'血/攻'+c.atk+'</span></span><span class="cd">'+c.desc+unlockHint+'</span></span>'+(locked?'<span class="faint">🔒</span>':'');
      d.disabled=locked; if(!locked) d.onclick=function(){ beginRun(id); };
      box.appendChild(d);
    });
  }
  function beginRun(clsId, seed, label){
    RUN=makeRun(clsId); RUN.potionsUsed=0;
    META.runSeed = seed || (1+Math.floor(Math.random()*1e9));
    runRand = mulberry32(META.runSeed);
    spawn(RUN.floor); RUN.hp=RUN.maxHp();
    log((label||"你在第 1 层醒来。")+(META.lastRun?" 兜里装着上一世留给你的「回响」。":" (第一世,还没有回响。)"));
    renderSeed(); showGame(); render(); saveRun();
    if(upLevel("heirloom")>0 && !RUN.heirloomPicked){ RUN.heirloomPicked=true; presentStartRelic(); }
  }
  function dailySeed(){ var d=new Date(); return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate(); }
  function beginDaily(){ var unlocked=Object.keys(CLASSES).filter(function(c){return classUnlocked(c);}); var c=unlocked[Math.floor(Math.random()*unlocked.length)]||"guard"; beginRun(c, dailySeed(), "🌅 每日挑战开始(种子 "+dailySeed()+")。"); }
  function renderSeed(){ var s=el("seedTxt"); if(s) s.textContent="本局种子 "+META.runSeed; }
  function backToMenu(){ saveRun(); renderClassChoices(); showStart(); }

  function refreshMeta(){
    el("soulsN").textContent=META.souls; el("bestFloor").textContent=META.bestFloor; el("killsN").textContent=META.totalKills;
    var box=el("metaList"); box.innerHTML="";
    UPG.forEach(function(u){ var lvl=upLevel(u.id),maxed=lvl>=u.max;
      var d=document.createElement("div"); d.className="shopitem";
      d.innerHTML='<span style="font-size:22px">'+u.ico+'</span><span class="info" style="flex:1;min-width:0"><span class="n">'+u.name+'</span><span class="d">'+u.desc+'</span></span><span class="lvl">Lv '+lvl+'/'+u.max+'</span>'+
        '<button class="btn btn-primary" data-up="'+u.id+'" '+(maxed?"disabled":"")+' style="min-width:96px">'+(maxed?"已满级":fmtN(upCost(u)))+'</button>';
      box.appendChild(d); });
    box.onclick=function(e){ var b=e.target.closest("button[data-up]"); if(b) buyUp(b.getAttribute("data-up")); };
  }
  function fmtN(n){ return n>=10000?(Math.round(n/1000)/10)+"万":n; }

  var disguised=false;
  function setDisguise(on){ disguised=on; el("disguise").classList.toggle("on",on); if(on) dgClock(); }
  function dgClock(){ var d=new Date(); var p=function(n){return ("0"+n).slice(-2);}; el("dgClock").textContent=d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+" "+p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds()); }

  /* ---------- input ---------- */
  var menuFocus=[], fidx=0;
  function activePanel(){
    var map=[["settingsScreen",el("settingsScreen")],["saveScreen",el("saveScreen")],["wardrobeScreen",el("wardrobeScreen")],["boonScreen",el("boonScreen")],["eventScreen",el("eventScreen")],["compendiumScreen",el("compendiumScreen")],["equipmentScreen",el("equipmentScreen")],["deathScreen",el("deathScreen")]];
    for(var i=0;i<map.length;i++){ if(map[i][1].classList.contains("on")) return map[i][1]; }
    if(el("startScreen").style.display!=="none") return el("startScreen");
    return null;
  }
  function focusList(){ var p=activePanel(); if(!p||!p.querySelectorAll) return []; var out=[]; p.querySelectorAll("button,.choice,.skin,.tab").forEach(function(b){ if(!b.disabled) out.push(b); }); return out; }
  function menuKey(k){
    var list=focusList(); if(!list.length) return false; if(fidx>=list.length) fidx=0;
    if(k==="ArrowDown"||k==="ArrowRight") fidx=(fidx+1)%list.length;
    else if(k==="ArrowUp"||k==="ArrowLeft") fidx=(fidx-1+list.length)%list.length;
    else if(k==="Enter"||k===" "){ try{ list[fidx].click(); }catch(e){} return true; }
    else return false;
    list.forEach(function(b,i){ if(b.classList) b.classList.toggle("focused", i===fidx); else b.className=(i===fidx?"focused":""); });
    try{ if(list[fidx].focus) list[fidx].focus(); }catch(e){}
    return true;
  }
  function closeTopOverlay(){
    if(el("settingsScreen").classList.contains("on")){ closeSettings(); return; }
    if(el("saveScreen").classList.contains("on")){ closeSaves(); return; }
    if(el("wardrobeScreen").classList.contains("on")){ closeWardrobe(); return; }
    if(el("boonScreen").classList.contains("on")){ hideOvl("boonScreen"); return; }
    if(el("eventScreen").classList.contains("on")){ closeEvent(); return; }
    if(el("compendiumScreen").classList.contains("on")){ closeCompendium(); return; }
    if(el("equipmentScreen").classList.contains("on")){ closeEquip(); return; }
    if(el("deathScreen").classList.contains("on")){ hideOvl("deathScreen"); showStart(); renderClassChoices(); return; }
  }
  function ovOpen(){ return el("settingsScreen").classList.contains("on")||el("saveScreen").classList.contains("on")||el("wardrobeScreen").classList.contains("on")||el("boonScreen").classList.contains("on")||el("eventScreen").classList.contains("on")||el("compendiumScreen").classList.contains("on")||el("equipmentScreen").classList.contains("on")||el("deathScreen").classList.contains("on"); }

  document.addEventListener("keydown", function(e){
    ensureAudio();
    if(disguised){ if(e.key==="Escape") setDisguise(false); return; }
    var navKeys=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter"," "];
    if(ovOpen() || el("startScreen").style.display!=="none"){
      if(e.key==="Escape"){ if(ovOpen()) closeTopOverlay(); return; }
      if(navKeys.indexOf(e.key)>=0){ e.preventDefault(); menuKey(e.key); }
      return;
    }
    if(!RUN||RUN.over) return;
    var k=e.key;
    if(k==="ArrowUp"||k==="w"||k==="W"){ e.preventDefault(); move(0,-1); }
    else if(k==="ArrowDown"||k==="s"||k==="S"){ e.preventDefault(); move(0,1); }
    else if(k==="ArrowLeft"||k==="a"||k==="A"){ e.preventDefault(); move(-1,0); }
    else if(k==="ArrowRight"||k==="d"||k==="D"){ e.preventDefault(); move(1,0); }
    else if(k===" "){ e.preventDefault(); attackAdjacent(); }
    else if(k==="p"||k==="P"){ usePotion(); }
    else if(k==="e"||k==="E"){ useEcho(); }
    else if(k==="1"){ var sk=SKILLS.filter(function(s){return s.cls===RUN.cls;}); if(sk[0]) useSkill(sk[0].id); }
    else if(k==="2"){ var sk2=SKILLS.filter(function(s){return s.cls===RUN.cls;}); if(sk2[1]) useSkill(sk2[1].id); }
    else if(k==="b"||k==="B"){ setDisguise(true); }
  });

  /* ---------- wiring ---------- */
  function wire(){
    el("atkBtn").onclick=attackAdjacent;
    el("potionBtn").onclick=usePotion;
    el("echoBtn").onclick=useEcho;
    el("waitBtn").onclick=waitTurn;
    el("saveBtn").onclick=openSaves;
    el("authBtn").onclick=openSaves;
    el("createSaveBtn").onclick=dbCreateSlot;
    el("saveClose").onclick=closeSaves;
    el("quitBtn").onclick=backToMenu;
    el("disguiseBtn").onclick=function(){ setDisguise(true); };
    el("dgReturn").onclick=function(){ setDisguise(false); };
    el("continueBtn").onclick=continueRun;
    el("wardrobeBtn").onclick=openWardrobe;
    el("wardClose").onclick=closeWardrobe;
    el("soundBtn").onclick=function(){ META.sound=!META.sound; saveMeta(); updateSoundBtn(); ensureAudio(); if(META.sound) SFX.click(); toast(META.sound?"🔊 音效开启":"🔇 音效已关闭"); };
    el("settingsBtn").onclick=openSettings;
    el("compendiumBtn").onclick=openCompendium;
    el("openEquipBtn").onclick=function(){ openEquip(); };
    el("eqClose").onclick=closeEquip;
    el("compClose").onclick=closeCompendium;
    el("settingsClose").onclick=closeSettings;
    el("sndToggle").onclick=function(){ META.sound=!META.sound; saveMeta(); updateSoundBtn(); toast(META.sound?"🔊 音效开启":"🔇 音效已关闭"); if(META.sound) SFX.click(); };
    el("exportBtn").onclick=exportSave;
    el("importBtn").onclick=importSave;
    el("resetBtn").onclick=confirmReset;
    el("dRestart").onclick=function(){ hideOvl("deathScreen"); showStart(); renderClassChoices(); };
    el("dMeta").onclick=function(){ hideOvl("deathScreen"); showStart(); panel("metaPanel",true); refreshMeta(); el("hideMetaBtn").style.display="inline-block"; };
    el("metaBtn").onclick=function(){ panel("metaPanel",true); panel("achPanel",false); refreshMeta(); el("hideMetaBtn").style.display="inline-block"; };
    el("achBtn").onclick=function(){ panel("achPanel",true); panel("metaPanel",false); renderAch(); el("hideMetaBtn").style.display="inline-block"; };
    el("dailyBtn").onclick=beginDaily;
    el("hideMetaBtn").onclick=function(){ panel("metaPanel",false); panel("achPanel",false); el("hideMetaBtn").style.display="none"; };
    // wardrobe tabs
    var tabs=el("wardTabs").querySelectorAll(".tab");
    tabs.forEach(function(t){ t.onclick=function(){ tabs.forEach(function(x){x.classList.remove("on");}); t.classList.add("on"); wardTab=t.getAttribute("data-tab"); renderWardrobe(); }; });
  }

  /* ---------- init ---------- */
  loadMeta();
  wire();
  renderClassChoices();
  refreshMeta();
  renderAch();
  updateSoundBtn();
  shakeLoop();
  document.addEventListener("pointerdown", ensureAudio);
  try{ SAVE_SLOT=localStorage.getItem(SLOT_KEY)||null; }catch(e){}
  loadAuth();
  // validate persisted token; drop it if stale/unauthorized
  if(AUTH.token){ apiMe().then(function(d){ if(!d||!d.username){ clearAuth(); } else { persistAuth(d.username); } renderAuthUI(); saveStatus(); }).catch(function(){ renderAuthUI(); saveStatus(); }); }
  else { renderAuthUI(); }
  checkDb();
  var saved=loadRun();
  if(saved){ RUN.hp=Math.min(RUN.hp,RUN.maxHp()); showGame(); render();
    el("resumeBox").style.display="block"; el("resumeBox").innerHTML="检测到未完成的一局,已为你续上 (第 "+RUN.floor+" 层)。按 ⌂ 可回主界面重选职业。"; }
  else showStart();

  window.__T={ meta:function(){return META;}, run:function(){return RUN;}, newRun:beginRun, move:move,
    attack:attackAdjacent, potion:usePotion, echo:useEcho, ascend:ascend, chooseBoon:chooseBoon, buyUp:buyUp,
    back:backToMenu, skill:useSkill, forceSpawn:spawn, equip:equipSkin, shop:openShop, closeShop:closeEvent, rnd:rnd,
    daily:beginDaily, dailySeed:dailySeed, menuKey:menuKey, rint:rint,
    dbPut:apiPut, dbGet:apiGet, dbList:apiList, dbDel:apiDel, dbCreate:dbCreateSlot, dbLoad:dbLoadSlot, dbOverwrite:dbOverwriteSlot,
    openSaves:openSaves, dbStatus:function(){ return { online:dbOnline, slot:SAVE_SLOT }; } };
})();
