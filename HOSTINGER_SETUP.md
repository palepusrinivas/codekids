# 🚀 Hostinger Deployment - Complete Setup Guide

## ⚡ Quick Start (3 Steps)

### Step 1: Build the Application
```powershell
npm run build
```

Or use the automated script:
```powershell
.\deploy-to-hostinger.ps1
```

### Step 2: Upload to Hostinger
1. Login to https://hpanel.hostinger.com
2. Go to **File Manager** → **public_html**
3. Upload ALL files from `dist` folder

### Step 3: Verify
Visit: `https://yourdomain.com`

---

## 📋 Detailed Instructions

### Prerequisites Checklist
- [ ] Hostinger account active
- [ ] Domain connected to Hostinger
- [ ] Node.js installed locally
- [ ] Application built successfully

### Build Process

1. **Open Terminal/PowerShell** in project directory

2. **Run build command:**
   ```bash
   npm run build
   ```

3. **Verify build output:**
   - Check `dist` folder is created
   - Verify all files are present
   - Check for any build errors

### Upload Process

#### Method 1: File Manager (Easiest)

1. **Access Hostinger:**
   - Login: https://hpanel.hostinger.com
   - Click "File Manager"

2. **Navigate to public_html:**
   - Click on "public_html" folder
   - This is your website root directory

3. **Clean existing files (if any):**
   - Select all files
   - Delete them (keep backup if needed)

4. **Upload new files:**
   - Click "Upload Files" button
   - Select ALL files from `dist` folder:
     - `index.html`
     - `.htaccess`
     - `robots.txt`
     - `js/` folder (entire folder)
     - `assets/` folder (entire folder)
     - `assest/` folder (entire folder)
   - Wait for upload to complete

5. **Verify file structure:**
   Your `public_html` should contain:
   ```
   public_html/
   ├── .htaccess
   ├── index.html
   ├── robots.txt
   ├── js/
   ├── assets/
   └── assest/
   ```

#### Method 2: FTP (Faster for large files)

1. **Get FTP credentials:**
   - Hostinger → FTP Accounts
   - Create or use existing FTP account
   - Note: Host, Username, Password, Port (21)

2. **Use FTP client:**
   - Download FileZilla: https://filezilla-project.org
   - Connect using FTP credentials
   - Navigate to `public_html`
   - Upload all files from `dist` folder

### Configuration Files

#### .htaccess (Required for React Router)

The `.htaccess` file is **CRITICAL** for React Router to work. It must be in `public_html` root.

**If missing, create it with this content:**

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### SSL Certificate Setup

1. **Enable SSL:**
   - Hostinger → SSL
   - Click "Enable Free SSL" or "Let's Encrypt"
   - Wait for activation (5-10 minutes)

2. **Force HTTPS:**
   Add to `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Domain Configuration

1. **Point DNS to Hostinger:**
   - Update nameservers at your domain registrar:
     ```
     ns1.dns-parking.com
     ns2.dns-parking.com
     ```
   - Or use Hostinger's DNS settings

2. **Add domain in Hostinger:**
   - Go to Domains → Add Domain
   - Follow setup wizard

---

## ✅ Post-Deployment Testing

### Test Checklist

- [ ] **Homepage loads:** `https://yourdomain.com`
- [ ] **AI Bootcamps page:** `https://yourdomain.com/ai-bootcamps`
- [ ] **CodeKids Jr page:** `https://yourdomain.com/codekids-jr`
- [ ] **CodeKids Pro page:** `https://yourdomain.com/codekids-pro`
- [ ] **Contact page:** `https://yourdomain.com/contact`
- [ ] **Navigation works:** All links functional
- [ ] **Images load:** All images visible
- [ ] **Forms work:** Contact form functional
- [ ] **Modal works:** Enrollment modal opens/closes
- [ ] **Mobile responsive:** Test on mobile device
- [ ] **HTTPS working:** SSL certificate active
- [ ] **No console errors:** Check browser console (F12)

### Performance Check

- [ ] Page load time < 3 seconds
- [ ] Images optimized
- [ ] GZIP compression working
- [ ] Browser caching enabled

---

## 🐛 Troubleshooting

### Problem: 404 Error on Page Refresh

**Solution:**
- Verify `.htaccess` file is in `public_html` root
- Check file permissions (should be 644)
- Ensure mod_rewrite is enabled on server

### Problem: White Screen / Blank Page

**Solution:**
1. Check browser console (F12) for errors
2. Verify `index.html` is in root
3. Check if JavaScript files are loading (Network tab)
4. Verify all files from `dist` are uploaded

### Problem: Images Not Loading

**Solution:**
- Verify `assest` folder is uploaded (not `assets`)
- Check image paths in code use `/assest/...`
- Verify file permissions (644 for files)
- Check browser console for 404 errors

### Problem: CSS Not Loading

**Solution:**
- Verify `assets` folder is uploaded
- Check CSS file is referenced in `index.html`
- Clear browser cache
- Check file permissions

### Problem: Routes Not Working

**Solution:**
- Ensure `.htaccess` file is uploaded
- Check `.htaccess` syntax is correct
- Verify mod_rewrite is enabled
- Test with direct URL: `yourdomain.com/ai-bootcamps`

---

## 🔄 Updating the Website

When you need to update:

1. **Make changes locally**
2. **Rebuild:**
   ```bash
   npm run build
   ```
3. **Upload new files:**
   - Delete old files from `public_html`
   - Upload new files from `dist`
   - **Keep `.htaccess` file**

---

## 📊 File Size Information

Expected file sizes after build:
- `index.html`: ~5-10 KB
- JavaScript files: ~500 KB - 2 MB total
- CSS file: ~50-100 KB
- Images: Varies (already optimized)

**Total upload size:** ~10-50 MB (depending on images)

---

## 🔒 Security Best Practices

1. ✅ SSL certificate enabled
2. ✅ Security headers in `.htaccess`
3. ✅ File permissions set correctly
4. ✅ No sensitive files exposed
5. ✅ Regular backups enabled

---

## 📞 Support Resources

### Hostinger Support
- **Live Chat:** Available in Hostinger dashboard
- **Email:** support@hostinger.com
- **Knowledge Base:** https://support.hostinger.com

### Application Support
- Check `HOSTINGER_DEPLOYMENT_GUIDE.md` for detailed guide
- Check `QUICK_DEPLOY.md` for quick reference
- Check `DEPLOYMENT_CHECKLIST.md` for checklist

---

## 🎉 Success Indicators

Your deployment is successful when:

✅ Website loads at your domain  
✅ All pages accessible  
✅ Images loading correctly  
✅ Forms working  
✅ Navigation functional  
✅ HTTPS enabled  
✅ No console errors  
✅ Mobile responsive  

---

**Ready to deploy! Follow the steps above and your website will be live on Hostinger! 🚀**

