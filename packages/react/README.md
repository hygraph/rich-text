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

const App = () => {
  return <RichText content={content} />;
};
```

The content from the example above will render:

```html
<p>
  <b>Hello world!</b>
</p>
```

### Embed Types

> :warning: **Make sure to provide the `id`, `url` and `mimeType` of the embed like shown in the example, else the default embed element will not render** :warning:

To render embed Assets in your application, you'll need to provide the array of embeds returned from the GraphCMS API to the `RichText` component.

```tsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const content = {
  children: [
    {
      type: 'embed',
      nodeId: 'cko2lq2u0031r0844xnvurz05',
      children: [{ text: '' }],
      nodeType: 'Asset',
    },
  ],
};

const embedReferences = [
  {
    id: 'cko2lq2u0031r0844xnvurz05',
    url: 'https://media.graphcms.com/xSIoGkATQybd8S2SgA5Q',
    type: 'image/png',
  },
];

const App = () => {
  return <RichText content={content} references={embedReferences} />;
};
```

The content from the example above will render:

```html
<embed src="https://media.graphcms.com/xSIoGkATQybd8S2SgA5Q" type="image/png" />
```

### Custom elements

By default, the elements won't have any styling, despite the `IFrame`, which we designed to be responsive. But if you have, for example, a design system and wants to use your own components with styling, you can pass a `renderers` prop to the `RichText` component. Let's see an example:

```tsx
import { RichText } from '@graphcms/rich-text-react-renderer';

const App = () => {
  return (
    <div>
      <RichText
        children={content}
        renderers={{
          h1: ({ children }) => <h1 className="text-white">{children}</h1>,
          bold: ({ children }) => <strong>{children}</strong>,
        }}
      />
    </div>
  );
};
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
- `embed`
  - `nodeId`: string;
  - `nodeType`: string;
  - Any properties passed along with references object
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

const App = () => {
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
};
```

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
