const express = require('express');
const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 정적 파일 서빙
app.use(express.static('src'));

// 파일 변경 감지
const watcher = chokidar.watch('src/**/*', {
  ignored: /(^|[\/\\])\../,
  persistent: true
});

watcher
  .on('change', (filePath) => {
    console.log(`📝 File changed: ${filePath}`);
  })
  .on('add', (filePath) => {
    console.log(`✨ File added: ${filePath}`);
  })
  .on('unlink', (filePath) => {
    console.log(`🗑️  File removed: ${filePath}`);
  });

app.listen(PORT, () => {
  console.log(`🚀 kintone Development Server running on http://localhost:${PORT}`);
  console.log(`👀 Watching for file changes in src/ directory...`);
});
