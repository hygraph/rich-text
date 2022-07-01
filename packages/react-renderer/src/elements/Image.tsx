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
  if (__DEV__ && !src) {
    console.warn(
      `[@graphcms/rich-text-react-renderer]: src is required. You need to include a \`url\` in your query`
    );
  }

  const shouldIncludeWidth = width && width > 0;
  const shouldIncludeHeight = height && height > 0;

  return (
    <img
      loading="lazy"
      src={escapeHtml(src)}
      {...(shouldIncludeWidth && { width })}
      {...(shouldIncludeHeight && { height })}
      alt={altText}
      title={title}
    />
  );
}
