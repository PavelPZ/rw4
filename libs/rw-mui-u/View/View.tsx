import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.PlatformSheetCreator<MuiView.Shape> = theme => toPlatformSheet<MuiView.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
