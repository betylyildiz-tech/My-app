// İkonları SVG'den üretir: node scripts/make-icons.js (Playwright gerekir)
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const svg = fs.readFileSync(path.join(__dirname, '../icons/icon.svg'), 'utf8');
  const maskSvg = svg.replace('rx="116"', 'rx="0"').replace('<path d="M256 104', '<g transform="translate(256 256) scale(.8) translate(-256 -256)"><path d="M256 104').replace('fill="#FFF3E6"/>', 'fill="#FFF3E6"/></g>');
  const b = await chromium.launch();
  const out = [['icon-192.png', 192, svg, true], ['icon-512.png', 512, svg, true], ['icon-maskable-512.png', 512, maskSvg, false], ['apple-touch-icon.png', 180, maskSvg, false]];
  for (const [name, size, s, transparent] of out) {
    const p = await b.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await p.setContent(`<html><body style="margin:0;background:transparent">${s.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
    await p.screenshot({ path: path.join(__dirname, '../icons', name), omitBackground: transparent });
    await p.close();
  }
  await b.close();
})();
