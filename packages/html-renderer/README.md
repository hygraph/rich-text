# @graphcms/rich-text-html-renderer

Render Rich Text content from GraphCMS in any application.

## ⚡ Getting started

You can get it on npm or Yarn.

```sh
# npm
npm i @graphcms/rich-text-html-renderer

# Yarn
yarn add @graphcms/rich-text-html-renderer
```

## 🔥 Usage/Examples

To render the content on your application, you'll need to provide the array of elements returned from the GraphCMS API to the `slateToHtml` function.

For more information on how you can query the Rich Text content, [check our documentation](https://graphcms.com/docs/api-reference/schema/field-types#rich-text).

```js
import { slateToHtml } from '@graphcms/rich-text-html-renderer';

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

const html = slateToHtml({
  content,
});
```

The content from the example above will render:

```html
<p>
  <b>Hello world!</b>
</p>
```

## Query Rich Text

For more information on how you can query Rich Text content, please [check our docs](https://graphcms.com/docs/api-reference/schema/field-types#rich-text).

## Custom elements

By default, the elements won't have any styling, despite the `IFrame`, which we designed to be responsive. If you need to customize the elements, you can do it using the renderers argument.

```js
import { slateToHtml } from '@graphcms/rich-text-html-renderer';

const content = {
  /* ... */
};

const html = slateToHtml({
  content: inlineContent,
  renderers: {
    bold: ({ children }) => `<strong>${children}</strong>`,
  },
});
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
import { slateToHtml } from '@graphcms/rich-text-html-renderer';

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
    url: 'https://media.graphcms.com/dsQtt0ARqO28baaXbVy9',
    mimeType: 'image/png',
  },
  {
    id: 'ckrus0f14ao760b32mz2dwvgx',
    url: 'https://media.graphcms.com/7M0lXLdCQfeIDXnT2SVS',
    mimeType: 'video/mp4',
  },
];

const html = slateToHtml({
  content,
  references,
  renderers: {
    Asset: {
      video: () => `<div>custom VIDEO</div>`,
      image: () => `<div>custom IMAGE</div>`,
      'video/mp4': () => {
        return `<div>custom video/mp4 renderer</div>`;
      },
    },
  },
});
```

As mentioned, you can write renderers for all `mimeType` groups or to specific `mimeType`.

### References

References are required on the `slateToHtml` function to render embed assets.

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

```js
import { slateToHtml } from '@graphcms/rich-text-html-renderer';

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
    title: 'GraphCMS is awesome :rocket:',
  },
];

const html = slateToHtml({
  content,
  references,
  renderers: {
    embed: {
      Post: ({ title, nodeId }) => {
        return `
          <div className="post">
            <h3>${title}</h3>
            <p>${nodeId}</p>
          </div>
        `;
      },
    },
  },
});
```

### References

References are required on the `slateToHtml` function. You also need to include your model in your query.

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

## Empty elements

By default, we remove empty headings from the element list to prevent SEO issues. Other elements, such as `thead` are also removed. You can find the complete list [here](https://github.com/GraphCMS/rich-text/blob/main/packages/types/src/index.ts#L168).

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

Depending on your reference query and model, fields may change, which applies to types. To have a better DX using the package, we have `EmbedProps` type that you can import from `@graphcms/rich-text-types` (you may need to install it if you don't have done it already).

In this example, we have seen how to write a renderer for a `Post` model, but it applies the same way to any other model and `Asset` on your project.

```ts
import { slateToHtml } from '@graphcms/rich-text-html-renderer';
import { EmbedProps } from '@graphcms/rich-text-types';

type Post = {
  title: string;
  slug: string;
  description: string;
};

const content = {
  /* ... */
};

const references = [
  /* ... */
];

const html = slateToHtml({
  content,
  references,
  renderers: {
    embed: {
      Post: ({ title, description, slug }: EmbedProps<Post>) => {
        return `
          <div className="post">
            <a href="/post/${slug}">
              <h3>${title}</h3>
              <p>${description}</p>
            </a>
          </div>
        `;
      },
    },
  },
});
```

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
