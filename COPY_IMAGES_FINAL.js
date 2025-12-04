const fs = require('fs');
const path = require('path');

console.log('\n========================================');
console.log('  FINAL IMAGE COPY SCRIPT');
console.log('========================================\n');

const sourceDir = path.join(__dirname, '..', 'codekids_tech-main', 'public', 'assest');
const destDir = path.join(__dirname, 'public', 'assest');

// Create directories
if (!fs.existsSync(path.join(__dirname, 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
  console.log('[CREATED] public folder');
}

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
  console.log('[CREATED] public/assest folder');
}

// Check source
if (!fs.existsSync(sourceDir)) {
  console.error('\n[ERROR] Source folder not found:', sourceDir);
  console.error('Please ensure the original project is at: codekids_tech-main/public/assest');
  process.exit(1);
}

// Copy files
console.log('\n[COPYING] Images...\n');
let copied = 0;
let errors = 0;

function copyRecursive(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    try {
      if (entry.isDirectory()) {
        if (!fs.existsSync(destPath)) {
          fs.mkdirSync(destPath, { recursive: true });
        }
        copyRecursive(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
        copied++;
        if (copied % 10 === 0) {
          process.stdout.write('.');
        }
      }
    } catch (error) {
      errors++;
      console.error(`\n[ERROR] Failed to copy ${entry.name}:`, error.message);
    }
  }
}

copyRecursive(sourceDir, destDir);

console.log('\n\n[VERIFYING] Key images...\n');

const keyFiles = [
  'kids robotics.jpg',
  'home page slide1.png',
  'codekids_finallogo.jpg',
  'codekids jr learning.jpg',
  'coding.jpg',
  'codekids_jr testimonial.jpg'
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

console.log('\n========================================');
console.log('  SUMMARY');
console.log('========================================');
console.log(`  Files copied: ${copied}`);
console.log(`  Errors: ${errors}`);
console.log(`  Total JPG: ${jpgFiles.length}`);
console.log(`  Total PNG: ${pngFiles.length}`);
console.log(`  Total files: ${files.length}`);

if (allFound && errors === 0) {
  console.log('\n========================================');
  console.log('  ✅ SUCCESS! All images are in place.');
  console.log('========================================');
  console.log('\n  ⚠️  IMPORTANT: Restart your dev server!');
  console.log('     1. Stop server (Ctrl+C)');
  console.log('     2. Run: npm run dev');
  console.log('     3. Hard refresh browser (Ctrl+Shift+R)\n');
} else {
  console.log('\n========================================');
  console.log('  ⚠️  WARNING: Some issues detected!');
  console.log('========================================\n');
}

