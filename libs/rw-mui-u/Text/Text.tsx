﻿import React from 'react'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

export const sheet: Mui.PlatformSheetCreator<MuiText.Shape> = theme => toPlatformSheet<MuiText.Shape>({
  common: {
    root: {
      web: {
        '& .mui-text': {
          display: 'inline'
        }
      }
    }
  }
})
