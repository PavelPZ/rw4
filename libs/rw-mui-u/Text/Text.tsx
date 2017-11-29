import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.SheetCreator<MuiText.Shape> = theme => toPlatformSheet<MuiText.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
