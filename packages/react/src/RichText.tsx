import React, { Fragment } from 'react';
import {
  RichTextProps,
  NodeRendererType,
  ElementNode,
  EmbedReferences,
  EmbedElement,
  RemoveEmptyElementType,
  Node,
  isElement,
  isEmbed,
  isText,
} from '@graphcms/rich-text-types';

import {
  defaultElements,
  defaultRemoveEmptyElements,
  elementKeys,
} from './defaultElements';
import { RenderText } from './RenderText';

function RenderNode({
  node,
  references,
  renderers,
}: {
  node: Node;
  references?: EmbedReferences;
  renderers?: NodeRendererType;
}) {
  if (isText(node)) {
    return <RenderText textNode={node} renderers={renderers} />;
  }

  if (isEmbed(node)) {
    return (
      <RenderEmbed
        element={node}
        references={references}
        renderers={renderers}
      />
    );
  }

  if (isElement(node)) {
    return (
      <RenderElement
        element={node}
        references={references}
        renderers={renderers}
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
  references,
  renderers,
}: {
  element: ElementNode;
  references?: EmbedReferences;
  renderers?: NodeRendererType;
}) {
  const { children, type, ...rest } = element;

  if (
    defaultRemoveEmptyElements?.[
      elementKeys[type] as keyof RemoveEmptyElementType
    ] &&
    children[0].text === ''
  ) {
    return <Fragment />;
  }

  const NodeRenderer = renderers?.[elementKeys[type] as keyof NodeRendererType];

  if (NodeRenderer) {
    return (
      <NodeRenderer {...rest}>
        <RichText
          content={children as ElementNode[]}
          references={references}
          renderers={renderers}
        />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

export function RenderEmbed({
  element,
  references,
  renderers,
}: {
  element: EmbedElement;
  references?: EmbedReferences;
  renderers?: NodeRendererType;
}) {
  const { children, type, nodeId, ...rest } = element;

  const NodeRenderer = renderers?.[elementKeys[type] as keyof NodeRendererType];
  const reference = references?.get(nodeId);

  if (NodeRenderer) {
    return (
      <NodeRenderer {...rest} {...reference}>
        <RichText
          content={children as ElementNode[]}
          references={references}
          renderers={renderers}
        />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

export function RichText({
  content,
  references: embedReferences,
  renderers: resolvers,
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
      `[@graphcms/rich-text-react-renderer]: children is required.`
    );

    return <Fragment />;
  }

  const elements = Array.isArray(content) ? content : content.children;
  const references = Array.isArray(embedReferences)
    ? new Map(embedReferences?.map((embeds) => [embeds.id, embeds]))
    : embedReferences;

  return (
    <>
      {elements.map((node, index) => {
        return (
          <RenderNode
            node={node}
            references={references}
            renderers={renderers}
            key={index}
          />
        );
      })}
    </>
  );
}
