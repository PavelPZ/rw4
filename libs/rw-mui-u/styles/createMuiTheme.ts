import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const platformOverrides = (source: Mui.OverridesSource) => {
  if (!source) return null
  const result: Mui.Overrides = {}
  for (const p in source) result[p] = toPlatformSheet(source[p])
  return result
}
