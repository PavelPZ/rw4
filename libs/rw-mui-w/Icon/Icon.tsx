import React from 'react'

import withStyles from 'rw-mui/styles/withStyles'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const styles: Mui.StyleRulesCallback<Mui.IIconStyle> = theme => ({
  root: {},
  colorAccent: { color: theme.palette.secondary.A200, },
  colorAction: { color: theme.palette.action.active, },
  colorContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
  colorDisabled: { color: theme.palette.action.disabled, },
  colorError: { color: theme.palette.error[500], },
  colorPrimary: { color: theme.palette.primary[500], },
  colorInherit: { color: undefined, },
})

const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = props => {
  return null
}

const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

export default Icon