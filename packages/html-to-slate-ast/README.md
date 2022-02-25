# @graphcms/html-to-slate-ast

HTML to Slate AST converter for the GraphCMS's RichTextAST format.

⚠️ This converter outputs the custom flavour of Slate AST that is used at GraphCMS, and will most likely not produce an output compatible with your own Slate implementation. But feel free to fork it and adapt it to your needs.

## ⚡ Usage

### 1. Install

This package needs to have the packages `slate` and `slate-hyperscript` installed, and `jsdom` as well if you need to run the converter in nodejs.

```bash
# for node or isomorphic usage, jsdom is required
npm install jsdom

# required peer-dependancies
npm install slate@0.58.3 slate-hyperscript@0.58.3
npm install @graphcms/html-to-slate-ast
```

### 2. Convert your data

☝️ `htmlToSlateAst` returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

```js
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

const htmlString = '<div><p>test</p></div>'; // or import form a filr or database
const ast = await htmlToSlateAST(htmlString);
```

### 3. Use it in your Content API mutations

The output of this converstion is compatible with our `RichTextAST` GraphQL type and can be used to import content in your Rich Text fields.

Example mutation:

```graphql
mutation newArticle($title: String!, $content: RichTextAST) {
  createArticle(data: { title: $title, content: $content }) {
    id
    title
    content {
      html
      raw
    }
  }
}
```

For sending the generated output from htmlToSlateAST using a GraphQL client, you should transform it into a RichText compatible object, for example:

```js
const data = await client.request(newArticleQuery, {
  title: 'Example title for an article',
  content: { children: ast },
});
```

You can see the full example using [graphql-request](https://github.com/prisma-labs/graphql-request) to mutate the data into GraphCMS [here](https://github.com/GraphCMS/rich-text/blob/main/packages/html-to-slate-ast/examples/graphql-request-script.js)

See the docs about the [Rich Text field type](https://graphcms.com/docs/schema/field-types#rich-text) and [Content Api mutations](https://graphcms.com/docs/content-api/mutations)

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
