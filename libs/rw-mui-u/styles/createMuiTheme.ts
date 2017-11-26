import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const platformOverrides = (theme: Mui.Theme) => {
  if (theme.overrides) {
    const newOverrides = {}
    for (const p in theme.overrides) newOverrides[p] = toPlatformSheet(theme.overrides[p])
    theme.overrides = newOverrides
  }
  return theme
}
