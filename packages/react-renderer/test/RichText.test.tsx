import React from 'react';
import { render } from '@testing-library/react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent, EmbedProps } from '@graphcms/rich-text-types';

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
} from './content';

describe('@graphcms/rich-text-react-renderer', () => {
  it('renders content', () => {
    const { container } = render(<RichText content={content} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p>
          <b>
            Hello World!
          </b>
        </p>
      </div>
    `);
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

    const { container } = render(<RichText content={contentObject} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p>
          <b>
            Hello World!
          </b>
        </p>
      </div>
    `);
  });

  it('should not render elements if received a object with empty children', () => {
    const { container } = render(<RichText content={emptyContent} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h2>
          
          <a
            href="https://graphcms.com"
          >
            Testing Link
          </a>
        </h2>
        <h2>
          
          <a
            href="https://graphcms.com"
          >
            Link
          </a>
           2
        </h2>
        <table>
          <tbody>
            <tr>
              <td>
                <p>
                  Row 1 - Col 1
                </p>
              </td>
              <td>
                <p>
                  Row 1 - Col 2
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `);
  });

  it('should should render H1 with some text', () => {
    const { container } = render(<RichText content={simpleH1Content} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <h1>
          heading
        </h1>
      </div>
    `);
  });

  it('renders content with custom elements', () => {
    const { container } = render(
      <RichText
        content={content}
        renderers={{
          p: ({ children }) => <p className="text-white">{children}</p>,
          bold: ({ children }) => (
            <strong className="text-black">{children}</strong>
          ),
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p
          class="text-white"
        >
          <strong
            class="text-black"
          >
            Hello World!
          </strong>
        </p>
      </div>
    `);
  });

  it('renders inline content', () => {
    const { container } = render(<RichText content={inlineContent} />);

    expect(container).toMatchSnapshot();
  });

  it('renders inline content with custom renderers', () => {
    const { container } = render(
      <RichText
        content={inlineContent}
        renderers={{
          bold: ({ children }) => <strong>{children}</strong>,
          italic: ({ children }) => (
            <i className="italic-class" style={{ color: 'red' }}>
              {children}
            </i>
          ),
          underline: ({ children }) => <u role="button">{children} test</u>,
          code: ({ children }) => (
            <code style={{ fontStyle: 'italic' }}>{children}</code>
          ),
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('renders link', () => {
    const linkContent: RichTextContent = [
      {
        type: 'link',
        id: 'test',
        rel: 'noreferrer',
        href: 'https://graphcms.com',
        title: 'GraphCMS website',
        className: 'text-white',
        openInNewTab: true,
        children: [
          {
            text: 'GraphCMS',
          },
        ],
      },
    ];

    const { container } = render(<RichText content={linkContent} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <a
          class="text-white"
          href="https://graphcms.com"
          id="test"
          rel="noreferrer"
          target="_blank"
          title="GraphCMS website"
        >
          GraphCMS
        </a>
      </div>
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

    const { container } = render(<RichText content={iframeContent} />);

    expect(container).toMatchSnapshot();
  });

  it('renders class', () => {
    const { container } = render(<RichText content={iframeContent} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="test"
        >
          <p>
            wow
          </p>
        </div>
      </div>
    `);
  });

  it('renders class with custom renderer', () => {
    const { container } = render(
      <RichText
        content={iframeContent}
        renderers={{
          class: ({ children, className }) => (
            <section className={`bg-white ${className}`}>{children}</section>
          ),
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <section
          class="bg-white test"
        >
          <p>
            wow
          </p>
        </section>
      </div>
    `);
  });

  it('renders image', () => {
    const { container } = render(<RichText content={imageContent} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <img
          alt="photo-1564631027894-5bdb17618445.jpg"
          height="1000"
          loading="lazy"
          src="https://media.graphcms.com/output=format:webp/resize=,width:667,height:1000/8xrjYm4CR721mAZ1YAoy"
          title="photo-1564631027894-5bdb17618445.jpg"
          width="667"
        />
      </div>
    `);
  });

  it('renders image with custom renderer', () => {
    const { container } = render(
      <RichText
        content={imageContent}
        renderers={{
          img: ({ src, altText }) => <img src={src} alt={altText} />,
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <img
          alt="photo-1564631027894-5bdb17618445.jpg"
          src="https://media.graphcms.com/output=format:webp/resize=,width:667,height:1000/8xrjYm4CR721mAZ1YAoy"
        />
      </div>
    `);
  });

  it('renders video', () => {
    const { container } = render(<RichText content={videoContent} />);

    expect(container).toMatchSnapshot();
  });

  it('renders lists', () => {
    const { container } = render(<RichText content={listContent} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <ul>
          <li>
            Embroided logo
          </li>
          <li>
            Fits well
          </li>
          <li>
            Comes in black
          </li>
          <li>
            Reasonably priced
          </li>
        </ul>
      </div>
    `);
  });

  it('should render HTML and JSX tags correctly', () => {
    const content: RichTextContent = [
      { type: 'paragraph', children: [{ text: '<Test />', code: true }] },
    ];

    const { container } = render(<RichText content={content} />);

    expect(container).toHaveTextContent('<Test />');
  });

  it('should render empty text spaces', () => {
    const content: RichTextContent = [
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
          { bold: true, text: 'GraphCMS' },
          { text: ' logo.' },
        ],
      },
    ];

    const { container } = render(<RichText content={content} />);

    expect(container).toMatchSnapshot();
  });
});

describe('custom embeds and assets', () => {
  it('should render embed video, image, and audio assets', () => {
    const references = [
      {
        id: 'cknjbzowggjo90b91kjisy03a',
        url: 'https://media.graphcms.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphcms.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
      {
        id: 'ckryzom5si5vw0d78d13bnwix',
        url: 'https://media.graphcms.com/H9eZ7CISSBpAKxqdSwzg',
        mimeType: 'audio/mpeg',
      },
    ];

    const { container } = render(
      <RichText content={embedAssetContent} references={references} />
    );

    expect(container).toMatchSnapshot();
  });

  it('should render specific mimeType if favour of the mimeType group', () => {
    const references = [
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphcms.com/video_id',
        mimeType: 'video/mp4',
      },
      {
        id: 'ckq2eek7c00ek0d83iakzoxuh',
        url: 'https://media.graphcms.com/video_id',
        mimeType: 'video/quicktime',
      },
    ];

    const { container } = render(
      <RichText
        content={embedAssetContent}
        references={references}
        renderers={{
          Asset: {
            video: () => <div>custom video</div>,
            'video/mp4': () => <div>custom video/mp4</div>,
          },
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          custom video/mp4
        </div>
        <div>
          custom video
        </div>
      </div>
    `);
  });

  it(`should show warnings if the embed asset file isn't rendered by the package`, () => {
    console.warn = jest.fn();

    const references = [
      {
        id: 'ckrxv7b74g8il0d782lf66dup',
        url: 'https://media.graphcms.com/7VA0p81VQfmZQC9jPB2I',
        mimeType: 'text/plain',
      },
      {
        id: 'ckrxv6otkg6ez0c8743xp9bzs',
        url: 'https://media.graphcms.com/HzsAGQyASM2B6B3dHY0n',
        mimeType: 'application/pdf',
      },
      {
        id: 'model_example',
        url: 'https://media.graphcms.com/HzsAGQyASM2B6B3dHY0n',
        mimeType: 'model/example',
      },
      {
        id: 'cks2osfk8t19a0b32vahjhn36',
        url: 'https://media.graphcms.com/Kdk4nsiUTLac3gDD2m5L',
        mimeType: 'font/ttf',
      },
    ];

    const { container } = render(
      <RichText content={embedAssetContent} references={references} />
    );

    expect(console.warn).toHaveBeenCalledTimes(4);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it(`shouldn't render embeds or assets if id is missing in references`, () => {
    console.error = jest.fn();

    const content: RichTextContent = [
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
        url: 'https://media.graphcms.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: '',
        url: 'https://media.graphcms.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
      {
        id: '',
        title: 'GraphCMS is awesome :rocket:',
      },
    ];

    /**
     * `id` is required in `references`, but if you remove it, or if it's empty, it can't render
     */
    const { container } = render(
      <RichText content={content} references={references} />
    );

    expect(console.error).toHaveBeenCalledTimes(3);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('should render custom embed assets', () => {
    const references = [
      {
        id: 'cknjbzowggjo90b91kjisy03a',
        url: 'https://media.graphcms.com/dsQtt0ARqO28baaXbVy9',
        mimeType: 'image/png',
      },
      {
        id: 'ckrus0f14ao760b32mz2dwvgx',
        url: 'https://media.graphcms.com/7M0lXLdCQfeIDXnT2SVS',
        mimeType: 'video/mp4',
      },
    ];

    const { container } = render(
      <RichText
        content={embedAssetContent}
        references={references}
        renderers={{
          Asset: {
            video: () => <div>custom VIDEO</div>,
            image: () => <div>custom IMAGE</div>,
          },
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          custom IMAGE
        </div>
        <div>
          custom VIDEO
        </div>
      </div>
    `);
  });

  it(`shouldn't render embed assets due to missing mimeType or url`, () => {
    console.error = jest.fn();

    const content: RichTextContent = [
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

    const { container } = render(
      <RichText content={content} references={references} />
    );

    expect(console.error).toHaveBeenCalledTimes(2);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('should render custom embed models', () => {
    const content: RichTextContent = [
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
        title: 'GraphCMS is awesome :rocket:',
      },
    ];

    const { container } = render(
      <RichText
        content={content}
        references={references}
        renderers={{
          embed: {
            Post: ({ title, nodeId }: EmbedProps<{ title: string }>) => {
              return (
                <div className="post">
                  <h3>{title}</h3>
                  <p>{nodeId}</p>
                </div>
              );
            },
          },
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="post"
        >
          <h3>
            GraphCMS is awesome :rocket:
          </h3>
          <p>
            custom_post_id
          </p>
        </div>
      </div>
    `);
  });

  it(`should show a warning if embeds are found but there aren't any renderer for it`, () => {
    console.warn = jest.fn();

    const content: RichTextContent = [
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
        title: 'GraphCMS is awesome :rocket:',
      },
    ];

    const { container } = render(
      <RichText content={content} references={references} />
    );

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('should render inline embeds', () => {
    const content: RichTextContent = [
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
      {
        type: 'embed',
        nodeId: 'custom_post_id_2',
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
        id: 'custom_post_id_1',
        title: 'GraphCMS is awesome :rocket:',
      },
      {
        id: 'custom_post_id_2',
        title: 'Post template',
      },
    ];

    const { container } = render(
      <RichText
        content={content}
        references={references}
        renderers={{
          embed: {
            Post: ({
              title,
              nodeId,
              isInline,
            }: EmbedProps<{ title: string }>) => {
              return (
                <div>
                  <h3>{title}</h3>
                  {isInline ? <span>{nodeId}</span> : <div>{nodeId}</div>}
                </div>
              );
            },
          },
        }}
      />
    );

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div>
          <h3>
            GraphCMS is awesome :rocket:
          </h3>
          <span>
            custom_post_id_1
          </span>
        </div>
        <div>
          <h3>
            Post template
          </h3>
          <div>
            custom_post_id_2
          </div>
        </div>
      </div>
    `);
  });
});
