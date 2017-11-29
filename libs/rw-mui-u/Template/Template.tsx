import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.SheetCreator<MuiTemplate.Shape> = theme => toPlatformSheet<MuiTemplate.Shape>({
  common: {
    root: {
      web: {
        display: 'flex',
        flexDirection: 'column'
      }
    }
  }
})
