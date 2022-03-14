import { GraphQLClient, gql } from 'graphql-request'
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

const client = new GraphQLClient(`${process.env.GRAPHCMS_ENDPOINT}`, {
  headers: {
    Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
  },
});

const newArticleQuery = gql`
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
`

async function main() {
  const htmlString = '<ul><li>Hey <a href="thing">link text</a> here</li></ul>';
  const ast = await htmlToSlateAST(htmlString);

  // Create a RichText object from the AST
  const content = {
    children: ast
  }

  const data = await client.request(newArticleQuery, {
    title: 'Example title for an article',
    content // Pass the RichText object as the content
  })

  console.log(data)
}

main()
  .then(() => process.exit(0))
  .catch((e) => console.error(e));
