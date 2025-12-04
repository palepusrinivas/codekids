const fs = require('fs');
const path = require('path');

const source = path.join(__dirname, '..', 'codekids_tech-main', 'public', 'assest');
const dest = path.join(__dirname, 'public', 'assest');

console.log('\n========================================');
console.log('  IMAGE SETUP SCRIPT');
console.log('========================================\n');

// Create directories
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
  console.log('✓ Created public folder');
}

if (!fs.existsSync(dest)) {
  fs.mkdirSync(dest, { recursive: true });
  console.log('✓ Created public/assest folder');
}

// Check source
if (!fs.existsSync(source)) {
  console.error('\n✗ ERROR: Source folder not found!');
  console.error('  Expected:', source);
  console.error('\n  Please ensure the original project exists at:');
  console.error('  codekids_tech-main/public/assest\n');
  process.exit(1);
}

// Copy files
console.log('\nCopying images...');
let count = 0;
try {
  const files = fs.readdirSync(source);
  for (const file of files) {
    const srcPath = path.join(source, file);
    const destPath = path.join(dest, file);
    const stat = fs.statSync(srcPath);
    
    if (stat.isFile()) {
      fs.copyFileSync(srcPath, destPath);
      count++;
      if (count % 5 === 0) process.stdout.write('.');
    }
  }
  console.log(`\n\n✓ Copied ${count} files\n`);
} catch (error) {
  console.error('\n✗ ERROR copying files:', error.message);
  process.exit(1);
}

// Verify
console.log('Verifying key images...\n');
const keyFiles = [
  'kids robotics.jpg',
  'home page slide1.png',
  'codekids_finallogo.jpg',
  'codekids jr learning.jpg'
];

let allOk = true;
for (const file of keyFiles) {
  const filePath = path.join(dest, file);
  if (fs.existsSync(filePath)) {
    console.log(`  ✓ ${file}`);
  } else {
    console.log(`  ✗ ${file} - MISSING`);
    allOk = false;
  }
}

const totalFiles = fs.readdirSync(dest).length;
console.log(`\nTotal files in public/assest: ${totalFiles}`);

if (allOk) {
  console.log('\n========================================');
  console.log('  ✅ SUCCESS! Images are ready.');
  console.log('========================================');
  console.log('\n  ⚠️  IMPORTANT: Restart your dev server!');
  console.log('     1. Stop server (Ctrl+C)');
  console.log('     2. Run: npm run dev');
  console.log('     3. Hard refresh browser (Ctrl+Shift+R)\n');
} else {
  console.log('\n========================================');
  console.log('  ⚠️  Some images are missing!');
  console.log('========================================\n');
}

