import React, { ReactNode } from 'react';
import { NodeRendererType, Text } from '@graphcms/rich-text-types';

import { elementKeys } from './defaultElements';

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
  renderers?: NodeRendererType;
  shouldSerialize: boolean;
}) {
  const { text, bold, italic, underline, code } = textNode;

  const parsedText = shouldSerialize ? serialize(text) : text;

  const Bold = renderers?.[
    elementKeys['bold'] as keyof NodeRendererType
  ] as React.ElementType;

  const Italic = renderers?.[
    elementKeys['italic'] as keyof NodeRendererType
  ] as React.ElementType;

  const Underline = renderers?.[
    elementKeys['underline'] as keyof NodeRendererType
  ] as React.ElementType;

  const Code = renderers?.[
    elementKeys['code'] as keyof NodeRendererType
  ] as React.ElementType;

  let element: ReactNode = parsedText;

  if (bold && Bold) {
    element = <Bold>{element}</Bold>;
  }

  if (italic && Italic) {
    element = <Italic>{element}</Italic>;
  }

  if (underline && Underline) {
    element = <Underline>{element}</Underline>;
  }

  if (code && Code) {
    element = <Code>{element}</Code>;
  }

  return <>{element}</>;
}
