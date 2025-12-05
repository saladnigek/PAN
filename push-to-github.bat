@echo off
echo ========================================
echo Pushing to GitHub Repository
echo ========================================
echo.

echo Adding all files...
git add .
echo.

echo Creating commit...
git commit -m "Update: Pantheos RPG website improvements"
echo.

echo Pushing to GitHub...
git push -u origin main --force
echo.

if errorlevel 1 (
    echo.
    echo If you see an error, try this:
    echo git pull origin main --allow-unrelated-histories
    echo git push -u origin main
    echo.
) else (
    echo ========================================
    echo SUCCESS! Changes pushed to GitHub!
    echo ========================================
    echo.
    echo View your repository: https://github.com/saladnigek/PAN
    echo View your website: https://saladnigek.github.io/PAN/
    echo.
)

pause
