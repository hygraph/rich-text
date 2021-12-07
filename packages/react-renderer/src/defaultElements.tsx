import React, { Fragment } from 'react';
import {
  NodeRendererType,
  RemoveEmptyElementType,
} from '@graphcms/rich-text-types';

import { IFrame, Image, Video, Class, Link, Audio } from './elements';

function FallbackForCustomAsset({ mimeType }: { mimeType: string }) {
  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: Unsupported mimeType encountered: ${mimeType}. You need to write your renderer to render it since we are not opinionated about how this asset should be rendered (check our docs for more info).`
    );
  }

  return <Fragment />;
}

export const defaultElements: Required<NodeRendererType> = {
  a: Link,
  class: Class,
  video: Video,
  img: Image,
  iframe: IFrame,
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  p: ({ children }) => <p>{children}</p>,
  h1: ({ children }) => <h1>{children}</h1>,
  h2: ({ children }) => <h2>{children}</h2>,
  h3: ({ children }) => <h3>{children}</h3>,
  h4: ({ children }) => <h4>{children}</h4>,
  h5: ({ children }) => <h5>{children}</h5>,
  h6: ({ children }) => <h6>{children}</h6>,
  table: ({ children }) => <table>{children}</table>,
  table_head: ({ children }) => <thead>{children}</thead>,
  table_body: ({ children }) => <tbody>{children}</tbody>,
  table_row: ({ children }) => <tr>{children}</tr>,
  table_cell: ({ children }) => <td>{children}</td>,
  table_header_cell: ({ children }) => <th>{children}</th>,
  bold: ({ children }) => <b>{children}</b>,
  italic: ({ children }) => <i>{children}</i>,
  underline: ({ children }) => <u>{children}</u>,
  code: ({ children }) => <code>{children}</code>,
  code_block: ({ children }) => (
    <pre
      style={{
        whiteSpace: 'pre',
        wordWrap: 'break-word',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        fontFamily: 'monospace',
      }}
    >
      {children}
    </pre>
  ),
  list_item_child: ({ children }) => <>{children}</>,
  Asset: {
    audio: props => <Audio {...props} url={props.url} />,
    image: props => <Image {...props} src={props.url} />,
    video: props => <Video {...props} src={props.url} />,
    font: FallbackForCustomAsset,
    application: FallbackForCustomAsset,
    model: FallbackForCustomAsset,
    text: FallbackForCustomAsset,
  },
  embed: {},
};

/**
 * List of elements that shouldn't render when they are empty.
 *
 * This fixes issues like validate DOM nesting and others - look at [#5](https://github.com/GraphCMS/rich-text/issues/5)
 */
export const defaultRemoveEmptyElements: Required<RemoveEmptyElementType> = {
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  table_head: true,
};

export const elementKeys: { [key: string]: string } = {
  'heading-one': 'h1',
  'heading-two': 'h2',
  'heading-three': 'h3',
  'heading-four': 'h4',
  'heading-five': 'h5',
  'heading-six': 'h6',
  class: 'class',
  link: 'a',
  image: 'img',
  iframe: 'iframe',
  video: 'video',
  'bulleted-list': 'ul',
  'numbered-list': 'ol',
  'list-item': 'li',
  'list-item-child': 'list_item_child',
  table: 'table',
  table_head: 'table_head',
  table_body: 'table_body',
  table_row: 'table_row',
  table_cell: 'table_cell',
  table_header_cell: 'table_header_cell',
  'block-quote': 'blockquote',
  paragraph: 'p',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  code: 'code',
  'code-block': 'code_block',
};
