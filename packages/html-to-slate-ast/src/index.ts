import { jsx } from 'slate-hyperscript';

import type { Element, Mark } from '@graphcms/rich-text-types';

const ELEMENT_TAGS: Record<
  HTMLElement['nodeName'],
  (el: HTMLElement) => Omit<Element, 'children'>
> = {
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  UL: () => ({ type: 'bulleted-list' }),
  P: () => ({ type: 'paragraph' }),
  A: (el) => ({ type: 'link', href: el.getAttribute('href') }),
  BLOCKQUOTE: () => ({ type: 'block-quote' }),
  H1: () => ({ type: 'heading-one' }),
  H2: () => ({ type: 'heading-two' }),
  H3: () => ({ type: 'heading-three' }),
  H4: () => ({ type: 'heading-four' }),
  H5: () => ({ type: 'heading-five' }),
  H6: () => ({ type: 'heading-six' }),
  TABLE: () => ({ type: 'table' }),
  THEAD: () => ({ type: 'table_head' }),
  TBODY: () => ({ type: 'table_body' }),
  TR: () => ({ type: 'table_row' }),
  TD: () => ({ type: 'table_cell' }),
  TH: () => ({ type: 'table_cell' }),
  IMG: (el) => ({
    type: 'link',
    href: el.getAttribute('src'),
    title: Boolean(el.getAttribute('alt')) ? el.getAttribute('alt') : '(Image)',
    openInNewTab: true,
  }),
  PRE: () => ({ type: 'pre' }),
};

const TEXT_TAGS: Record<
  HTMLElement['nodeName'],
  (el?: HTMLElement) => Partial<Record<keyof Mark, boolean>>
> = {
  CODE: () => ({ code: true }),
  EM: () => ({ italic: true }),
  I: () => ({ italic: true }),
  STRONG: () => ({ bold: true }),
  U: () => ({ underline: true }),
};

function deserialize(el: Node) {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    return '\n';
  }

  const { nodeName } = el;
  let parent = el;

  if (
    nodeName === 'PRE' &&
    el.childNodes[0] &&
    el.childNodes[0].nodeName === 'CODE'
  ) {
    parent = el.childNodes[0];
  }
  const children = Array.from(parent.childNodes)
    .map(deserialize)
    .flat() as ChildNode[];

  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (
    isElementNode(el) &&
    Array.from(el.attributes).find(
      (attr) => attr.name == 'role' && attr.value === 'heading'
    )
  ) {
    const level = el.attributes.getNamedItem('aria-level')?.value;
    switch (level) {
      case '1': {
        return jsx('element', { type: 'heading-one' }, children);
      }
      case '2': {
        return jsx('element', { type: 'heading-two' }, children);
      }
      case '3': {
        return jsx('element', { type: 'heading-three' }, children);
      }
      case '4': {
        return jsx('element', { type: 'heading-four' }, children);
      }
      case '5': {
        return jsx('element', { type: 'heading-five' }, children);
      }
      case '6': {
        return jsx('element', { type: 'heading-six' }, children);
      }

      default:
        break;
    }
  }

  if (ELEMENT_TAGS[nodeName]) {
    const attrs = ELEMENT_TAGS[nodeName](el as HTMLElement);
    // li children must be rendered in spans, like in list plugin
    if (nodeName === 'LI') {
      const listItemChildren = children.map((child: ChildNode) => ({
        ...child,
        type: 'list-item-child',
      }));
      return jsx('element', attrs, listItemChildren);
    } else if (
      nodeName === 'TABLE' &&
      !children.find((node: ChildNode) => node.nodeName === 'THEAD')
    ) {
      // tables must have thead, otherwise field crashes
      const thead = {
        type: 'table_head',
        children: [],
      };
      return jsx('element', attrs, [thead, ...children]);
    }
    return jsx('element', attrs, children);
  }

  if (nodeName === 'DIV') {
    const childNodes = Array.from(el.childNodes);
    const isParagraph =
      childNodes.length &&
      childNodes.every(
        (child) =>
          (isElementNode(child) && isInlineElement(child)) || isTextNode(child)
      );
    if (isParagraph) {
      return jsx('element', { type: 'paragraph' }, children);
    }
  }

  if (nodeName === 'SPAN') {
    const parentElement = el.parentElement;
    // Handle users copying parts of paragraphs
    // When they copy multiple paragraphs we don't need to do anything, because all spans have block parents in that case
    if (!parentElement || parentElement.nodeName === 'BODY') {
      return jsx('element', { type: 'paragraph' }, children);
    }
    const element = el as HTMLElement;
    // handles italic, bold and undeline that are not expressed as tags
    // important for pasting from Google Docs
    const tagName = (() => {
      if (element.style.textDecoration === 'underline') {
        return 'U';
      }
      if (element.style.fontStyle === 'italic') {
        return 'EM';
      }
      if (
        parseInt(element.style.fontWeight, 10) > 400 ||
        element.style.fontWeight === 'bold'
      ) {
        return 'STRONG';
      }
      return undefined;
    })();
    if (tagName) {
      const attrs = TEXT_TAGS[tagName]();
      return children.map((child: ChildNode) => jsx('text', attrs, child));
    }
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el as HTMLElement);
    return children.map((child: ChildNode) => jsx('text', attrs, child));
  }

  // general fallback
  // skips unsupported tags and prevents block-level element nesting
  return children;
}

/*
  CKEditor's Word normalizer functions
  Tried importing @ckeditor/ckeditor5-paste-from-office, but it depends on a lot of ckeditor packages we don't need, so decided on just copying these three functions that we need
*/

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/space.js#L57
function normalizeSafariSpaceSpans(htmlString: string) {
  return htmlString.replace(
    /<span(?: class="Apple-converted-space"|)>(\s+)<\/span>/g,
    (_, spaces) => {
      return spaces.length === 1
        ? ' '
        : Array(spaces.length + 1)
            .join('\u00A0 ')
            .substr(0, spaces.length);
    }
  );
}

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/space.js#L19
function normalizeSpacing(htmlString: string) {
  // Run normalizeSafariSpaceSpans() two times to cover nested spans.
  return (
    normalizeSafariSpaceSpans(normalizeSafariSpaceSpans(htmlString))
      // Remove all \r\n from "spacerun spans" so the last replace line doesn't strip all whitespaces.
      .replace(
        /(<span\s+style=['"]mso-spacerun:yes['"]>[^\S\r\n]*?)[\r\n]+([^\S\r\n]*<\/span>)/g,
        '$1$2'
      )
      .replace(/<span\s+style=['"]mso-spacerun:yes['"]><\/span>/g, '')
      .replace(/ <\//g, '\u00A0</')
      .replace(/ <o:p><\/o:p>/g, '\u00A0<o:p></o:p>')
      // Remove <o:p> block filler from empty paragraph. Safari uses \u00A0 instead of &nbsp;.
      .replace(/<o:p>(&nbsp;|\u00A0)<\/o:p>/g, '')
      // Remove all whitespaces when they contain any \r or \n.
      .replace(/>([^\S\r\n]*[\r\n]\s*)</g, '><')
  );
}

// https://github.com/ckeditor/ckeditor5/blob/bce8267e16fccb25448b4c68acc3bf54336aa087/packages/ckeditor5-paste-from-office/src/filters/parse.js#L102
function cleanContentAfterBody(htmlString: string) {
  const bodyCloseTag = '</body>';
  const htmlCloseTag = '</html>';

  const bodyCloseIndex = htmlString.indexOf(bodyCloseTag);

  if (bodyCloseIndex < 0) {
    return htmlString;
  }

  const htmlCloseIndex = htmlString.indexOf(
    htmlCloseTag,
    bodyCloseIndex + bodyCloseTag.length
  );

  return (
    htmlString.substring(0, bodyCloseIndex + bodyCloseTag.length) +
    (htmlCloseIndex >= 0 ? htmlString.substring(htmlCloseIndex) : '')
  );
}

function normalizeHtml(html: string) {
  return cleanContentAfterBody(normalizeSpacing(html));
}

// https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType#node_type_constants
// An Element node like <p> or <div>
function isElementNode(node: Node): node is HTMLElement {
  return node.nodeType === 1;
}

// The actual Text inside an Element or Attr
function isTextNode(node: Node): node is Text {
  return node.nodeType === 3;
}

function isInlineElement(element: HTMLElement) {
  const allInlineElements: Array<keyof HTMLElementTagNameMap> = [
    'a',
    'abbr',
    'audio',
    'b',
    'bdi',
    'bdo',
    'br',
    'button',
    'canvas',
    'cite',
    'code',
    'data',
    'datalist',
    'del',
    'dfn',
    'em',
    'embed',
    'i',
    'iframe',
    'img',
    'input',
    'ins',
    'kbd',
    'label',
    'map',
    'mark',
    'meter',
    'noscript',
    'object',
    'output',
    'picture',
    'progress',
    'q',
    'ruby',
    's',
    'samp',
    'script',
    'select',
    'slot',
    'small',
    'span',
    'strong',
    'sub',
    'sup',
    'template',
    'textarea',
    'time',
    'u',
    'var',
    'video',
    'wbr',
  ];
  return allInlineElements.includes(
    element.tagName.toLowerCase() as keyof HTMLElementTagNameMap
  );
}

const parseDomDocument = async (normalizedHTML: string) => {
  if (window && window.DOMParser) {
    return new DOMParser().parseFromString(normalizedHTML, 'text/html');
  } else {
    const jsdom = await import('jsdom');
    const dom = new jsdom.JSDOM(normalizedHTML, { contentType: 'text/html' });
    return dom.window.document;
  }
};

export async function htmlToSlateAST(html: string) {
  const normalizedHTML = normalizeHtml(html);
  const domDocument = await parseDomDocument(normalizedHTML);
  return deserialize(domDocument.body);
}

export default htmlToSlateAST;
