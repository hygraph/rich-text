import React from 'react';
import escapeHtml from 'escape-html';
import { ImageProps } from '@graphcms/rich-text-types';

export function Image({
  src,
  width,
  height,
  altText,
  title,
}: Partial<ImageProps>) {
  return (
    <img
      loading="lazy"
      src={escapeHtml(src)}
      width={width}
      height={height}
      alt={altText}
      title={title}
    />
  );
}
