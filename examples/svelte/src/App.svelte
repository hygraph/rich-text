<script lang="ts">
  import { slateToHtml } from '@graphcms/rich-text-html-renderer';

  import { content, references } from '../../content-example';

  const html = slateToHtml({
    content,
    references,
    renderers: {
      bold: props => `<strong>${props.children}</strong>`,
      Asset: {
        application: () => `<div><p>Asset</p></div>`,
        text: () => `<div><p>text plain</p></div>`,
      },
    },
  });
</script>

<div>
  <h1>Svelte Example</h1>

  <div>{@html html}</div>
</div>
