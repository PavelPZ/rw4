const fs = require('fs');
const pathRegex = /\sd="(.*)"/;

const svgFiles = fs.readdirSync(`${__dirname}/../mdi/svg`);
for (let svgFile of svgFiles) {
  const file = svgFile.slice(0, -4);
  const name = file.split(/-/g).map(part => {
    return part.charAt(0).toUpperCase() + part.slice(1);
  }).join('');

  const content = fs.readFileSync(`${__dirname}/../mdi/svg/${svgFile}`);
  const pathMatches = pathRegex.exec(content);
  const path = pathMatches && pathMatches[1];
  // Skip on empty path
  if (!path) continue;

  const fileContent = `
const d = { name:'${file}', path:'${path}' }
export default d
`;

  fs.writeFileSync(`${__dirname}/../../mdi-react-compile/mdi-react/${name}.ts`, fileContent);
}
