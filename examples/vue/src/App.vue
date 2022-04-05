<script lang="ts" setup>
import { ref } from 'vue';
import { astToHtmlString } from '@graphcms/rich-text-html-renderer';

import { content, references } from '../../content-example';

const html = astToHtmlString({
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
const richTextHtml = ref(html);
</script>

<template>
  <div>
    <h1>Vue Example</h1>

    <div v-html="richTextHtml"></div>
  </div>
</template>
