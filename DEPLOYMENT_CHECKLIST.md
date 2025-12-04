# 🚀 Hostinger Deployment Checklist

## Pre-Deployment

- [ ] Run `npm run build` successfully
- [ ] Check `dist` folder is created
- [ ] Verify no build errors
- [ ] Test locally with `npm run preview`

## Files to Upload

- [ ] Upload all contents of `dist` folder to `public_html`
- [ ] Upload `.htaccess` file to `public_html` root
- [ ] Upload `robots.txt` (if not in dist)
- [ ] Verify `assest` folder with all images

## Configuration

- [ ] `.htaccess` file uploaded and configured
- [ ] SSL certificate enabled in Hostinger
- [ ] Domain DNS configured correctly
- [ ] File permissions set (644 for files, 755 for folders)

## Testing

- [ ] Home page loads: `https://yourdomain.com`
- [ ] AI Bootcamps page: `https://yourdomain.com/ai-bootcamps`
- [ ] CodeKids Jr page: `https://yourdomain.com/codekids-jr`
- [ ] CodeKids Pro page: `https://yourdomain.com/codekids-pro`
- [ ] Contact page: `https://yourdomain.com/contact`
- [ ] All navigation links work
- [ ] Images load correctly
- [ ] Forms are functional
- [ ] Modal opens and closes
- [ ] Mobile responsive
- [ ] No console errors
- [ ] HTTPS working (SSL)

## Performance

- [ ] GZIP compression enabled
- [ ] Browser caching working
- [ ] Images optimized
- [ ] Page load time acceptable

## SEO

- [ ] Meta tags working
- [ ] Structured data valid
- [ ] Sitemap accessible (if created)
- [ ] robots.txt accessible

## Security

- [ ] SSL certificate active
- [ ] Security headers configured
- [ ] No sensitive files exposed
- [ ] File permissions correct

---

**Status:** Ready for deployment ✅

