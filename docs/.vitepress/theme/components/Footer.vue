<template>
  <footer>
    Powered by
    <a href="https://github.com/HamsterCat-W/vitepress-blog" target="_blank" title="作者">HamsterCat-W</a>
    | Copyright © 2019-{{ date }} | MIT License
  </footer>
</template>

<script setup lang="ts">
const date = new Date().getFullYear()
</script>

<style scoped lang="less">
footer {
  text-align: center;
  width: 100%;
  padding: 0 20px;
  color: var(--vp-c-text);
  margin-bottom: 20px;
}
a {
  color: var(--vp-c-brand);
  font-weight: bold;
}
a:hover {
  text-decoration: none;
  color: var(--vp-button-brand-hover-bg);
}
</style>
