<template>
  <div class="page-container flex flex-col items-center">
    <!-- {{ docs }} -->
    <!-- {{ svgList }} -->
    <div class="docs-card flex flex-wrap">
      <div class="docs-card-item p-3 relative" v-for="item in docs" :key="item.link" @click="goDoc(item?.link)">
        <div class="item-container">
          <div
            class="img"
            :style="{
              'background-image': `url(${item?.imgSrc})`,
            }"
          ></div>

          <div class="item-slant reverse-slant" :style="{ 'background-color': getRandomColor() }"></div>
          <div class="item-slant"></div>

          <div class="desc label">
            <a :href="item?.link">{{ item?.title }}</a>
          </div>
          <div class="item-footer flex justify-between items-center pl-2 pr-2 pb-3">
            <div class="desc publish">{{ formatTime(item?.date) }}</div>
            <div class="tags flex items-center">
              <span class="publish mr-2">{{ tag(item) }}</span>
              <img :src="getRandomIcons(svgList)" alt="" srcset="" height="24" width="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination mt-4 mb-4">
      <Pagination :current="current" :pageSize="pageSize" :total="total"></Pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { formatTime, getRandomColor, getRandomIcons } from '../utils'
import { useRouter } from 'vitepress'
import Pagination from './Pagination.vue'

const router = useRouter()
console.log('🚀 ~ file: HomeFeatures.vue:38 ~ router:', router)
const docList = ref<sideListItem[]>([])
const svgList = ref<iconItem[]>([])
const current = ref<number>(1)
const pageSize: number = 9
const total = ref<number>(0)
const getFileList = async () => {
  try {
    const [docsInfo, svgsInfo] = await Promise.all([axios.get('/docs.json'), axios.get('/svgs.json')])
    docList.value = docsInfo.data['docs']
    total.value = docList.value.length
    svgList.value = svgsInfo.data['icons']
  } catch (error) {
    console.log('🚀 ~ file: HomeFeatures.vue:57 ~ getFileList ~ error:', error)
  }
}
getFileList()
const docs = computed(() => {
  return docList.value.sort((doc1: sideListItem, doc2: sideListItem) => +dayjs(doc2.date) - +dayjs(doc1.date)).slice(1)
})

const tag = computed(() => (item: sideListItem) => item?.tags?.map((i) => i)[0])

// const

const goDoc = (link: string): void => {
  router.go(link)
}
</script>

<style scoped lang="less">
.page-container {
  width: 100%;
  background-color: #f7f7f7;
}

.docs-card {
  width: 800px;
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
  border-radius: 10px;
  background-color: #fff;
  -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
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
  opacity: 0.3;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.desc {
  z-index: 1;
  position: relative;
  background-color: #fff;
}

.label {
  padding: 10px 20px 40px;
  a {
    font-size: 16px;
    line-height: 16px;
    word-break: break-all;
    color: #313131;
    font-weight: 400;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
  }
}

.publish {
  font-weight: 600;
  font-size: 14px;
}
</style>
