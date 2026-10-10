const fs = require("fs"), vm = require("vm");
const code = fs.readFileSync("C:\\Users\\Administrator\\Desktop\\工作汇报\\工作汇报\\_ts.js", "utf8");
function makeEl(reg, id){ const el={ tag:"div", id:id||"", children:[], attrs:{}, dataset:{},
  style:{ setProperty:function(k,v){ this[k]=v; }, removeProperty:function(k){ delete this[k]; } },
  classList:{ _s:new Set(), add(){for(const c of arguments)this._s.add(c);}, remove(){for(const c of arguments)this._s.delete(c);}, toggle(){}, contains(c){return this._s.has(c);} },
  setProperty(k,v){this.style[k]=v;}, setAttribute(k,v){this.attrs[k]=v;}, getAttribute(k){return this.attrs[k];},
  appendChild(c){this.children.push(c); return c;}, removeChild(c){var i=this.children.indexOf(c); if(i>=0)this.children.splice(i,1); return c;},
  addEventListener(){}, removeEventListener(){}, closest(){return null;}, querySelectorAll(){return [];}, focus(){},
  get parentNode(){return el._parent||null;}, set parentNode(v){el._parent=v;},
  get innerHTML(){return this._html||"";}, set innerHTML(v){this._html=String(v);},
  get textContent(){return this._tc||"";}, set textContent(v){this._tc=String(v);},
  get className(){return this._cn||"";}, set className(v){this._cn=String(v);},
  offsetWidth:1, onclick:null, title:"" }; return el; }
const registry={}; const getEl=id=>{ if(!registry[id])registry[id]=makeEl(registry,id); return registry[id]; };
const newEl=tag=>makeEl(registry,"");
const localStorage=(function(){let s={}; return { getItem:k=>k in s?s[k]:null, setItem:(k,v)=>{s[k]=String(v);}, removeItem:k=>{delete s[k];}, clear(){s={};}, key:i=>Object.keys(s)[i], get length(){return Object.keys(s).length;} };} )();
const sandbox={ console, setTimeout(){return 0;}, clearTimeout(){}, setInterval(){return 0;}, clearInterval(){},
  requestAnimationFrame(){return 0;}, cancelAnimationFrame(){},
  document:{ getElementById:getEl, createElement:newEl, querySelector(){return null;}, querySelectorAll(){return [];}, addEventListener(){}, body:makeEl(registry,"body"), documentElement:makeEl(registry,"html") },
  location:{protocol:"http:",host:"localhost:4200",hash:"",href:"http://localhost:4200/"}, localStorage, sessionStorage:localStorage,
  fetch(){return new Promise(()=>{});}, navigator:{userAgent:"node-test",onLine:true},
  Audio:function(){return {play(){},pause(){},volume:0};}, matchMedia(){return {matches:false,addEventListener(){},addListener(){},removeListener(){}};},
  performance:{now(){return Date.now();}}, innerWidth:1000, innerHeight:700, addEventListener(){}, scrollTo(){},
};
sandbox.window=sandbox; sandbox.globalThis=sandbox; sandbox.global=sandbox;
vm.createContext(sandbox);
const inj = `;var __no=function(){};
saveRun=__no; refreshMeta=__no; renderAch=__no; renderClassChoices=__no; updateSoundBtn=__no; shakeLoop=__no; checkDb=__no;
renderSaveList=__no; saveStatus=__no; renderShop=__no; renderWardrobe=__no; renderPreview=__no; toasts=__no;
floatText=__no; cellFx=__no; addShake=__no; SFX=new Proxy({},{get:function(){return function(){};}});
globalThis.__x={ RUN:()=>RUN, beginRun, render, renderGrid, enemyPhase, spawn, computeIntent, setRun:(r)=>{RUN=r;} };`;
const runCode = code.replace("(function(){", "(function(){\n"+inj+"\n");
try{ vm.runInContext(runCode, sandbox); }catch(e){ console.log("EVAL FAIL:", e.stack||e); process.exit(1); }
const x=sandbox.__x;
let err=null;
try{
  x.beginRun("guard", 424242);
}catch(e){ err=e.stack||e; }
if(err){ console.log("RENDER FAIL:", err); process.exit(1); }
// grid children = cells; count enemy cells with intent badge
const g = x.RUN();
console.log("beginRun ok, enemies="+g.enemies.length+" floors="+g.floor+" player="+g.x+","+g.y);
console.log("grid children (cells) = "+registry["grid"].children.length);
let shown = registry["grid"].children.filter(c=>c.title && c.title.indexOf("意图:")>=0).length;
console.log("enemy cells with 意图 title = "+shown+" / "+g.enemies.length);
// run an enemyPhase and re-render to confirm intents update
try{ x.enemyPhase(); x.render(); }catch(e){ console.log("PHASE RENDER FAIL:", e.stack||e); process.exit(1); }
console.log("enemyPhase+render ok");
console.log("done");
