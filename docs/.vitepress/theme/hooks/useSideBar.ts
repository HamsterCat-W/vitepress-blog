import glob from 'fast-glob'
import * as fs from 'fs-extra'
import matter from 'gray-matter'
import dayjs from 'dayjs'
import { sideBarTitleListMap } from '../utils/constant'

export default async () => {
  async function getFiles() {
    const files = await glob('docs/posts/**/*.md')
    return files
  }

  let sideList: Array<sideListItem> = []

  const fileList = await getFiles()

  sideList = await Promise.all(
    fileList.map(async (doc: string) => {
      let map: sideListItem
      let str = await fs.readFile(doc, 'utf-8')
      //   解析 yaml
      const { data, content } = matter(str)
      // console.log('🚀 ~ file: useSideBar.ts:46 ~ fileList.map ~ data:', data)
      const { title, date, classify, imgSrc, description, tags, author } = data
      const docStrList: Array<string> = doc
        .replace(/^docs\/posts\//, '/')
        .replace(/.md/, '')
        .split('/')
      map = {
        classify,
        title,
        date,
        link: docStrList.join('/'),
        imgSrc,
        description,
        tags,
        author,
      }

      return map
    })
  )
  let sideListMap: {
    [propname: string]: sideListMapItem
  } = {}
  sideList.map((i: sideListItem) => {
    if (!i.classify) {
      i.classify = 'template-test'
    }

    if (sideListMap[i.classify]) {
      const temp = { text: i.title, link: i.link, date: dayjs(i.date), classify: i.classify }
      sideListMap[i.classify].items.push(temp)
    } else {
      sideListMap[i.classify] = {
        text: sideBarTitleListMap[i.classify]?.label,
        level: sideBarTitleListMap[i.classify]?.level,
        collapsed: true,
        items: [{ text: i.title, link: i.link, date: dayjs(i.date), classify: i.classify }],
      }
    }
  })

  try {
    await fs.writeJSON('docs/posts/docs.json', { docs: sideList }, { spaces: 2 })
    console.log('docs save success')
  } catch (error) {
    console.log(error)
  }

  const menuList = Object.values(sideListMap)

  const sidebar = menuList
    .map((i: sideListMapItem) => {
      i.items = i.items.sort((a: item, b: item) => +a.date - +b.date)
      return i
    })
    .sort((a: sideListMapItem, b: sideListMapItem) => b.level - a.level)

  return {
    sidebar,
  }
}
