@echo off
title Sistem Pelaporan Komunitas - Server (http://localhost:3001)
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js tidak ditemukan. Install Node.js dulu: https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo Menginstal dependensi terlebih dahulu...
  call npm install
  if errorlevel 1 (
    echo [ERROR] Gagal menginstal dependensi.
    pause
    exit /b 1
  )
)

if not exist ".env" (
  echo [ERROR] Tidak menemukan file .env. Salin dari .env.example lalu isi DATABASE_URL dan AUTH_SECRET.
  pause
  exit /b 1
)

echo Memastikan client Prisma tersedia...
call npx prisma generate
if errorlevel 1 (
  echo [ERROR] Gagal men-generate client Prisma. Pastikan DATABASE_URL di .env benar.
  pause
  exit /b 1
)

echo.
echo Menjalankan aplikasi di http://localhost:3001
echo Tutup jendela ini untuk menghentikan server.
echo.
start "" /b cmd /c "timeout /t 3 >nul & start http://localhost:3001"
call npm run dev

pause