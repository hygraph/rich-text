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

const content = [
  {
    type: 'paragraph',
    children: [
      {
        bold: true,
        text: 'Hello World!',
      },
    ],
  },
];

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

### Custom elements

By default, the elements won't have any styling, despite the `IFrame`, which we designed to be responsive. But if you have, for example, a design system and wants to use your own components with styling, you can pass a `renderers` prop to the `RichText` component. Let's see an example:

```tsx
import { RichText } from '@graphcms/rich-text-react-renderer';

/**
 * const content = [ ... ]
 */

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
- `underlined`
  - `children`: ReactNode;
- `code`
  - `children`: ReactNode;

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
