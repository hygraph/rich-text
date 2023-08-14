import {
  ElementNode,
  elementTypeKeys,
  EmbedReferences,
  isElement,
  isEmpty,
  isText,
  Node,
  EmptyElementsToRemove,
  Text,
} from '@graphcms/rich-text-types';
import escape from 'escape-html';

import { defaultElements } from './defaultElements';
import { RichTextProps, NodeRendererType } from './types';

function getArrayOfElements(content: RichTextProps['content']) {
  return Array.isArray(content) ? content : content.children;
}

function serialize(text: string) {
  if (text.includes('\n')) {
    const splitText = text.split('\n');

    return splitText
      .map(
        (line, index) =>
          `${line}${index === splitText.length - 1 ? '' : '<br />'}`
      )
      .join('');
  }

  return text;
}

type RenderText = {
  textNode: Text;
  renderers?: RichTextProps['renderers'];
  shouldSerialize: boolean | null;
};

function renderText({ shouldSerialize, textNode, renderers }: RenderText) {
  const { text, bold, italic, underline, code } = textNode;

  const escapedText = escape(text);
  let parsedText = shouldSerialize ? serialize(escapedText) : escapedText;

  const Bold: NodeRendererType['bold'] = renderers?.['bold'];
  const Italic: NodeRendererType['italic'] = renderers?.['italic'];
  const Underline: NodeRendererType['underline'] = renderers?.['underline'];
  const Code: NodeRendererType['code'] = renderers?.['code'];

  if (bold && Bold) {
    parsedText = Bold({ children: parsedText as string });
  }

  if (italic && Italic) {
    parsedText = Italic({ children: parsedText as string });
  }

  if (underline && Underline) {
    parsedText = Underline({ children: parsedText as string });
  }

  if (code && Code) {
    parsedText = Code({ children: parsedText as string });
  }

  return parsedText as string;
}

type RenderElement = {
  element: ElementNode;
  renderers?: NodeRendererType;
  references?: EmbedReferences;
};

function renderElement({
  element,
  references,
  renderers,
}: RenderElement): string {
  const { children, type, ...rest } = element;
  const { nodeId, nodeType } = rest;

  if (type in EmptyElementsToRemove && isEmpty({ children })) {
    return ``;
  }

  const isEmbed = nodeId && nodeType;

  const referenceValues = isEmbed
    ? references?.filter(ref => ref.id === nodeId)[0]
    : null;

  if (__DEV__ && isEmbed && !referenceValues?.id) {
    console.error(
      `[@graphcms/rich-text-html-renderer]: No id found for embed node ${nodeId}. In order to render custom embeds, \`id\` is required in your reference query.`
    );

    return ``;
  }

  if (
    __DEV__ &&
    isEmbed &&
    nodeType === 'Asset' &&
    !referenceValues?.mimeType
  ) {
    console.error(
      `[@graphcms/rich-text-html-renderer]: No mimeType found for embed node ${nodeId}. In order to render custom assets, \`mimeType\` is required in your reference query.`
    );

    return ``;
  }

  if (__DEV__ && isEmbed && nodeType === 'Asset' && !referenceValues?.url) {
    console.error(
      `[@graphcms/rich-text-html-renderer]: No url found for embed node ${nodeId}. In order to render custom assets, \`url\` is required in your reference query.`
    );

    return ``;
  }

  let elementToRender;

  if (isEmbed && nodeType !== 'Asset') {
    const element =
      type === 'link'
        ? renderers?.link?.[nodeType as string]
        : renderers?.embed?.[nodeType as string];

    if (element !== undefined) {
      elementToRender = element;
    } else {
      console.warn(
        `[@graphcms/rich-text-html-renderer]: No renderer found for custom ${type} nodeType ${nodeType}.`
      );
      return ``;
    }
  }

  if (isEmbed && nodeType === 'Asset') {
    const element = renderers?.Asset?.[referenceValues?.mimeType];

    if (element !== undefined) {
      elementToRender = element;
    } else {
      const mimeTypeGroup = referenceValues?.mimeType.split('/')[0];
      elementToRender = renderers?.Asset?.[mimeTypeGroup];
    }
  }

  const elementNodeRenderer = isEmbed
    ? elementToRender
    : renderers?.[elementTypeKeys[type] as keyof RichTextProps['renderers']];

  if (elementNodeRenderer) {
    const props = { ...rest, ...referenceValues };

    const nextElements = renderElements({
      content: children as ElementNode[],
      renderers,
      references,
      parent: element,
    }).join('');

    return elementNodeRenderer({ ...props, children: nextElements });
  }

  return ``;
}

type RenderNode = {
  node: Node;
  parent: Node | null;
  renderers?: NodeRendererType;
  references?: EmbedReferences;
};

function renderNode({
  node,
  parent,
  references,
  renderers,
}: RenderNode): string {
  if (isText(node)) {
    const shouldSerialize =
      parent && isElement(parent) && parent.type !== 'code-block';

    return renderText({
      shouldSerialize,
      textNode: node,
      renderers,
    });
  }

  if (isElement(node)) {
    return renderElement({
      element: node,
      renderers,
      references,
    });
  }

  const { type } = node as ElementNode;

  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-html-renderer]: Unknown node type encountered: ${type}`
    );
  }

  return ``;
}

type RenderElements = RichTextProps & {
  parent?: Node | null;
};

function renderElements({
  content,
  parent,
  references,
  renderers,
}: RenderElements) {
  const elements = getArrayOfElements(content);

  return elements.map(node => {
    return renderNode({
      node,
      parent: parent || null,
      renderers,
      references,
    });
  });
}

export function astToHtmlString({
  renderers: resolvers,
  content,
  references,
}: RichTextProps): string {
  const assetRenderers = {
    ...defaultElements?.Asset,
    ...resolvers?.Asset,
  };

  const renderers: NodeRendererType = {
    ...defaultElements,
    ...resolvers,
    Asset: assetRenderers,
  };

  if (__DEV__ && !content) {
    console.error(`[@graphcms/rich-text-html-renderer]: content is required.`);

    return ``;
  }

  if (__DEV__ && !Array.isArray(content) && !content.children) {
    console.error(
      `[@graphcms/rich-text-html-renderer]: children is required in content.`
    );

    return ``;
  }

  /*
    Checks if there's a embed type inside the content and if the `references` prop is defined

    If it isn't defined and there's embed elements, it will show a warning
    */
  if (__DEV__) {
    const elements = getArrayOfElements(content);

    const embedElements = elements.filter(element => element.type === 'embed');

    if (embedElements.length > 0 && !references) {
      console.warn(
        `[@graphcms/rich-text-html-renderer]: to render embed elements you need to provide the \`references\` prop`
      );
    }
  }

  return renderElements({
    content,
    references,
    renderers,
  }).join('');
}

export * from './elements';
export * from './types';
