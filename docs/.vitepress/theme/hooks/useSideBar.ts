import { useData } from 'vitepress'
import glob from 'fast-glob'
import * as fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs, { Dayjs } from 'dayjs'

interface sideListItem {
  classify: undefined | string
  title: string
  date: Dayjs
  link: string
}

interface sideListMapItem {
  text: string
  items: Array<item>
}

interface item {
  text: string
  link: string
  date: Dayjs
  classify: undefined | string
}

export default async () => {
  async function getFiles() {
    const files = await glob('docs/posts/**/*.md')
    return files
  }

  let sideList: Array<sideListItem> = []

  const fileList = await getFiles()

  sideList = await Promise.all(
    fileList.map(async (doc: string) => {
      let map: any = {}
      let str = await fs.readFile(doc, 'utf-8')
      //   解析 yaml
      const { data, content } = matter(str)
      const { title, date, classify } = data
      const docStrList: Array<string> = doc
        .replace(/^docs\/posts\//, '/')
        .replace(/.md/, '')
        .split('/')
      map = {
        classify,
        title,
        date,
        link: docStrList.join('/'),
      }

      return map
    })
  )
  let sideListMap: {
    [propname: string]: sideListMapItem
  } = {}
  sideList.map((i: sideListItem) => {
    if (!i.classify) {
      i.classify = '模版测试'
    }

    if (sideListMap[i.classify]) {
      const temp = { text: i.title, link: i.link, date: dayjs(i.date), classify: i.classify }
      sideListMap[i.classify].items.push(temp)
    } else {
      sideListMap[i.classify] = {
        text: i.classify,
        items: [{ text: i.title, link: i.link, date: dayjs(i.date), classify: i.classify }],
      }
    }
  })

  console.log('🚀 ~ file: useSideBar.ts:82 ~ sideListMap:', sideListMap)

  return Object.values(sideListMap).map((i: sideListMapItem) => {
    i.items = i.items.sort((a: item, b: item) => +a.date - +b.date)

    return i
  })
}
