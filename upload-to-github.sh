#!/bin/bash

echo "========================================"
echo "Pantheos RPG - GitHub Upload Script"
echo "========================================"
echo ""

echo "Step 1: Initializing Git repository..."
git init
if [ $? -ne 0 ]; then
    echo "Error: Git initialization failed"
    exit 1
fi
echo "Done!"
echo ""

echo "Step 2: Adding all files..."
git add .
if [ $? -ne 0 ]; then
    echo "Error: Failed to add files"
    exit 1
fi
echo "Done!"
echo ""

echo "Step 3: Creating commit..."
git commit -m "feat: Initial release of Pantheos RPG website

- Improved HTML with semantic structure
- Organized CSS with variables
- Modular JavaScript
- Full accessibility (WCAG 2.1 AA)
- Performance optimizations
- Comprehensive documentation"
if [ $? -ne 0 ]; then
    echo "Error: Commit failed"
    exit 1
fi
echo "Done!"
echo ""

echo "Step 4: Connecting to GitHub..."
git remote add origin https://github.com/saladnigek/PAN.git
echo "Done!"
echo ""

echo "Step 5: Setting main branch..."
git branch -M main
echo "Done!"
echo ""

echo "Step 6: Pushing to GitHub..."
echo "(This may take a moment...)"
git push -u origin main
if [ $? -ne 0 ]; then
    echo ""
    echo "Note: If you see an error about existing content, run:"
    echo "git pull origin main --allow-unrelated-histories"
    echo "git push -u origin main"
    echo ""
    exit 1
fi
echo ""

echo "========================================"
echo "SUCCESS! Your website is now on GitHub!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Visit: https://github.com/saladnigek/PAN"
echo "2. Enable GitHub Pages in Settings"
echo "3. Your site will be live at: https://saladnigek.github.io/PAN/"
echo ""
echo "To create a release for downloads:"
echo "1. Go to: https://github.com/saladnigek/PAN/releases"
echo "2. Click 'Create a new release'"
echo "3. Upload your game client ZIP file"
echo ""
