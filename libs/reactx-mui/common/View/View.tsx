import React from 'react'

import { toPlatformSheet } from 'reactx-mui/current/styles/withStyles'

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
