import React from 'react'
import Button from 'reactx-mui/current/Button/Button'
import MuiThemeProvider from 'reactx-mui/current/styles/MuiThemeProvider'
import createMuiTheme from 'reactx-mui/common/styles/createMuiTheme'
//import color from 'material-ui/colors/orange'

import { Styler } from 'reactx-mui/current/styles/withStyles'

import { View } from 'react-native'

//import Cancel from 'material-ui/svg-icons/Cancel'

//const theme = createMuiTheme({
//  overrides: {
//    [Mui.Names.Icon]: {
//      common: {
//        colorInherit: iconColor(color[500]), 
//      }
//    } as Mui.Sheet<MuiIcon.ISheet>
//  }
//})

const app: React.SFC = props =>
  <Styler>
    <View style={{ marginTop: 24 }}>
      <Button color='primary' raised onClick={ev => ev && ev.preventDefault()}>Hallo Button</Button> 
    </View>
  </Styler>

export default app
//export default app2