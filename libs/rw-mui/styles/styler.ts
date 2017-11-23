import { Platform } from 'react-native'

export const expandStyle = <T extends Style = TextStyle>(style: T) => {
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