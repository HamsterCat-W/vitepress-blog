// 获取所有icons的地址，并将其写入文件
import glob from 'fast-glob'
import fs from 'fs-extra'

export default async () => {
  const iconsPath: string = 'docs/posts/public/images/icons/*.svg'
  const files: Array<string> = await glob(iconsPath)
  const iconsList: Array<iconItem> = []
  files.map((i: string) => {
    const path = i.replace(/^docs\/posts\/public/, '')

    const strReg = /^(.*)?(\.(min)?\.svg)/
    const matchList: Array<string | undefined> | null = path.match(strReg)
    if (matchList && matchList.length) {
      const fileName: string | undefined = matchList[1]?.split('/').slice(-1)[0]
      if (fileName) {
        const svgFileObj: iconItem = {
          iconName: fileName,
          iconUrl: path,
        }

        iconsList.push(svgFileObj)
      }
    }
  })

  try {
    await fs.writeJSON('docs/posts/svgs.json', { icons: iconsList }, { spaces: 2 })
    console.log('icons save success')
  } catch (error) {
    console.log(error)
  }
}
