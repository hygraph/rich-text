import escapeHtml from 'escape-html';
import { LinkRendererProps } from '../types';

export function Link({ children, ...rest }: LinkRendererProps) {
  const { href, rel, id, title, openInNewTab, className } = rest;

  return `
    <a
      href="${escapeHtml(href)}"
      class="${className || ''}"
      target="${openInNewTab ? '_blank' : '_self'}"
      title="${title || ''}"
      id="${id || ''}"
      rel="${rel || ''}"
    >
      ${children}
    </a>
  `;
}
