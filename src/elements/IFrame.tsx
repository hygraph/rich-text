import React from 'react';
import escapeHtml from 'escape-html';

import { IFrameProps } from '../types';

export function IFrame({ url }: Partial<IFrameProps>) {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        paddingTop: '56.25%',
      }}
    >
      <iframe
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
        src={escapeHtml(url)}
        loading="lazy"
        allow="fullscreen"
        frameBorder="0"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
