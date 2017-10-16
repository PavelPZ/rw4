import React from 'react'
import { Text, Button as NBButton, Fab as NBFab, Icon } from 'native-base'
import { View, Platform, Dimensions, PixelRatio, ViewStyle } from 'react-native'

import { navigatePush } from '../../app-common/lib/router'
import { getIcon2 } from '../../app-common/gui/ionic'
import { getColors } from '../../app-common/gui/colors'
import { colorToBsStyle } from './theme'

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { flat, floating, raised, active, iconAfter, iconName, children, color, shadow, secondary, web, onPress: press, href, light, ...rest } = props
  const { primary, dark, success, info, warning, danger, bordered, disabled } = props

  //CUSTOM color
  let colorPair = disabled ? { backgroundColor: 'lightgray', color: 'white' } : getColors(color, shadow)
  if (colorPair && (flat || bordered)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor } //invert colors for flat and bordered
  const textStyle: ReactNative.StyleProp<ReactNative.TextStyle> = colorPair ? { color: colorPair.color } : {} //set color to text
  const colorStyle: ReactNative.ViewStyle = colorPair && !bordered ? { backgroundColor: colorPair.backgroundColor } : {} //set color to background
  if (colorPair && bordered) colorStyle.borderColor = colorPair.color //set color to border

  //floating
  const floatingStyle: ReactNative.ViewStyle = floating && { width: floatingSize, height: floatingSize, borderRadius: floatingSize / 2, justifyContent: 'center', alignItems: 'center' }
  const floatingIconStyle: ReactNative.TextStyle = floating && { marginLeft: 0, marginRight: 0 }

  //CHILDREN
  const iconId = getIcon2(iconName)
  const IC = iconId && <Icon key={1} name={iconId} style={[textStyle, floatingIconStyle]} />
  const text = children && !floating && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
  const TXT = text && <Text key={2} style={textStyle}>{text}</Text>
  let comps = iconAfter ? [TXT, IC] : [IC, TXT] //CHILDREN order

  //click
  let onPress = () => { }
  if (press) onPress = press; else if (typeof href != 'undefined') onPress = () => navigatePush(href)

  const mdProps: NativeBase.Button = {
    style: [colorStyle, floatingStyle] as any,
    primary: primary || !light && !dark && !success && !info && !warning && !danger && !color && !secondary, //default is PRIMARY
    danger: danger || secondary || false,
    transparent: flat || false,
    onPress,
    ...rest,
    ...raised || flat ? (iconAfter ? { iconRight: true } : { iconLeft: true }) : undefined,
  }

  //console.log(mdProps, textStyle, floatingStyle, floatingIconStyle)
  return <NBButton {...mdProps}>{comps}</NBButton>
}
const floatingSize = 52


//const fixPositions = {
//  'tr': 'topRight',
//  'tl': 'topLeft',
//  'br': 'bottomRight',
//  'bl': 'bottomLeft',
//}

//export const Button: React.SFC<GUI.IButtonProps> = props => {
//  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary,
//    shadow, label, iconRight, disabled, iconOS, iconActive, href, children, onPress, ...rest } = props
//  const actMode = mode
//  const fixed = 'fixed'
//  const fixPosition = actMode.startsWith(fixed) ? fixPositions[actMode.substr(fixed.length).toLowerCase()] : null
//  const transparent = actMode == GUI.ButtonMode.flat
//  const hasIcon = iconName || iconLogo
//  const rounded = actMode == GUI.ButtonMode.rounded || actMode == GUI.ButtonMode.roundedMini
//  const small = actMode == GUI.ButtonMode.roundedMini
//  const bordered = actMode == GUI.ButtonMode.bordered
//  const iconLeft = iconRight && undefined
//  const press = onPress || (typeof href != 'undefined' ? () => navigatePush(href) : undefined)

//  if (fixPosition) {
//    //--- asi neumi styles
//    //const colors = getColors(color, shadow)
//    //console.log(colors)
//    //return <NBFab position={fixPositions[fixPosition] as any} style={{ backgroundColor: colors.color }} active >
//    //  <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={{ color: colors.text }} />
//    //</NBFab>
//    return <NBFab position={fixPosition} active onPress={press}>
//      <Icon name={getIcon(iconName, iconLogo, iconOS, iconActive)} />
//    </NBFab>
//  }


//  //colors
//  const btnProps: NativeBase.Button = {
//    ...rest,
//    transparent,
//    rounded,
//    bordered,
//    small,
//    disabled,
//    onPress: press,
//    ...!rounded ? { iconLeft, iconRight } : null
//  }

//  const textStyle: ReactNative.StyleProp<ReactNative.TextStyle> = {}
//  const style: ReactNative.ViewStyle = {}

//  if (!colorToBsStyle(color, btnProps)) {
//    if (color == GUI.Colors.default) btnProps.light = true
//    else if (color == GUI.Colors.dark) btnProps.dark = true 
//    else {
//      const colors = getColors(color, shadow)
//      if (transparent)
//        textStyle.color = colors.backgroundColor
//      else if (bordered) {
//        textStyle.color = colors.backgroundColor
//        style.borderColor = colors.backgroundColor
//      } else {
//        textStyle.color = colors.color
//        style.backgroundColor = colors.backgroundColor
//      }
//    }
//  }

//  const IC = hasIcon && <Icon key={1} name={getIcon(iconName, iconLogo, iconOS, iconActive)} style={textStyle} />
//  const TXT = !!label && <Text key={2} style={textStyle} >{label}</Text>

//  let comps = rounded ? [IC] : (iconRight ? [TXT, IC] : [IC, TXT])

//  //console.log(btnProps, '\r\n', style)

//  return <NBButton {...btnProps} style={style} >
//    {comps}
//  </NBButton>


//}


