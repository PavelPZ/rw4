import React from 'react'

import { sheetCreator } from 'xmui/common/styles/withStyles'

export const sheet = sheetCreator<MuiTemplate.Shape>(({ palette }) => ({
  common: {
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    text: {}
  },
  native: null,
  web: null
}))
