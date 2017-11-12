import React from 'react'
import { Theme } from 'material-ui/styles/createMuiTheme'
import PropTypes from 'prop-types'

export interface IMuiThemeProps { theme: Theme }

class MuiThemeProvider extends React.Component<IMuiThemeProps> {
  constructor(props, context: IMuiThemeProps) {
    super(props, context)
    this.localTheme = this.mergeOuterLocalTheme(context.theme)
  }

  localTheme:Theme

  getChildContext(): IMuiThemeProps {
    return { theme: this.localTheme }
  }

  mergeOuterLocalTheme(outerTheme: Theme) {
    const { props: { theme } } = this
    if (typeof theme === 'function') return theme(outerTheme)
    if (!outerTheme) return theme
    return { ...outerTheme, ...theme };
  }
  static childContextTypes = { theme: PropTypes.any }
  static contextTypes = { theme: PropTypes.any }
}

export default MuiThemeProvider