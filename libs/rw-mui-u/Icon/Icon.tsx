import React from 'react'

import withStyles from 'rw-mui/styles/withStyles'
import { capitalizeFirstLetter } from 'material-ui/utils/helpers'

import warning from 'warning'

type TElementGetter = { get?: (name: string, actStyle: IconStyle) => JSX.Element }
export const elementGetter: TElementGetter = {}

const styles: Mui.StyleRulesCallback<Mui.IIconStyle> = theme => ({
  root: {},
  colorAccent: { native: { color: theme.palette.secondary.A200 }, web: { fill: theme.palette.secondary.A200 } },
  colorAction: { color: theme.palette.action.active, },
  colorContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
  colorDisabled: { color: theme.palette.action.disabled, },
  colorError: { color: theme.palette.error[500], },
  colorPrimary: { color: theme.palette.primary[500], },
  colorInherit: { color: theme.palette.text.primary, },
})

type IIconProps = Mui.IIconProps & { elementGetter: (name: string, actStyle) => JSX.Element }

const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = ({ children, classes, color = 'inherit', style, theme, ...other }) => {

  const actStyle: IconStyle = {
    ...classes.root || null,
    ...(classes[`color${capitalizeFirstLetter(color)}`]) || null,
    ...(style || null)
  }

  debugger

  if (!actStyle.fontSize) actStyle.fontSize = 24

  //console.log(viewStyle, textStyle)
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string needed')
  const name = childs[0] as string

  //console.log(name)
  return elementGetter.get(name, actStyle)

  //return <MIcon name={name} style={expandStyle(actStyle)} />
}

//const x = <Icon children={GUI.mdi_icons.account} />

const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

export default Icon

