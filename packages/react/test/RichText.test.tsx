import React from 'react';
import { render } from '@testing-library/react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';

import {
  defaultContent as content,
  imageContent,
  videoContent,
  listContent,
  iframeContent,
  inlineContent,
} from './content';

describe('@graphcms/rich-text-react-renderer', () => {
  it('renders content', async () => {
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

  /**
   * For now this is acceptable, but we should add a filter to remove all empty
   * elements from the content, in the future.
   */
  it('should not render empty text', async () => {
    const content: RichTextContent = [
      {
        type: 'paragraph',
        children: [
          {
            text: ' ',
          },
        ],
      },
    ];

    const { container } = render(<RichText content={content} />);

    expect(container).toMatchInlineSnapshot(`
      <div>
        <p />
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

  it('renders link', async () => {
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

  it('renders iframe', async () => {
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

  it('renders class', async () => {
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

  it('renders class with custom renderer', async () => {
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

  it('renders image', async () => {
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

  it('renders image with custom renderer', async () => {
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
});
