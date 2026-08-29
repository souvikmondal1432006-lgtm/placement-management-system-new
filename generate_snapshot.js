const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'src', 'app');
const outputFile = path.join(__dirname, 'frontend_snapshot.md');

function getAllPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllPageFiles(filePath, fileList);
    } else if (file === 'page.tsx' || file === 'page.jsx') {
      fileList.push(filePath);
    }
  }
  return fileList;
}

try {
  const pageFiles = getAllPageFiles(srcAppDir);
  let markdownContent = '# Frontend Code Snapshot\n\n';

  for (const filePath of pageFiles) {
    const relativePath = path.relative(__dirname, filePath);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    markdownContent += `## File: ${relativePath}\n\n`;
    markdownContent += '```tsx\n';
    markdownContent += content;
    markdownContent += '\n```\n\n';
  }

  fs.writeFileSync(outputFile, markdownContent);
  console.log(`Successfully combined ${pageFiles.length} files into ${outputFile}`);
} catch (error) {
  console.error('Error generating snapshot:', error);
}
