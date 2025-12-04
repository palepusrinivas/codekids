# 🚀 Hostinger Deployment - Quick Start

## ⚠️ IMPORTANT: Rebuild Before Deploying

The current `dist` folder does NOT include the new AI Bootcamps page. You MUST rebuild before deploying!

---

## 📦 Step 1: Build the Application

```bash
npm run build
```

This will create a fresh `dist` folder with all pages including AI Bootcamps.

---

## 📤 Step 2: Upload to Hostinger

### Quick Method (File Manager):

1. **Login to Hostinger:**
   - Go to: https://hpanel.hostinger.com
   - Click "File Manager"

2. **Navigate to public_html:**
   - Click on `public_html` folder (this is your website root)

3. **Delete old files:**
   - Select all existing files
   - Delete them (keep backup if needed)

4. **Upload new files:**
   - Click "Upload Files" button
   - Select ALL files from the `dist` folder:
     - ✅ `index.html`
     - ✅ `.htaccess` (IMPORTANT!)
     - ✅ `robots.txt`
     - ✅ `js/` folder (entire folder)
     - ✅ `assets/` folder (entire folder)
     - ✅ `assest/` folder (entire folder with all images)

5. **Wait for upload to complete**

---

## ✅ Step 3: Verify Deployment

Visit your website:
- Home: `https://yourdomain.com`
- AI Bootcamps: `https://yourdomain.com/ai-bootcamps`

---

## 🔧 Critical Files

### .htaccess (MUST be uploaded!)

This file is **ESSENTIAL** for React Router to work. It's already in your `dist` folder.

**Location:** `dist/.htaccess`

**Purpose:** Makes all routes work (prevents 404 errors on page refresh)

---

## 📋 Complete File List to Upload

From `dist` folder, upload:

```
dist/
├── .htaccess          ← CRITICAL for routing
├── index.html         ← Main HTML file
├── robots.txt         ← SEO file
├── js/                ← All JavaScript files
│   ├── index-*.js
│   ├── Home-*.js
│   ├── AIBootcamps-*.js  ← New page!
│   └── ... (all JS files)
├── assets/            ← CSS files
│   └── index-*.css
└── assest/            ← Images folder
    ├── codekids_finallogo.jpg
    ├── ai tools learning.jpg
    └── ... (all images)
```

---

## 🐛 Common Issues

### 404 Error on Page Refresh?
→ Check `.htaccess` is uploaded to `public_html` root

### Images Not Loading?
→ Verify `assest` folder is uploaded (not `assets`)

### White Screen?
→ Check browser console (F12) for errors
→ Verify all files are uploaded

---

## 📚 Detailed Guides

- **Full Guide:** See `HOSTINGER_DEPLOYMENT_GUIDE.md`
- **Quick Reference:** See `QUICK_DEPLOY.md`
- **Checklist:** See `DEPLOYMENT_CHECKLIST.md`

---

## 🎯 Quick Commands

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Automated deployment script
.\deploy-to-hostinger.ps1
```

---

**Your website will be live after uploading! 🎉**

