import React from 'react';
import { ClassRendererProps } from '@graphcms/rich-text-types';

export function Class({ className, children }: ClassRendererProps) {
  return <div className={className}>{children}</div>;
}
