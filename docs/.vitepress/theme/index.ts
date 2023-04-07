// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Theme from 'vitepress/theme'
import './style.css'
import BasicLayout from './layouts/BasicLayout.vue'

export default {
  ...Theme,
  Layout: BasicLayout,
  enhanceApp({ app, router, siteData }: any) {
    // ...
  },
}
