import { RichTextProps } from '..';

export function getArrayOfElements(content: RichTextProps['content']) {
  return Array.isArray(content) ? content : content.children;
}
