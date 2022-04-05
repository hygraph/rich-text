import React, { ReactNode } from 'react';
import { Text } from '@graphcms/rich-text-types';

import { RichTextProps, NodeRendererType } from './types';

function serialize(text: string) {
  if (text.includes('\n')) {
    const splitText = text.split('\n');

    return splitText.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index === splitText.length - 1 ? null : <br />}
      </React.Fragment>
    ));
  }

  return text;
}

export function RenderText({
  textNode,
  renderers,
  shouldSerialize,
}: {
  textNode: Text;
  renderers?: RichTextProps['renderers'];
  shouldSerialize: boolean;
}) {
  const { text, bold, italic, underline, code } = textNode;

  let parsedText: ReactNode = shouldSerialize ? serialize(text) : text;

  const Bold: NodeRendererType['bold'] = renderers?.['bold'];
  const Italic: NodeRendererType['italic'] = renderers?.['italic'];
  const Underline: NodeRendererType['underline'] = renderers?.['underline'];
  const Code: NodeRendererType['code'] = renderers?.['code'];

  if (bold && Bold) {
    parsedText = <Bold>{parsedText}</Bold>;
  }

  if (italic && Italic) {
    parsedText = <Italic>{parsedText}</Italic>;
  }

  if (underline && Underline) {
    parsedText = <Underline>{parsedText}</Underline>;
  }

  if (code && Code) {
    parsedText = <Code>{parsedText}</Code>;
  }

  return <>{parsedText}</>;
}
