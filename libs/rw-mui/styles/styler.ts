import { Platform } from 'react-native'

export const expandStyle = <T extends CSSPropertiesNative = RN.TextStyle>(style: T | string) => {
  if (!style) return null
  const { web, native, ios, android, window, ...rest } = style as (TextStyle | ViewStyle | ImageStyle)
  let st: Style
  switch (Platform.OS) {
    case 'ios': st = ios; break
    case 'android': st = android; break
    case 'windows': st = window; break
    default: throw Platform.OS
  }
  return { ...rest || null, ...native || null, ...st || null } as T
}

export const classNames = <T extends CSSPropertiesNative>(...styles: Array<T | T[] | string | string[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}