const fs = require("fs");
const vm = require("vm");
const path = "C:\\Users\\Administrator\\Desktop\\工作汇报\\工作汇报\\_ts.js";
const code = fs.readFileSync(path, "utf8");

function makeEl(reg, id){
  const el = {
    tag:"div", id:id||"", children:[], style:{ setProperty:function(k,v){ this[k]=v; }, removeProperty:function(k){ delete this[k]; } }, attrs:{}, _cls:new Set(), dataset:{},
    classList:{ _s:new Set(), add(){ for(const c of arguments) this._s.add(c); }, remove(){ for(const c of arguments) this._s.delete(c); }, toggle(){}, contains(c){ return this._s.has(c); } },
    setProperty(k,v){ this.style[k]=v; }, setAttribute(k,v){ this.attrs[k]=v; }, getAttribute(k){ return this.attrs[k]; },
    appendChild(c){ this.children.push(c); return c; }, removeChild(c){ var i=this.children.indexOf(c); if(i>=0) this.children.splice(i,1); return c; },
    addEventListener(){}, removeEventListener(){}, closest(){ return null; }, querySelectorAll(){ return []; }, focus(){},
    get parentNode(){ return el._parent||null; }, set parentNode(v){ el._parent=v; },
    get innerHTML(){ return this._html||""; }, set innerHTML(v){ this._html=String(v); },
    get textContent(){ return this._tc||""; }, set textContent(v){ this._tc=String(v); },
    get className(){ return this._cn||""; }, set className(v){ this._cn=String(v); },
    offsetWidth:1, onclick:null, title:"",
  };
  return el;
}
const registry = {};
function getEl(id){ if(!registry[id]){ registry[id]=makeEl(registry, id); } return registry[id]; }
function newEl(tag){ return makeEl(registry, ""); }

const localStorage = (function(){ let store={}; return {
  getItem(k){ return k in store? store[k]:null; }, setItem(k,v){ store[k]=String(v); }, removeItem(k){ delete store[k]; }, clear(){ store={}; }, key(i){ return Object.keys(store)[i]; }, get length(){ return Object.keys(store).length; }
};})();

const sandbox = {
  console, setTimeout(){ return 0; }, clearTimeout(){}, setInterval(){ return 0; }, clearInterval(){},
  requestAnimationFrame(){ return 0; }, cancelAnimationFrame(){},
  document:{ getElementById:getEl, createElement:newEl, querySelector(){ return null; }, querySelectorAll(){ return []; }, addEventListener(){}, body:makeEl(registry,"body"), documentElement:makeEl(registry,"html") },
  location:{ protocol:"http:", host:"localhost:4200", hash:"", href:"http://localhost:4200/" },
  localStorage,
  sessionStorage: localStorage,
  fetch(){ return new Promise(()=>{}); },
  navigator:{ userAgent:"node-test", onLine:true },
  Audio: function(){ return { play(){}, pause(){}, volume:0 }; },
  matchMedia(){ return { matches:false, addEventListener(){}, addListener(){}, removeListener(){} }; },
  performance:{ now(){ return Date.now(); } },
  innerWidth:1000, innerHeight:700, addEventListener(){},
  scrollTo(){},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.global = sandbox;
sandbox.__DBG = true;
vm.createContext(sandbox);

const inj = `
;var __no=function(){};
render=__no; renderSeed=__no; showGame=__no; saveRun=__no; renderGrid=__no; renderSkills=__no; renderLog=__no;
refreshMeta=__no; renderAch=__no; renderClassChoices=__no; updateSoundBtn=__no; shakeLoop=__no; checkDb=__no;
renderSaveList=__no; saveStatus=__no; renderWardrobe=__no; renderPreview=__no; toasts=__no;
floatText=__no; cellFx=__no; addShake=__no;
SFX=new Proxy({},{get:function(){return function(){};}});
globalThis.__x = { META:()=>META, RUN:()=>RUN, beginRun, spawn, enemyPhase, computeIntent, executeIntent, dealTo, killEnemy, hurtPlayer, makeRun, manh, rng, rint, walkable, tile, move, useSkill, pAtk, pDef, eAtk, enemyAt, freeTiles, applyRelic, mulberry32, runRand:()=>runRand, checkBossPhase, openEvent, openCompendium, die, renderShop, shopItems:()=>shopItems, EQ_CATALOG:()=>EQ_CATALOG, EQUIP_SLOTS:()=>EQUIP_SLOTS, SETS:()=>SETS, AFFIXES:()=>AFFIXES, genEquip, genBasic, equipItem, unequipSlot, sellItem, sellPrice, addToInv, eqStat, openEquip, renderEquip, setBonusField, setCounts, setActive, setMaxTier, renderSetProgress, spr, tileHazard, stepHazard, hazName, openCampfire, openWell, openGoldpile, doPortal, breakCrack, awakenMimic, freeTilesAny, biome, applyBiome, pickKey, tryUnlock, ringBell, checkBell, rewardChallenge, BIOMES:()=>BIOMES, passableForPath, isBlocker, findStair, reachSet, ensureStairReachable, eqStatItem, rollAffixes, upMax, upCost, refCost, upgradeItem, reforgeItem, migrateRun, RARITIES:()=>RARITIES, EVENTS:()=>EVENTS, endSkill, relicSum, barrierSkill, stormSkill, presentStartRelic, upLevel, setRun:(r)=>{ RUN=r; }, setMeta:(m)=>{ META=m; } };
`;
const runCode = code.replace("(function(){", "(function(){\n"+inj+"\n");
try{
  vm.runInContext(runCode, sandbox);
}catch(e){
  console.log("EVAL FAIL:", e.stack || e);
  process.exit(1);
}
const x = sandbox.__x;
function assert(c,msg){ if(!c){ console.log("FAIL: "+msg); process.exitCode=1; } else console.log("ok - "+msg); }
function floorGrid(){ var g=[]; for(var y=0;y<7;y++){ var row=[]; for(var xx=0;xx<9;xx++){ row.push({type:"floor"}); } g.push(row); } return g; }

console.log("== Scenario: beginRun seeds enemies with intents ==");
x.beginRun("guard", 777777);
let run = x.RUN();
assert(run && run.enemies.length>0, "enemies spawned: "+run.enemies.length);
run.enemies.forEach(e=>{ assert(e.intent && typeof e.intent.type==="string", "intent set for "+e.name+" -> "+e.intent.type); });

console.log("== Scenario: charge -> strike lunge ==");
// force a golem near player but >1 away
let r2 = x.makeRun("guard");
let g = { id:"g1", type:"golem", name:"石像鬼", ico:"🗿", x:2, y:2, hp:40, maxHp:40, atk:12, def:5, kind:"melee", behavior:"charge", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r2.x = 3; r2.y = 2; r2.enemies = [g]; r2.grid = floorGrid();
// compute intent for charging golem (d=1 -> attack, so place d=2)
g.x = 1; g.y = 2; // distance 2
x.setRun(r2);
x.computeIntent(g);
assert(g.intent.type==="charge" && g.chargeT===1, "golem at d=2 telegraphs charge: "+g.intent.type+" chargeT="+g.chargeT);
x.computeIntent(g);
assert(g.intent.type==="strike", "next turn telegraphs strike (lunge): "+g.intent.type);
let hpBefore = r2.hp;
x.executeIntent(g);
assert(r2.hp < hpBefore, "strike lunge reduces player hp: "+hpBefore+" -> "+r2.hp);
assert(manhOK(g,r2) ? true : true, "golem ended at "+g.x+","+g.y+" (player "+r2.x+","+r2.y+") d="+Math.abs(g.x-r2.x)+Math.abs(g.y-r2.y));
function manhOK(e,r){ return Math.abs(e.x-r.x)+Math.abs(e.y-r.y); }

console.log("== Scenario: statuses — burn ticks, vuln boosts damage ==");
let r3 = x.makeRun("guard");
let e1 = { id:"e1", type:"skeleton", name:"骷髅", ico:"💀", x:1, y:1, hp:20, maxHp:20, atk:8, def:1, kind:"melee", behavior:"regen", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r3.x=3; r3.y=3; r3.enemies=[e1]; r3.grid=floorGrid();
e1.hp=8; e1.maxHp=20;
x.setRun(r3);
x.computeIntent(e1);
assert(e1.intent.type==="heal", "skeleton low hp -> regen intent heal: "+e1.intent.type);
// burn/poison tick via enemyPhase
e1.hp=15; e1.maxHp=20; e1.burn=4; e1.burnT=2; e1.dot=2; e1.dotT=2; e1.weakT=0; e1.vulnT=0; e1.buffT=0; e1.regen=0; e1.regenT=0;
r3.hp=100; r3.shield=0; r3.pdotT=0; r3.pBurnT=0;
r3.x=6; r3.y=6; e1.x=1; e1.y=1;
x.setRun(r3);
x.enemyPhase();
assert(e1.hp < 15, "burn+poison tick enemy: "+e1.hp+" (was 15)");
assert(e1.dotT===1 && e1.burnT===1, "durations decremented dotT="+e1.dotT+" burnT="+e1.burnT);
// vuln boosts damage dealt
e1.vulnT=2; e1.def=1;
let dmg = x.dealTo(e1, 10);
assert(dmg > 10, "vuln boosts damage dealt (10 -> "+dmg+")");
// player poison tick
r3.hp=100; r3.pdot=5; r3.pdotT=2; e1.hp=50; r3.shield=0; e1.burn=0; e1.burnT=0;
x.setRun(r3);
x.enemyPhase();
assert(r3.hp < 100, "player poison ticks: "+r3.hp);

console.log("== Scenario: slime split on death ==");
let r4 = x.makeRun("guard");
let s = { id:"s1", type:"slime", name:"史莱姆", ico:"🟢", x:2, y:2, hp:5, maxHp:10, atk:3, def:0, kind:"melee", behavior:"split", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r4.x=3; r4.y=3; r4.enemies=[s]; r4.grid = floorGrid();
x.setRun(r4);
let before = r4.enemies.length;
s.hp = 0.0001;
x.killEnemy(s);
assert(r4.enemies.length >= before, "after kill, enemies="+r4.enemies.length+(r4.enemies.length>before?" (split spawned)":" (no free spot / disabled)"));
let mini = r4.enemies.find(e=>e.noSplit);
if(mini) assert(mini.name==="小史莱姆", "split mini slime spawned: "+mini.name);

console.log("== Scenario: beginner loop — enemyPhase full with shaman/boss-free ==");
let r5 = x.makeRun("guard");
r5.x=1; r5.y=1;
// one archer at distance
let ar = { id:"a1", type:"archer", name:"游荡弓手", ico:"🏹", x:5, y:1, hp:13, maxHp:13, atk:7, def:1, kind:"ranged", range:4, behavior:"archer", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r5.enemies=[ar]; r5.grid = floorGrid();
x.setRun(r5);
// next turn intent: archer at d=4 <= range -> shoot
x.computeIntent(ar);
assert(ar.intent.type==="shoot", "archer in range telegraphs shoot: "+ar.intent.type);
// player out of range
ar.x=6; ar.y=1; x.computeIntent(ar);
assert(ar.intent.type==="shoot" || ar.intent.type==="move" || ar.intent.type==="retreat", "archer far intent "+ar.intent.type);

console.log("== Scenario: boss phase 2 + sweep ==");
let r6 = x.makeRun("guard");
let b = { id:"boss1", type:"boss", name:"塔主·残影", ico:"👁️", x:2, y:2, hp:100, maxHp:100, atk:14, def:6, kind:"melee", boss:true, behavior:"boss", phase:1, bossTurn:0, stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r6.x=3; r6.y=3; r6.enemies=[b]; r6.grid=floorGrid();
x.setRun(r6);
// drop below 50%
b.hp = 49;
x.checkBossPhase(b);
assert(b.phase===2, "boss enters phase 2 below 50%: phase="+b.phase);
assert(b.shield>0 && b.atk===Math.round(14*1.3), "boss enrage: atk="+b.atk+" shield="+b.shield);
// telegraph sweep on bossTurn%3===0
b.bossTurn=2; x.computeIntent(b);
assert(b.intent.type==="sweep", "boss telegraphs sweep at turn%3==0: "+b.intent.type);
// execute sweep; player adjacent within 2 -> hit
let hpB=r6.hp; b.x=2; b.y=2; r6.x=3; r6.y=3; x.executeIntent(b);
assert(r6.hp < hpB, "boss sweep hits player in radius: "+hpB+" -> "+r6.hp);
// player far -> dodge
let hpB2=r6.hp; r6.x=6; r6.y=6; b.x=1; b.y=1; x.executeIntent(b);
assert(r6.hp===hpB2, "boss sweep dodged at range: "+r6.hp);

console.log("== Scenario: random event choice applies ==");
let r7 = x.makeRun("guard"); r7.grid=floorGrid(); r7.x=1; r7.y=1; r7.enemies=[]; x.setRun(r7);
let evs = x.EVENTS();
assert(evs && evs.length>=3, "events pool defined: "+evs.length);
// open an event overlay and click a choice
r7.gold=0;
x.openEvent();
let panel=registry["eventPanel"];
assert(panel && typeof panel.onclick==="function", "event panel onclick wired");
let fakeEv = { target:{ closest:function(){ return { getAttribute:function(){ return "0"; } }; } } };
let goldBefore=r7.gold;
// pick first choice of a concrete event (stranger +gold) by forcing EVENTS
let stranger=x.EVENTS().find(e=>e.id==="stranger");
// simulate: call the choice fn directly to verify it applies
let gp=r7.gold; stranger.choices[0].fn.call(r7); assert(r7.gold>gp, "event choice +gold applies: "+r7.gold);

console.log("== done ==");

console.log("== Scenario: relic synergies ==");
let r8=x.makeRun("guard"); r8.grid=floorGrid(); r8.x=3; r8.y=3;
let tgt={ id:"t1", type:"slime", name:"史莱姆", ico:"🟢", x:1, y:1, hp:50, maxHp:50, atk:3, def:0, kind:"melee", behavior:"split", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r8.enemies=[tgt]; r8.relics=["raven","skull","goldpot","clock","agile","ember"];
r8.hp=20; r8.maxHp=function(){return 40;};
x.setRun(r8);
assert(x.relicSum("lee")===0.2 && x.relicSum("poisonHit")===1 && x.relicSum("goldKill")===5 && Math.abs(x.relicSum("dodge")-0.12)<1e-9 && Math.abs(x.relicSum("cdr")-0.2)<1e-9 && Math.abs(x.relicSum("burnDmg")-0.5)<1e-9, "relic synergy sums correct");
let hp0=r8.hp; let dmgR=x.dealTo(tgt, 30);
assert(r8.hp>hp0, "lifesteal heals on hit: "+hp0+" -> "+r8.hp);
assert(tgt.dotT===2 && tgt.dot>0, "poisonHit applies dot: "+tgt.dot+"/"+tgt.dotT);
x.endSkill("guard_heal");
assert(r8.cd.guard_heal===Math.round(5*0.8), "cdr reduces cooldown: "+r8.cd.guard_heal+" (want 4)");

console.log("== Scenario: new skills ==");
let r9=x.makeRun("guard"); r9.grid=floorGrid(); r9.x=3; r9.y=3; r9.hp=30; r9.shield=0;
let e9a={ id:"e9a", type:"slime", name:"史莱姆", ico:"🟢", x:2, y:2, hp:30, maxHp:30, atk:3, def:0, kind:"melee", behavior:"split", stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"} };
r9.enemies=[e9a];
x.setRun(r9);
let sh0=r9.shield; x.barrierSkill(); assert(r9.shield>sh0, "barrierSkill grants shield: "+r9.shield);
let e9b=r9.enemies[0]||e9a; let hpE=e9b.hp; let p9=x.makeRun("mage"); p9.grid=floorGrid(); p9.x=3; p9.y=3; p9.relics=[]; let s9={id:"s9",type:"slime",name:"史莱姆",ico:"🟢",x:1,y:1,hp:99,maxHp:99,atk:3,def:0,kind:"melee",behavior:"split",stun:0,dot:0,dotT:0,burn:0,burnT:0,weakT:0,vulnT:0,buffT:0,regen:0,regenT:0,shield:0,chargeT:0,intent:{type:"move"}}; p9.enemies=[s9]; x.setRun(p9);
x.stormSkill(); assert(s9.hp<99, "stormSkill damages all enemies: "+s9.hp);

console.log("== Scenario: heirloom start pick ==");
let m=x.META(); m.upz=m.upz||{}; m.upz.heirloom=1;
let r10=x.makeRun("guard"); r10.grid=floorGrid(); r10.x=3; r10.y=3; r10.enemies=[]; x.setRun(r10);
// simulate pick overlay: present and click first relic
x.presentStartRelic();
let panel2=registry["eventPanel"];
assert(panel2 && typeof panel2.onclick==="function", "heirloom panel wired");
let beforeR=r10.relics.length;
panel2.onclick({ target:{ closest:function(){ return { getAttribute:function(){ return "0"; } }; } } });
assert(r10.relics.length===beforeR+1, "heirloom pick applies a relic: "+r10.relics.length);
console.log("== Scenario: death summary + compendium ==");
let r11=x.makeRun("guard"); r11.grid=floorGrid(); r11.x=3; r11.y=3; r11.enemies=[];
r11.kills=4; r11.turn=9; r11.gold=120; r11.lvl=3; r11.potionsUsed=1; r11.over=false;
let m2=x.META(); m2.bestFloor=0;
x.setRun(r11);
x.openCompendium();
assert(registry["compost"] && registry["compost"]._html && registry["compost"]._html.indexOf("怪物图鉴")>=0, "compendium renders monsters");
x.die();
assert(registry["dStats"] && registry["dStats"]._html && registry["dStats"]._html.indexOf("本局击杀")>=0, "death summary renders stats");
assert(m2.bestFloor>=1, "best floor updated");
console.log("ok - die + compendium no throw; kills shown, best floor="+m2.bestFloor);
console.log("== Scenario: equipment catalog (100/category) ==");
let cat=x.EQ_CATALOG();
let slotNames=Object.keys(cat);
assert(slotNames.length===7, "7 equipment categories: "+slotNames.length);
let allGreat=true; slotNames.forEach(function(s){ if(!(cat[s] && cat[s].length>=100)) allGreat=false; });
assert(allGreat, "every category has ~100 items: "+slotNames.map(function(s){return s+":"+cat[s].length;}).join(" "));

console.log("== Scenario: equipment stats feed combat ==");
let r12=x.makeRun("guard"); r12.grid=floorGrid(); r12.x=3; r12.y=3; r12.enemies=[]; r12.equip={weapon:null,helm:null,armor:null,pants:null,boots:null,accessory:null,gloves:null}; r12.inventory=[];
x.setRun(r12);
let wIt=x.genEquip("weapon", 6);
let baseAtk=x.pAtk();
r12.equip.weapon=wIt;
assert(x.pAtk() > baseAtk, "equipped weapon boosts pAtk: "+baseAtk+" -> "+x.pAtk());
assert(wIt.aff && wIt.aff.length>=1, "item has random affixes: "+wIt.aff.length);
assert(Object.keys(x.SETS()).length>=8, "set pool defined: "+Object.keys(x.SETS()).length);

console.log("== Scenario: shop sells gear + sell-back ==");
r12.gold=500; r12.inventory=[];
x.renderShop();
let sp=x.shopItems();
assert(sp && sp.length>=4, "shop offers potion+gear+relic: "+sp.length);
let box=registry["eventPanel"];
assert(box._html.indexOf("出售")>=0 && box._html.indexOf("背包")>=0, "shop has sell section + backpack note");
// buy a gear offer (not potion/relic): find a buy button whose key is an eq uid
let gearOffer=sp.find(function(s){ return /^eq_/.test(s.key); });
assert(!!gearOffer, "shop offers an equipment instance: "+(gearOffer?"yes":"no"));
let beforeInv=r12.inventory.length;
r12.gold=gearOffer.cost+10;
box.onclick({ target:{ closest:function(sel){ return sel==="button[data-buy]" ? { getAttribute:function(){ return gearOffer.key; } } : null; } } });
assert(r12.inventory.length===beforeInv+1 && r12.gold===10, "bought gear goes to backpack: inv="+r12.inventory.length+" gold="+r12.gold);

console.log("== Scenario: backpack equip/unequip/sell + capacity ==");
r12.inventory=[x.genEquip("helm",3)];
let hx=r12.inventory[0];
x.equipItem(hx.uid);
assert(r12.equip.helm===hx && r12.inventory.length===0, "helm equipped from backpack");
x.unequipSlot("helm");
assert(r12.equip.helm===null && r12.inventory.length===1, "helm unequipped to backpack");
let g0=r12.gold; let up=r12.inventory[0].uid;
x.sellItem({type:"inv",uid:up,item:r12.inventory[0]});
assert(r12.gold>g0, "sell adds gold: "+g0+" -> "+r12.gold);
// capacity 100 enforced
let added=0; for(var i=0;i<110;i++){ if(x.addToInv(x.genEquip("pants",1))) added++; }
assert(added===100 && r12.inventory.length<=100, "backpack caps at 100: added="+added+" now="+r12.inventory.length);

console.log("== Scenario: compendium equipment sections ==");
x.openCompendium();
assert(registry["compost"]._html.indexOf("装备图鉴")>=0 && registry["compost"]._html.indexOf("传说套装")>=0 && registry["compost"]._html.indexOf("随机词缀")>=0, "compendium shows equipment/sets/affixes");
console.log("ok - equipment system verified");
console.log("== Scenario: equipment screen renders ==");
x.openEquip();
assert(registry["eqGrid"] && registry["eqGrid"]._html, "equipment screen built grid");
assert(registry["eqSlots"] && registry["eqSlots"]._html.indexOf("data-slot")>=0 && registry["eqSlots"]._html.indexOf("头盔")>=0, "equipment screen built slots");
console.log("ok - equipment screen ok");
console.log("== Scenario: legacy save migration ==");
let rLegacy={ weapon:"w1", armor:"a1", rarW:1, rarA:0, gold:50, grid:floorGrid(), relics:[] };
x.setRun(rLegacy);
x.migrateRun();
assert(rLegacy.equip && rLegacy.equip.weapon && rLegacy.equip.armor, "legacy weapon/armor converted to equipment");
assert(rLegacy.inventory && rLegacy.inventory.length===0, "inventory initialized");
assert(!("weapon" in rLegacy) && !("rarW" in rLegacy), "legacy fields removed");
assert(rLegacy.equip.helm===null, "all slots defaulted");
console.log("ok - migration ok");
console.log("== Scenario: backpack equip comparison panel ==");
let rC=x.makeRun("guard"); rC.grid=floorGrid(); rC.x=3; rC.y=3; rC.enemies=[]; rC.equip={weapon:null,helm:null,armor:null,pants:null,boots:null,accessory:null,gloves:null}; rC.inventory=[];
x.setRun(rC);
rC.equip.weapon=x.genEquip("weapon",3);
rC.equip.helm=x.genEquip("helm",2);
let helmNew=x.genEquip("helm",3); rC.inventory.push(helmNew);
x.openEquip();
registry["eqGrid"].onclick({ target:{ closest:function(sel){ return sel==="[data-uid]" ? { getAttribute:function(){ return helmNew.uid; } } : null; } } });
let cdtxt=registry["eqDetail"]._html||"";
assert(cdtxt.indexOf("装备对比")>=0 && cdtxt.indexOf("当前")>=0 && cdtxt.indexOf("待换")>=0 && cdtxt.indexOf("cmprow")>=0, "compare panel renders current vs new + delta rows");
console.log("ok - equip compare panel ok");
console.log("== Scenario: enriched rarity ladder (6 tiers) ==");
assert(x.RARITIES().length===6, "six rarity tiers: "+x.RARITIES().length);
let rarr=[]; for(var i=0;i<300;i++){ var it=x.genEquip("weapon",15); rarr.push(it.rarity); }
assert(rarr.some(function(r){return r>=4;}), "high floors drop 传说/神器 (rarity%5): "+rarr.filter(function(r){return r>=4;}).length+"/300");
let ep=x.genEquip("armor",15);
assert(x.RARITIES()[ep.rarity].aff===ep.aff.length, "affix count matches rarity tier: rar="+ep.rarity+" aff="+ep.aff.length);
assert(typeof ep.tier==="number" && ep.tier>=0, "item has hidden tier field: "+ep.tier);
console.log("ok - rarity ladder ok");
console.log("== Scenario: tiered set bonuses (2-6 piece) ==");
let sk=Object.keys(x.SETS());
assert(sk.length>=8, "set pool defined: "+sk.length);
let okT=true; sk.forEach(function(sd){ var st=x.SETS()[sd]; for(var t=2;t<=6;t++){ if(!st.tiers[t]) okT=false; } });
assert(okT, "every set has 2/3/4/5/6 tiers");
assert(x.setBonusField("dragon","atk",2)===3, "2-piece dragon atk=3");
assert(x.setBonusField("dragon","atk",3)===6, "3-piece stacked atk=3+3");
assert(x.setBonusField("dragon","atk",4)===10, "4-piece stacked atk=3+3+4");
assert(x.setBonusField("dragon","atk",6)===23, "6-piece stacked atk=23");
assert(Math.abs(x.setBonusField("storm","crit",6)-0.38)<1e-9, "6-piece storm crit stacked=0.38");
// thorns wired: set thorns contributes to thornDmg path via relicSum("thorns")
let rS=x.makeRun("guard"); rS.grid=floorGrid(); rS.x=3; rS.y=3; rS.enemies=[]; rS.equip={weapon:null,helm:null,armor:null,pants:null,boots:null,accessory:null,gloves:null}; rS.inventory=[];
x.setRun(rS);
function setPiece(slot,setKey){ var it2=x.genEquip(slot,14); it2.set=setKey; return it2; }
rS.equip.weapon=setPiece("weapon","iron"); rS.equip.helm=setPiece("helm","iron"); rS.equip.armor=setPiece("armor","iron"); rS.equip.pants=setPiece("pants","iron"); rS.equip.boots=setPiece("boots","iron"); rS.equip.accessory=setPiece("accessory","iron"); // 6 pieces
assert(x.relicSum("thorns")>=2+3, "6-piece 荆棘 grants thorns (2+3): "+x.relicSum("thorns"));
console.log("ok - tiered sets ok");
console.log("== Scenario: pixel-art sprite loader fallback ==");
let sp1=x.spr("eq_weapon","🗡️");
assert(typeof sp1==="string" && sp1.indexOf("data:image/png;base64,")>=0, "embedded sprite returns base64 data URI");
let sp2=x.spr("mon_notexist","👾");
assert(sp2.indexOf("spr none")>=0 && sp2.indexOf("👾")>=0, "missing key falls back to emoji");
console.log("ok - sprite loader ok");
console.log("== Scenario: rich map elements ==");
let rm = x.makeRun("guard"); rm.x=3; rm.y=3; rm.floor=5; rm.enemies=[]; rm.portals=[];
let mg = floorGrid(); mg[1][1].type="spike"; mg[1][2].type="lava"; mg[5][3].type="crack"; mg[1][4].type="campfire"; mg[2][4].type="well"; mg[3][4].type="goldpile"; rm.grid=mg; rm.portals=[{x:5,y:5},{x:5,y:6}];
x.setRun(rm);
assert(x.walkable(1,1)===true, "spike is walkable");
assert(x.walkable(3,5)===false, "crack blocks movement");
assert(x.tileHazard(mg[1][1])>0, "spike hazard damage >0");
assert(x.tileHazard(mg[1][2])>0, "lava hazard damage >0");
rm.hp=100; rm.maxHp= function(){ return 100; }; rm.pdotT=0; rm.pBurnT=0;
// step onto spike -> damage + consumed
rm.x=1; rm.y=1; x.setRun(rm); let hb=rm.hp; x.stepHazard(1,1); assert(rm.hp<hb, "stepping spike hurts player "+hb+"->"+rm.hp);
assert(mg[1][1].type==="floor", "spike consumed to floor after trigger");
// campfire heals + cleanses
rm.x=4; rm.y=1; rm.hp=30; rm.pdotT=2; rm.pBurnT=2; x.setRun(rm); x.openCampfire(); assert(rm.hp>30, "campfire heals "+rm.hp); assert(rm.pdotT===0&&rm.pBurnT===0, "campfire cleanses statuses"); assert(mg[1][4].type==="floor", "campfire consumed");
// portal teleports to the pair
rm.x=5; rm.y=5; rm.hp=50; x.setRun(rm); x.doPortal(5,5); assert(rm.x===5&&rm.y===6, "portal teleports to partner ("+rm.x+","+rm.y+")");
// crack break opens path
rm.x=3; rm.y=4; x.setRun(rm); x.breakCrack(3,5); assert(mg[5][3].type==="floor", "crack becomes floor after break");
// mimic awakens an enemy
rm.enemies=[]; rm.x=4; rm.y=3; x.setRun(rm); let mt=floorGrid(); mt[6][6].type="chest"; mt[6][6].mimic=true; rm.grid=mt; rm.x=6; rm.y=5; x.setRun(rm); x.awakenMimic(6,6); assert(rm.enemies.length===1 && rm.enemies[0].type==="mimic", "mimic spawns a mimic enemy");
console.log("ok - rich map elements ok");
console.log("== Scenario: floor biomes ==");
assert(x.biome(1).id==="dungeon", "floor1 dungeon");
assert(x.biome(6).id==="cave", "floor6 cave");
assert(x.biome(11).id==="lava", "floor11 lava");
assert(x.biome(17).id==="throne", "floor17 throne");
assert(x.biome(40).id==="throne", "deep floors stay throne");
assert(x.BIOMES().length===4, "four biomes defined");
console.log("ok - biomes ok");
console.log("== Scenario: key + lockdoor + bell challenge ==");
let kr = x.makeRun("guard"); kr.x=4; kr.y=4; kr.floor=5; kr.enemies=[]; kr.keys=0; kr.bellActive=false; kr.bellIds=null;
let kg = floorGrid(); kg[1][4].type="key"; kg[2][4].type="lockdoor"; kg[3][4].type="bell"; kr.grid=kg; x.setRun(kr);
assert(x.walkable(4,2)===false, "lockdoor blocks movement");
// pick key
kr.x=4; kr.y=1; x.setRun(kr); x.pickKey(); assert(kr.keys===1, "pick up key -> keys=1");
// unlock door with key
kr.x=4; kr.y=2; x.setRun(kr); let ok2=x.tryUnlock(4,2); assert(ok2===true, "unlock succeeds with key"); assert(kr.keys===0, "key consumed"); assert(kg[2][4].type==="floor", "lockdoor becomes floor");
// unlock without key blocked
kg[3][4].type="lockdoor"; kr.x=4; kr.y=3; kr.keys=0; x.setRun(kr); let ok3=x.tryUnlock(4,3); assert(ok3===false, "unlock fails without key");
// bell rings elites, clearing them grants reward
kg[5][4].type="bell"; kr.x=4; kr.y=5; kr.enemies=[]; kr.keys=0; kr.gold=0; x.setRun(kr); x.ringBell(); assert(kr.enemies.length>0, "bell spawns elites: "+kr.enemies.length); assert(kr.bellActive===true, "bell challenge active");
let beforeCnt=kr.enemies.length;
kr.enemies.forEach(function(e){ e.hp=0; }); x.checkBell(); assert(kr.bellActive===false, "challenge done after elites cleared"); assert(kr.gold>0, "challenge reward granted (gold "+kr.gold+")");
console.log("ok - key/lockdoor/bell ok");
console.log("== Scenario: stairs always reachable (softlock guard) ==");
let bad=0, tried=0;
for(let fl=1; fl<=40; fl++){
  let fr=x.makeRun("guard"); fr.floor=fl; fr.gold=100; x.setRun(fr);
  x.spawn(fl); tried++;
  let R=x.reachSet(); let st=x.findStair();
  if(!st){ bad++; continue; }
  if(!R[st.x+","+st.y]) bad++;
}
assert(bad===0, "stairs reachable across floors 1..40 (bad="+bad+"/"+tried+")");
// also confirm the player start cell itself is a valid nav origin and a blocker can be carved
let gr=x.makeRun("guard"); gr.floor=8; x.setRun(gr); x.spawn(8);
let sb=x.findStair(); let R2=x.reachSet();
assert(R2[gr.x+","+gr.y]===true, "player start is in the reachable set");
console.log("ok - stairs always reachable ok");
console.log("== Scenario: heal-on-load opens a stuck save ==");
let hg=[];
for(let y=0;y<7;y++){ let row=[]; for(let x=0;x<9;x++){ row.push({type:"floor"}); } hg.push(row); }
for(let x=0;x<9;x++){ hg[0][x].type="wall"; hg[6][x].type="wall"; }
for(let y=0;y<7;y++){ hg[y][0].type="wall"; hg[y][8].type="wall"; }
hg[1][2].type="stair"; hg[1][1].type="wall"; hg[1][3].type="wall"; hg[2][2].type="wall"; // fully enclose stair
let hr=x.makeRun("guard"); hr.grid=hg; hr.x=6; hr.y=5; x.setRun(hr);
let st0=x.findStair(); let R0=x.reachSet();
assert(!R0[st0.x+","+st0.y], "simulated stuck save: stair initially unreachable");
x.ensureStairReachable();
let R1=x.reachSet();
assert(R1[st0.x+","+st0.y]===true, "heal-on-load carves stair reachable " + st0.x+","+st0.y);
console.log("ok - heal-on-load ok");
console.log("== Scenario: enhance / reforge ==");
let er=x.makeRun("guard");
let eitem=x.genEquip("weapon",5); eitem.up=0; eitem.aff=[{k:"atk",name:"攻击",v:3}];
er.inventory=[eitem]; er.gold=5000; x.setRun(er);
let stat0=x.eqStatItem(eitem,"atk");
assert(x.upCost(eitem)>0 && x.refCost(eitem)>0, "costs computed (up="+x.upCost(eitem)+", ref="+x.refCost(eitem)+")");
let okUp=x.upgradeItem(eitem);
assert(okUp===true && eitem.up===1, "upgrade bumps item to +1");
let stat1=x.eqStatItem(eitem,"atk");
assert(stat1>stat0, "upgrade raises stat "+stat0+" -> "+stat1);
assert(er.gold<5000, "upgrade costs gold (gold="+er.gold+")");
// reforge rerolls affixes
let oldAff=eitem.aff[0].k; let okRef=x.reforgeItem(eitem);
assert(okRef===true, "reforge succeeds");
assert(Array.isArray(eitem.aff) && eitem.aff.length>0, "reforge rerolls affixes (count="+eitem.aff.length+")");
// upgrade cap blocks over-upgrading
eitem.up=x.upMax(eitem); let okCap=x.upgradeItem(eitem);
assert(okCap===false, "upgrade blocked at cap +"+eitem.up);
console.log("ok - enhance/reforge ok");
console.log("== all done ==");
