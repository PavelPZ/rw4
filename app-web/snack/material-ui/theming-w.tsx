import React from 'react'
import Button from 'rw-mui/Button/Button'

import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'
import withStyles from 'rw-mui/styles/withStyles'

type IStyle = 'red' | 'blue'
type IStyles = Record<IStyle, TextStyle>

const styles: Mui.StyleRulesCallback<IStyles> = theme => ({
  red: { color: 'red' },
  blue: { color: 'blue' },
})

const buttonStyles: Mui.StyleRulesCallback<Mui.IButtonStyle> = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: theme.shadows[20]
  },
  rootLabel: {
    web: { textTransform: 'capitalize' },
  },
})


const app: React.SFC<Mui.WithStyles<IStyles>> = ({ classes: { red, blue }, theme }) => {
  return <div>
    <Button raised color={'accent'} classes={buttonStyles(theme)} onClick={null}>Button</Button>
    <div style={red}>RED TEXT: {red}</div>
    <div style={blue}>BLUE TEXT: {blue}</div>
  </div>
}

const App = withStyles(styles, { withTheme: true })<{}, TextStyle>(app)

export default () => <div>
  <App classes={{ red: { color: 'maroon' } }} />
  <App classes={{ blue: { color: 'green' } }} />
</div>


  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold', '&:hover': { background: 'blue' } }) }} />
  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold' }) }} />
