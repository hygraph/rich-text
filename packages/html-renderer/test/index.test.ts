import { astToHtmlString } from '@graphcms/rich-text-html-renderer';
import {
  RichTextContent,
  EmbedProps,
  LinkEmbedProps,
} from '@graphcms/rich-text-types';

import {
  defaultContent as content,
  imageContent,
  videoContent,
  listContent,
  iframeContent,
  inlineContent,
  emptyContent,
  embedAssetContent,
  simpleH1Content,
  tableContent,
  nestedEmbedAssetContent,
} from './content';

describe('@graphcms/rich-text-html-renderer', () => {
  it('renders content', () => {
    const html = astToHtmlString({ content });

    expect(html).toEqual(`<p><b>Hello World!</b></p>`);
  });

  it('renders content correctly if received a object with children', () => {
    const contentObject: RichTextContent = {
      children: [
        {
          type: 'paragraph',
          children: [
            {
              bold: true,
              text: 'Hello World!',
            },
          ],
        },
      ],
    };

    const html = astToHtmlString({ content: contentObject });

    expect(html).toEqual(`<p><b>Hello World!</b></p>`);
  });

  it('should not render elements if received a object with empty children', () => {
    const html = astToHtmlString({ content: emptyContent });

    expect(html).toEqual(`<h2>
    <a href="https://hygraph.com" target="_self"     >
      Testing Link
    </a>
  </h2><h2>
    <a href="https://hygraph.com" target="_self"     >
      Link
    </a>
   2</h2><table><tbody><tr><td><p>Row 1 - Col 1</p></td><td><p>Row 1 - Col 2</p></td></tr></tbody></table>`);
  });

  it('should render a table', () => {
    const html = astToHtmlString({ content: tableContent });

    expect(html).toEqual(
      `<table><thead><tr><th><p>Row 1 - Header 1</p></th><th><p>Row 1 - Header 2</p></th></tr></thead><tbody><tr><td><p>Row 2 - Col 1</p></td><td><p>Row 2 - Col 2</p></td></tr></tbody></table>`
    );
  });

  it('should should render H1 with some text', () => {
    const html = astToHtmlString({ content: simpleH1Content });

    expect(html).toEqual(`<h1>heading</h1>`);
  });

  it('renders content with custom elements', () => {
    const html = astToHtmlString({
      content: content,
      renderers: {
        p: ({ children }) => `<p class="text-white">${children}</p>`,
        bold: ({ children }) =>
          `<strong class="text-black">${children}</strong>`,
      },
    });

    expect(html).toEqual(
      `<p class="text-white"><strong class="text-black">Hello World!</strong></p>`
    );
  });

  it('renders inline content', () => {
    const html = astToHtmlString({ content: inlineContent });

    expect(html).toEqual(
      `<p><b>Hey, </b><i>how</i><u>are</u><code>you?</code></p>`
    );
  });

  it('renders inline content with custom renderers', () => {
    const html = astToHtmlString({
      content: inlineContent,
      renderers: {
        bold: ({ children }) => `<strong>${children}</strong>`,
        italic: ({ children }) =>
          `<i class="italic-class" style="color: red">${children}</i>`,
        underline: ({ children }) => `<u role="button">${children} test</u>`,
        code: ({ children }) =>
          `<code style="font-style: italic">${children}</code>`,
      },
    });

    expect(html).toEqual(
      `<p><strong>Hey, </strong><i class="italic-class" style="color: red">how</i><u role="button">are test</u><code style="font-style: italic">you?</code></p>`
    );
  });

  it('renders link', () => {
    const linkContent: RichTextContent = [
      {
        type: 'link',
        id: 'test',
        rel: 'noreferrer',
        href: 'https://hygraph.com',
        title: 'Hygraph website',
        className: 'text-white',
        openInNewTab: true,
        children: [
          {
            text: 'Hygraph',
          },
        ],
      },
    ];

    const html = astToHtmlString({ content: linkContent });

    expect(html).toEqual(`
    <a href="https://hygraph.com" target="_blank" class="text-white" rel="noreferrer" title="Hygraph website" id="test" rel="noreferrer">
      Hygraph
    </a>
  `);
  });

  it('renders iframe', () => {
    const iframeContent: RichTextContent = [
      {
        url: 'https://www.youtube.com/watch?v=Ylmd737tw5w',
        type: 'iframe',
        children: [
          {
            text: '',
          },
        ],
      },
    ];

    const html = astToHtmlString({ content: iframeContent });

    expect(html).toEqual(`
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
        src="https://www.youtube.com/watch?v=Ylmd737tw5w"
        loading="lazy"
        allow="fullscreen"
        frameBorder="0"
        referrerPolicy="no-referrer"
      />
    </div>
  `);
  });

  it('renders class', () => {
    const html = astToHtmlString({ content: iframeContent });

    expect(html).toEqual(`<div class="test"><p>wow</p></div>`);
  });

  it('renders class with custom renderer', () => {
    const html = astToHtmlString({
      content: iframeContent,
      renderers: {
        class: ({ children, className }) =>
          `<section class="bg-white ${className}">${children}</section>`,
      },
    });

    expect(html).toEqual(`<section class="bg-white test"><p>wow</p></section>`);
  });

  it('renders image', () => {
    const html = astToHtmlString({ content: imageContent });

    expect(html).toEqual(`
    <img loading="lazy" src="https://media.graphassets.com/output=format:webp/resize=,width:667,height:1000/8xrjYm4CR721mAZ1YAoy" width="667" height="1000" alt="photo-1564631027894-5bdb17618445.jpg" title="photo-1564631027894-5bdb17618445.jpg" />
  `);
  });

  it('removes the width and height attributes if they are set to 0', () => {
    const html = astToHtmlString({
      content: [
        {
          src: 'https://media.graphassets.com/bFyCrmvuQfO7n0l5ZmH5',
          type: 'image',
          title: 'logo.svg',
          width: 0,
          handle: 'mQeGmwkXTnqTfcgUXVr7',
          height: 0,
          children: [
            {
              text: '',
            },
          ],
          mimeType: 'image/svg+xml',
        },
      ],
    });

    expect(html).toEqual(`
    <img loading="lazy" src="https://media.graphassets.com/bFyCrmvuQfO7n0l5ZmH5"    title="logo.svg" />
  `);
  });

  it('renders image with custom renderer', () => {
    const html = astToHtmlString({
      content: iframeContent,
      renderers: {
        img: ({ src, altText }) => `<img src="${src}" alt="${altText}" />`,
      },
    });

    expect(html).toEqual(`<div class="test"><p>wow</p></div>`);
  });

  it('renders video', () => {
    const html = astToHtmlString({ content: videoContent });

    expect(html).toEqual(`
    <video src="https://media.graphassets.com/oWd7OYr5Q5KGRJW9ujRO" controls width="400" height="400" title="file_example_MP4_480_1_5MG.m4v">
      <p>
        Your browser doesn't support HTML5 video. Here is a
        <a href="https://media.graphassets.com/oWd7OYr5Q5KGRJW9ujRO">link to the video</a> instead.
      </p>
    </video>
  `);
  });

  it('renders lists', () => {
    const html = astToHtmlString({ content: listContent });

    expect(html).toEqual(
      `<ul><li>Embroided logo</li><li>Fits well</li><li>Comes in black</li><li>Reasonably priced</li></ul>`
    );
  });

  it('should render HTML and JSX tags correctly', () => {
    const contentObject: RichTextContent = [
      { type: 'paragraph', children: [{ text: '<Test />', code: true }] },
    ];

    const html = astToHtmlString({ content: contentObject });

    expect(html).toEqual(`<p><code>&lt;Test /&gt;</code></p>`);
  });

  it('should render empty text spaces', () => {
    const contentObject: RichTextContent = [
      {
        type: 'paragraph',
        children: [
          { text: 'Sweet black ' },
          { bold: true, text: 'cap' },
          { text: ' ' },
          { text: 'with', underline: true },
          { text: ' ' },
          { text: 'embroidered', italic: true },
          { text: ' ' },
          { bold: true, text: 'Hygraph' },
          { text: ' logo.' },
        ],
      },
    ];

    const html = astToHtmlString({ content: contentObject });

    expect(html).toEqual(
      `<p>Sweet black <b>cap</b> <u>with</u> <i>embroidered</i> <b>Hygraph</b> logo.</p>`
    );
  });

  it('should replace all \n in a string with <br /> elements', () => {
    const contentObject: RichTextContent = [
      {
        type: 'paragraph',
        children: [
          {
            text: 'Hello, \n my name is joão, \n I love pizza',
          },
        ],
      },
    ];

    const html = astToHtmlString({ content: contentObject });

    expect(html).toEqual(
      '<p>Hello, <br /> my name is joão, <br /> I love pizza</p>'
    );
  });
});

describe('custom embeds and assets', () => {
  it('should render video, image, and audio assets', () => {
    const references = [
      {
        id: 'cknjbzowggjo90b91kjisy03a',
        url: 'https://media.graphassets.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
      {
        id: 'ckryzom5si5vw0d78d13bnwix',
        url: 'https://media.graphassets.com/H9eZ7CISSBpAKxqdSwzg',
        mimeType: 'audio/mpeg',
      },
    ];

    const html = astToHtmlString({ content: embedAssetContent, references });

    expect(html).toMatchSnapshot(``);
  });

  it('should render specific mimeType if favour of the mimeType group', () => {
    const references = [
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphassets.com/video_id',
        mimeType: 'video/mp4',
      },
      {
        id: 'ckq2eek7c00ek0d83iakzoxuh',
        url: 'https://media.graphassets.com/video_id',
        mimeType: 'video/quicktime',
      },
    ];

    const html = astToHtmlString({
      content: embedAssetContent,
      references,
      renderers: {
        Asset: {
          video: () => `<div>custom video</div>`,
          'video/mp4': () => `<div>custom video/mp4</div>`,
        },
      },
    });

    expect(html).toEqual('<div>custom video/mp4</div><div>custom video</div>');
  });

  it(`should show warnings if the embed asset file isn't rendered by the package`, () => {
    console.warn = jest.fn();

    const references = [
      {
        id: 'ckrxv7b74g8il0d782lf66dup',
        url: 'https://media.graphassets.com/7VA0p81VQfmZQC9jPB2I',
        mimeType: 'text/plain',
      },
      {
        id: 'ckrxv6otkg6ez0c8743xp9bzs',
        url: 'https://media.graphassets.com/HzsAGQyASM2B6B3dHY0n',
        mimeType: 'application/pdf',
      },
      {
        id: 'model_example',
        url: 'https://media.graphassets.com/HzsAGQyASM2B6B3dHY0n',
        mimeType: 'model/example',
      },
      {
        id: 'cks2osfk8t19a0b32vahjhn36',
        url: 'https://media.graphassets.com/Kdk4nsiUTLac3gDD2m5L',
        mimeType: 'font/ttf',
      },
    ];

    const html = astToHtmlString({ content: embedAssetContent, references });

    expect(console.warn).toHaveBeenCalledTimes(4);
    expect(html).toEqual(``);
  });

  it(`shouldn't render embeds or assets if id is missing in references`, () => {
    console.error = jest.fn();

    const contentObject: RichTextContent = [
      {
        type: 'embed',
        nodeId: 'cknjbzowggjo90b91kjisy03a',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Asset',
      },
      {
        type: 'embed',
        nodeId: 'ckrus0f14ao760b32mz2dwvgx',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Asset',
      },
      {
        type: 'link',
        nodeId: 'link_id',
        children: [
          {
            text: 'click here',
          },
        ],
        nodeType: 'Article',
      },
      {
        type: 'embed',
        nodeId: 'custom_post_id',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Post',
      },
    ];

    const references = [
      {
        id: '',
        url: 'https://media.graphassets.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: '',
        url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
      {
        id: '',
        title: 'Hygraph is awesome :rocket:',
      },
      {
        id: '',
        slug: 'hygraph-is-awesome',
      },
    ];

    /**
     * `id` is required in `references`, but if you remove it, or if it's empty, it can't render
     */
    const html = astToHtmlString({
      content: contentObject,
      references,
    });

    expect(console.error).toHaveBeenCalledTimes(4);
    expect(html).toEqual(``);
  });

  it('should render custom embed assets', () => {
    const references = [
      {
        id: 'cknjbzowggjo90b91kjisy03a',
        url: 'https://media.graphassets.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
    ];

    const html = astToHtmlString({
      content: embedAssetContent,
      references: references,
      renderers: {
        Asset: {
          video: () => `<div>custom VIDEO</div>`,
          image: () => `<div>custom IMAGE</div>`,
        },
      },
    });

    expect(html).toEqual(`<div>custom IMAGE</div><div>custom VIDEO</div>`);
  });

  it(`shouldn't render embed assets due to missing mimeType or url`, () => {
    console.error = jest.fn();

    const contentObject: RichTextContent = [
      {
        type: 'embed',
        nodeId: 'cknjbzowggjo90b91kjisy03a',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Asset',
      },
      {
        type: 'embed',
        nodeId: 'ckrus0f14ao760b32mz2dwvgx',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Asset',
      },
    ];

    const references = [
      {
        id: 'cknjbzowggjo90b91kjisy03a',
      },
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
      },
    ];

    const html = astToHtmlString({
      content: contentObject,
      references,
    });

    expect(console.error).toHaveBeenCalledTimes(2);
    expect(html).toEqual(``);
  });

  it('should render custom embed models', () => {
    const contentObject: RichTextContent = [
      {
        type: 'embed',
        nodeId: 'custom_post_id',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Post',
      },
    ];

    const references = [
      {
        id: 'custom_post_id',
        title: 'Hygraph is awesome :rocket:',
      },
    ];

    const html = astToHtmlString({
      content: contentObject,
      references,
      renderers: {
        embed: {
          Post: ({ title, nodeId }: EmbedProps<{ title: string }>) => {
            return `<div class="post"><h3>${title}</h3><p>${nodeId}</p></div>`;
          },
        },
      },
    });

    expect(html).toEqual(
      `<div class="post"><h3>Hygraph is awesome :rocket:</h3><p>custom_post_id</p></div>`
    );
  });

  it('should render custom link models', () => {
    const contentObject: RichTextContent = [
      {
        type: 'link',
        nodeId: 'my_article',
        children: [
          {
            text: 'click here',
          },
        ],
        nodeType: 'Article',
      },
    ];

    const references = [
      {
        id: 'my_article',
        slug: 'introducing-link-embeds',
      },
    ];

    const html = astToHtmlString({
      content: contentObject,
      references,
      renderers: {
        link: {
          Article: ({ slug, children }: LinkEmbedProps<{ slug: string }>) => {
            return `<a href="/${slug}">${children}</a>`;
          },
        },
      },
    });

    expect(html).toEqual(`<a href="/introducing-link-embeds">click here</a>`);
  });

  it(`should show a warning if embeds are found but there aren't any renderer for it`, () => {
    console.warn = jest.fn();

    const contentObject: RichTextContent = [
      {
        type: 'embed',
        nodeId: 'custom_post_id',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Post',
      },
      {
        type: 'link',
        nodeId: 'link_id',
        children: [
          {
            text: 'My link',
          },
        ],
        nodeType: 'Article',
      },
    ];

    const references = [
      {
        id: 'custom_post_id',
        title: 'Hygraph is awesome :rocket:',
      },
      {
        id: 'link_id',
        title: 'My link',
      },
    ];

    const html = astToHtmlString({
      content: contentObject,
      references,
    });

    expect(console.warn).toHaveBeenCalledTimes(2);
    expect(html).toEqual(``);
  });

  it('should render inline embeds', () => {
    const contentObject: RichTextContent = [
      {
        type: 'embed',
        nodeId: 'custom_post_id_1',
        children: [
          {
            text: '',
          },
        ],
        nodeType: 'Post',
        isInline: true,
      },
    ];

    const references = [
      {
        id: 'custom_post_id_1',
        title: 'Hygraph is awesome :rocket:',
      },
    ];

    const html = astToHtmlString({
      content: contentObject,
      references,
      renderers: {
        embed: {
          Post: ({
            title,
            nodeId,
            isInline,
          }: EmbedProps<{ title: string }>) => {
            return `<div><h3>${title}</h3>${
              isInline ? `<span>${nodeId}</span>` : `<div>${nodeId}</div>`
            }</div>`;
          },
        },
      },
    });

    expect(html).toEqual(
      `<div><h3>Hygraph is awesome :rocket:</h3><span>custom_post_id_1</span></div>`
    );
  });

  it('should render nested embeds', () => {
    const references = [
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
    ];

    const html = astToHtmlString({
      content: nestedEmbedAssetContent,
      references,
    });

    expect(html).toEqual(`<p>Inline asset
    <video src="https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS" controls width="100%" height="100%" >
      <p>
        Your browser doesn't support HTML5 video. Here is a
        <a href="https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS">link to the video</a> instead.
      </p>
    </video>
  continued</p>`);
  });
});
