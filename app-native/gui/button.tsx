import React from 'react'
import { Text, Button as NBButton, Fab as NBFab, Icon } from 'native-base'
import { View, Platform, Dimensions, PixelRatio, ViewStyle } from 'react-native'

import { getIcon } from '../../app-common/gui/ionic'
import { getColors } from '../../app-common/gui/colors'
//import { getBtnTheme } from './theme'

const fixPositions = {
  'tr': 'topRight',
  'tl': 'topLeft',
  'br': 'bottomRight',
  'bl': 'bottomLeft',
}

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary, shadow, label, iconRight, disabled, iconOS, iconActive } = props
  const fixed = 'fixed'
  const fixPosition = mode.startsWith(fixed) ? mode.substr(fixed.length).toLowerCase() : null
  const transparent = mode == GUI.ButtonMode.flat || mode == GUI.ButtonMode.icon
  const hasIcon = iconName || iconLogo
  const rounded = mode == GUI.ButtonMode.rounded || mode == GUI.ButtonMode.roundedMini
  const small = mode == GUI.ButtonMode.roundedMini
  const bordered = mode == GUI.ButtonMode.bordered
  const iconLeft = !iconRight && true

  if (fixPosition) {
    //--- asi neumi styles
    //const colors = getColors(color, shadow)
    //console.log(colors)
    //return <NBFab position={fixPositions[fixPosition] as any} style={{ backgroundColor: colors.color }} active >
    //  <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={{ color: colors.text }} />
    //</NBFab>
    return <NBFab position={fixPositions[fixPosition] as any} active >
      <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
    </NBFab>
  }


  //colors
  const btnProps: NativeBase.Button = {
    transparent,
    rounded,
    bordered,
    small,
    ...!rounded ? { iconLeft, iconRight } : null
  }

  const textStyle: ReactNative.StyleProp<ReactNative.TextStyle> = {}
  const style: ReactNative.ViewStyle = {}

  if (color == GUI.Colors.primary) btnProps.primary = true
  else if (color == GUI.Colors.secondary) btnProps.danger = true
  else if (color == GUI.Colors.default) btnProps.light = true
  else if (color == GUI.Colors.dark) btnProps.dark = true
  else {
    const colors = getColors(color, shadow)
    if (transparent)
      textStyle.color = colors.color
    else if (bordered) {
      textStyle.color = colors.color
      style.borderColor = colors.color
    } else {
      textStyle.color = colors.text
      style.backgroundColor = colors.color
    }

    //const classes = getBtnTheme(color, shadow)
    //if (transparent) 
    //  btnProps[classes[Theme.Classes.btnTransparent]] = true
    //else if (bordered)
    //  btnProps[classes[Theme.Classes.btnBordered]] = true 
    //else 
    //  btnProps[classes[Theme.Classes.btn]] = true
  }

  const IC = hasIcon && <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={textStyle} />
  const TXT = !!label && <Text key={2} style={textStyle} >{label}</Text>

  let comps = rounded ? [IC] : (iconRight ? [TXT, IC] : [IC, TXT])

  return <NBButton {...btnProps} style={style} >
    {comps}
  </NBButton>


}


