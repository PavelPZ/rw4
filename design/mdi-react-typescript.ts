const fs = require('fs');
const pathRegex = /\sd="(.*)"/;

const svgFiles = fs.readdirSync(`${__dirname}/mdi-react/mdi/svg`);
const ts = [];
const consts = [];
for (let svgFile of svgFiles) {
  let name = svgFile.split(/-/g).map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('').slice(0, -4);
  const file = svgFile.slice(0, -4);
  ts.push(`
declare module 'mdi-react/${file}' {
  const svg: SVGSVGElement
  export default svg
}`);
  name = name[0].toLocaleLowerCase() + name.substring(1);
  consts.push(`  ${name}='${file}',`);
  continue;

//  const content = fs.readFileSync(`${__dirname}/../mdi/svg/${svgFile}`);
//  const pathMatches = pathRegex.exec(content);
//  const path = pathMatches && pathMatches[1];
//  // Skip on empty path
//  if (!path) continue;

//  const fileContent =
//`import React from 'react';

//const ${name}Icon = ({ width = 24, height = 24, viewBox = '0 0 24 24', className, children, ...props }) => {
//  let classes = 'mdi-icon';
//  if (className) classes += \` \${className}\`;

//  return (
//    <svg {...props} width={width} height={height} viewBox={viewBox} className={classes}>
//      <path d="${path}" />
//    </svg>
//  );
//};

//export default ${name}Icon;
//`;

}
//console.log(`${__dirname}/mdi-react/index.d.ts`);
//console.log(ts.join('\r\n'));
//fs.writeFileSync(`${__dirname}/../build/${name}Icon.js`, fileContent);
fs.writeFileSync(`${__dirname}/mdi-react/index.d.ts`,
  ts.join('\r\n') + `
declare namespace GUI {
  const enum mdi_icons {
${consts.join('\r\n')}
  }
}`
);
