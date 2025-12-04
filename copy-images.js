const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '..', 'codekids_tech-main', 'public', 'assest');
const destDir = path.join(__dirname, 'public', 'assest');

console.log('========================================');
console.log('Copying Images to React Public Folder');
console.log('========================================\n');

// Create destination directory
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  console.log('[CREATED] public folder');
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('[CREATED] public/assest folder');
}

// Check if source exists
if (!fs.existsSync(sourceDir)) {
  console.error('[ERROR] Source folder not found:', sourceDir);
  process.exit(1);
}

// Copy files
console.log('[COPYING] Images from original project...\n');

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`  Copied: ${entry.name}`);
    }
  }
}

try {
  copyRecursive(sourceDir, destDir);
  
  // Verify key files
  console.log('\n[VERIFYING] Key images...\n');
  const keyFiles = [
    'kids robotics.jpg',
    'home page slide1.png',
    'codekids_finallogo.jpg',
    'codekids jr learning.jpg',
    'coding.jpg'
  ];
  
  let allFound = true;
  for (const file of keyFiles) {
    const filePath = path.join(destDir, file);
    if (fs.existsSync(filePath)) {
      console.log(`  [OK] ${file}`);
    } else {
      console.log(`  [MISSING] ${file}`);
      allFound = false;
    }
  }
  
  // Count files
  const files = fs.readdirSync(destDir);
  const jpgFiles = files.filter(f => f.endsWith('.jpg'));
  const pngFiles = files.filter(f => f.endsWith('.png'));
  
  console.log(`\n[SUMMARY]`);
  console.log(`  Total JPG files: ${jpgFiles.length}`);
  console.log(`  Total PNG files: ${pngFiles.length}`);
  console.log(`  Total files: ${files.length}`);
  
  if (allFound) {
    console.log('\n========================================');
    console.log('✅ All images copied successfully!');
    console.log('========================================');
    console.log('\n⚠️  IMPORTANT: Restart your dev server for images to load!');
    console.log('   1. Stop the server (Ctrl+C)');
    console.log('   2. Run: npm run dev');
    console.log('   3. Hard refresh browser (Ctrl+Shift+R)\n');
  } else {
    console.log('\n========================================');
    console.log('⚠️  Some images are missing!');
    console.log('========================================\n');
  }
} catch (error) {
  console.error('[ERROR] Failed to copy images:', error.message);
  process.exit(1);
}

