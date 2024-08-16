# @graphcms/rich-text-react-renderer

Render Rich Text content from Hygraph in React applications.

## ⚡ Getting started

You can get it on npm or Yarn.

```sh
# npm
npm i @graphcms/rich-text-react-renderer

# Yarn
yarn add @graphcms/rich-text-react-renderer
```

## 🔥 Usage/Examples

To render the content on your application, you'll need to provide the array of elements returned from the Hygraph API to the `RichText` component. The content has to be returned in `raw` (or `json`) format as the AST representation. For more information on how to query the Rich Text content, [check our documentation](https://hygraph.com/docs/api-reference/schema/field-types#rich-text).

```tsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
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

function App() {
  return <RichText content={content} />;
}
```

The content from the example above will render:

```html
<p>
  <b>Hello world!</b>
</p>
```

## Custom elements

By default, the elements won't have any styling, despite the `IFrame`, which we designed to be responsive. But if you have, for example, a design system and wants to use your own components with styling, you can pass a `renderers` prop to the `RichText` component. Let's see an example:

```tsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
  /* ... */
};

function App() {
  return (
    <div>
      <RichText
        content={content}
        renderers={{
          h1: ({ children }) => <h1 className="text-white">{children}</h1>,
          bold: ({ children }) => <strong>{children}</strong>,
        }}
      />
    </div>
  );
}
```

Below you can check the full list of elements you can customize, alongside the props available for each of them.

- `a`
  - `children`: ReactNode;
  - `href`: string;
  - `className`: string;
  - `rel`: string;
  - `id`: string;
  - `title`: string;
  - `openInNewTab`: boolean;
- `class`
  - `children`: ReactNode;
  - `className`: string;
- `img`
  - `src`: string;
  - `title`: string;
  - `width`: number;
  - `height`: number;
  - `mimeType`: ImageMimeTypes;
  - `altText`: string;
- `video`
  - `src`: string;
  - `title`: string;
  - `width`: number;
  - `height`: number;
- `iframe`
  - `url`: string;
  - `width`: number;
  - `height`: number;
- `h1`
  - `children`: ReactNode;
- `h2`
  - `children`: ReactNode;
- `h3`
  - `children`: ReactNode;
- `h4`
  - `children`: ReactNode;
- `h5`
  - `children`: ReactNode;
- `h6`
  - `children`: ReactNode;
- `p`
  - `children`: ReactNode;
- `ul`
  - `children`: ReactNode;
- `ol`
  - `children`: ReactNode;
- `li`
  - `children`: ReactNode;
- `table`
  - `children`: ReactNode;
- `table_head`
  - `children`: ReactNode;
- `table_header_cell`
  - `children`: ReactNode;
- `table_body`
  - `children`: ReactNode;
- `table_row`
  - `children`: ReactNode;
- `table_cell`
  - `children`: ReactNode;
- `blockquote`
  - `children`: ReactNode;
- `bold`
  - `children`: ReactNode;
- `italic`
  - `children`: ReactNode;
- `underline`
  - `children`: ReactNode;
- `code`
  - `children`: ReactNode;
- `code_block`
  - `children`: ReactNode;

## Custom assets

The Rich Text field allows you to embed assets. By default, we render images, videos and audios out of the box. However, you can define custom components for each mime type group. Below you can see the complete list of `mimeType` groups.

- `audio`
- `application`
- `image`
- `video`
- `font`
- `model`
- `text`

We don't have components to render fonts, models, text and application files, but you can write your own depending on your needs and project. If you need, you can also have a custom renderer for a specific `mimeType`. Here's an example:

```js
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = [
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
    url: 'https://media.graphassets.com/dsQtt0ARqO28baaXbVy9',
    mimeType: 'image/png',
  },
  {
    id: 'ckrus0f14ao760b32mz2dwvgx',
    url: 'https://media.graphassets.com/7M0lXLdCQfeIDXnT2SVS',
    mimeType: 'video/mp4',
  },
];

function App() {
  return (
    <RichText
      content={content}
      references={references}
      renderers={{
        Asset: {
          video: () => <div>custom VIDEO</div>,
          image: () => <div>custom IMAGE</div>,
          'video/mp4': () => {
            return <div>custom video/mp4 renderer</div>;
          },
        },
      }}
    />
  );
}
```

As mentioned, you can write renderers for all `mimeType` groups or to specific `mimeType`.

### References

References are required on the `RichText` component to render embed assets.

`id`, `mimeType` and `url` are required in your `Asset` query.

**Query example:**

```graphql
{
  articles {
    content {
      json
      references {
        ... on Asset {
          id
          url
          mimeType
        }
      }
    }
  }
}
```

## Custom embeds

Imagine you have an embed `Post` on your Rich Text field. To render it, you can have a custom renderer. Let's see an example:

```jsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = [
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

function App() {
  return (
    <RichText
      content={content}
      references={references}
      renderers={{
        embed: {
          Post: ({ title, nodeId }) => {
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
}
```

### References

References are required on the `RichText` component. You also need to include your model in your query.

- `id` is always required in your model query. It won't render if it's not present.

```graphql
{
  articles {
    content {
      json
      references {
        ... on Asset {
          id
          url
          mimeType
        }
        # Your post query
        ... on Post {
          id # required
          title
          slug
          description
        }
      }
    }
  }
}
```

### Link embeds

The Rich Text Field also supports Link Embeds, which work similarly to normal embeds. Based on the model name, you can have a custom renderer for it. Example:

```jsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = [
  {
    type: 'link',
    nodeId: 'post_id',
    children: [
      {
        text: 'click here',
      },
    ],
    nodeType: 'Post',
  },
];

const references = [
  {
    id: 'post_id',
    slug: 'hygraph-is-awesome',
  },
];

function App() {
  return (
    <RichText
      content={content}
      references={references}
      renderers={{
        link: {
          Post: ({ slug, children }) => {
            return <a href={`/blog/${slug}`}>{children}</a>;
          },
        },
      }}
    />
  );
}
```

## Empty elements

By default, we remove empty headings from the element list to prevent SEO issues. Other elements, such as `thead` are also removed. You can find the complete list [here](https://github.com/hygraph/rich-text/blob/main/packages/types/src/index.ts#L168).

## TypeScript

If you are using TypeScript in your project, we recommend installing the `@graphcms/rich-text-types` package. It contains types for the elements, alongside the props accepted by them. You can use them in your application to create custom components.

### Children Type

If you need to type the content from the Rich Text field, you can do so by using the types package. Example:

```ts
import { ElementNode } from '@graphcms/rich-text-types';

type Content = {
  content: {
    raw: {
      children: ElementNode[];
    };
  };
};
```

### Custom Embeds/Assets

Depending on your reference query and model, fields may change, which applies to types. To have a better DX using the package, we have `EmbedProps` and `LinkEmbedProps` types that you can import from `@graphcms/rich-text-types` (you may need to install it if you don't have done it already).

In this example, we have seen how to write a renderer for a `Post` model, but it applies the same way to any other model and `Asset` on your project.

```tsx
import { EmbedProps, LinkEmbedProps } from '@graphcms/rich-text-types';

type Post = {
  title: string;
  slug: string;
  description: string;
};

function App() {
  return (
    <RichText
      // ...
      renderers={{
        embed: {
          Post: ({ title, description, slug }: EmbedProps<Post>) => {
            return (
              <div className="post">
                <a href={`/blog/${slug}`}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </a>
              </div>
            );
          },
        },
        link: {
          Post: ({ slug, children }: LinkEmbedProps<Post>) => {
            return <a href={`/blog/${slug}`}>{children}</a>;
          },
        },
      }}
    />
  );
}
```

## Examples

### Next.js Link component

```tsx
import Link from 'next/link';
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
  /* ... */
};

function App() {
  return (
    <RichText
      content={content}
      renderers={{
        a: ({ children, openInNewTab, href, rel, ...rest }) => {
          if (href.match(/^https?:\/\/|^\/\//i)) {
            return (
              <a
                href={href}
                target={openInNewTab ? '_blank' : '_self'}
                rel={rel || 'noopener noreferrer'}
                {...rest}
              >
                {children}
              </a>
            );
          }

          return (
            <Link href={href}>
              <a {...rest}>{children}</a>
            </Link>
          );
        },
      }}
    />
  );
}
```

### Next.js Image component

```js
import Image from 'next/image';
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
  /* ... */
};

function App() {
  return (
    <RichText
      content={content}
      renderers={{
        img: ({ src, altText, height, width }) => (
          <Image
            src={src}
            alt={altText}
            height={height}
            width={width}
            objectFit="cover"
          />
        ),
      }}
    />
  );
}
```

Since the images are in the Hygraph CDN, you need to specify our domain in the `next.config.js` file. For more information, check [this guide](https://nextjs.org/docs/app/api-reference/components/image#remotepatterns).

```js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
};
```

### Placeholder images for Next.js Image component

For low quality image placeholders (LQIP) we can use [Plaiceholder](https://github.com/joe-bell/plaiceholder). Plaiceholder will generate base64 encoded images which we pass to `next/image` as the [`blurDataUrl`](https://nextjs.org/docs/api-reference/next/image#blurdataurl) prop. In this example we'll query a rich text field and generate a placeholder image for each embedded asset.

First, install Plaiceholder:

```sh
# npm
npm i plaiceholder

# Yarn
yarn add plaiceholder
```

Note that Plaiceholder uses `sharp` under the hood, but as `next/image` ships with it, we don't need to install it separately.

Here's a full blown example for a single blog post page with rich text content.

```js
// [slug.jsx]
import { RichText } from '@graphcms/rich-text-react-renderer';
import { getPlaiceholder } from 'plaiceholder';
import { fetchFromHygraph } from '../../lib/hygraph';
import Image from 'next/image';

// Page template
const SinglePostPage = ({ data }) => {
  const { title, description, content } = data;

  return (
    <>
      {/* ... */}
      <RichText
        content={content.json}
        references={content.references}
        renderers={{
          Asset: {
            image: ({ url, alt, caption, width, height, blurDataUrl }) => {
              return (
                <Image
                  src={url}
                  alt={alt}
                  width={width}
                  height={height}
                  placeholder={blurDataUrl ? 'blur' : 'empty'}
                  blurDataURL={blurDataUrl}
                />
              );
            },
          },
        }}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  // Get your paths here.
};

export const getStaticProps = async context => {
  const data = await fetchFromHygraph({
    // Sample query, adjust to your content structure.
    // Note: 'id' and 'mimeType' are required for custom components.
    query: `
      query ($slug: String!) {
        post(where: { slug: $slug }) {
          slug
          content {
            json
            references {
              ... on Asset {
                id
                mimeType
                url
                alt
                caption
                width
                height
              }
            }
          }
        }
      }
    `,
    variables: {
      slug: context.params?.slug,
    },
    preview: context.preview,
  });

  // Pick images from assets
  const images = data.post.content.references.filter(asset =>
    asset.mimeType.includes('image')
  );

  // Use Plaiceholder to generate placeholder images (LQIP)
  // As a result the images will have a `blurDataUrl` prop with the
  // base64 encoded image.
  await Promise.all(
    images.map(async image => {
      const { base64 } = await getPlaiceholder(image.url);
      image.blurDataUrl = base64;
    })
  );

  return {
    props: {
      data: data.post,
    },
  };
};

export default SinglePostPage;
```

### Gatsby Link component

```js
import { Link } from 'gatsby';
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
  /* ... */
};

function App() {
  return (
    <RichText
      content={content}
      renderers={{
        a: ({ children, openInNewTab, href, rel, ...rest }) => {
          if (href.match(/^https?:\/\/|^\/\//i)) {
            return (
              <a
                href={href}
                target={openInNewTab ? '_blank' : '_self'}
                rel={rel || 'noopener noreferrer'}
                {...rest}
              >
                {children}
              </a>
            );
          }

          return (
            <Link to={href} {...rest}>
              {children}
            </Link>
          );
        },
      }}
    />
  );
}
```

### Gatsby Image component

Unfortunately, there's no way to use the Gatsby Image component with this package at the moment. The `GatsbyImage` component (for dynamic images) fetches the image from a query during build time, which is not possible to accomplish right now. For more information, see [hygraph/rich-text#16](https://github.com/hygraph/rich-text/pull/16).

### Code blocks with [Prism.js](https://prismjs.com/)

By default, as you may have already realized, the code-blocks rendered by the package don't have any unique styling since we're unopinionated on how it should look on your application. But, if you need, you can create your code block, add a background color for it, add some padding, and adjust based on your needs.

If you want to go one step away, you can also integrate with [Prism.js](https://prismjs.com/) or [highlight.js](https://highlightjs.org/). Below you can see an example using Prism.js:

> Note: we still don't support defining a custom language for a code block in the Rich Text field.

```jsx
import { useEffect } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';

import Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

const content = {
  /* ... */
};

function App() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <RichText
      content={content}
      renderers={{
        code_block: ({ children }) => {
          return (
            <pre className="line-numbers language-none">
              <code>{children}</code>
            </pre>
          );
        },
      }}
    />
  );
}
```

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by Hygraph 👋 [join our community](https://slack.hygraph.com/)!
