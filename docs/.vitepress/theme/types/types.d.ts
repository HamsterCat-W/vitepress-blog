interface sideListItem {
  classify: undefined | string
  title: string
  date: Dayjs
  link: string
  imgSrc?: string
  description?: string
  tags?: Array<string>
  author?: string
}

interface sideListMapItem {
  text: string
  collapsed?: boolean
  items: Array<item>
  level: number
}

interface item {
  text: string
  link: string
  date: Dayjs
  classify: undefined | string
}
