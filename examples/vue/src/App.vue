<script lang="ts" setup>
import { ref } from 'vue';
import { slateToHtml } from '@graphcms/rich-text-html-renderer';

import { content, references } from '../../content-example';

const html = slateToHtml({ content, references });
const richTextHtml = ref(html);
</script>

<template>
  <div>
    <h1>Vue Example</h1>

    <div v-html="richTextHtml"></div>
  </div>
</template>
