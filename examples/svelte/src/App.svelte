<script lang="ts">
  import { slateToHtml } from '@graphcms/rich-text-html-renderer';

  import { content, references } from '../../content-example';

  const html = slateToHtml({ content, references });
</script>

<div>
  <h1>Svelte Example</h1>

  <div>{@html html}</div>
</div>
