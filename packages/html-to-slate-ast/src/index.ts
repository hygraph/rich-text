import {
  BaseElement,
  Descendant,
  Element as SlateElement,
  Text as SlateText,
} from 'slate';
import { jsx } from 'slate-hyperscript';
import { sanitizeUrl } from '@braintree/sanitize-url';
import { Element, Mark } from '@graphcms/rich-text-types';

type AttributesType = Omit<Element, 'children'>;

const ELEMENT_TAGS: Record<
  HTMLElement['nodeName'],
  (el: HTMLElement) => AttributesType
> = {
  LI: () => ({ type: 'list-item' }),
  OL: () => ({ type: 'numbered-list' }),
  UL: () => ({ type: 'bulleted-list' }),
  P: () => ({ type: 'paragraph' }),
  A: el => {
    const href = el.getAttribute('href');
    if (href === null) return {};
    return {
      type: 'link',
      href: sanitizeUrl(href),
      ...(el.hasAttribute('title') && { title: el.getAttribute('title') }),
      ...(el.hasAttribute('rel') && { rel: el.getAttribute('rel') }),
      ...(el.hasAttribute('id') && { id: el.getAttribute('id') }),
      ...(el.hasAttribute('class') && {
        className: el.getAttribute('class'),
      }),
      openInNewTab: Boolean(el.getAttribute('target') === '_blank'),
    };
  },
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
  TH: () => ({ type: 'table_header_cell' }),
  IMG: el => {
    const href = el.getAttribute('src');
    const title = Boolean(el.getAttribute('alt'))
      ? el.getAttribute('alt')
      : Boolean(el.getAttribute('title'))
      ? el.getAttribute('title')
      : '(Image)';
    if (href === null) return {};
    return {
      type: 'link',
      href: sanitizeUrl(href),
      title,
      openInNewTab: true,
    };
  },
  PRE: () => ({ type: 'code-block' }),
  IFRAME: el => {
    const src = el.getAttribute('src');
    if (!src) return {};
    const height = el.getAttribute('height');
    const width = el.getAttribute('width');
    return {
      type: 'iframe',
      url: src,
      // default iframe height is 150
      height: Number(height || 150),
      // default iframe width is 300
      width: Number(width || 300),
      children: [
        {
          text: '',
        },
      ],
    };
  },
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

function deserialize<
  T extends {
    Node: typeof window.Node;
  }
>(el: Node, global: T): string | ChildNode[] | BaseElement | Descendant[];

function deserialize<
  T extends {
    Node: typeof window.Node;
  }
>(el: Node, global: T) {
  if (el.nodeType === 3) {
    return el.textContent;
  } else if (el.nodeType !== 1) {
    return null;
  } else if (el.nodeName === 'BR') {
    // wrap parentless breaks in a paragraph
    if (el.parentElement?.nodeName === 'BODY') {
      return jsx('element', { type: 'paragraph' }, [{ text: '' }]);
    } else {
      return '\n';
    }
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
  let children = Array.from(parent.childNodes)
    .map(c => deserialize(c, global))
    .flat();

  if (children.length === 0) {
    if (!['COLGROUP', 'COL', 'CAPTION', 'TFOOT'].includes(nodeName)) {
      const textNode = jsx('text', {}, '');
      children = [textNode];
    }
  }
  if (el.nodeName === 'BODY') {
    return jsx('fragment', {}, children);
  }

  if (
    isElementNode(el) &&
    Array.from(el.attributes).find(
      attr => attr.name === 'role' && attr.value === 'heading'
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
      const hasNestedListChild = children.find(
        item =>
          SlateElement.isElement(item) &&
          // if element has a nested list as a child, all children must be wrapped in individual list-item-child nodes
          // TODO: sync with GCMS types for Slate elements
          // @ts-expect-error
          (item.type === 'numbered-list' || item.type === 'bulleted-list')
      );
      if (hasNestedListChild) {
        const wrappedChildren = children.map(item =>
          jsx('element', { type: 'list-item-child' }, item)
        );
        return jsx('element', attrs, wrappedChildren);
      }
      // in any case we add a single list-item-child containing the children
      const child = jsx('element', { type: 'list-item-child' }, children);
      return jsx('element', attrs, [child]);
    } else if (nodeName === 'TR') {
      if (
        el.parentElement?.nodeName === 'THEAD' &&
        (el as HTMLTableRowElement).cells.length === 0
      ) {
        return [
          {
            type: 'table_header_cell',
            children: [
              {
                type: 'paragraph',
                children: [{ text: el.textContent ? el.textContent : '' }],
              },
            ],
          },
        ];
      }
      // if TR is empty, insert a cell with a paragraph to ensure selection can be placed inside
      const modifiedChildren =
        (el as HTMLTableRowElement).cells.length === 0
          ? [
              {
                type:
                  el.parentElement?.nodeName === 'THEAD'
                    ? 'table_header_cell'
                    : 'table_cell',
                children: [
                  {
                    type: 'paragraph',
                    children: [{ text: el.textContent ? el.textContent : '' }],
                  },
                ],
              },
            ]
          : children;
      return jsx('element', attrs, modifiedChildren);
    } else if (nodeName === 'TD' || nodeName === 'TH') {
      // if TD or TH is empty, insert a paragraph to ensure selection can be placed inside
      const childNodes = Array.from((el as HTMLTableCellElement).childNodes);
      if (childNodes.length === 0) {
        return jsx('element', attrs, [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ]);
      } else {
        const children = childNodes.map(c => deserialize(c, global)).flat();
        return jsx('element', attrs, children);
      }
    } else if (nodeName === 'IMG') {
      return jsx('element', attrs, [attrs.href]);
    }
    return jsx('element', attrs, children);
  }

  if (nodeName === 'DIV') {
    if (isElementNode(el)) {
      const nodeType = el.getAttribute('data-gcms-embed-type');
      const nodeId = el.getAttribute('data-gcms-embed-id');
      if (nodeType && nodeId) {
        return jsx('element', { type: 'embed', nodeId, nodeType }, children);
      }
    }

    const childNodes = Array.from(el.childNodes);
    const isParagraph = childNodes.every(
      child =>
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

    // boolean attribute
    const isInlineEmbed = element.getAttribute('data-gcms-embed-inline');

    if (isInlineEmbed !== null && isElementNode(element)) {
      const nodeType = element.getAttribute('data-gcms-embed-type');
      const nodeId = element.getAttribute('data-gcms-embed-id');
      if (nodeId && nodeType) {
        return jsx(
          'element',
          { type: 'embed', nodeId, nodeType, isInline: true },
          children
        );
      }
    }

    // handles italic, bold and undeline that are not expressed as tags
    // important for pasting from Google Docs
    const attrs = getSpanAttributes(element);

    if (attrs) {
      return children.map(child => {
        if (typeof child === 'string') {
          return jsx('text', attrs, child);
        }

        if (isChildNode(child, global)) return child;

        if (SlateElement.isElement(child) && !SlateText.isText(child)) {
          child.children = child.children.map(c => ({ ...c, ...attrs }));
          return child;
        }

        return child;
      });
    }
  }

  if (TEXT_TAGS[nodeName]) {
    const attrs = TEXT_TAGS[nodeName](el as HTMLElement);
    return children.map(child => {
      if (typeof child === 'string') {
        return jsx('text', attrs, child);
      }

      if (isChildNode(child, global)) return child;

      if (SlateElement.isElement(child) && !SlateText.isText(child)) {
        child.children = child.children.map(c => ({ ...c, ...attrs }));
        return child;
      }

      return child;
    });
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
            .substring(0, spaces.length + 1);
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

function isChildNode<T extends { Node: typeof Node }>(
  node: string | ChildNode | Descendant,
  global: T
): node is ChildNode {
  return node instanceof global.Node;
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

function getSpanAttributes(element: HTMLElement): AttributesType | null {
  const names = [];
  if (element.style.textDecoration === 'underline') {
    names.push('U');
  }
  if (element.style.fontStyle === 'italic') {
    names.push('EM');
  }
  if (
    parseInt(element.style.fontWeight, 10) > 400 ||
    element.style.fontWeight === 'bold'
  ) {
    names.push('STRONG');
  }
  if (names.length === 0) return null;
  const attrs: AttributesType = names.reduce((acc, current) => {
    return { ...acc, ...TEXT_TAGS[current]() };
  }, {});
  return attrs;
}

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
