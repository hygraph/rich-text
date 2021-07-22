/*
  Simple script that makes sure the library works on a barebones node environment (non-browser)
*/
const { htmlToSlateAST } = require('../dist');

async function main() {
  const htmlString = '<div><p>test</p></div>';
  const ast = await htmlToSlateAST(htmlString);
  console.log(ast);
}

main()
  .then(() => process.exit(0))
  .catch((e) => console.error(e));
