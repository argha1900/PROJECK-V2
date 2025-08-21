@echo off
echo ========================================
echo    Aplikasi Cek Transportasi
echo ========================================
echo.
echo Memulai server lokal...
echo.

REM Cek apakah Python tersedia
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python tidak ditemukan!
    echo Silakan install Python dari https://python.org
    pause
    exit /b 1
)

REM Jalankan server
echo Server berjalan di http://localhost:8000
echo Tekan Ctrl+C untuk menghentikan server
echo.
python start-server.py

pause