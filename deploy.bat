@echo off
echo ========================================
echo   Healthfirst Hospital - Quick Deploy
echo ========================================
echo.

echo [1/3] Installing dependencies...
call npm install
echo.

echo [2/3] Building production version...
call npm run build
echo.

echo [3/3] Build complete!
echo.
echo ========================================
echo   Next Steps:
echo ========================================
echo.
echo Option 1: Deploy to Netlify
echo   - Go to: https://app.netlify.com/drop
echo   - Drag the 'dist' folder to the page
echo   - Get instant URL!
echo.
echo Option 2: Preview locally
echo   - Run: npm run preview
echo   - Open: http://localhost:4173
echo.
echo Option 3: Deploy to Vercel
echo   - Run: vercel --prod
echo.
echo ========================================
echo   Your 'dist' folder is ready!
echo ========================================
pause
