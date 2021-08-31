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
  const input = fs
    .readFileSync(__dirname + '/google-docs_input.html')
    .toString();
  return htmlToSlateAST(input).then((ast) =>
    expect(ast).toEqual([
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
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'link',
            href: 'https://www.google.com/',
            openInNewTab: false,
            children: [
              {
                text: 'Link to Google',
                underline: true,
              },
            ],
          },
          {
            text: '\u00a0',
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
                        type: 'paragraph',
                        children: [
                          {
                            text: '',
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
                            text: '',
                          },
                        ],
                      },
                    ],
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
            type: 'link',
            href: 'https://lh6.googleusercontent.com/TkJFBZvkyXTa602F0gkp2phU0O1eHu96RdKFcQ8l_EOS_CBfcI9jYRixN6sNRFnFiZ-ssbLbnLDReb3FrEZ1MnLr70c5gIvPmhJtV7appyVEDSeHLIRdNwdNzbIqs3l2GOgGLGC5=s0',
            title: 'Screenshot 2021-06-10 at 15.56.22.png',
            openInNewTab: true,
            children: [
              {
                text: 'https://lh6.googleusercontent.com/TkJFBZvkyXTa602F0gkp2phU0O1eHu96RdKFcQ8l_EOS_CBfcI9jYRixN6sNRFnFiZ-ssbLbnLDReb3FrEZ1MnLr70c5gIvPmhJtV7appyVEDSeHLIRdNwdNzbIqs3l2GOgGLGC5=s0',
              },
            ],
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            text: '',
          },
        ],
      },
    ])
  );
});

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
      { type: 'paragraph', children: [{ text: '' }] },
      {
        type: 'table',
        children: [
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

test('Converts an image pasted from Google Docs into a link node', () => {
  return htmlToSlateAST(
    fs.readFileSync(__dirname + '/image.html').toString()
  ).then((ast) =>
    expect(ast).toStrictEqual([
      {
        type: 'link',
        href: 'https://lh5.googleusercontent.com/EqByyE2l_VVSU6KoXFlkpPjJIBsbMTb4Dkr0cuvy2K5ctn8BoJsDHBXO0rU2wyck72_ZF1rqJ5kJ0iMEjU4Jwf7mKhRaLWoHJAzX5WvpfMytIR9sw3EwBcdQdRlIwSrsQ3odhUYq',
        title: "this is this image's title",
        openInNewTab: true,
        children: [
          {
            text: 'https://lh5.googleusercontent.com/EqByyE2l_VVSU6KoXFlkpPjJIBsbMTb4Dkr0cuvy2K5ctn8BoJsDHBXO0rU2wyck72_ZF1rqJ5kJ0iMEjU4Jwf7mKhRaLWoHJAzX5WvpfMytIR9sw3EwBcdQdRlIwSrsQ3odhUYq',
          },
        ],
      },
    ])
  );
});

test('Reshape an incorrectly structured table', () => {
  return htmlToSlateAST(
    '<table><colgroup><col /><col /></colgroup><tbody><tr><td></td></tr><tr></tr></tbody></table>'
  ).then((ast) =>
    expect(ast).toStrictEqual([
      {
        type: 'table',
        children: [
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
                            text: '',
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
                        type: 'paragraph',
                        children: [
                          {
                            text: '',
                          },
                        ],
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

test('Transforms pre tags into code-block nodes', () => {
  const input = fs.readFileSync(__dirname + '/pre.html').toString();
  return htmlToSlateAST(input).then((ast) =>
    expect(ast).toStrictEqual([
      {
        type: 'code-block',
        children: [
          {
            text: "  L          TE\n    A       A\n      C    V\n       R A\n       DOU\n       LOU\n      REUSE\n      QUE TU\n      PORTES\n    ET QUI T'\n    ORNE O CI\n     VILISÉ\n    OTE-  TU VEUX\n     LA    BIEN\n    SI      RESPI\n            RER       - Apollinaire",
          },
        ],
      },
    ])
  );
});
