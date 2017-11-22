import React from 'react'
import { View, Text } from 'react-native'
import Icon from 'rw-mui/Icon/Icon'
import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'
import createMuiTheme from 'rw-mui/styles/createMuiTheme'
import color from 'material-ui/colors/orange'

const theme = createMuiTheme({
  overrides: {
    [Mui.Names.Icon]: {
      colorInherit: { color: color[500] }
    }
  }
})

const app: React.SFC = props => <View style={{ marginTop: 24 }}>
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='inherit' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='accent' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='action' />
  <View style={{ backgroundColor: 'darkgray', padding:5 }}>
    <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='contrast' />
  </View>
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='disabled' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='error' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='primary' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ colorInherit: { color: 'green' } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ root: { fontSize:24 } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} style={{ color: 'brown' }} />
  <MuiThemeProvider theme={theme}>
    <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  </MuiThemeProvider>
</View>

export default app