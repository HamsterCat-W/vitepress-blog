// mapping 函数
export const createMapping = (list: Array<any>, key: string): any => {
  return list.reduce((pre: any, cur: any) => {
    pre[cur[key]] = cur
    return pre
  }, {})
}
