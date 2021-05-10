import { Node, Text } from '../types';

export function isText(node: Node): node is Text {
  return (node as Text).text !== undefined;
}
