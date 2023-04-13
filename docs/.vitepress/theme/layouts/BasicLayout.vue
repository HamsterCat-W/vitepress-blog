<template>
  <Layout>
    <!-- doc -->
    <template #doc-before>
      <Title></Title>
    </template>
    <!-- 404 -->
    <template #not-found>404</template>
    <!-- home -->
    <template #home-hero-before>
      <HomeHero></HomeHero>
    </template>
    <template #home-features-after>
      <HomeFeatures></HomeFeatures>
    </template>
  </Layout>
  <div class="footer">
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import Footer from '../components/Footer.vue'
import Title from '../components/Title.vue'
import HomeHero from '../components/HomeHero.vue'
import HomeFeatures from '../components/HomeFeatures.vue'
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
const { Layout } = DefaultTheme
</script>

<style scoped lang="less"></style>
