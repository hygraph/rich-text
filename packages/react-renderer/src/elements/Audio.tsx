import React from 'react';
import escapeHtml from 'escape-html';

export type AudioProps = {
  url: string;
};

export function Audio({ url }: AudioProps) {
  return (
    <audio
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
      src={escapeHtml(url)}
      controls
    >
      <p>
        Your browser doesn't support HTML5 audio. Here is a{' '}
        <a href={escapeHtml(url)}>link to the audio</a> instead.
      </p>
    </audio>
  );
}
