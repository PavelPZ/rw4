import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.PlatformSheetCreator<MuiTemplate.Shape> = theme => toPlatformSheet<MuiTemplate.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
