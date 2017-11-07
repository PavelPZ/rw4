//import React from 'react'
////import { Button as NBButton, Icon } from 'native-base'
//import { Button as NBButton } from 'react-native'
//import { createIconSet } from 'react-native-vector-icons'
//import { Text, View, Platform, Dimensions, PixelRatio, ViewStyle } from 'react-native'

//import { navigatePush } from 'rw-router/index'
//import { getIcon } from '../../app-common/gui/ionic'
//import { getColors } from '../../app-common/gui/colors'
//import { colorToBsStyle } from './theme'

//export const Button: React.SFC<GUI.IButtonProps> = props => {
//  const { flat, floating, active, iconAfter, iconName, children, color, shadow, secondary, web, onPress: press, href, light, webStyle, ...rest } = props
//  const { primary, dark, success, info, warning, danger, disabled } = props
//  const bordered = false

//  //CUSTOM color
//  let colorPair = disabled ? { backgroundColor: 'lightgray', color: 'white' } : getColors(color, shadow)
//  if (colorPair && (flat || bordered)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor } //invert colors for flat and bordered
//  const textStyle: RN.StyleProp<RN.TextStyle> = colorPair ? { color: colorPair.color } : {} //set color to text
//  const colorStyle: RN.ViewStyle = colorPair && !bordered ? { backgroundColor: colorPair.backgroundColor } : {} //set color to background
//  if (colorPair && bordered) colorStyle.borderColor = colorPair.color //set color to border

//  //floating
//  const floatingStyle: RN.ViewStyle = floating && { width: floatingSize, height: floatingSize, borderRadius: floatingSize / 2, justifyContent: 'center', alignItems: 'center' }
//  const floatingIconStyle: RN.TextStyle = floating && { marginLeft: 0, marginRight: 0 }

//  //CHILDREN
//  const iconId = getIcon(iconName)
//  const IC = null //iconId && <Icon key={1} name={iconId} style={[textStyle, floatingIconStyle]} />
//  const text = children && !floating && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
//  const TXT = text && <Text key={2} style={textStyle}>{text}</Text>
//  let comps = iconAfter ? [TXT, IC] : [IC, TXT] //CHILDREN order

//  //click
//  let onPress = () => { }
//  if (press) onPress = press; else if (typeof href != 'undefined') onPress = () => navigatePush(href)

//  console.log('BUTTON.href: ', href)

//  const mdProps: NativeBase.Button = {
//    style: [colorStyle, floatingStyle] as any,
//    primary: primary || !light && !dark && !success && !info && !warning && !danger && !color && !secondary, //default is PRIMARY
//    danger: danger || secondary || false,
//    transparent: flat || false,
//    onPress,
//    //...rest,
//    //...raised || flat ? (iconAfter ? { iconRight: true } : { iconLeft: true }) : undefined,
//  }

//  //IC && console.log(mdProps)
//  return <NBButton title={text} onPress={onPress}/>// {...mdProps}>{comps}</NBButton>
//}
//const floatingSize = 52
