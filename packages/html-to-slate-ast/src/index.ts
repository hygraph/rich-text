import { Descendant } from 'slate';
import { normalizeHtml } from './normalizeHtml';
import { deserialize } from './deserialize';

const parseDomDocument = async (normalizedHTML: string) => {
  if (typeof window !== 'undefined' && window.DOMParser) {
    return new DOMParser().parseFromString(normalizedHTML, 'text/html');
  } else {
    const jsdom = await import('jsdom');
    const dom = new jsdom.JSDOM(normalizedHTML, { contentType: 'text/html' });
    return dom.window.document;
  }
};

export function htmlToSlateAST<T>(
  html: string
): Promise<string | Descendant | ChildNode[] | Descendant[] | T | T[]>;
export async function htmlToSlateAST(html: string) {
  const normalizedHTML = normalizeHtml(html);
  const domDocument = await parseDomDocument(normalizedHTML);
  const global = await (async () => {
    if (typeof window !== 'undefined') return window;
    return await import('jsdom').then(jsdom => new jsdom.JSDOM().window);
  })();
  return deserialize(domDocument.body, global);
}

export default htmlToSlateAST;
