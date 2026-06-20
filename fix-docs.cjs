const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'docs', 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

// color-scheme ekle
html = html.replace(
  '<html lang="tr">',
  '<html lang="tr" style="color-scheme: light; forced-colors: none;">'
);

// viewport düzelt
html = html.replace(
  /width=1920/g,
  'width=1280'
);

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ docs/index.html TV için düzeltildi.');