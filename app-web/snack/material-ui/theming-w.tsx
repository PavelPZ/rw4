import React from 'react'
import Button from 'material-ui/Button/Button'
import { Theme } from 'material-ui/styles/createMuiTheme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import withStyles, { StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'material-ui/styles/withStyles'
import { renderCSS } from 'rw-fela-w/index'

//import withStyles, { StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'rw-mui-n/styles/withStyles'
//import MuiThemeProvider from 'rw-mui-n/styles/MuiThemeProvider'
//const renderCSS = <T>(style:T) => style


//interface IStyle { red: RN.TextStyle blue: RN.TextStyle }

type IStyle = 'red' | 'blue'

const styles: StyleRulesCallback<IStyle> = theme => ({
  red: { color: 'red'},
  blue: { color: 'blue' },
})

const buttonStyles = (theme: Theme) => ({
  root: renderCSS({
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: theme.shadows[20]
  }),
  label: renderCSS({
    textTransform: 'capitalize',
  }),
})


const app: React.SFC<WithStyles<IStyle>> = ({ classes: { red, blue }, theme }) => {
  return <div>
    <Button raised color={'accent'} classes={buttonStyles(theme)}>Button</Button>
    <div className={red}>RED TEXT: {red}</div>
    <div className={blue}>BLUE TEXT: {blue}</div>
  </div>
}

const App = withStyles(styles, { withTheme: true })<{}>(app)

export default () => <MuiThemeProvider theme={{}}>
  <div>
    <App classes={{ red: renderCSS({ color: 'maroon' }) }} />
    <App classes={{ blue: renderCSS({ color: 'green' }) }} />
  </div>
</MuiThemeProvider>


  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold', '&:hover': { background: 'blue' } }) }} />
  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold' }) }} />
