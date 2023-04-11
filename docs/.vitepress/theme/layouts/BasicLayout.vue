<template>
  <div class="container">
    <Layout>
      <template #doc-before>
        <Title></Title>
      </template>
    </Layout>
    <div class="footer">
      <Footer></Footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Footer from '../components/Footer.vue'
import Title from '../components/Title.vue'
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<style scoped lang="less">
.container {
  position: relative;
}
</style>
