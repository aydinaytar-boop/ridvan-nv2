@echo off
title Ridvan Display Auto Fix + Run

REM 1) Proje klasorunu bul
set PROJ1=C:\Users\ridva\Desktop\ridvan-nv
set PROJ2=C:\Users\ridva\Desktop\ridvan-nv

if exist "%PROJ1%\package.json" (
  set PROJ=%PROJ1%
) else (
  set PROJ=%PROJ2%
)

echo Kullanilan proje klasoru: %PROJ%
if not exist "%PROJ%" (
  echo Proje klasoru bulunamadi.
  pause
  exit /b 1
)

REM 2) Yanlislikla degisen dosyayi geri al
if exist "%PROJ%\package.json.bak" ren "%PROJ%\package.json.bak" package.json

REM 3) Desktop'taki bozuk package.json dosyasini etkisiz hale getir
cd /d "C:\Users\ridva\Desktop"
if exist package.json ren package.json package.desktop.bak

REM 4) Projeyi calistir
cd /d "%PROJ%"
call npm.cmd install
call npm.cmd run dev

pause