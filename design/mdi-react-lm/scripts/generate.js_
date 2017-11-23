const fs = require('fs');
const pathRegex = /\sd="(.*)"/;

const svgFiles = fs.readdirSync(`${__dirname}/../mdi/svg`);
const w = [];
const n = [];
for (let svgFile of svgFiles) {
  const file = svgFile.slice(0, -4);
  let name = file.split(/-/g).map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');
  name = name[0].toLocaleLowerCase() + name.substring(1);

  const content = fs.readFileSync(`${__dirname}/../mdi/svg/${svgFile}`);
  const pathMatches = pathRegex.exec(content);
  const path = pathMatches && pathMatches[1];
  // Skip on empty path
  if (!path) continue;
  w.push(`    ${name}='${path}',`);
  n.push(`    ${name}='${file}',`);
}

fs.writeFileSync(`d:/rw/rw4/typings/mdi-react-w.d.ts`, `
declare namespace GUI {
  const enum mdi_icons {
${w.join('\r\n')}
  }
}`
);

fs.writeFileSync(`d:/rw/rw4/typings/mdi-react-n.d.ts`, `
declare namespace GUI {
  const enum mdi_icons {
${n.join('\r\n')}
  }
}`
);

