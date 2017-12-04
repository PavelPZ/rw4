d:
cd d:\rw\pavelpz\reactx-icons\design\
rmdir mdi-react /s /q
call git clone https://github.com/levrik/mdi-react
cd mdi-react
call npm install
rmdir mdi /s /q
call git submodule add -f --name mdi https://github.com/Templarian/MaterialDesign-SVG mdi
xcopy d:\rw\pavelpz\reactx-icons\design\mdi-react-lm\*.* d:\rw\rw4\design\mdi-react\*.* /s /y
rmdir d:\rw\pavelpz\reactx-icons\libs\rw-mui-w\svg-icons /s /q
md    d:\rw\pavelpz\reactx-icons\libs\rw-mui-w\svg-icons
rmdir d:\rw\pavelpz\reactx-icons\libs\rw-mui\svg-icons /s /q
md    d:\rw\pavelpz\reactx-icons\libs\rw-mui\svg-icons
npm run build
rmdir D:\rw\pavelpz\reactx-icons\node_modules\@types\node /s /q

