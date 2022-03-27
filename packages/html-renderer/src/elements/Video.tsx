import escapeHtml from 'escape-html';
import { VideoProps } from '@graphcms/rich-text-types';

export function Video({ src, width, height, title }: Partial<VideoProps>) {
  return `
    <video
      src="${escapeHtml(src)}"
      controls
      width="${width || '100%'}"
      height="${height || '100%'}"
      title="${title}"
    >
      <p>
        Your browser doesn't support HTML5 video. Here is a
        <a href="${src}">link to the video</a> instead.
      </p>
    </video>
  `;
}
