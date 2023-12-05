import { Descendant } from 'slate';
import { deserialize, normalizeHtml } from '../lib';

const parseDomDocumentSync = (normalizedHTML: string) => {
  return new DOMParser().parseFromString(normalizedHTML, 'text/html');
};

export function htmlToSlateASTSync<T>(
  html: string
): string | Descendant | ChildNode[] | Descendant[] | T | T[] {
  if (
    typeof window === 'undefined' ||
    typeof window.DOMParser === 'undefined'
  ) {
    throw new Error(
      'This function is intended to be used in a browser environment only'
    );
  }

  const normalizedHTML = normalizeHtml(html);
  const domDocument = parseDomDocumentSync(normalizedHTML);
  return deserialize(domDocument.body, window);
}
