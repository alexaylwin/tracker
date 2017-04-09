@echo off
mkdir dist
copy package.json dist /Y
copy index.html dist /Y
copy favicon-96x96.png dist\ /Y
copy systemjs.config.js dist\ /Y
xcopy app dist\app\ /S /E /Y
xcopy css dist\css\ /S /E /Y
cd dist
call npm install --production
cd ..

"C:\Program Files (x86)\WinSCP\WinSCP.com" ^
	/ini=nul ^
  /command ^
    "open ftp://nuc%%5Cftpuser:nuc@192.168.1.22/ -passive=0" ^
    "lcd C:\Users\A\Documents\GitHub\tracker\dist" ^
    "cd /tracker" ^
    "synchronize remote C:\Users\A\Documents\GitHub\tracker\dist /tracker" ^
    "exit"

set WINSCP_RESULT=%ERRORLEVEL%
if %WINSCP_RESULT% equ 0 (
  echo Success
) else (
  echo Error
)