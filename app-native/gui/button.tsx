import React from 'react'
import { Text, Button as NBButton, Fab as NBFab, Icon } from 'native-base'
import { View, Platform, Dimensions, PixelRatio, ViewStyle } from 'react-native'

import { navigateUrl, navigatePush } from '../../app-common/lib/router'
import { getIcon } from '../../app-common/gui/ionic'
import { getColors } from '../../app-common/gui/colors'
import { colorToBsStyle } from './theme'

const fixPositions = {
  'tr': 'topRight',
  'tl': 'topLeft',
  'br': 'bottomRight',
  'bl': 'bottomLeft',
}

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary,
    shadow, label, iconRight, disabled, iconOS, iconActive, href, children, onPress, ...rest } = props
  const actMode = mode
  const fixed = 'fixed'
  const fixPosition = actMode.startsWith(fixed) ? fixPositions[actMode.substr(fixed.length).toLowerCase()] : null
  const transparent = actMode == GUI.ButtonMode.flat
  const hasIcon = iconName || iconLogo
  const rounded = actMode == GUI.ButtonMode.rounded || actMode == GUI.ButtonMode.roundedMini
  const small = actMode == GUI.ButtonMode.roundedMini
  const bordered = actMode == GUI.ButtonMode.bordered
  const iconLeft = iconRight && undefined
  const press = onPress || (typeof href != 'undefined' ? () => navigatePush(href) : undefined)

  if (fixPosition) {
    //--- asi neumi styles
    //const colors = getColors(color, shadow)
    //console.log(colors)
    //return <NBFab position={fixPositions[fixPosition] as any} style={{ backgroundColor: colors.color }} active >
    //  <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={{ color: colors.text }} />
    //</NBFab>
    return <NBFab position={fixPosition} active onPress={press}>
      <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
    </NBFab>
  }


  //colors
  const btnProps: NativeBase.Button = {
    ...rest,
    transparent,
    rounded,
    bordered,
    small,
    disabled,
    onPress: press,
    ...!rounded ? { iconLeft, iconRight } : null
  }

  const textStyle: ReactNative.StyleProp<ReactNative.TextStyle> = {}
  const style: ReactNative.ViewStyle = {}

  if (!colorToBsStyle(color, btnProps)) {
    if (color == GUI.Colors.default) btnProps.light = true
    else if (color == GUI.Colors.dark) btnProps.dark = true 
    else {
      const colors = getColors(color, shadow)
      if (transparent)
        textStyle.color = colors.background
      else if (bordered) {
        textStyle.color = colors.background
        style.borderColor = colors.background
      } else {
        textStyle.color = colors.text
        style.backgroundColor = colors.background
      }
    }
  }

  const IC = hasIcon && <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={textStyle} />
  const TXT = !!label && <Text key={2} style={textStyle} >{label}</Text>

  let comps = rounded ? [IC] : (iconRight ? [TXT, IC] : [IC, TXT])

  //console.log(btnProps, '\r\n', style)

  return <NBButton {...btnProps} style={style} >
    {comps}
  </NBButton>


}


