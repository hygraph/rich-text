# @graphcms/rich-text-react-renderer

Render Rich Text content from GraphCMS in React applications.

## ⚡ Getting started

You can get it on npm or Yarn.

```sh
# npm
npm i @graphcms/rich-text-react-renderer

# Yarn
yarn add @graphcms/rich-text-react-renderer
```

## 🔥 Usage/Examples

To render the content on your application, you'll need to provide the array of elements returned from the GraphCMS API to the `RichText` component.

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

### Custom elements

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

### Empty elements

By default, we remove empty headings from the element list to prevent SEO issues.

### TypeScript

If you are using TypeScript in your project, we highly recommend you install the `@graphcms/rich-text-types` package. It contains types for the elements, alongside the props accepted by each of them. You can use them in your application to create custom components.

### Examples

#### Next.js Link component

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

#### Next.js Image component

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

Since the images are in the GraphCMS CDN, you need to specify our domain in the `next.config.js` file. For more information, check [this guide](https://nextjs.org/docs/basic-features/image-optimization#domains).

```js
module.exports = {
  images: {
    domains: ['media.graphcms.com'],
  },
};
```

#### Gatsby Link component

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

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
