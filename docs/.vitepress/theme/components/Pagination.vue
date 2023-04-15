<template>
  <div class="page-container">
    <ul class="flex items-center">
      <li class="paging-item" :class="{ disabled: current === 1 }" @click="prePage">&lt;-</li>
      <li
        class="paging-item"
        v-for="item in pageList"
        :key="item"
        :class="{ current: current === item }"
        @click="changeCurrent(item)"
      >
        {{ item }}
      </li>
      <li class="paging-item" :class="{ disabled: current === pageList.length }" @click="nextPage">-&gt;</li>
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

const emits = defineEmits(['update:current', 'change'])

const pageList = computed(() => {
  const { pageSize, total } = props
  const lst = Math.ceil(total / pageSize)
  return [...new Array(lst).keys()].map((i: number) => i + 1)
})

const changeCurrent = (current: number) => {
  emits('update:current', current)
  emits('change', current)
}

const prePage = () => {
  if (props.current === 1) return
  emits('update:current', props.current - 1)
  emits('change', props.current - 1)
}

const nextPage = () => {
  if (props.current === pageList.value.length) return
  emits('update:current', props.current + 1)
  emits('change', props.current + 1)
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
