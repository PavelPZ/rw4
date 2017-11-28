import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.SheetCreator<MuiView.Shape> = theme => toPlatformSheet<MuiView.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
