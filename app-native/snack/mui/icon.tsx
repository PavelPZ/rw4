import React from 'react'
import { View, Text } from 'react-native'
import Icon, { IconName, IIconStyle } from 'rw-mui-n/Icon/Icon'
import MuiThemeProvider from 'rw-mui-n/styles/MuiThemeProvider'
import createMuiTheme from 'rw-mui-n/styles/createMuiTheme'

const theme = createMuiTheme({
  overrides: {
    [IconName]: {
      colorInherit: {color: 'yellow'}
    } as Partial<IIconStyle>
  }
})

const app: React.SFC = props => <View style={{ marginTop: 24 }}>
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='inherit' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='accent' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='action' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='contrast' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='disabled' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='error' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='primary' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ colorInherit: { color: 'green' } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ root: { fontSize:32 } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} style={{ color: 'brown' }} />
  <MuiThemeProvider theme={theme}>
    <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  </MuiThemeProvider>
</View>

export default app