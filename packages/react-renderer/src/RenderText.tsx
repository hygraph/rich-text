import React, { ReactNode } from 'react';
import { NodeRendererType, Text } from '@graphcms/rich-text-types';

import { elementKeys } from './defaultElements';

export function RenderText({
  textNode,
  renderers,
}: {
  textNode: Text;
  renderers?: NodeRendererType;
}) {
  const { text, bold, italic, underline, code } = textNode;

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

  let element: ReactNode = text;

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
