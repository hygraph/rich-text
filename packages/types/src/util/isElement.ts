import { ElementNode, Node } from '../';

export function isElement(node: Node): node is ElementNode {
  return (node as ElementNode).children !== undefined;
}
