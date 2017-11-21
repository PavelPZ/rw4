//import React from 'react'
//import createMuiTheme, { Theme } from 'material-ui/styles/createMuiTheme'

////import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
////import withStyles, { StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'material-ui/styles/withStyles'
////import { renderCSS } from 'rw-fela-w/index'

////type IStyle = 'red' | 'blue'

//import withStyles, { StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'rw-mui-n/styles/withStyles'
//import MuiThemeProvider from 'rw-mui-n/styles/MuiThemeProvider'

//const renderCSS = <T extends {}>(style: T) => style
//interface IStyle { red: CSSProperties; blue: CSSProperties }

//const styles: StyleRulesCallback<IStyle> = theme => ({
//  red: { color: 'red' },
//  blue: { color: 'blue' },
//})

//const app: React.SFC<WithStyles<IStyle>> = ({ classes: { red, blue }, theme }) => {
//  return <div>
//    <div style={red}>RED TEXT</div>
//    <div style={blue}>BLUE TEXT</div>
//    <div style={{ color: theme.palette.primary[200] }}>PRIMARY TEXT</div>
//    <div style={{ color: theme.palette.secondary[200] }}>SECONDARY TEXT</div>
//  </div>
//}

//const App = withStyles(styles, { withTheme: true })<{}>(app)
//const App2 = withStyles(styles, { withTheme: true, name: 'app-2' })<{}>(app)

//const theme = createMuiTheme()
//const json = JSON.stringify(theme, null, 2)
//debugger
//const theme2 = createMuiTheme({
//  palette: { primary: theme.palette.secondary, secondary: theme.palette.primary }, overrides: {
//    'app-2': {
//      red: { color: 'blue' }
//    }
//  }
//})

//export default () => <MuiThemeProvider theme={theme}>
//  <div>
//    <App2/>
//    <hr />
//    <App classes={{ red: renderCSS({ color: 'maroon' }) }} />
//    <hr />
//    <MuiThemeProvider theme={theme2}>
//      <div>
//        <App2 />
//        <hr />
//        <App classes={{ blue: renderCSS({ color: 'green' }) }} />
//      </div>
//    </MuiThemeProvider>
//  </div>
//</MuiThemeProvider>


//  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold', '&:hover': { background: 'blue' } }) }} />
//  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold' }) }} />
