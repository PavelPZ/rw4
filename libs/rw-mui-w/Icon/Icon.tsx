import React from 'react'

import { expandStyle } from '../styles/styler'
import warning from 'warning'
import Icon, { elementGetter } from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

warning(!elementGetter.get, 'Only single elementGetter assignment allowed!')

elementGetter.get = (name, actStyle) => {
  const { color, fontSize } = actStyle
  const style:any = {}
  style.width = style.height = fontSize
  style.fill = color
  return <SvgIcon style={style}>
    <path d={name} />
  </SvgIcon>
}

export default Icon


//const styles: Mui.StyleRulesCallback<Mui.IIconStyle> = theme => ({
//  root: {},
//  colorAccent: { color: theme.palette.secondary.A200, },
//  colorAction: { color: theme.palette.action.active, },
//  colorContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
//  colorDisabled: { color: theme.palette.action.disabled, },
//  colorError: { color: theme.palette.error[500], },
//  colorPrimary: { color: theme.palette.primary[500], },
//  colorInherit: { color: undefined, },
//})

//const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = props => {
//  return null
//}

//const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

//export default Icon