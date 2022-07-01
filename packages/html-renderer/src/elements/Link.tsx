import escapeHtml from 'escape-html';
import { LinkRendererProps } from '../types';

export function Link({ children, ...rest }: LinkRendererProps) {
  const { href, rel, id, title, openInNewTab, className } = rest;

  return `
    <a href="${escapeHtml(href)}" target="${
    openInNewTab ? '_blank' : '_self'
  }" ${className ? `class="${className}"` : ``} ${rel ? `rel="${rel}"` : ``} ${
    title ? `title="${title}"` : ``
  } ${id ? `id="${id}"` : ``} ${rel ? `rel="${rel}"` : ``}>
      ${children}
    </a>
  `;
}
