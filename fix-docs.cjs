const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'docs', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// 1. color-scheme ekle
html = html.replace(
  '<html lang="tr">',
  '<html lang="tr" style="color-scheme: light; forced-colors: none;">'
);

// 2. viewport düzelt
html = html.replace(/width=1920/g, 'width=device-width');
html = html.replace(/width=1280/g, 'width=device-width');

// 3. Cache engelle + timestamp
const buildTime = Date.now();
const cacheBlock = `
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="Pragma" content="no-cache">
  <meta http-equiv="Expires" content="0">
  <meta name="build-time" content="${buildTime}">`;
html = html.replace('<meta charset="UTF-8" />', '<meta charset="UTF-8" />' + cacheBlock);

// 4. TV filter CSS ekle
const tvStyle = `
  <style>
    .tv-safe-area {
      filter: hue-rotate(-15deg) saturate(0.85) !important;
      -webkit-filter: hue-rotate(-15deg) saturate(0.85) !important;
    }
  </style>`;
html = html.replace('</head>', tvStyle + '\n</head>');

// 5. JS ve CSS dosyalarına timestamp ekle (cache busting)
html = html.replace(/(src|href)="(\.\/assets\/[^"]+)"/g, (match, attr, url) => {
  const sep = url.includes('?') ? '&' : '?';
  return `${attr}="${url}${sep}v=${buildTime}"`;
});

fs.writeFileSync(filePath, html, 'utf8');
console.log(`✅ docs/index.html TV için düzeltildi. Build: ${new Date(buildTime).toLocaleString('tr-TR')}`);