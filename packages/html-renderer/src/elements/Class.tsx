import { ClassRendererProps } from '../types';

export function Class({ className, children }: ClassRendererProps) {
  return `<div class="${className}">${children}</div>`;
}
