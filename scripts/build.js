const fs = require('fs');
const path = require('path');

// 빌드 디렉토리 생성
const distDir = path.join(__dirname, '../dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// JavaScript 파일 번들링 (간단한 병합)
const jsFiles = ['desktop.js', 'mobile.js'];
jsFiles.forEach(file => {
  const srcPath = path.join(__dirname, '../src/js', file);
  const distPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf-8');
    // 여기에 Babel 트랜스파일이나 minification 추가 가능
    fs.writeFileSync(distPath, content);
    console.log(`✅ Built: ${file}`);
  }
});

// CSS 파일 복사
const cssFiles = ['desktop.css', 'mobile.css'];
cssFiles.forEach(file => {
  const srcPath = path.join(__dirname, '../src/css', file);
  const distPath = path.join(distDir, file);
  
  if (fs.existsSync(srcPath)) {
    const content = fs.readFileSync(srcPath, 'utf-8');
    fs.writeFileSync(distPath, content);
    console.log(`✅ Built: ${file}`);
  }
});

console.log('🎉 Build completed!');
