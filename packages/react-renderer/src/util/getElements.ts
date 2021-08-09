import { RichTextProps } from '@graphcms/rich-text-types';

export function getElements({ content }: Pick<RichTextProps, 'content'>) {
  return Array.isArray(content) ? content : content.children;
}
