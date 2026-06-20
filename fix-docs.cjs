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

// 3. TV filter CSS ekle (head içine)
const tvStyle = `
  <style>
    .tv-safe-area {
      filter: hue-rotate(-15deg) saturate(0.85) !important;
      -webkit-filter: hue-rotate(-15deg) saturate(0.85) !important;
    }
  </style>`;

html = html.replace('</head>', tvStyle + '\n</head>');

fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ docs/index.html TV için düzeltildi.');
