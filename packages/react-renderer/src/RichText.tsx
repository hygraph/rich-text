import React, { Fragment } from 'react';
import {
  RichTextProps,
  NodeRendererType,
  ElementNode,
  RemoveEmptyElementType,
  Node,
  isElement,
  isText,
  EmbedReferences,
} from '@graphcms/rich-text-types';

import {
  defaultElements,
  defaultRemoveEmptyElements,
  elementKeys,
} from './defaultElements';
import { RenderText } from './RenderText';

function RenderNode({
  node,
  renderers,
  references,
}: {
  node: Node;
  renderers?: NodeRendererType;
  references?: EmbedReferences;
}) {
  if (isText(node)) {
    return <RenderText textNode={node} renderers={renderers} />;
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
  renderers?: NodeRendererType;
  references?: EmbedReferences;
}) {
  const { children, type, ...rest } = element;
  const { nodeId, nodeType } = rest;

  /**
   * Checks if element has empty text, so it can be removed.
   *
   * Elements that can be removed with empty text are defined in `defaultRemoveEmptyElements`
   */
  if (
    defaultRemoveEmptyElements?.[
      elementKeys[type] as keyof RemoveEmptyElementType
    ] &&
    children[0].text === ''
  ) {
    return <Fragment />;
  }

  const isEmbed = type === 'embed';

  const elementToRender = isEmbed
    ? renderers?.embed?.[nodeType as keyof NodeRendererType]
    : renderers?.[elementKeys[type] as keyof NodeRendererType];

  const NodeRenderer = elementToRender as React.ElementType;

  /**
   * The .filter method returns an array with all found elements.
   * Since there won't be duplicated ID's, it's safe to use the first element.
   */
  const referenceValues = isEmbed
    ? references?.filter((ref) => ref.id === nodeId)[0]
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

  const props = { ...rest, ...referenceValues };

  if (NodeRenderer) {
    return (
      <NodeRenderer {...props}>
        <RichText content={children as ElementNode[]} renderers={renderers} />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

export function RichText({
  content,
  renderers: resolvers,
  references,
}: RichTextProps) {
  const renderers: NodeRendererType = {
    ...defaultElements,
    ...resolvers,
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

  const elements = Array.isArray(content) ? content : content.children;

  /*
    Checks if there's a embed type inside the content and if the `references` prop is defined

    If it isn't defined and there's embed elements, it will show a warning
  */
  if (__DEV__) {
    const embedElements = elements.filter(
      (element) => element.type === 'embed'
    );

    if (embedElements.length > 0 && !references) {
      console.warn(
        `[@graphcms/rich-text-react-renderer]: to render embed elements you need to provide the \`references\` prop`
      );
    }
  }

  return (
    <>
      {elements.map((node, index) => {
        return (
          <RenderNode
            node={node}
            renderers={renderers}
            references={references}
            key={index}
          />
        );
      })}
    </>
  );
}
