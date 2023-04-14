<template>
  <div class="page-container">
    <ul class="flex items-center">
      <li class="paging-item disabled">&lt;-</li>
      <li class="paging-item">1</li>
      <li class="paging-item">2</li>
      <li class="paging-item">3</li>
      <li class="paging-item">4</li>
      <li class="paging-item disabled">-&gt;</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  current: number
  pageSize: number
  total: number
}>()

const emits = defineEmits(['update:current'])

const pageList = computed(() => {
  const { pageSize, total } = props
  const lst = Math.ceil(total / pageSize)
  return [new Array()]
})

function ref<T>(current: number) {
  throw new Error('Function not implemented.')
}
</script>

<style scoped lang="less">
.paging-item {
  display: inline-block;
  color: #313131;
  padding: 0 20px;
  font-size: 14px;

  &:hover {
    background-color: #f0f0f0;
    color: #eb5055;
  }
}

.current {
  color: #eb5055;
}

.disabled {
  color: #5f5f5f;
  cursor: not-allowed;
  opacity: 0.75;

  &:hover {
    color: #5f5f5f;
  }
}
</style>
