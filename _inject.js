// Inject generated pixel-art PNGs (assets/*.png) into SPR_BASE64 in 回声之塔.html as data URIs.
const fs = require('fs'), path = require('path');
const HTML = path.join(__dirname, '回声之塔.html');
const DIR = path.join(__dirname, 'assets');
let html = fs.readFileSync(HTML, 'utf8');
const keys = fs.readdirSync(DIR).filter(f => f.endsWith('.png')).map(f => f.replace(/\.png$/, '')).sort();
const map = {};
for (const k of keys) {
  const b = fs.readFileSync(path.join(DIR, k + '.png'));
  map[k] = 'data:image/png;base64,' + b.toString('base64');
}
const obj = 'var SPR_BASE64=' + JSON.stringify(map) + ';';
if (!html.includes('var SPR_BASE64=')) { console.error('marker not found'); process.exit(1); }
html = html.replace(/var SPR_BASE64=\{[\s\S]*?\};/, obj);
if (!html.includes(obj)) { console.error('replace failed'); process.exit(1); }
fs.writeFileSync(HTML, html, 'utf8');
console.log('injected ' + keys.length + ' sprites, ~' + Math.round(obj.length / 1024) + 'KB; keys=' + keys.join(','));
