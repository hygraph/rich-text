import React, { Fragment } from 'react';
import {
  RichTextProps,
  NodeRendererType,
  ElementNode,
  RemoveEmptyElementType,
  Node,
  isElement,
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
  removers,
  renderers,
}: {
  node: Node;
  removers?: RemoveEmptyElementType;
  renderers?: NodeRendererType;
}) {
  if (isText(node)) {
    return <RenderText textNode={node} renderers={renderers} />;
  }

  if (isElement(node)) {
    return (
      <RenderElement element={node} removers={removers} renderers={renderers} />
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
  removers,
  renderers,
}: {
  element: ElementNode;
  removers?: RemoveEmptyElementType;
  renderers?: NodeRendererType;
}) {
  const { children, type, ...rest } = element;

  if (
    removers?.[elementKeys[type] as keyof RemoveEmptyElementType] &&
    !children.filter((child) => child.text !== '').length
  ) {
    return <Fragment />;
  }

  const NodeRenderer = renderers?.[elementKeys[type] as keyof NodeRendererType];

  if (NodeRenderer) {
    return (
      <NodeRenderer {...rest}>
        <RichText
          content={children as ElementNode[]}
          removers={removers}
          renderers={renderers}
        />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

export function RichText({
  content,
  removers: emptyItemRemoveList,
  renderers: resolvers,
}: RichTextProps) {
  const renderers: NodeRendererType = {
    ...defaultElements,
    ...resolvers,
  };

  const removers: RemoveEmptyElementType = {
    ...defaultRemoveEmptyElements,
    ...emptyItemRemoveList,
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

  return (
    <>
      {elements.map((node, index) => {
        return (
          <RenderNode
            node={node}
            removers={removers}
            renderers={renderers}
            key={index}
          />
        );
      })}
    </>
  );
}
