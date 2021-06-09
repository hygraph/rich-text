import { Node, EmbedElement } from '../';

export function isEmbed(node: Node): node is EmbedElement {
  return (node as EmbedElement).nodeId !== undefined;
}
