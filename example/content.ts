import { RichTextContent } from '@graphcms/rich-text-types';

export const content: RichTextContent = {
  children: [
    {
      type: 'heading-two',
      children: [{ text: 'Awesome new GraphCMS cap!' }],
    },
    {
      type: 'paragraph',
      children: [
        { text: 'Sweet black ' },
        { bold: true, text: 'cap' },
        { text: ' ' },
        { text: 'with', underline: true },
        { text: ' ' },
        { text: 'embroidered', italic: true },
        { text: ' ' },
        { bold: true, text: 'GraphCMS' },
        { text: ' logo.' },
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
              children: [{ text: 'Embroided logo' }],
            },
          ],
        },
        {
          type: 'list-item',
          children: [
            {
              type: 'list-item-child',
              children: [{ text: 'Fits well' }],
            },
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
    { type: 'paragraph', children: [{ text: '<Test />', code: true }] },
  ],
};
