import { defineConfig } from 'vitepress'
import useSideBar from './theme/hooks/useSideBar'
import Unocss from 'unocss/vite'

// https://vitepress.dev/reference/site-config
export default async () => {
  const { sidebar } = await useSideBar()
  return defineConfig({
    title: '个人博客',
    description: '个人博客网站',
    lang: 'zh-CN',
    // 注入到当前html的head标签中
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    // 开启行号
    markdown: {
      lineNumbers: true,
    },
    srcDir: 'posts',
    themeConfig: {
      // https://vitepress.dev/reference/default-theme-config
      // 主页标题前的logo
      logo: '/favicon.ico',
      lastUpdatedText: '上次更新时间',
      nav: [
        { text: '主页', link: '/' },
        { text: '文档', link: '/markdown-examples' },
      ],
      sidebar,
      socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    },
    vite: {
      clearScreen: false,
      server: {
        port: 3077,
        host: true,
      },
      plugins: [Unocss({})],
    },
  })
}
