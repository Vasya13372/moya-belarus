@echo off
setlocal EnableExtensions
cd /d "%~dp0"
title Моя Беларусь — запуск проекта

where node >nul 2>&1
if not errorlevel 1 goto :node_ready

echo Node.js не найден. Устанавливаю Node.js LTS...
where winget >nul 2>&1
if not errorlevel 1 (
  winget install --id OpenJS.NodeJS.LTS --exact --silent --accept-source-agreements --accept-package-agreements
  if not errorlevel 1 goto :node_ready
)

echo Скачиваю Node.js LTS с официального сайта...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ErrorActionPreference='Stop'; $arch=if([Environment]::Is64BitOperatingSystem){'x64'}else{'x86'}; $item=(Invoke-RestMethod 'https://nodejs.org/dist/index.json' | Where-Object { $_.lts -and ($_.files -contains ('win-' + $arch + '-msi')) } | Select-Object -First 1); if (-not $item){throw 'Не удалось найти установщик Node.js'}; $ver=$item.version; $url='https://nodejs.org/dist/' + $ver + '/node-' + $ver + '-' + $arch + '.msi'; $msi=Join-Path $env:TEMP ('node-' + $ver + '-' + $arch + '.msi'); Invoke-WebRequest $url -OutFile $msi; Start-Process msiexec.exe -ArgumentList @('/i',$msi,'/qn','/norestart') -Wait; Remove-Item $msi -Force"
if errorlevel 1 (
  echo Не удалось установить Node.js автоматически.
  echo Установите Node.js LTS с сайта https://nodejs.org/ и запустите start.bat ещё раз.
  pause
  exit /b 1
)

:node_ready
set "PATH=%ProgramFiles%\nodejs;%ProgramFiles(x86)%\nodejs;%LocalAppData%\Programs\nodejs;%AppData%\npm;%PATH%"
where node >nul 2>&1
if errorlevel 1 (
  echo Node.js установлен, но не найден в PATH.
  echo Закройте это окно, откройте start.bat ещё раз.
  pause
  exit /b 1
)

if not exist "node_modules" (
  echo Устанавливаю зависимости проекта. Это выполняется только при первом запуске.
  call npm install
  if errorlevel 1 (
    echo Не удалось установить зависимости.
    pause
    exit /b 1
  )
)

echo Запускаю сайт...
start "Моя Беларусь — сервер" cmd /k "cd /d ""%~dp0"" && npm run dev"
timeout /t 5 /nobreak >nul
start "" "http://localhost:5173"

echo Сайт запущен в браузере.
echo Окно сервера можно оставить открытым. Для остановки нажмите Ctrl+C в нём.
exit /b 0
