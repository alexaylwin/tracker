set OLDDIR=%CD%
rmdir Z:\tracker\app /Q
copy package.json Z:\tracker\ /Y
copy index.html Z:\tracker\ /Y
copy systemjs.config.js Z:\tracker\ /Y
xcopy app Z:\tracker\app\ /S /E /Y
xcopy css Z:\tracker\css\ /S /E /Y
Z:
cd Z:\tracker\
npm install --production
chdir /D %OLDDIR%
C: