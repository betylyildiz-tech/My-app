// Tek dosyalık önizleme üretir (Claude Artifact / hızlı paylaşım için): node scripts/build-preview.js
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const read = (f) => fs.readFileSync(path.join(root, f), 'utf8');
const html = read('index.html');
const css = read('css/app.css');
const scripts = [...html.matchAll(/<script src="([^"]+)"><\/script>/g)].map(m => m[1]);
const js = scripts.map(s => `/* ${s} */\n` + read(s)).join('\n');
const body = html.slice(html.indexOf('<body>') + 6, html.indexOf('<script'));
const out = `<title>Adorn</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="theme-color" content="#F9F8F6">
<style>
${css}
</style>
${body.trim()}
<script>
${js.replace(/<\/script>/g, '<\\/script>')}
</script>
`;
fs.mkdirSync(path.join(root, 'dist'), { recursive: true });
fs.writeFileSync(path.join(root, 'dist/adorn-preview.html'), out);
console.log('dist/adorn-preview.html', (out.length / 1024).toFixed(1) + ' KB');
