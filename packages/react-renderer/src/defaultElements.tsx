import React, { Fragment } from 'react';
import { RichTextProps } from './types';

import { IFrame, Image, Video, Class, Link, Audio } from './elements';

function FallbackForCustomAsset({ mimeType }: { mimeType: string }) {
  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: Unsupported mimeType encountered: ${mimeType}. You need to write your renderer to render it since we are not opinionated about how this asset should be rendered (check our docs for more info).`
    );
  }

  return <Fragment />;
}

export const defaultElements: Required<RichTextProps['renderers']> = {
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
  link: {},
};
