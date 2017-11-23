const fs = require('fs');
const pathRegex = /\sd="(.*)"/;

const svgFiles = fs.readdirSync(`${__dirname}/../mdi/svg`);
for (let svgFile of svgFiles) {
  const name = svgFile.split(/-/g).map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('').slice(0, -4);

  const content = fs.readFileSync(`${__dirname}/../mdi/svg/${svgFile}`);
  const pathMatches = pathRegex.exec(content);
  const path = pathMatches && pathMatches[1];
  // Skip on empty path
  if (!path) continue;

  const fileContent =
`System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var data;
    return {
        setters: [],
        execute: function () {
            data = { path: '${path}' };
            exports_1("default", data);
        }
    };
});`

  fs.writeFileSync(`D:/rw/rw4/libs/rw-mui-w/svg-icons/${name}.js`, fileContent);

  const fileContent2 = 
`declare const data: { path:string }
export default data`
  fs.writeFileSync(`D:/rw/rw4/libs/rw-mui-w/svg-icons/${name}.d.ts`, fileContent2);

  const fileContent3 =
`declare const enum data {
  path = '${svgFile.slice(0, -4)}'
}
export default data`
  fs.writeFileSync(`D:/rw/rw4/libs/rw-mui/svg-icons/${name}.d.ts`, fileContent3);
}
