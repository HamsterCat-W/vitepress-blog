<template>
  <div class="page-container">
    <!-- {{ docs }} -->
    <div class="test"></div>
    <div class="docs-card flex flex-wrap">
      <div class="docs-card-item p-3 relative" v-for="item in docs" :key="item.link">
        <div class="item-container">
          <div
            class="img"
            :style="{
              'background-image': `url(${item?.imgSrc})`,
            }"
          ></div>

          <div class="item-slant reverse-slant"></div>
          <div class="item-slant"></div>

          <div class="desc label">{{ item?.title }}</div>
          <div class="desc publish">{{ formatTime(item?.date) }}</div>
          <div class="tags">111</div>
        </div>
      </div>
    </div>
    <div class="pagination">分页</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { formatTime } from '../utils'

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
.page-container {
  width: 100%;
  background-color: #f7f7f7;
}

.docs-card {
  width: 800px;
  margin: 0 auto;
}


.docs-card-item {
  width: 33.33%;
  margin-bottom: 8px;
  overflow: hidden;

  .img {
    min-height: 250px;
    background-position: 50% 50%;
    background-size: cover;
  }
}

.item-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 0;
  border-radius: 3px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
  box-shadow: 0 1px 4px rgba(0, 0, 0, .04);
}



.item-slant {
  position: absolute;
  z-index: 0;
  right: 0;
  bottom: 50px;
  left: 0;
  width: 110%;
  min-height: 100px;
  -webkit-transform: rotate(7deg) translate(-10px, 0);
  -ms-transform: rotate(7deg) translate(-10px, 0);
  transform: rotate(7deg) translate(-10px, 0);
  background-color: #fff;
}

.reverse-slant {
  -webkit-transform: rotate(-10deg) translate(10px, -10px);
  -ms-transform: rotate(-10deg) translate(10px, -10px);
  transform: rotate(-10deg) translate(10px, -10px);
  opacity: 0.7;
  background-color: #f68e5f;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.desc {
 z-index: 1;
  position: relative;
  background-color: #fff;
}

.label {

  padding: 10px 20px 40px // height: 130px;
}

.publish {

}
</style>
