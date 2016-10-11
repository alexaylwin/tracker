set OLDDIR=%CD%
copy activities.php Z:\tracker\ /Y

copy package.json Z:\tracker\ /Y
copy index.html Z:\tracker\ /Y
copy systemjs.config.js Z:\tracker\ /Y
xcopy app Z:\tracker\app\ /S /E /Y
xcopy css Z:\tracker\css\ /S /E /Y
Z:
cd Z:\tracker\

chdir /D %OLDDIR%
npm install --production
