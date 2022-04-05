import React, { Fragment } from 'react';
import {
  ElementNode,
  EmptyElementsToRemove,
  Node,
  isElement,
  isText,
  isEmpty,
  elementTypeKeys,
} from '@graphcms/rich-text-types';

import { defaultElements } from './defaultElements';
import { RenderText } from './RenderText';
import { RichTextProps } from './types';

function getArrayOfElements(content: RichTextProps['content']) {
  return Array.isArray(content) ? content : content.children;
}

function RenderNode({
  node,
  parent,
  renderers,
  references,
}: {
  node: Node;
  parent: Node | null;
  renderers?: RichTextProps['renderers'];
  references?: RichTextProps['references'];
}) {
  if (isText(node)) {
    let text = node.text;

    const shouldSerialize =
      parent && isElement(parent) && parent.type !== 'code-block';

    return (
      <RenderText
        textNode={{ ...node, text }}
        renderers={renderers}
        shouldSerialize={shouldSerialize as boolean}
      />
    );
  }

  if (isElement(node)) {
    return (
      <RenderElement
        element={node}
        renderers={renderers}
        references={references}
      />
    );
  }

  const { type } = node as ElementNode;

  if (__DEV__) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: Unknown node type encountered: ${type}`
    );
  }

  return <Fragment />;
}

function RenderElement({
  element,
  renderers,
  references,
}: {
  element: ElementNode;
  renderers?: RichTextProps['renderers'];
  references?: RichTextProps['references'];
}) {
  const { children, type, ...rest } = element;
  const { nodeId, nodeType } = rest;

  // Checks if the element is empty so that it can be removed.
  if (type in EmptyElementsToRemove && isEmpty({ children })) {
    return <Fragment />;
  }

  const isEmbed = type === 'embed';

  /**
   * The .filter method returns an array with all found elements.
   * Since there won't be duplicated ID's, it's safe to use the first element.
   */
  const referenceValues = isEmbed
    ? references?.filter(ref => ref.id === nodeId)[0]
    : null;

  /**
   * `id` is used to correctly find the props for the reference.
   * If it's not present, we show an error and render a Fragment.
   */
  if (__DEV__ && isEmbed && !referenceValues?.id) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: No id found for embed node ${nodeId}. In order to render custom embeds, \`id\` is required in your reference query.`
    );

    return <Fragment />;
  }

  /**
   * `mimeType` is used to determine if the node is an image or a video.
   * That's why this is required and we show an error if it's not present.
   * Only for custom assets embeds.
   */
  if (
    __DEV__ &&
    isEmbed &&
    nodeType === 'Asset' &&
    !referenceValues?.mimeType
  ) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: No mimeType found for embed node ${nodeId}. In order to render custom assets, \`mimeType\` is required in your reference query.`
    );

    return <Fragment />;
  }

  /**
   * `url` is needed to correctly render the image, video, audio or any other asset
   * Only for custom assets embeds.
   */
  if (__DEV__ && isEmbed && nodeType === 'Asset' && !referenceValues?.url) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: No url found for embed node ${nodeId}. In order to render custom assets, \`url\` is required in your reference query.`
    );

    return <Fragment />;
  }

  /**
   * There's two options if the element is an embed.
   * 1. If it isn't an asset, then we simply try to use the renderer for that model.
   *  1.1 If we don't find a renderer, we render a Fragment and show a warning.
   * 2. If it is an asset, then:
   *  2.1 If we have a custom renderer for that specific mimeType, we use it.
   *  2.2 If we don't have, we use the default mimeType group renderer (application, image, video...).
   */
  let elementToRender;

  // Option 1
  if (isEmbed && nodeType !== 'Asset') {
    const element = renderers?.embed?.[nodeType as string];

    if (element !== undefined) {
      elementToRender = element;
    } else {
      // Option 1.1
      console.warn(
        `[@graphcms/rich-text-react-renderer]: No renderer found for custom embed node type ${nodeType}.`
      );
      return <Fragment />;
    }
  }

  // Option 2
  if (isEmbed && nodeType === 'Asset') {
    const element = renderers?.Asset?.[referenceValues?.mimeType];

    // Option 2.1
    if (element !== undefined) {
      elementToRender = element;
    } else {
      // Option 2.2
      const mimeTypeGroup = referenceValues?.mimeType.split('/')[0];
      elementToRender = renderers?.Asset?.[mimeTypeGroup];
    }
  }

  const elementNodeRenderer = isEmbed
    ? elementToRender
    : renderers?.[elementTypeKeys[type] as keyof RichTextProps['renderers']];

  const NodeRenderer = elementNodeRenderer as React.ElementType;

  const props = { ...rest, ...referenceValues };

  if (NodeRenderer) {
    return (
      <NodeRenderer {...props}>
        <RenderElements
          content={children as ElementNode[]}
          renderers={renderers}
          references={references}
          parent={element}
        />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

type RenderElementsProps = RichTextProps & {
  parent?: Node | null;
};

function RenderElements({
  content,
  references,
  renderers,
  parent,
}: RenderElementsProps) {
  const elements = getArrayOfElements(content);

  return (
    <>
      {elements.map((node, index) => {
        return (
          <RenderNode
            node={node}
            parent={parent || null}
            renderers={renderers}
            references={references}
            key={index}
          />
        );
      })}
    </>
  );
}

export function RichText({
  content,
  renderers: resolvers,
  references,
}: RichTextProps) {
  // Shallow merge doensn't work here because if we spread over the elements, the
  // Asset object will be completly overriden by the resolvers. We need to keep
  // the default elements for the Asset that hasn't been writen.
  const assetRenderers = {
    ...defaultElements?.Asset,
    ...resolvers?.Asset,
  };

  const renderers: RichTextProps['renderers'] = {
    ...defaultElements,
    ...resolvers,
    Asset: assetRenderers,
  };

  if (__DEV__ && !content) {
    console.error(`[@graphcms/rich-text-react-renderer]: content is required.`);

    return <Fragment />;
  }

  if (__DEV__ && !Array.isArray(content) && !content.children) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: children is required in content.`
    );

    return <Fragment />;
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
        `[@graphcms/rich-text-react-renderer]: to render embed elements you need to provide the \`references\` prop`
      );
    }
  }

  return (
    <RenderElements
      content={content}
      renderers={renderers}
      references={references}
    />
  );
}
