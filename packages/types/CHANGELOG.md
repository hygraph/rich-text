# @graphcms/rich-text-types

## 0.5.0

### Minor Changes

- [`b272253`](https://github.com/GraphCMS/rich-text/commit/b2722534275efd2c5e473d549d0f0e5a28100025) [#84](https://github.com/GraphCMS/rich-text/pull/84) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)! - - Add type `LinkEmbedProps`
  - Update `EmbedElement`
  - Add `id` to `EmbedProps`

## 0.4.0

### Minor Changes

- [`b7f16fa`](https://github.com/GraphCMS/rich-text/commit/b7f16fa76a28ad0f5cdbe6cb1f58d7fafa63df15) [#77](https://github.com/GraphCMS/rich-text/pull/77) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)! - ⚠️ This release has breaking changes!

  ⚡️ New

  - Add `isEmpty` utility function
  - Add `EmptyElementsToRemove` enum as a replacement for `RemoveEmptyElementType`
  - Add `elementTypeKeys`

  ⚠️ Breaking Changes

  > The `RichTextProps`, `ClassRendererProps`, `LinkRendererProps`, `DefaultElementProps` and the `NodeRendererType` type are now available on the `@graphcms/rich-text-react-renderer` package.

  - Remove `RichTextProps` type
  - Remove `NodeRendererType` type
  - Remove `RemoveEmptyElementType` type
  - Remove `ClassRendererProps` type
  - Remove `LinkRendererProps` type
  - Remove `DefaultElementProps` type

## 0.3.1

### Patch Changes

- [`c2e0a75`](https://github.com/GraphCMS/rich-text/commit/c2e0a75e995591bb299250f4d14092b1843b1183) [#53](https://github.com/GraphCMS/rich-text/pull/53) Thanks [@anmolarora1](https://github.com/anmolarora1)! - Add `table_header_cell` in `Element` and `NodeRendererType`

## 0.3.0

### Minor Changes

- [`bc9e612`](https://github.com/GraphCMS/rich-text/commit/bc9e61293ec0535328541c95c33e71f51ec09c43) [#52](https://github.com/GraphCMS/rich-text/pull/52) Thanks [@larisachristie](https://github.com/larisachristie)! - Add isInline to EmbedProps type

## 0.2.1

### Patch Changes

- [`91495b9`](https://github.com/GraphCMS/rich-text/commit/91495b9f3649c0bf92326d52365473d376ad598f) [#29](https://github.com/GraphCMS/rich-text/pull/29) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)! - Include `code-block` in the list of types in `Element`

## 0.2.0

### Minor Changes

- [`768492a`](https://github.com/GraphCMS/rich-text/commit/768492a5dd5e642cc639b82cd7e13f2ce7f2dc96) [#25](https://github.com/GraphCMS/rich-text/pull/25) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)! - - Include `embed` in the list of types in `Element`
  - Add new type `VideoMimeTypes`
  - Add new type `AssetMimeTypes`
  - Add new type `EmbedProps`
  - Add new type `EmbedElement`
  - Add new type `AssetReference`
  - Add new type `Reference`
  - Add new type `EmbedReferences`
  - Add `EmbedElement` to `ElementNode`
  - Add `references` to `RichTextProps`
  - Add `Asset` and `embed` to `NodeRendererType`

## 0.1.4

### Patch Changes

- [`e950c91`](https://github.com/GraphCMS/rich-text/commit/e950c917befe31060c77891dd44f7722c9c93c77) [#17](https://github.com/GraphCMS/rich-text/pull/17) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)! - fix: empty thead being renderered

## 0.1.3

### Patch Changes

- [`7cb7b7e`](https://github.com/GraphCMS/rich-text-renderer/commit/7cb7b7ef78a465c54982f81c77432d001ea9645b) [#9](https://github.com/GraphCMS/rich-text-renderer/pull/9) Thanks [@feychenie](https://github.com/feychenie)! - Moved html-to-slate-ast package to this repo.

## 0.1.2

### Patch Changes

- [`23b87f6`](https://github.com/GraphCMS/rich-text-renderer/commit/23b87f6218040df283d112307c3720645a5936aa) [#6](https://github.com/GraphCMS/rich-text-renderer/pull/6) Thanks [@KaterBasilisk6](https://github.com/KaterBasilisk6)!

- Add `RemoveEmptyElementType`

## 0.1.1

### Patch Changes

- [`d831c93`](https://github.com/GraphCMS/rich-text-renderer/commit/d831c93be2f1a07aea2377e0d5842e130e104bfd) [#2](https://github.com/GraphCMS/rich-text-renderer/pull/2) Thanks [@jpedroschmitz](https://github.com/jpedroschmitz)!

- Add `list_item_child` to `NodeRendererType`;
- Accept array of `ElementNode` and object with `children` on `RichTextContent`.

## 0.1.1-canary.0

### Patch Changes

- Add `list_item_child` to `NodeRendererType`;
- Accept array of `ElementNode` and object with `children` on `RichTextContent`.
