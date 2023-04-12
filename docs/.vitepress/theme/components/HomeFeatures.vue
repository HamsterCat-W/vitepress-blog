<template>
  <div>
    docs==
    {{ docs }}
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

const docList = ref<sideListItem[]>([])

const getFileList = async () => {
  const result = await axios.get('/docs.json')
  docList.value = result.data['docs']
}

const docs = computed(() =>
  docList.value.sort((doc1: sideListItem, doc2: sideListItem) => +dayjs(doc2.date) - +dayjs(doc1.date))
)
console.log('🚀 ~ file: HomeFeatures.vue:19 ~ docs:', docs)

getFileList()
</script>

<style scoped lang="less"></style>
