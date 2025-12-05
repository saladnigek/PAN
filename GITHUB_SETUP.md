# GitHub Setup Guide for Pantheos RPG

## 🚀 Quick Upload to GitHub

### Step 1: Initialize Git Repository

Open your terminal/command prompt in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Pantheos RPG website with improvements"
```

### Step 2: Connect to GitHub Repository

```bash
git remote add origin https://github.com/saladnigek/PAN.git
git branch -M main
git push -u origin main
```

If you get an error about existing content, use:
```bash
git pull origin main --allow-unrelated-histories
git push -u origin main
```

---

## 📦 Files to Upload

### Essential Files (Must Upload)
- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ README.md

### Asset Files (Must Upload)
- ✅ logo.png
- ✅ profile.png
- ✅ bg.png
- ✅ bg2.png
- ✅ bg3.png
- ✅ bg4.png
- ✅ Discord.png
- ✅ fb logo.png
- ✅ yt logo.png
- ✅ google.png
- ✅ Quest.png
- ✅ Winter.png

### Documentation Files (Recommended)
- ✅ SUMMARY.md
- ✅ IMPROVEMENTS.md
- ✅ QUICK_START.md
- ✅ GITHUB_SETUP.md

### Optional Files
- Home.html (original version for comparison)

---

## 🌐 GitHub Pages Setup (Free Hosting)

After uploading, enable GitHub Pages to host your website for free:

1. Go to your repository: https://github.com/saladnigek/PAN
2. Click **Settings** tab
3. Scroll to **Pages** section (left sidebar)
4. Under **Source**, select **main** branch
5. Click **Save**
6. Your site will be live at: `https://saladnigek.github.io/PAN/`

---

## 📥 Setting Up Download Release

### Step 1: Create a Release Package

Create a ZIP file with the game client (when ready):
```
PantheosRPG-Client-v1.0.zip
```

### Step 2: Create GitHub Release

1. Go to: https://github.com/saladnigek/PAN/releases
2. Click **"Create a new release"**
3. Fill in:
   - **Tag version:** v1.0.0
   - **Release title:** Pantheos RPG Client v1.0.0
   - **Description:**
   ```
   # Pantheos RPG - Official Windows Client
   
   ## What's New
   - Initial release of Pantheos RPG
   - Full MMORPG experience
   - Pixel-art graphics
   - Multiplayer support
   
   ## System Requirements
   - OS: Windows 10/11 (64-bit)
   - Processor: Intel Core i3 or AMD equivalent
   - Memory: 4 GB RAM
   - Graphics: DirectX 11 compatible graphics card
   - Storage: 2 GB available space
   - Network: Broadband internet connection
   
   ## Installation
   1. Download the ZIP file below
   2. Extract to your desired location
   3. Run PantheosRPG.exe
   4. Enjoy!
   ```
4. Upload your game client ZIP file
5. Click **"Publish release"**

### Step 3: Update Download Button

The download button in `index.html` will automatically link to your latest release:

```javascript
// In script.js, update the download button:
document.getElementById('downloadBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Redirect to latest release
    window.location.href = 'https://github.com/saladnigek/PAN/releases/latest/download/PantheosRPG-Client-v1.0.zip';
});
```

---

## 🔗 Update Links in Website

After GitHub setup, update these links in your files:

### In index.html:
```html
<!-- Update Discord link -->
<a href="https://discord.gg/your-invite-code" class="contact-method">

<!-- Update social links -->
<a href="https://discord.gg/your-invite-code" class="social-link">
<a href="https://facebook.com/your-page" class="social-link">
<a href="https://youtube.com/your-channel" class="social-link">
```

---

## 📝 .gitignore File

Create a `.gitignore` file to exclude unnecessary files:

```
# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.log

# Optional: Original file if you don't want to upload it
# Home.html
```

---

## 🎯 Complete Upload Commands

Run these commands in order:

```bash
# 1. Initialize repository
git init

# 2. Add all files
git add .

# 3. Commit
git commit -m "feat: Initial release of Pantheos RPG website

- Improved HTML with semantic structure
- Organized CSS with variables
- Modular JavaScript
- Full accessibility (WCAG 2.1 AA)
- Performance optimizations
- Comprehensive documentation"

# 4. Connect to GitHub
git remote add origin https://github.com/saladnigek/PAN.git

# 5. Push to GitHub
git branch -M main
git push -u origin main
```

---

## 🌟 After Upload Checklist

- [ ] Repository is public (for GitHub Pages)
- [ ] All files uploaded successfully
- [ ] GitHub Pages enabled
- [ ] Website is live at https://saladnigek.github.io/PAN/
- [ ] Download button works (after creating release)
- [ ] All links updated
- [ ] README.md displays properly on GitHub

---

## 🔄 Future Updates

To update your website:

```bash
# 1. Make your changes
# 2. Stage changes
git add .

# 3. Commit with message
git commit -m "Update: description of changes"

# 4. Push to GitHub
git push
```

---

## 📱 Mobile-Friendly GitHub Pages

Your website is already mobile-friendly! GitHub Pages will serve it perfectly on all devices.

---

## 🎮 Download Function Integration

When you're ready to add the actual game download:

1. Create a release on GitHub
2. Upload your game ZIP file
3. Copy the download URL
4. Update the download button in `script.js`

Example:
```javascript
setupDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Real download link
            const downloadUrl = 'https://github.com/saladnigek/PAN/releases/latest/download/PantheosRPG-Client.zip';
            
            // Show downloading state
            this.textContent = 'Downloading...';
            this.style.backgroundColor = '#10b981';
            
            // Start download
            window.location.href = downloadUrl;
            
            // Reset button after delay
            setTimeout(() => {
                this.textContent = 'Download For Windows';
                this.style.backgroundColor = '#2563eb';
            }, 3000);
        });
    }
}
```

---

## 🆘 Troubleshooting

### Issue: "Permission denied"
**Solution:** Make sure you're logged into GitHub and have access to the repository.

### Issue: "Repository not found"
**Solution:** Check the repository URL is correct: https://github.com/saladnigek/PAN.git

### Issue: "Failed to push"
**Solution:** Pull first, then push:
```bash
git pull origin main --allow-unrelated-histories
git push origin main
```

### Issue: GitHub Pages not working
**Solution:** 
1. Make sure repository is public
2. Check Settings → Pages is enabled
3. Wait 2-3 minutes for deployment
4. Clear browser cache

---

## 🎉 Success!

Once uploaded, your website will be:
- ✅ Live on GitHub Pages
- ✅ Accessible worldwide
- ✅ Free hosting forever
- ✅ Automatic HTTPS
- ✅ Fast CDN delivery

**Your website URL:** https://saladnigek.github.io/PAN/

---

*Need help? Check GitHub's documentation or create an issue in your repository.*
