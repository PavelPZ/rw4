import React from 'react'
import Icon, { iconColor, iconSize } from 'rw-mui/Icon/Icon'
import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'
import createMuiTheme from 'rw-mui/styles/createMuiTheme'
import color from 'material-ui/colors/orange'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

import { FelaLike } from 'rw-mui-w/styles/withStyles'

import Cancel from 'material-ui/svg-icons/Cancel'

const app2: React.SFC = props => <div>
  <h1><span style={{ display: 'inline-block', verticalAlign: 'middle' }}><Cancel style={{ height: '1em', width: '1em', }} /></span>Xxxx</h1>
  <h2><Cancel style={{ height: '1em', width: '1em', display: 'inline-block', verticalAlign: 'middle' }} />Xxxxx</h2>
  <h3><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h3>
  <h4><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h4>
</div>


const theme = createMuiTheme({
  overrides: {
    [Mui2.Names.Icon]: {
      colorInherit: iconColor(color[500]),
    } as Mui2.Sheet<Mui2.IIconSheet>
  }
})

const app: React.SFC = props =>
  <FelaLike>
    <div style={{ marginTop: 24 }}>
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='inherit' />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='accent' />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='action' />
      <div style={{ backgroundColor: 'darkgray', padding: 5 }}>
        <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='contrast' />
      </div>
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='disabled' />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='error' />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='primary' />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} style={iconColor('brown')} />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ colorInherit: iconColor('green') }} />
      <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ root: iconSize(32) }} />
      <MuiThemeProvider theme={theme}>
        <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
      </MuiThemeProvider>
    </div>
  </FelaLike>

export default app
//export default app2