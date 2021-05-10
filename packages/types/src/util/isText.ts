import { Node, Text } from '../';

export function isText(node: Node): node is Text {
  return (node as Text).text !== undefined;
}
