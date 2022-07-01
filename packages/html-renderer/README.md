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

To render the content on your application, you'll need to provide the array of elements returned from the GraphCMS API to the `astToHtmlString` function. The content has to be returned in `raw` (or `json`) format as the AST representation. For more information on how to query the Rich Text content, [check our documentation](https://graphcms.com/docs/api-reference/schema/field-types#rich-text).

```js
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

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

const html = astToHtmlString({
  content,
});
```

The content from the example above will render:

```html
<p>
  <b>Hello world!</b>
</p>
```

## Custom elements

By default, the elements won't have any styling, despite the `IFrame`, which we designed to be responsive. If you need to customize the elements, you can do it using the renderers argument.

```js
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

const content = {
  /* ... */
};

const html = astToHtmlString({
  content: inlineContent,
  renderers: {
    bold: ({ children }) => `<strong>${children}</strong>`,
  },
});
```

Below you can check the full list of elements you can customize, alongside the props available for each of them.

- `a`
  - `children`: string;
  - `href`: string;
  - `className`: string;
  - `rel`: string;
  - `id`: string;
  - `title`: string;
  - `openInNewTab`: boolean;
- `class`
  - `children`: string;
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
  - `children`: string;
- `h2`
  - `children`: string;
- `h3`
  - `children`: string;
- `h4`
  - `children`: string;
- `h5`
  - `children`: string;
- `h6`
  - `children`: string;
- `p`
  - `children`: string;
- `ul`
  - `children`: string;
- `ol`
  - `children`: string;
- `li`
  - `children`: string;
- `table`
  - `children`: string;
- `table_head`
  - `children`: string;
- `table_header_cell`
  - `children`: string;
- `table_body`
  - `children`: string;
- `table_row`
  - `children`: string;
- `table_cell`
  - `children`: string;
- `blockquote`
  - `children`: string;
- `bold`
  - `children`: string;
- `italic`
  - `children`: string;
- `underline`
  - `children`: string;
- `code`
  - `children`: string;
- `code_block`
  - `children`: string;

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
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

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

const html = astToHtmlString({
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

References are required on the `astToHtmlString` function to render embed assets.

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
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

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

const html = astToHtmlString({
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

References are required on the `astToHtmlString` function. You also need to include your model in your query.

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

```js
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

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
    slug: 'graphcms-is-awesome',
  },
];

const html = astToHtmlString({
  content: contentObject,
  references,
  renderers: {
    link: {
      Article: ({ slug, children }) => {
        return `<a href="/${slug}">${children}</a>`;
      },
    },
  },
});
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

Depending on your reference query and model, fields may change, which applies to types. To have a better DX using the package, we have `EmbedProps` and `LinkEmbedProps` types that you can import from `@graphcms/rich-text-types` (you may need to install it if you don't have done it already).

In this example, we have seen how to write a renderer for a `Post` model, but it applies the same way to any other model and `Asset` on your project.

```ts
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';
import { EmbedProps, LinkEmbedProps } from '@graphcms/rich-text-types';

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

const html = astToHtmlString({
  content,
  references,
  renderers: {
    embed: {
      Post: ({ title, description, slug }: EmbedProps<Post>) => {
        return `
          <div className="post">
            <a href="/blog/${slug}">
              <h3>${title}</h3>
              <p>${description}</p>
            </a>
          </div>
        `;
      },
    },
    link: {
      Article: ({ slug, children }) => {
        return `<a href="/blog/${slug}">${children}</a>`;
      },
    },
  },
});
```

## 📝 License

Licensed under the MIT License.

---

Made with 💜 by GraphCMS 👋 [join our community](https://slack.graphcms.com/)!
