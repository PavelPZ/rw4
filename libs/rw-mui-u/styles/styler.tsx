import { expandStyle } from 'rw-mui/styles/styler'

export const expandStyles = <T extends Mui.StyleRules>(styles: T) => {
  if (!styles) return null
  const res: Record<string, CSSProperties | TextStyle> = {}
  for (const p in styles) res[p] = expandStyle(styles[p])
  return res as T
}
