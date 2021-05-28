import { RichTextContent } from '@graphcms/rich-text-types';

export const defaultContent: RichTextContent = [
  {
    type: 'paragraph',
    children: [
      {
        bold: true,
        text: 'Hello World!',
      },
    ],
  },
];

export const emptyContent: RichTextContent = [
  {
    type: 'heading-two',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'heading-five',
    children: [
      {
        text: 'Hello World!',
      },
    ],
  },
];

export const inlineContent: RichTextContent = [
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
];

export const iframeContent: RichTextContent = [
  {
    type: 'class',
    children: [
      {
        type: 'paragraph',
        children: [
          {
            text: 'wow',
          },
        ],
      },
    ],
    className: 'test',
  },
];

export const imageContent: RichTextContent = [
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
];

export const videoContent: RichTextContent = [
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
];

export const listContent: RichTextContent = [
  {
    type: 'bulleted-list',
    children: [
      {
        type: 'list-item',
        children: [
          {
            type: 'list-item-child',
            children: [{ text: 'Embroided logo' }],
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          { type: 'list-item-child', children: [{ text: 'Fits well' }] },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'list-item-child',
            children: [{ text: 'Comes in black' }],
          },
        ],
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'list-item-child',
            children: [{ text: 'Reasonably priced' }],
          },
        ],
      },
    ],
  },
];
