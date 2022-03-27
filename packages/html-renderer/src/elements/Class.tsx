import { ClassRendererProps } from '@graphcms/rich-text-types';

export function Class({ className, children }: ClassRendererProps) {
  return `<div class="${className}">${children}</div>`;
}
