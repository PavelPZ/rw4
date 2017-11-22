import React from 'react'

import withStyles from 'rw-mui/styles/withStyles'
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'
import { capitalizeFirstLetter } from 'material-ui/utils/helpers'

import { styleNative } from 'rw-styler/index'

import warning from 'warning'

import { PropTypes } from '../index'

export type Color = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

export type IconClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

export interface IIconProps {
  color?: Color
  children?: GUI.mdi_icons
  style?: TextStyle
}

export type IIconStyle = Record<IconClassKey, TextStyle>

const styles: Mui.StyleRulesCallback<IIconStyle> = theme => ({
  root: {},
  colorAccent: { color: theme.palette.secondary.A200, },
  colorAction: { color: theme.palette.action.active, },
  colorContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
  colorDisabled: { color: theme.palette.action.disabled, },
  colorError: { color: theme.palette.error[500], },
  colorPrimary: { color: theme.palette.primary[500], },
  colorInherit: { color: undefined, },
})

const icon: React.SFC<IIconProps & Mui.WithStyles<IIconStyle>> = props => {
  const {
    children,
    classes,
    color = 'inherit',
    style,
    theme,
    ...other
  } = props;

  const actStyle = {
    ...classes.root || null,
    ...(classes[`color${capitalizeFirstLetter(color)}`]) || null,
    ...(style || null)
  }

  //console.log(viewStyle, textStyle)
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string needed')
  const name = childs[0] as string

  console.log(name)

  return <MIcon name={name} style={styleNative(actStyle, theme.OS)} />
}

export const IconName = 'MuiIcon-n'

const Icon = withStyles(styles, { name: IconName })<IIconProps, TextStyle>(icon)

//const x = <Icon children={GUI.mdi_icons.account} />

export default Icon