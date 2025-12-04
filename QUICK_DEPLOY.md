# 🚀 Quick Deployment Guide for Hostinger

## ⚡ Fast Track (5 Minutes)

### Step 1: Build the Application
```bash
npm run build
```

### Step 2: Access Hostinger File Manager
1. Login to https://hpanel.hostinger.com
2. Go to **File Manager**
3. Navigate to **public_html** folder

### Step 3: Upload Files
1. **Delete** all existing files in `public_html` (if any)
2. **Upload** ALL files from the `dist` folder to `public_html`
   - Select all files in `dist` folder
   - Upload to `public_html`
   - **Important:** Upload the CONTENTS of `dist`, not the folder itself

### Step 4: Verify .htaccess
- Make sure `.htaccess` file is in `public_html` root
- If not, upload the `.htaccess` file from project root

### Step 5: Test Your Website
- Visit: `https://yourdomain.com`
- Test: `https://yourdomain.com/ai-bootcamps`

---

## 📁 What to Upload

Upload these from the `dist` folder:
```
✅ index.html
✅ .htaccess (from project root)
✅ robots.txt
✅ js/ (entire folder)
✅ assets/ (entire folder)
✅ assest/ (entire folder with all images)
```

---

## ✅ Quick Checklist

- [ ] Build completed (`npm run build`)
- [ ] All files uploaded to `public_html`
- [ ] `.htaccess` file in root
- [ ] Website loads correctly
- [ ] All pages work (test navigation)
- [ ] Images loading
- [ ] SSL enabled (HTTPS)

---

## 🆘 Common Issues

**404 on page refresh?** → Check `.htaccess` is uploaded

**Images not loading?** → Verify `assest` folder is uploaded

**White screen?** → Check browser console for errors

---

**That's it! Your website should be live! 🎉**

