<template>
  <div>
    <h1 class="title">{{ title }}</h1>
    <div class="date">🕒 Published at: {{ publishDate }}</div>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
const route = useRoute()

const title = ref('')
const frontmatter = ref<{
  classify?: string
  date?: string
  description?: string
  outline?: string
  tags?: Array<string>
  title?: string
}>()
const publishDate = computed(() => dayjs(frontmatter.value?.date).format('YYYY-MM-DD'))

watch(
  () => route,
  (nv, ov) => {
    title.value = nv.data.title
    frontmatter.value = nv.data.frontmatter
  },
  {
    immediate: true,
    deep: true,
  }
)
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
