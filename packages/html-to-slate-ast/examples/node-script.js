/*
  Simple script that makes sure the library works on a barebones node environment (non-browser)
*/
const { htmlToSlateAST } = require('../dist');

async function main() {
  const htmlString = '<ul><li>Hey <a href="thing">link text</a> here</li></ul>';
  const ast = await htmlToSlateAST(htmlString);
  console.log(JSON.stringify(ast, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch(e => console.error(e));
