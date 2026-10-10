// 回声之塔 · procedural pixel-art generator (offline, deterministic)
// Renders PNG sprites into assets/ matching the game's spr("<key>") names.
const zlib = require('zlib'), fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, 'assets');
fs.mkdirSync(OUT, { recursive: true });

const PALETTE = {
  '.':null, 'K':'#15151d',
  'W':'#e9e7f2', 'G':'#9aa0ad', 'D':'#565b68', 'V':'#3a3a4a',
  'R':'#e05555', 'r':'#7c2626',
  'B':'#5f9df0', 'b':'#274f86',
  'Y':'#f3c452', 'y':'#8f6e2a',
  'P':'#a878f0', 'p':'#57418f',
  'N':'#7bc85e', 'n':'#2f6b33',
  'O':'#f08a4b', 'o':'#9c4d26',
  'C':'#56c6c6', 'c':'#256e6e',
  'T':'#b3946e', 't':'#6b5038',
  'S':'#c6c8d2', 's':'#7b7f8c',
  'M':'#e9c9a8', 'm':'#8a5f3f',
  'L':'#6f75b8', 'l':'#3d4270'
};
function hex(c){ const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16); return [r,g,b,255]; }

function newG(w,h){ const g=Array.from({length:h},()=>Array(w).fill(null)); return g; }
function set(g,x,y,c){ if(x>=0&&y>=0&&x<g[0].length&&y<g.length&&c&&c!=='.') g[y][x]=c; }
function rect(g,x0,y0,w,h,c){ for(let y=y0;y<y0+h;y++) for(let x=x0;x<x0+w;x++) set(g,x,y,c); }
function disc(g,cx,cy,r,c){ for(let y=0;y<g.length;y++) for(let x=0;x<g[0].length;x++){ const dx=x-cx,dy=y-cy; if(dx*dx+dy*dy<=r*r) set(g,x,y,c);} }
function outline(g){ const h=g.length,w=g[0].length; const add=[]; for(let y=0;y<h;y++)for(let x=0;x<w;x++){ if(g[y][x]){ for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){ const nx=x+dx,ny=y+dy; if(nx>=0&&ny>=0&&nx<w&&ny<h&&!g[ny][nx]) add.push([nx,ny,'K']); } } } add.forEach(([x,y,c])=>set(g,x,y,c)); }

function renderPng(w,h,g){
  const raw=Buffer.alloc((w*4+1)*h);
  for(let y=0;y<h;y++){ raw[(w*4+1)*y]=0; for(let x=0;x<w;x++){ const c=g[y][x]; const idx=(w*4+1)*y+1+x*4; if(c){ const p=hex(PALETTE[c]); raw[idx]=p[0];raw[idx+1]=p[1];raw[idx+2]=p[2];raw[idx+3]=p[3]; } } }
  const idat=zlib.deflateSync(raw);
  const chunks=[];
  chunks.push(Buffer.from([0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a]));
  const ihdr=Buffer.alloc(13); ihdr.writeUInt32BE(w,0); ihdr.writeUInt32BE(h,4); ihdr[8]=8; ihdr[9]=6;
  chunks.push(chunk('IHDR',ihdr)); chunks.push(chunk('IDAT',idat)); chunks.push(chunk('IEND',Buffer.alloc(0)));
  return Buffer.concat(chunks);
  function crc32(b){ let c=~0; for(let i=0;i<b.length;i++){ c^=b[i]; for(let k=0;k<8;k++) c=(c>>>1)^(0xEDB88320&-(c&1)); } return ~c>>>0; }
  function chunk(typ,data){ const t=Buffer.from(typ); const len=Buffer.alloc(4); len.writeUInt32BE(data.length,0); const crc=Buffer.alloc(4); crc.writeUInt32BE(crc32(Buffer.concat([t,data])),0); return Buffer.concat([len,t,data,crc]); }
}

function save(name,w,h,paint){ const g=newG(w,h); paint(g); outline(g); const png=renderPng(w,h,g); fs.writeFileSync(path.join(OUT,name+'.png'),png); console.log('wrote',name,w+'x'+h); }

/* ---------------- equipment (32x32) ---------------- */
save('eq_weapon',32,32,(g)=>{ // sword
  rect(g,15,3,2,4,'S'); rect(g,16,4,1,3,'W'); // blade
  for(let y=7;y<20;y++){ set(g,15,y,'S'); set(g,16,y,'S'); set(g,17,y,'W'); }
  rect(g,13,20,7,2,'Y'); // crossguard
  rect(g,15,22,3,3,'T'); rect(g,16,25,1,4,'T'); // grip
  set(g,16,29,'Y'); // pommel
});
save('eq_helm',32,32,(g)=>{ // helmet
  for(let y=8;y<20;y++){ rect(g,10,y,12,1,y<12?'S':'G'); }
  rect(g,13,8,6,4,'D'); // top
  rect(g,11,18,10,5,'D'); // jaw
  set(g,12,13,'.'); set(g,19,13,'.'); // eye slit dark
  rect(g,11,12,2,4,'V'); rect(g,19,12,2,4,'V');
  set(g,12,14,'C'); set(g,19,14,'C'); // glowing eyes
});
save('eq_armor',32,32,(g)=>{ // chest plate
  rect(g,9,8,14,4,'G'); rect(g,8,12,16,8,'S'); rect(g,10,20,12,5,'D');
  rect(g,8,12,2,8,'D'); rect(g,22,12,2,8,'D');
  set(g,15,14,'Y'); // emblem gem
});
save('eq_pants',32,32,(g)=>{ // leg armor
  rect(g,10,8,12,8,'S'); rect(g,9,16,6,10,'D'); rect(g,17,16,6,10,'D');
  rect(g,10,16,4,2,'G'); rect(g,18,16,4,2,'G');
});
save('eq_boots',32,32,(g)=>{ // boot
  rect(g,10,8,12,6,'S'); rect(g,10,14,12,6,'D'); rect(g,10,22,14,3,'t');
  rect(g,24,22,3,3,'T');
});
save('eq_accessory',32,32,(g)=>{ // ring w/ gem
  disc(g,16,16,6,'Y'); disc(g,16,16,4,'y'); set(g,16,16,'.'); set(g,15,16,'.'); set(g,17,16,'.'); set(g,16,15,'.'); set(g,16,17,'.');
  disc(g,16,12,2,'R');
});
save('eq_gloves',32,32,(g)=>{ // gauntlet
  rect(g,10,8,12,6,'S'); rect(g,8,14,16,8,'D'); rect(g,10,22,12,4,'S');
  for(let x=10;x<20;x+=2) set(g,x,18,'G');
});

/* ---------------- monsters (32x32) ---------------- */
save('mon_slime',32,32,(g)=>{
  for(let y=14;y<28;y++){ rect(g,7,y,18,1,'N'); }
  for(let y=15;y<26;y++){ rect(g,6+(y-13),y,20,1,'N'); }
  disc(g,13,21,2,'W'); disc(g,19,21,2,'W'); set(g,13,21,'n'); set(g,19,21,'n');
  disc(g,10,17,2,'n'); // shine
});
save('mon_bat',32,32,(g)=>{
  disc(g,16,16,4,'V'); // body
  rect(g,6,10,10,2,'V'); rect(g,16,10,10,2,'V'); // wings top
  for(let y=12;y<20;y++){ rect(g,4+(y-12),y,10,1,'l'); rect(g,18,y,10,1,'l'); }
  rect(g,7,15,2,6,'l'); rect(g,23,15,2,6,'l'); // wing tips
  set(g,14,15,'R'); set(g,18,15,'R'); // eyes
});
save('mon_goblin',32,32,(g)=>{
  for(let y=10;y<18;y++){ rect(g,10,y,12,1,'N'); }
  set(g,6,12,'N'); set(g,8,10,'N'); set(g,24,12,'N'); set(g,22,10,'N'); // ears
  set(g,13,14,'W'); set(g,19,14,'W'); set(g,13,15,'n'); set(g,19,15,'n'); // eyes
  set(g,16,17,'r'); // mouth
  rect(g,11,20,10,6,'n'); // body cloth
  rect(g,13,26,6,4,'T'); // legs
});
save('mon_spider',32,32,(g)=>{
  disc(g,16,16,5,'t'); disc(g,16,14,2,'T'); // body+head
  for(let i=0;i<8;i++){ const dx=[-6,-4,-2,2,4,6][i%6]; const dy=(i<4?8:12); rect(g,6+dx, dy-10+ (i%2), 2,10, i<4?'t':'T'); set(g,16+dx, dy, 't'); }
  set(g,14,13,'R'); set(g,18,13,'R'); // eyes
});
save('mon_archer',32,32,(g)=>{
  rect(g,14,8,4,10,'M'); rect(g,13,10,2,2,'m'); rect(g,19,10,2,2,'m'); // head+ears
  set(g,15,12,'K'); set(g,17,12,'K'); // eyes
  rect(g,13,18,6,12,'T'); // body
  rect(g,17,18,2,6,'G'); // bow arm
  for(let y=14;y<24;y++){ set(g,24,y,'T'); set(g,25,y,'D'); } // bow
  set(g,23,16,'S'); set(g,23,22,'S'); // bow tips
});
save('mon_skeleton',32,32,(g)=>{
  disc(g,16,12,5,'W'); rect(g,11,10,2,3,'D'); rect(g,19,10,2,3,'D'); // skull+eye sockets
  set(g,14,12,'K'); set(g,18,12,'K');
  for(let y=18;y<30;y++){ set(g,13,y,'W'); set(g,19,y,'W'); } // spine
  rect(g,11,18,4,6,'S'); rect(g,17,18,4,6,'S'); // ribs
  rect(g,13,27,2,3,'W'); rect(g,17,27,2,3,'W'); // pelvis
});
save('mon_shaman',32,32,(g)=>{
  rect(g,12,8,8,10,'M'); set(g,14,12,'K'); set(g,17,12,'K'); // head
  for(let y=16;y<28;y++){ rect(g,10,y,12,1,'P'); } // robe
  set(g,11,24,'Y'); set(g,13,24,'C'); set(g,15,24,'Y'); set(g,17,24,'C'); // trim
  rect(g,25,6,2,18,'t'); // staff
  disc(g,26,6,2,'C'); // orb
});
save('mon_wraith',32,32,(g)=>{
  for(let y=8;y<28;y++){ rect(g,10,y,12,1,y<20?'V':'l'); }
  rect(g,12,8,8,4,'V'); // hood
  set(g,13,13,'C'); set(g,19,13,'C'); // glowing eyes
  for(let y=24;y<30;y++){ set(g,9,y,'l'); set(g,23,y,'l'); } // tattered bottom
});
save('mon_golem',32,32,(g)=>{
  rect(g,10,8,12,6,'D'); rect(g,8,14,16,10,'s'); rect(g,10,24,12,5,'D'); // body
  set(g,14,12,'R'); set(g,20,12,'R'); // eyes
  set(g,13,20,'V'); set(g,18,20,'V'); // cracks
  disc(g,16,16,1,'G'); // core
});
save('mon_boss',48,48,(g)=>{ // tower lord
  rect(g,16,8,16,8,'G'); rect(g,12,14,24,16,'S'); rect(g,14,30,20,8,'D'); // armor
  rect(g,18,8,12,6,'D'); set(g,20,11,'R'); set(g,28,11,'R'); // helmet+glow
  rect(g,34,12,4,26,'S'); set(g,35,14,'W'); // greatsword
  rect(g,12,22,8,4,'Y'); rect(g,28,22,8,4,'Y'); // shoulder trim
  set(g,24,18,'R'); set(g,25,19,'R'); // chest glow
});
/* ---------------- tiles (32x32) ---------------- */
save('tile_chest',32,32,(g)=>{ rect(g,7,12,18,12,'T'); rect(g,7,12,18,3,'y'); rect(g,7,20,18,3,'y');
  rect(g,14,14,4,7,'Y'); set(g,15,16,'r'); set(g,16,16,'r'); });
save('tile_shrine',32,32,(g)=>{ for(let y=14;y<26;y++){ rect(g,9,y,14,1,'D'); }
  rect(g,12,10,8,6,'G'); set(g,15,12,'C'); set(g,16,12,'C'); set(g,16,13,'C'); });
save('tile_shop',32,32,(g)=>{ rect(g,6,16,20,8,'T'); rect(g,8,10,16,6,'R'); rect(g,19,10,4,6,'Y'); rect(g,10,24,12,3,'O'); });
save('tile_event',32,32,(g)=>{ rect(g,8,12,16,12,'V'); set(g,15,10,'P'); rect(g,14,18,4,4,'P'); set(g,16,16,'P'); set(g,15,19,'P'); set(g,17,19,'P'); });
save('tile_stair',32,32,(g)=>{ for(let y=12;y<28;y+=4){ rect(g,6+((y-12)/2),y,20,3,'s'); } });

/* --- rich map elements --- */
save('tile_spike',32,32,(g)=>{ for(let s=0;s<3;s++){ const bx=6+s*8; for(let y=16;y<28;y++){ const w=Math.max(1,6-(y-16)); rect(g,bx+((8-w)>>1),y,w,'S'); } } });
save('tile_lava',32,32,(g)=>{ for(let y=14;y<30;y++){ rect(g,4,y,24,1,'O'); } for(let y=15;y<29;y++){ rect(g,3+(y%3),y,26,1,'o'); } rect(g,6,16,8,2,'Y'); rect(g,20,22,8,2,'Y'); });
save('tile_thorns',32,32,(g)=>{ rect(g,10,18,10,3,'n'); rect(g,12,14,4,3,'n'); rect(g,18,14,4,3,'n'); rect(g,14,20,4,3,'n'); for(let i=0;i<4;i++){ set(g,12+i*3+i%2,10+i,'n'); set(g,13+i*3,11+i,'N'); } });
save('tile_campfire',32,32,(g)=>{ rect(g,9,24,14,4,'T'); rect(g,11,22,10,2,'t'); disc(g,16,18,3,'Y'); disc(g,16,16,2,'O'); disc(g,16,15,1,'R'); });
save('tile_well',32,32,(g)=>{ for(let y=14;y<28;y++){ rect(g,6,y,20,1,'s'); } rect(g,12,14,8,12,'D'); rect(g,13,17,6,5,'B'); set(g,14,19,'W'); set(g,16,19,'W'); });
save('tile_goldpile',32,32,(g)=>{ disc(g,16,24,7,'Y'); disc(g,11,26,3,'Y'); disc(g,21,26,3,'y'); set(g,14,22,'W'); set(g,17,23,'Y'); set(g,19,21,'W'); });
save('tile_portal',32,32,(g)=>{ disc(g,16,16,7,'P'); disc(g,16,16,4,'V'); set(g,13,14,'C'); set(g,19,14,'C'); set(g,16,12,'W'); set(g,16,20,'l'); set(g,12,16,'l'); set(g,20,16,'C'); });
save('tile_crack',32,32,(g)=>{ rect(g,6,8,6,22,'D'); rect(g,20,8,6,22,'D'); rect(g,6,8,20,4,'D'); rect(g,12,12,8,6,'s'); set(g,14,14,'V'); set(g,16,16,'V'); set(g,13,18,'V'); });
save('mon_mimic',32,32,(g)=>{ for(let y=12;y<24;y++){ rect(g,7,y,18,1,'T'); } rect(g,7,12,18,3,'y'); disc(g,16,20,4,'r'); for(let x=9;x<23;x+=3){ set(g,x,20,'W'); } set(g,13,14,'K'); set(g,19,14,'K'); set(g,11,15,'Y'); set(g,21,15,'Y'); });
save('tile_key',32,32,(g)=>{ disc(g,11,12,3,'Y'); set(g,11,12,'.'); rect(g,14,14,3,10,'Y'); set(g,15,20,'S'); set(g,15,23,'S'); rect(g,14,14,2,2,'y'); });
save('tile_lockdoor',32,32,(g)=>{ rect(g,12,8,8,16,'D'); rect(g,12,8,8,3,'S'); set(g,13,10,'D'); set(g,16,10,'D'); set(g,19,10,'D'); rect(g,14,18,4,4,'Y'); set(g,15,20,'K'); set(g,16,20,'K'); });
save('tile_bell',32,32,(g)=>{ disc(g,16,14,5,'Y'); rect(g,11,19,10,2,'y'); rect(g,12,22,8,3,'Y'); set(g,16,25,'Y'); set(g,16,26,'Y'); for(let x=13;x<20;x+=3){ set(g,x,18,'Y'); } });

console.log('DONE');
