# @graphcms/html-to-slate-ast

## 0.10.0

### Minor Changes

- [`28455b3`](https://github.com/GraphCMS/rich-text/commit/28455b3cb7407785ed6ddce3dfd6d29504888f01) [#48](https://github.com/GraphCMS/rich-text/pull/48) Thanks [@larisachristie](https://github.com/larisachristie)! - Refactor nested lists handling

## 0.9.0

### Minor Changes

- [`f6871a6`](https://github.com/GraphCMS/rich-text/commit/f6871a60e56af84b6c6276a84a0e6cb1d95dd062) [#39](https://github.com/GraphCMS/rich-text/pull/39) Thanks [@larisachristie](https://github.com/larisachristie)! - Add marks to links; apply multiple marks if multiple style attributes are present; wrap li tag content in a list-item-child node; add tests

## 0.8.1

### Patch Changes

- [`9222643`](https://github.com/GraphCMS/rich-text/commit/9222643f6ac086bcca3d227138ec3deeb2af910b) [#37](https://github.com/GraphCMS/rich-text/pull/37) Thanks [@igneosaur][https://github.com/igneosaur] for the report! - Fix a regression on NodeJS caused by the direct use of the window object instead of a jsdom fallback

## 0.8.0

### Minor Changes

- [`5a618d5`](https://github.com/GraphCMS/rich-text/commit/5a618d5a53703f1e0a2a76815a7f9b0f9c98df80) [#34](https://github.com/GraphCMS/rich-text/pull/34) Thanks [@larisachristie](https://github.com/larisachristie)! - Update Slate; refactor types; fix pre tag handling; wrap parentless breaks in a paragraph; do not add thead to headless tables

## 0.7.0

### Minor Changes

- [`8e2a3a4`](https://github.com/GraphCMS/rich-text/commit/8e2a3a4660176eb957977f2b01c3c26c79e54dd2) [#31](https://github.com/GraphCMS/rich-text/pull/31) Thanks [@larisachristie](https://github.com/larisachristie)! - Populate empty children array with text node

## 0.6.0

### Minor Changes

- [`a594c49`](https://github.com/GraphCMS/rich-text/commit/a594c49620fe27346f39ec3f0fd44d84927a70f7) [#27](https://github.com/GraphCMS/rich-text/pull/27) Thanks [@larisachristie](https://github.com/larisachristie)! - Fix text node when pasting images; sanitize URLs

## 0.5.1

### Patch Changes

- Updated dependencies [[`768492a`](https://github.com/GraphCMS/rich-text/commit/768492a5dd5e642cc639b82cd7e13f2ce7f2dc96)]:
  - @graphcms/rich-text-types@0.2.0

## 0.5.0

### Minor Changes

- [`b2c8f91`](https://github.com/GraphCMS/rich-text/commit/b2c8f9163abe9e1f50aaf3da5e242a8beb0efe31) [#23](https://github.com/GraphCMS/rich-text/pull/23) Thanks [@larisachristie](https://github.com/larisachristie)! - Fix the AST shape of a converted copy-pasted image

## 0.4.0

### Minor Changes

- [`eea403f`](https://github.com/GraphCMS/rich-text/commit/eea403faf1074f3532b4697296014c3c436083d0) [#21](https://github.com/GraphCMS/rich-text/pull/21) Thanks [@notrab](https://github.com/notrab)! - Pass supported attributes to links

## 0.3.0

### Minor Changes

- [`90a3f7d`](https://github.com/GraphCMS/rich-text/commit/90a3f7d6c1e135bb1d9a8e57fda49cb0e24a1c53) [#18](https://github.com/GraphCMS/rich-text/pull/18) Thanks [@OKJulian](https://github.com/OKJulian)! - Fix window check in node

## 0.2.0

### Minor Changes

- [`672b2b9`](https://github.com/GraphCMS/rich-text/commit/672b2b97566d6ecf2f9071a1fff0b2e172bdc56d) [#12](https://github.com/GraphCMS/rich-text/pull/12) Thanks [@feychenie](https://github.com/feychenie)! - @graphcms/html-to-slate-ast is now isomorphic and async. It uses DOMParser in the browser, and jsdom in node.

## 0.1.2

### Patch Changes

- [`7cb7b7e`](https://github.com/GraphCMS/rich-text-renderer/commit/7cb7b7ef78a465c54982f81c77432d001ea9645b) [#9](https://github.com/GraphCMS/rich-text-renderer/pull/9) Thanks [@feychenie](https://github.com/feychenie)! - Moved html-to-slate-ast package to this repo.

- Updated dependencies [[`7cb7b7e`](https://github.com/GraphCMS/rich-text-renderer/commit/7cb7b7ef78a465c54982f81c77432d001ea9645b)]:
  - @graphcms/rich-text-types@0.1.3
