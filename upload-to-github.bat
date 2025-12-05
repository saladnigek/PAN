@echo off
echo ========================================
echo Pantheos RPG - GitHub Upload Script
echo ========================================
echo.

echo Checking Git status...
git status
echo.

echo Step 1: Adding all files...
git add .
echo Done!
echo.

echo Step 2: Creating commit...
git commit -m "feat: Professional Pantheos RPG website with improvements"
if errorlevel 1 (
    echo.
    echo Note: No new changes to commit. Proceeding to push existing commits...
    echo.
)
echo.

echo Step 3: Checking remote connection...
git remote -v
if errorlevel 1 (
    echo Adding remote origin...
    git remote add origin https://github.com/saladnigek/PAN.git
) else (
    echo Remote already configured.
    echo Updating remote URL...
    git remote set-url origin https://github.com/saladnigek/PAN.git
)
echo Done!
echo.

echo Step 4: Setting main branch...
git branch -M main
echo Done!
echo.

echo Step 5: Pushing to GitHub...
echo (This may take a moment...)
echo.
git push -u origin main --force
if errorlevel 1 (
    echo.
    echo ========================================
    echo Push failed. Trying alternative method...
    echo ========================================
    echo.
    git pull origin main --allow-unrelated-histories --no-edit
    git push -u origin main
    if errorlevel 1 (
        echo.
        echo ========================================
        echo Manual steps needed:
        echo ========================================
        echo.
        echo Please run these commands manually:
        echo 1. git pull origin main --allow-unrelated-histories
        echo 2. git push -u origin main
        echo.
        pause
        exit /b 1
    )
)
echo.

echo ========================================
echo SUCCESS! Your website is now on GitHub!
echo ========================================
echo.
echo Your repository: https://github.com/saladnigek/PAN
echo.
echo Next steps:
echo 1. Visit: https://github.com/saladnigek/PAN
echo 2. Go to Settings -^> Pages
echo 3. Select 'main' branch as source
echo 4. Click Save
echo 5. Your site will be live at: https://saladnigek.github.io/PAN/
echo.
echo To create a release for downloads:
echo 1. Go to: https://github.com/saladnigek/PAN/releases
echo 2. Click "Create a new release"
echo 3. Tag: v1.0.0
echo 4. Upload your game client ZIP file
echo 5. Publish release
echo.
pause
