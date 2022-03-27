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
      `[@graphcms/rich-text-html-renderer]: src is required. You need to include a \`url\` in your query`
    );
  }

  return `
    <img
      loading="lazy"
      src="${escapeHtml(src)}"
      width="${width}"
      height="${height}"
      alt="${altText}"
      title="${title}"
    />
  `;
}
