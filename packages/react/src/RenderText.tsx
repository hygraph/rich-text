import React, { Fragment, ReactNode } from 'react';
import { NodeRendererType, Text } from '@graphcms/rich-text-types';
import escapeHtml from 'escape-html';

import { elementKeys } from './defaultElements';

export function RenderText({
  textNode,
  renderers,
}: {
  textNode: Text;
  renderers?: NodeRendererType;
}) {
  const { text, bold, italic, underlined, code } = textNode;

  if (!text) return <Fragment />;

  const Bold = renderers?.[elementKeys['bold'] as keyof NodeRendererType];
  const Italic = renderers?.[elementKeys['italic'] as keyof NodeRendererType];
  const Underlined =
    renderers?.[elementKeys['underlined'] as keyof NodeRendererType];
  const Code = renderers?.[elementKeys['code'] as keyof NodeRendererType];

  let element: ReactNode = escapeHtml(text);

  if (bold && Bold) {
    element = <Bold>{element}</Bold>;
  }

  if (italic && Italic) {
    element = <Italic>{element}</Italic>;
  }

  if (underlined && Underlined) {
    element = <Underlined>{element}</Underlined>;
  }

  if (code && Code) {
    element = <Code>{element}</Code>;
  }

  return <>{element}</>;
}
