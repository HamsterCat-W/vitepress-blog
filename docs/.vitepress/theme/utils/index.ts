import dayjs from 'dayjs'

// mapping 函数
export const createMapping = (list: Array<any>, key: string): any => {
  return list.reduce((pre: any, cur: any) => {
    pre[cur[key]] = cur
    return pre
  }, {})
}

// 格式化时间
export const formatTime = (timer: string, formatTime: string = 'YYYY-MM-DD') => {
  return dayjs(timer).format(formatTime)
}

// 获取随机颜色
export const getRandomColor = () => {
  const r = Math.random() * 255
  const g = Math.random() * 255
  const b = Math.random() * 255

  return `rgb(${r},${g},${b})`
}

// 获取随机图标
export const getRandomIcons = (iconList: iconItem[]): string => {
  const idx = Math.floor(Math.random() * iconList.length)
  return iconList[idx]?.iconUrl
}
