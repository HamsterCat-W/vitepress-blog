<template>
  <div class="page-container">
    <div class="test"></div>
    <!-- {{ docs }} -->
    <div class="docs-card flex flex-wrap">
      <div class="docs-card-item p-3 relative" v-for="item in docs" :key="item.link">
        <div
          class="img"
          :style="{
            'background-image': `url(${item?.imgSrc})`,
          }"
        ></div>
        <div class="title">111</div>
        <div class="tags">111</div>
      </div>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'

const docList = ref<sideListItem[]>([])
const current = ref<number>(1)
const pageSize: number = 9

const getFileList = async () => {
  const result = await axios.get('/docs.json')
  docList.value = result.data['docs']
}

const docs = computed(() => {
  return docList.value.sort((doc1: sideListItem, doc2: sideListItem) => +dayjs(doc2.date) - +dayjs(doc1.date)).slice(1)
})

getFileList()
</script>

<style scoped lang="less">
.test {
  height: 100px;
  width: 100%;
  background-color: yellow;
}
.page-container {
  width: 100%;
}

.docs-card {
  width: 800px;
  margin: 0 auto;
}
.docs-card-item {
  width: 33.33%;
  margin-bottom: 8px;

  .img {
    min-height: 250px;
    background-position: 50% 50%;
    background-size: cover;
  }
}
</style>
