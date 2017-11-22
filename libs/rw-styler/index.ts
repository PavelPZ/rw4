export const styleWeb = (style: Style) => {
  if (!style) return null
  const { web, native, ios, android, window, ...rest } = style
  return { ...rest || null, ...web || null } as CSSProperties
}

export const styleNative = <T extends Style = TextStyle>(style: T, OS: RN.PlatformOSType) => {
  if (!style) return null
  const { web, native, ios, android, window, ...rest } = style as (TextStyle | ViewStyle | ImageStyle)
  let st: Style
  switch (OS) {
    case 'ios': st = ios; break
    case 'android': st = android; break
    case 'windows': st = window; break
    default: throw OS
  }
  return { ...rest || null, ...native || null, ...st || null } as T
}