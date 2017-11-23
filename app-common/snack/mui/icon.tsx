import React from 'react'
import Icon from 'rw-mui/Icon/Icon'
import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'
import createMuiTheme from 'rw-mui/styles/createMuiTheme'
import color from 'material-ui/colors/orange'

import Cancel from 'material-ui/svg-icons/Cancel'

const app2: React.SFC = props => <div>
  <h1><span style={{ display: 'inline-block', verticalAlign: 'middle' }}><Cancel style={{ height: '1em', width: '1em', }} /></span>Xxxx</h1>
  <h2><Cancel style={{ height: '1em', width: '1em', display: 'inline-block', verticalAlign: 'middle' }} />Xxxxx</h2> 
  <h3><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h3>
  <h4><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h4>
</div>


const theme = createMuiTheme({
  overrides: {
    [Mui.Names.Icon]: {
      colorInherit: { color: color[500] }
    }
  }
})

const app: React.SFC = props => <div style={{ marginTop: 24 }}>
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='inherit' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='accent' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='action' />
  <div style={{ backgroundColor: 'darkgray', padding:5 }}>
    <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='contrast' />
  </div>
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='disabled' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='error' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} color='primary' />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ colorInherit: { color: 'green' } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} classes={{ root: { fontSize:24 } }} />
  <Icon children={GUI.mdi_icons.arrowDownBoldBox} style={{ color: 'brown' }} />
  <MuiThemeProvider theme={theme}>
    <Icon children={GUI.mdi_icons.arrowDownBoldBox} />
  </MuiThemeProvider>
</div>

//export default app
export default app2