// 配置目录映射

interface SideBarTitleItem {
  label: string
  director: string
  // 左侧可折叠菜单
  icon?: string
  // 左侧可折叠菜单排序
  level: number
}

export const sideBarTitleList: Array<SideBarTitleItem> = [
  {
    label: '这是一个测试',
    director: 'test',
    icon: '',
    level: 1,
  },
  {
    label: '模版测试',
    director: 'template-test',
    icon: '',
    level: 0,
  },
  {
    label: 'vue学习',
    director: 'vue-study',
    icon: '',
    level: 2,
  },
]
