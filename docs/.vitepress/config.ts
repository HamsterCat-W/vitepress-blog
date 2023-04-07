import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "个人博客",
  description: "个人博客网站",
  lang: "zh-CN",
  // 注入到当前html的head标签中
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  // 开启行号
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 主页标题前的logo
    logo: "",
    lastUpdatedText: "上次更新时间",
    nav: [
      { text: "主页", link: "/" },
      { text: "文档", link: "/markdown-examples" },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    server: {
      port: 3077,
      host: true,
    },
  },
});
