import { RichTextContent } from '@graphcms/rich-text-types';

export const content: RichTextContent = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Teste, ',
      },
      {
        bold: true,
        text: 'this',
      },
      {
        text: ' ',
      },
      {
        text: 'is',
        italic: true,
      },
      {
        text: ' ',
      },
      {
        id: 'fasfasfas',
        rel: 'fasfasfas',
        href: 'https://graphcms.com',
        type: 'link',
        title: 'afsafsafas',
        children: [
          {
            text: 'so',
          },
        ],
        className: 'afasfsafasfa',
        openInNewTab: true,
      },
      {
        text: ' ',
      },
      {
        text: 'nice',
        underline: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'Hey, ',
        bold: true,
      },
      {
        text: 'how',
        italic: true,
      },
      {
        text: 'are',
        underline: true,
      },
      {
        text: 'you?',
        code: true,
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        bold: true,
        text: 'Teste 2\\',
      },
    ],
  },
  {
    type: 'heading-one',
    children: [
      {
        bold: true,
        code: true,
        text: 'daasfsafsfsa F',
      },
      {
        bold: true,
        text: '  FASFASFASFSA ',
      },
    ],
  },
  {
    type: 'heading-three',
    children: [
      {
        bold: true,
        text: '',
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
                text: 'tafasfasfsa',
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
                text: 'fasfasfasfasfas',
              },
            ],
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
            children: [
              {
                text: 'afsafsafas',
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
                text: 'fasfafsafas',
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
                text: 'greter43',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'block-quote',
    children: [
      {
        text: 'fasfasfa',
      },
      {
        text: 'sf',
        underline: true,
      },
      {
        text: 'a',
      },
      {
        text: 's',
        italic: true,
      },
      {
        text: 'fa',
      },
      {
        bold: true,
        text: 'fasf',
      },
      {
        text: 'a',
      },
    ],
  },
  {
    type: 'class',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'fasfasfasfsafasfsafasfsa',
          },
        ],
      },
    ],
    className: 'ffasfasfas',
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
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
  {
    src: 'https://media.graphcms.com/output=format:webp/resize=,width:667,height:1000/8xrjYm4CR721mAZ1YAoy',
    type: 'image',
    title: 'photo-1564631027894-5bdb17618445.jpg',
    width: 667,
    handle: '8xrjYm4CR721mAZ1YAoy',
    height: 1000,
    altText: 'photo-1564631027894-5bdb17618445.jpg',
    children: [
      {
        text: '',
      },
    ],
    mimeType: 'image/webp',
  },
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    src: 'https://media.graphcms.com/oWd7OYr5Q5KGRJW9ujRO',
    type: 'video',
    title: 'file_example_MP4_480_1_5MG.m4v',
    width: 400,
    handle: 'oWd7OYr5Q5KGRJW9ujRO',
    height: 400,
    children: [
      {
        text: '',
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
  {
    type: 'table',
    children: [
      {
        type: 'table_head',
        children: [
          {
            text: '',
          },
        ],
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
                        text: 'fasfsa',
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
                        text: 'grhgtht',
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
                        text: 'yutyututy',
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
                        text: 'utyutyuyt',
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
];
