//import React from 'react'

//import { ScrollView, View, Button, Text } from 'react-native'

//import getTheme from '../gui/theme/components/index'
//import { getPlatformVariables } from '../gui/theme/platform'

//interface IColorUse { name: string, color: string, paths: {[path:string]:boolean} }
//let dump: { [name: string]: IColorUse }

//const scanLevel = (ios:boolean, path: string, obj: {}) => {
//  for (const p in obj) {
//    const color = obj[p]
//    const newPath = path + (path ? '/' : '') + p
//    if (typeof color == 'string') {
//      const name = palette[color]
//      if (!name && color.startsWith('#')) console.log(color)
//      if (!name) continue
//      let uses = dump[name] || (dump[name] = { name, color: color, paths: {} })
//      uses.paths[(ios ? 'ios/' : 'android/') + newPath] = true
//    } else if (typeof color == 'object') {
//      scanLevel(ios, newPath, color)
//    }
//  }
//}

//const app: React.SFC<any> = props => {
//  dump = {}
//  const { variables:var1, ...theme:theme1 } = getTheme(getPlatformVariables('ios'))
//  const { variables:var2, ...theme:theme2 } = getTheme(getPlatformVariables('android'))
//  //console.log('IOS VARIABLES\n', JSON.stringify(var1, null, 2))
//  //console.log('ANDROID VARIABLES\n', JSON.stringify(var2, null, 2))
//  scanLevel(true, '', theme1)
//  scanLevel(false, '', theme2)
//  console.log('DUMP\n', JSON.stringify(dump, null, 2))
//  let list: IColorUse[] = []
//  for (const p in dump) list.push(dump[p])
//  list = list.sort((a, b) => a.name.localeCompare(b.name))
//  const getPaths = (dir:{}) => { 
//    const res = []; 
//    for (const p in dir) {
//      if (p.startsWith('ios/') && dir[p.replace('ios/','android/')]) continue
//      if (p.startsWith('android/') && dir[p.replace('android/','ios/')]) res.push(p.replace('android/',''))
//      else res.push(p)
//    }
//    return res.sort()
//  }
//  return <ScrollView style={{ marginTop: 30 }}>
//    {list.map((it, idx) => { 
//      const textColor = it.color == Palette.gray_16 || it.color == Palette.gray_17 || it.color == Palette.gray_black ? 'white' : 'black'
//      return <View key={idx} style={{ backgroundColor: it.color, marginBottom: 5 }}>
//        <Text style={{ color: textColor }}>{it.name}: {it.color}</Text>
//        {getPaths(it.paths).map((p, idx2) => <Text key={idx2} style={{ fontSize: 8, color: textColor }}>{p}</Text>)}
//      </View>
//    })}
//  </ScrollView>
//}

//export default app

////copy palette, without CONST
//enum Palette {

//  //Brands
//  brandPrimaryAndroid = '#3f51b5',
//  brandPrimaryIos = '#007aff',
//  brandInfo = '#62b1f6',
//  brandSuccess = '#5cb85c',
//  brandDanger = '#d9534f',
//  brandWarning = '#f0ad4e',
//  brandSidebar = '#252932',

//  //Grays
//  gray_white = '#ffffff',
//  gray_01 = '#f8f8f8',
//  gray_02 = '#f4f4f4',
//  //gray_03 = '#f1f1f1',
//  //gray_04 = '#dddddd',
//  gray_05 = '#cccccc',
//  gray_06 = '#cbcbcb',
//  gray_07 = '#c9c9c9',
//  gray_08 = '#b5b5b5',
//  gray_09 = '#a7a7a7',
//  gray_10 = '#808080',
//  gray_11 = '#7e7e7e',
//  gray_12 = '#777777',
//  gray_13 = '#6b6b6b',
//  gray_14 = '#575757',
//  gray_15 = '#555',
//  gray_16 = '#414141',
//  gray_17 = '#222222',
//  gray_black = '#000000',

//  //colors
//  col01 = '#f0eff5',
//  col02 = '#ed2f2f',
//  col03 = '#ed1727',
//  //NU col04 = '#e4202d',
//  col05 = '#d9d5dc',
//  col06 = '#cecdd2',
//  col07 = '#cde1f9',
//  //NU col08 = '#c9c9ce',
//  col09 = '#c9c8cd',
//  col10 = '#c8c7cc',
//  col11 = '#b3c7f9',
//  col12 = '#a7a6ab',
//  col13 = '#8f8e95',
//  col14 = '#8e8e93',
//  //NU col15 = '#45d56e',
//  col16 = '#4179f7',
//  col17 = '#384850',
//  col18 = '#2b8339',
//  //NU col19 = '#1a191b',
//  //NU col21 = '#039be5',
//}
//const palette = {}
//for (const p in Palette) palette[Palette[p]] = p

