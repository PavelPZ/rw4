d:
cd d:\rw\rw4\design\
rmdir mdi-react /s /q
call git clone https://github.com/levrik/mdi-react
cd mdi-react
call npm install
rmdir mdi /s /q
call git submodule add -f --name mdi https://github.com/Templarian/MaterialDesign-SVG mdi
npm run build
call rmdir publish /q /s
