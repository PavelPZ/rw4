import React from 'react'
import { Text, Button as NBButton, Fab as NBFab, Icon } from 'native-base'
import { View, Platform, Dimensions, PixelRatio } from 'react-native'

import { getIcon } from '../../app-common/gui/ionic'
import { getColor, getTextColor } from '../../app-common/gui/colors'
import { getBtnTheme } from './theme'

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
  const rounded = mode == GUI.ButtonMode.rounded
  const bordered = mode == GUI.ButtonMode.bordered 
  const iconLeft = !iconRight && true

  //colors
  const btnProps: NativeBase.Button = {
    transparent,
    rounded,
    bordered,
    ...!rounded ? {iconLeft, iconRight} : null
  }
  //const btnStyle = {} as any
  //const colorStyle = {} as any
  if (color == GUI.Colors.primary) btnProps.primary = true
  else if (color == GUI.Colors.secondary) btnProps.danger = true
  else if (color == GUI.Colors.default) btnProps.light = true
  else if (color == GUI.Colors.dark) btnProps.dark = true
  else {
    const classes = getBtnTheme(color, shadow)
    if (transparent) 
      btnProps[classes[Theme.Classes.btnTransparent]] = true
    else if (bordered)
      btnProps[classes[Theme.Classes.btnBordered]] = true
    else 
      btnProps[classes[Theme.Classes.btn]] = true
  }

  const IC = hasIcon && <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} active={iconActive} />
  const TXT = !!label && <Text key={2} >{label}</Text>

  if (fixPosition) {
    return <NBFab position={fixPositions[fixPosition] as any} >
      {IC}
    </NBFab>
  }

  let comps = rounded ? [IC] : (iconRight ? [TXT, IC] : [IC, TXT])

  console.log('btnProps: ', JSON.stringify(btnProps, null, 2))

  return <NBButton {...btnProps} >
    {comps}
  </NBButton>


}


