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
