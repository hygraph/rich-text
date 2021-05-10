import React, { Fragment } from 'react';
import {
  RichTextProps,
  NodeRendererType,
  ElementNode,
  Node,
  isElement,
  isText,
} from '@graphcms/rich-text-types';

import { defaultElements, elementKeys } from './defaultElements';
import { RenderText } from './RenderText';

function RenderNode({
  node,
  renderers,
}: {
  node: Node;
  renderers?: NodeRendererType;
}) {
  if (isText(node)) {
    return <RenderText textNode={node} renderers={renderers} />;
  }

  if (isElement(node)) {
    return <RenderElement element={node} renderers={renderers} />;
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
}: {
  element: ElementNode;
  renderers?: NodeRendererType;
}) {
  const { children, type, ...rest } = element;

  const NodeRenderer = renderers?.[elementKeys[type] as keyof NodeRendererType];

  if (NodeRenderer) {
    return (
      <NodeRenderer {...rest}>
        <RichText children={children as ElementNode[]} renderers={renderers} />
      </NodeRenderer>
    );
  }

  return <Fragment />;
}

export function RichText({ children, renderers: resolvers }: RichTextProps) {
  const renderers: NodeRendererType = {
    ...defaultElements,
    ...resolvers,
  };

  return (
    <>
      {children.map((node, index) => {
        return <RenderNode node={node} renderers={renderers} key={index} />;
      })}
    </>
  );
}
