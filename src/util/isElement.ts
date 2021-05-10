import { ElementNode, Node } from '../types';

export function isElement(node: Node): node is ElementNode {
  return (node as ElementNode).children !== undefined;
}
