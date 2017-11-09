d:
cd d:\rw\rw4\design\
rmdir mdi-react /s /q
call git clone https://github.com/levrik/mdi-react
cd mdi-react
call npm install
rmdir mdi /s /q
call git submodule add -f --name mdi https://github.com/Templarian/MaterialDesign-SVG mdi
rmdir d:\rw\rw4\libs\mdi-react  /s /q
xcopy d:\rw\rw4\design\mdi-react-lm\*.* d:\rw\rw4\design\mdi-react\*.* /s /y
pause
rmdir d:\rw\rw4\design\mdi-react-compile\mdi-react  /s /q
md d:\rw\rw4\design\mdi-react-compile\mdi-react
npm run build

