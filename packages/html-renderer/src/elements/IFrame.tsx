import escapeHtml from 'escape-html';
import { IFrameProps } from '@graphcms/rich-text-types';

export function IFrame({ url }: Partial<IFrameProps>) {
  return `
    <div
      style="
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 56.25%;
      "
    >
      <iframe
        style="
          position: absolute;
          top: 0px;
          bottom: 0px;
          right: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
        "
        src="${escapeHtml(url)}"
        loading="lazy"
        allow="fullscreen"
        frameBorder="0"
        referrerPolicy="no-referrer"
      ></iframe>
    </div>
  `;
}
