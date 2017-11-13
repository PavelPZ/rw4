import React from 'react'
import { Theme } from './createMuiTheme'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

export interface IMuiThemeProps { theme: Theme }
export type TMuiThemeContextValue = IMuiThemeProps
export const MuiThemeContextTypes = { theme: PropTypes.any }

class MuiThemeProvider extends React.Component<IMuiThemeProps> {
  constructor(props, context: TMuiThemeContextValue) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme:Theme

  getChildContext(): TMuiThemeContextValue {
    return { theme: this.localTheme }
  }

  mergeOuterLocalTheme(outerTheme: Theme) {
    const { props: { theme } } = this
    if (typeof theme === 'function') return theme(outerTheme)
    if (!outerTheme) return theme
    return { ...outerTheme, ...theme };
  }

  render() { return React.Children.only(this.props.children) }

  static childContextTypes = MuiThemeContextTypes
  static contextTypes = MuiThemeContextTypes
}

export default pure(MuiThemeProvider)