<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="date">🕒 Published at: {{ publishDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

const pageDate = useData().page.value
const { frontmatter, title } = pageDate
dayjs.extend(relativeTime)
const publishDate = dayjs(frontmatter.date).format('YYYY-MM-DD')
</script>

<style scoped lang="less">
.title {
  color: var(--vp-c-text-1);
  font-weight: 600;
  font-size: 2.25em;
  margin-top: 0.3em;
  margin-bottom: 0.3em;
  line-height: 1.3;
}
.date {
  font-size: 0.875rem;
  line-height: 1.25rem;
  margin-bottom: 1em;
  padding-bottom: 1em;
  border-bottom: 1px dashed #c7c7c7;
}
</style>
