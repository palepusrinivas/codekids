# Hostinger Deployment Guide for CodeKids React Application

## 📋 Prerequisites

1. **Hostinger Account** - You need an active Hostinger hosting account
2. **Domain** - Your domain should be connected to Hostinger
3. **FTP/File Manager Access** - Access to Hostinger's File Manager or FTP credentials
4. **Node.js** - Installed on your local machine (for building)

---

## 🚀 Step-by-Step Deployment Process

### Step 1: Build the Production Version

Run the build command to create optimized production files:

```bash
npm run build
```

This will create a `dist` folder with all the production-ready files.

---

### Step 2: Prepare Files for Upload

After building, you'll have:
- `dist/` folder containing:
  - `index.html` (main HTML file)
  - `js/` folder (JavaScript bundles)
  - `assets/` folder (CSS and other assets)
  - `assest/` folder (images and static files)

---

### Step 3: Access Hostinger File Manager

1. **Login to Hostinger:**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Access File Manager:**
   - Click on "File Manager" from the dashboard
   - Navigate to `public_html` folder (this is your website root)

---

### Step 4: Upload Files to Hostinger

#### Option A: Using File Manager (Recommended for beginners)

1. **Delete existing files (if any):**
   - Select all files in `public_html`
   - Delete them (keep a backup if needed)

2. **Upload dist folder contents:**
   - Click "Upload Files" button
   - Select all files from your local `dist` folder
   - Upload them to `public_html`
   - **Important:** Upload the CONTENTS of the `dist` folder, not the folder itself

3. **Verify structure:**
   Your `public_html` should look like:
   ```
   public_html/
   ├── index.html
   ├── js/
   ├── assets/
   └── assest/
   ```

#### Option B: Using FTP (Faster for large files)

1. **Get FTP credentials:**
   - Go to Hostinger → FTP Accounts
   - Note down: Host, Username, Password, Port (usually 21)

2. **Use FTP client (FileZilla, WinSCP, etc.):**
   - Connect to your Hostinger FTP
   - Navigate to `public_html`
   - Upload all files from `dist` folder

---

### Step 5: Configure .htaccess for React Router

Since this is a React SPA (Single Page Application), you need to configure URL rewriting so all routes work correctly.

**Create `.htaccess` file in `public_html`:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
</IfModule>

# Security headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

### Step 6: Verify Deployment

1. **Check your website:**
   - Visit your domain: `https://yourdomain.com`
   - Test all pages:
     - Home page
     - AI Bootcamps page
     - CodeKids Jr page
     - CodeKids Pro page
     - Contact page

2. **Test functionality:**
   - Navigation links
   - Forms
   - Modal popups
   - Images loading
   - Animations

3. **Check browser console:**
   - Open Developer Tools (F12)
   - Check for any errors
   - Verify all assets are loading

---

## 🔧 Additional Configuration

### SSL Certificate (HTTPS)

Hostinger usually provides free SSL certificates:

1. Go to Hostinger → SSL
2. Enable "Free SSL" or "Let's Encrypt"
3. Wait for activation (usually a few minutes)
4. Your site will be accessible via HTTPS

### Custom Domain Configuration

If you have a custom domain:

1. **Point DNS to Hostinger:**
   - Update your domain's nameservers to Hostinger's:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - Or use Hostinger's DNS settings

2. **Add domain in Hostinger:**
   - Go to Domains → Add Domain
   - Follow the setup wizard

---

## 📁 File Structure After Deployment

```
public_html/
├── .htaccess (created in Step 5)
├── index.html
├── robots.txt
├── js/
│   ├── index-[hash].js
│   ├── react-vendor-[hash].js
│   ├── framer-motion-[hash].js
│   └── ...
├── assets/
│   └── index-[hash].css
└── assest/
    ├── codekids_finallogo.jpg
    ├── ai tools learning.jpg
    └── ... (all images)
```

---

## 🐛 Troubleshooting

### Issue 1: 404 Error on Page Refresh

**Solution:** Make sure `.htaccess` file is uploaded and configured correctly (Step 5)

### Issue 2: Images Not Loading

**Solution:** 
- Check if `assest` folder is uploaded correctly
- Verify image paths are `/assest/...` (not `/assets/...`)
- Check file permissions (should be 644 for files, 755 for folders)

### Issue 3: White Screen

**Solution:**
- Check browser console for errors
- Verify `index.html` is in the root
- Check if JavaScript files are loading (Network tab)
- Ensure all files from `dist` folder are uploaded

### Issue 4: Slow Loading

**Solution:**
- Enable GZIP compression (included in `.htaccess`)
- Enable browser caching (included in `.htaccess`)
- Consider using Hostinger's CDN if available

### Issue 5: CSS Not Loading

**Solution:**
- Check if `assets` folder is uploaded
- Verify CSS file paths in `index.html`
- Clear browser cache

---

## 🔄 Updating the Website

When you need to update the website:

1. **Make changes locally**
2. **Build again:**
   ```bash
   npm run build
   ```
3. **Upload new files:**
   - Delete old files from `public_html`
   - Upload new files from `dist` folder
   - **Note:** Keep `.htaccess` file

---

## 📊 Performance Optimization Tips

1. **Enable GZIP Compression** (already in `.htaccess`)
2. **Enable Browser Caching** (already in `.htaccess`)
3. **Optimize Images:**
   - Compress images before uploading
   - Use WebP format where possible
4. **Use CDN:** Consider using Hostinger's CDN if available
5. **Minify Files:** Already done by Vite build process

---

## 🔒 Security Checklist

- ✅ SSL Certificate enabled
- ✅ Security headers configured (in `.htaccess`)
- ✅ File permissions set correctly
- ✅ No sensitive data in public files
- ✅ Regular backups enabled

---

## 📞 Support

If you encounter issues:

1. **Hostinger Support:**
   - Live chat: Available in Hostinger dashboard
   - Email: support@hostinger.com

2. **Check Hostinger Documentation:**
   - https://support.hostinger.com

---

## ✅ Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Images loading properly
- [ ] Forms working
- [ ] Navigation working
- [ ] Mobile responsive
- [ ] SSL certificate active
- [ ] `.htaccess` file uploaded
- [ ] No console errors
- [ ] SEO meta tags working
- [ ] Social sharing working

---

## 🎉 Success!

Once all steps are completed, your CodeKids React application will be live on Hostinger!

**Your website URL:** `https://yourdomain.com`

---

## 📝 Quick Reference Commands

```bash
# Build for production
npm run build

# Preview build locally (before uploading)
npm run preview

# Type check
npm run typecheck
```

---

**Last Updated:** $(Get-Date -Format "yyyy-MM-dd")
**Version:** 1.0.0

