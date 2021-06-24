import fs from 'fs';
import { htmlToSlateAST } from '@graphcms/html-to-slate-ast';

test('Transforms top level span into paragraph', () => {
  return htmlToSlateAST(`<meta charset='utf-8'><span
  style="color: rgb(224, 219, 212); font-family: charter, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 21px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.063px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(6, 3, 0); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">bove,
  in fact, is the very CSS and HTML rendered as I type this blog. There are calls to HTML element classes that style
  certain properties. For example, the font-family properties in the ".postArticle-content .graf — p" class has a serif
  font value, hence the text rendered in this article is of the serif family. All this to say, if you as a pro</span>`).then(
    (ast) =>
      expect(ast).toEqual([
        {
          type: 'paragraph',
          children: [
            {
              text: `bove,
  in fact, is the very CSS and HTML rendered as I type this blog. There are calls to HTML element classes that style
  certain properties. For example, the font-family properties in the ".postArticle-content .graf — p" class has a serif
  font value, hence the text rendered in this article is of the serif family. All this to say, if you as a pro`,
            },
          ],
        },
      ])
  );
});

test('Transforms inner span into paragraph', () => {
  return htmlToSlateAST(`<meta charset='utf-8'><p><span
  style="color: rgb(224, 219, 212); font-family: charter, Georgia, Cambria, &quot;Times New Roman&quot;, Times, serif; font-size: 21px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: -0.063px; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(6, 3, 0); text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;">bove,
  in fact, is the very CSS and HTML rendered as I type this blog. There are calls to HTML element classes that style
  certain properties. For example, the font-family properties in</span><span> the ".postArticle-content .graf — p" class has a serif
  font value, hence the text rendered in this article is of the serif family. All this to say, if you as a pro</span></p>`).then(
    (ast) =>
      expect(ast).toEqual([
        {
          type: 'paragraph',
          children: [
            {
              text: `bove,
  in fact, is the very CSS and HTML rendered as I type this blog. There are calls to HTML element classes that style
  certain properties. For example, the font-family properties in the ".postArticle-content .graf — p" class has a serif
  font value, hence the text rendered in this article is of the serif family. All this to say, if you as a pro`,
            },
          ],
        },
      ])
  );
});

test('Transforms inner spans wrapped in a div into paragraph', () => {
  const input = fs.readFileSync(__dirname + '/html_input.html').toString();
  return htmlToSlateAST(input).then((ast) =>
    expect(ast).toStrictEqual([
      {
        type: 'paragraph',
        children: [
          {
            text: `\u00A0if (el.nodeName ===\u00A0'BODY') {`,
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: `\u00A0return\u00A0jsx('fragment', {},\u00A0children);`,
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: ` }`,
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: `just text`,
          },
        ],
      },
    ])
  );
});

test('Transforms Google Docs input', () => {
  return htmlToSlateAST(
    `<meta charset='utf-8'><meta charset="utf-8"><b style="font-weight:normal;" id="docs-internal-guid-6df72dc9-7fff-cc5d-6424-c3f9fc1e38a9"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:3pt;"><span style="font-size:26pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Title</span></p><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:16pt;"><span style="font-size:15pt;font-family:Arial;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Subtitle</span></p><h1 dir="ltr" style="line-height:1.38;margin-top:20pt;margin-bottom:6pt;"><span style="font-size:20pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 1</span></h1><h2 dir="ltr" style="line-height:1.38;margin-top:18pt;margin-bottom:6pt;"><span style="font-size:16pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 2</span></h2><h3 dir="ltr" style="line-height:1.38;margin-top:16pt;margin-bottom:4pt;"><span style="font-size:13.999999999999998pt;font-family:Arial;color:#434343;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 3</span></h3><h4 dir="ltr" style="line-height:1.38;margin-top:14pt;margin-bottom:4pt;"><span style="font-size:12pt;font-family:Arial;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 4</span></h4><h5 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:4pt;"><span style="font-size:11pt;font-family:Arial;color:#666666;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 5</span></h5><h6 dir="ltr" style="line-height:1.38;margin-top:12pt;margin-bottom:4pt;"><span style="font-size:11pt;font-family:Arial;color:#666666;background-color:transparent;font-weight:400;font-style:italic;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Heading 6</span></h6><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Unordered list:</span></p><ul style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">One</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Two</span></p></li><li dir="ltr" style="list-style-type:disc;font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Three</span></p></li></ul><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Ordered list:</span></p><ol style="margin-top:0;margin-bottom:0;padding-inline-start:48px;"><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">One</span></p></li><li dir="ltr" style="list-style-type:decimal;font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;" aria-level="1"><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;" role="presentation"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Two</span></p></li></ol><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Table:</span></p><div dir="ltr" style="margin-left:0pt;" align="left"><table style="border:none;border-collapse:collapse;table-layout:fixed;width:468pt"><colgroup><col /><col /></colgroup><tr style="height:0pt"><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Cell one</span></p></td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;"><span style="font-size:11pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">Cell two</span></p></td></tr><tr style="height:0pt"><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><br /></td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;"><br /></td></tr></table></div></b>`
  ).then((ast) =>
    expect(ast).toEqual([
      {
        type: 'paragraph',
        children: [
          {
            text: 'Title',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Subtitle',
          },
        ],
      },
      {
        type: 'heading-one',
        children: [
          {
            text: 'Heading 1',
          },
        ],
      },
      {
        type: 'heading-two',
        children: [
          {
            text: 'Heading 2',
          },
        ],
      },
      {
        type: 'heading-three',
        children: [
          {
            text: 'Heading 3',
          },
        ],
      },
      {
        type: 'heading-four',
        children: [
          {
            text: 'Heading 4',
          },
        ],
      },
      {
        type: 'heading-five',
        children: [
          {
            text: 'Heading 5',
          },
        ],
      },
      {
        type: 'heading-six',
        children: [
          {
            text: 'Heading 6',
            italic: true,
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Unordered list:',
          },
        ],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [
                  {
                    text: 'One',
                  },
                ],
              },
            ],
          },
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [
                  {
                    text: 'Two',
                  },
                ],
              },
            ],
          },
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [
                  {
                    text: 'Three',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Ordered list:',
          },
        ],
      },
      {
        type: 'numbered-list',
        children: [
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [
                  {
                    text: 'One',
                  },
                ],
              },
            ],
          },
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [
                  {
                    text: 'Two',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: 'Table:',
          },
        ],
      },
      {
        type: 'table',
        children: [
          {
            type: 'table_head',
            children: [],
          },
          {
            type: 'table_body',
            children: [
              {
                type: 'table_row',
                children: [
                  {
                    type: 'table_cell',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            text: 'Cell one',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'table_cell',
                    children: [
                      {
                        type: 'paragraph',
                        children: [
                          {
                            text: 'Cell two',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: 'table_row',
                children: [
                  {
                    type: 'table_cell',
                    children: [
                      {
                        text: '\n',
                      },
                    ],
                  },
                  {
                    type: 'table_cell',
                    children: [
                      {
                        text: '\n',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  );
});

// Skipped because even though expected and result are the same, they differ on their invisible nonsense whitespace next to the headings
test('Converts word documents', () => {
  return htmlToSlateAST(
    fs.readFileSync(__dirname + '/word-document.html').toString()
  ).then((ast) =>
    expect(ast).toStrictEqual([
      {
        type: 'heading-one',
        children: [
          {
            text: 'Title\n            1\u00a0',
          },
        ],
      },
      {
        type: 'heading-two',
        children: [{ text: 'Title\n            2\u00a0' }],
      },
      {
        type: 'heading-three',
        children: [{ text: 'Title\n            3\u00a0' }],
      },
      {
        type: 'heading-four',
        children: [
          { text: 'Title', italic: true },
          { text: '\n            4', italic: true },
          { text: '\u00a0' },
        ],
      },
      {
        type: 'heading-five',
        children: [{ text: 'Title\n            5\u00a0' }],
      },
      {
        type: 'heading-six',
        children: [{ text: 'Title\n            6\u00a0' }],
      },
      {
        type: 'bulleted-list',
        children: [
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [{ text: 'Unordered\u00a0' }],
              },
            ],
          },
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [{ text: 'Bulleted\u00a0' }],
              },
            ],
          },
          {
            type: 'list-item',
            children: [
              { type: 'list-item-child', children: [{ text: 'List\u00a0' }] },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'Paragraph\u00a0' },
          { text: 'underline', underline: true },
          { text: '\u00a0\u00a0' },
          { text: 'italic', italic: true },
          { text: '\u00a0', italic: true },
          { text: 'bold', bold: true },
          { text: '\u00a0' },
        ],
      },
      {
        type: 'numbered-list',
        children: [
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [{ text: 'Ordered\u00a0' }],
              },
            ],
          },
        ],
      },
      {
        type: 'numbered-list',
        children: [
          {
            type: 'list-item',
            children: [
              {
                type: 'list-item-child',
                children: [{ text: 'Numbered\u00a0' }],
              },
            ],
          },
        ],
      },
      {
        type: 'numbered-list',
        children: [
          {
            type: 'list-item',
            children: [
              { type: 'list-item-child', children: [{ text: 'List\u00a0' }] },
            ],
          },
        ],
      },
      { type: 'paragraph', children: [{ text: 'Table\u00a0' }] },
      {
        type: 'table',
        children: [
          { type: 'table_head', children: [] },
          {
            type: 'table_body',
            children: [
              {
                type: 'table_row',
                children: [
                  {
                    type: 'table_cell',
                    children: [
                      { type: 'paragraph', children: [{ text: 'One\u00a0' }] },
                    ],
                  },
                  {
                    type: 'table_cell',
                    children: [
                      { type: 'paragraph', children: [{ text: 'Two\u00a0' }] },
                    ],
                  },
                ],
              },
              {
                type: 'table_row',
                children: [
                  {
                    type: 'table_cell',
                    children: [
                      {
                        type: 'paragraph',
                        children: [{ text: 'Three\u00a0' }],
                      },
                    ],
                  },
                  {
                    type: 'table_cell',
                    children: [
                      { type: 'paragraph', children: [{ text: 'Four\u00a0' }] },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      { type: 'paragraph', children: [{ text: 'The\u00a0end\u00a0' }] },
    ])
  );
});
