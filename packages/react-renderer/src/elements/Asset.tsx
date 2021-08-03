import React, { Fragment } from 'react';
import { EmbedProps, AssetMimeTypes } from '@graphcms/rich-text-types';

import { Image, Video } from './';

type AssetProps = {
  mimeType?: AssetMimeTypes;
  url?: string;
};

export function Asset({
  mimeType,
  nodeId,
  url,
  ...props
}: EmbedProps<AssetProps>) {
  /**
   * `mimeType` is used to determine if the node is an image or a video.
   * That's why this is required and we show an error if it's not present.
   */
  if (__DEV__ && !mimeType) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: No mimeType found for embed node ${nodeId}. In order to render custom assets, \`mimeType\` is required in your reference query.`
    );

    return <Fragment />;
  }

  /**
   * `url` is needed to correctly render the image and or video.
   */
  if (__DEV__ && !url) {
    console.error(
      `[@graphcms/rich-text-react-renderer]: No url found for embed node ${nodeId}. In order to render custom assets, \`url\` is required in your reference query.`
    );

    return <Fragment />;
  }

  if (mimeType && mimeType.startsWith('image')) {
    return <Image {...props} src={url} />;
  }

  return <Video {...props} src={url} />;
}
