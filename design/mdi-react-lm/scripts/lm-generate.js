const fs = require('fs');
const pathRegex = /\sd="(.*)"/;

const svgFiles = fs.readdirSync(`${__dirname}/../mdi/svg`);
const w = [];
const n = [];
for (let svgFile of svgFiles) {
  let name = svgFile.split(/-/g).map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('').slice(0, -4);
  const file = svgFile.slice(0, -4);
  w.push(`
declare module 'mdi-react/${file}' {
  const svg: {name:string; path:string}
  export default svg
}`);
  name = name[0].toLocaleLowerCase() + name.substring(1);
  n.push(`    ${name}='${file}',`);
  continue;
}
//console.log(`${__dirname}/mdi-react/index.d.ts`);
//console.log(ts.join('\r\n'));
//fs.writeFileSync(`${__dirname}/../build/${name}Icon.js`, fileContent);
//fs.writeFileSync(`${__dirname}/mdi-react/index.d.ts`,
fs.writeFileSync(`d:/rw/rw4/typings/mdi-react-w.d.ts`, `
${w.join('\r\n')}
`);
fs.writeFileSync(`d:/rw/rw4/typings/mdi-react-n.d.ts`, `
declare namespace GUI {
  const enum mdi_icons {
${n.join('\r\n')}
  }
}`
);
