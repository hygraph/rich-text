import { EmbedReferences, RichTextContent } from '@graphcms/rich-text-types';

export const content: RichTextContent = {
  children: [
    {
      type: 'heading-two',
      children: [{ text: 'Awesome new Hygraph cap!' }],
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
        { bold: true, text: 'Hygraph' },
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
    {
      type: 'code-block',
      children: [
        {
          text: "const teste = 'teste'",
        },
      ],
    },
    {
      type: 'code-block',
      children: [
        {
          text: 'const hy = \'graph\'\n\n<?php $echo "Hello" ?>',
        },
      ],
    },
    {
      type: 'embed',
      nodeId: 'ckrus0f14ao760b32mz2dwvgx',
      children: [
        {
          text: '',
        },
      ],
      nodeType: 'Asset',
    },
    {
      type: 'embed',
      nodeId: 'ckrxv7b74g8il0d782lf66dup',
      children: [
        {
          text: '',
        },
      ],
      nodeType: 'Asset',
    },
    {
      type: 'embed',
      nodeId: 'ckrxv6otkg6ez0c8743xp9bzs',
      children: [
        {
          text: '',
        },
      ],
      nodeType: 'Asset',
    },
    {
      type: 'embed',
      nodeId: 'custom_post_id',
      children: [
        {
          text: '',
        },
      ],
      nodeType: 'Post',
    },
  ],
};

export const references: EmbedReferences = [
  {
    id: 'ckrus0f14ao760b32mz2dwvgx',
    handle: '7M0lXLdCQfeIDXnT2SVS',
    fileName: 'file_example_MP4_480_1_5MG.mp4',
    height: null,
    width: null,
    url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
    mimeType: 'video/mp4',
  },
  {
    id: 'ckrxv7b74g8il0d782lf66dup',
    handle: '7VA0p81VQfmZQC9jPB2I',
    fileName: 'teste.txt',
    height: null,
    width: null,
    url: 'https://media.graphassets.com/7VA0p81VQfmZQC9jPB2I',
    mimeType: 'text/plain',
  },
  {
    id: 'ckrxv6otkg6ez0c8743xp9bzs',
    handle: 'HzsAGQyASM2B6B3dHY0n',
    fileName: 'pdf-test.pdf',
    height: null,
    width: null,
    url: 'https://media.graphassets.com/HzsAGQyASM2B6B3dHY0n',
    mimeType: 'application/pdf',
  },
  {
    id: 'custom_post_id',
    title: 'Hygraph is awesome :rocket:',
  },
];
