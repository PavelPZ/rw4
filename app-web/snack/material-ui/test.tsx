import React from 'react'
import Button from 'material-ui/Button/Button'
import { Theme } from 'material-ui/styles/createMuiTheme'
import { withStyles, StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'material-ui/styles'
import { FelaLike } from 'rw-utils/fela-like-w'
import { renderCSS } from 'rw-fela-w/index'

type ClassKey = 'red' | 'blue'

const styles: StyleRulesCallback<ClassKey> = theme => ({
  red: { color: 'red' },
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


const app: React.SFC<WithStyles<ClassKey>> = ({ classes: { red, blue }, theme }) => {
  return <div>
    <Button raised color={'accent'} classes={buttonStyles(theme)}>Button</Button>
    <div className={red}>RED TEXT: {red}</div>
    <div className={blue}>BLUE TEXT: {blue}</div>
  </div>
}

const App = withStyles(styles, { withTheme: true })<{}>(app)

export default () => <FelaLike>
  <div>
    <App classes={{ red: renderCSS({ color: 'maroon' }) }} />
    <App classes={{ blue: renderCSS({ color: 'green' }) }} />
  </div>
</FelaLike>


  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold', '&:hover': { background: 'blue' } }) }} />
  //<App classes={{ red: renderCSS({ color: 'maroon', fontWeight: 'bold' }) }} />
