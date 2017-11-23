import React from 'react'

//import withStyles from 'rw-mui/styles/withStyles'
//import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

import { expandStyle } from '../styles/styler'
import warning from 'warning'
import Icon, { elementGetter } from 'rw-mui-u/Icon/Icon'

warning(!elementGetter.get, 'Only single elementGetter assignment allowed!')

elementGetter.get = (name, actStyle) => <MIcon name={name} style={expandStyle(actStyle)} />

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

//const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = ({ children, classes, color = 'inherit', style, theme, ...other}) => {

//  const actStyle = {
//    ...classes.root || null,
//    ...(classes[`color${capitalizeFirstLetter(color)}`]) || null,
//    ...(style || null)
//  }

//  //console.log(viewStyle, textStyle)
//  const childs = React.Children.toArray(children)
//  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string needed')
//  const name = childs[0] as string

//  //console.log(name)

//  return <MIcon name={name} style={expandStyle(actStyle)} />
//}

////const x = <Icon children={GUI.mdi_icons.account} />

//const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

//export default Icon

