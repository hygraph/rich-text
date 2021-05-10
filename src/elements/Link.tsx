import React from 'react';
import escapeHtml from 'escape-html';

import { LinkElement, LinkRendererProps } from '../types';

export function Link({ children, ...rest }: LinkRendererProps) {
  const { href, rel, id, title, openInNewTab, className } = rest;

  const props: Pick<LinkElement, 'rel' | 'id' | 'title' | 'className'> & {
    target?: string;
  } = {};

  if (rel) props.rel = rel;
  if (id) props.id = id;
  if (title) props.title = title;
  if (className) props.className = className;
  if (openInNewTab) props.target = '_blank';

  return (
    <a href={escapeHtml(href)} {...props} style={{ color: 'red' }}>
      {children}
    </a>
  );
}
