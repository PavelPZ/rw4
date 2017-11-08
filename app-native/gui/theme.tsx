//import React from 'react'
////import { StyleProvider } from 'native-base'
////import getTheme from './theme/components/index'
////import variables, { Palette } from './theme/platform'

////export const Theme: React.SFC<{}> = props => <StyleProvider style={getTheme(variables)}>
////  {React.Children.only(props.children)}
////</StyleProvider>

//export const colorToBsStyle = (color: GUI.Colors, bsStyle: NativeBase.BsStyle) => {
//  bsStyle.success = color == GUI.Colors.success
//  bsStyle.primary = color == GUI.Colors.primary
//  bsStyle.danger = color == GUI.Colors.danger || color == GUI.Colors.secondary
//  bsStyle.warning = color == GUI.Colors.warning
//  bsStyle.info = color == GUI.Colors.info
//  return bsStyle.success || bsStyle.primary || bsStyle.danger || bsStyle.warning || bsStyle.info
//} 

//var variables: any = {}

//export const colorToStyle = {
//  [GUI.Colors.success]: variables.brandSuccess,
//  [GUI.Colors.primary]: variables.brandPrimary,
//  [GUI.Colors.danger]: variables.brandDanger,
//  [GUI.Colors.secondary]: variables.brandDanger,
//  [GUI.Colors.warning]: variables.brandWarning,
//  [GUI.Colors.info]: variables.brandInfo,
//  [GUI.Colors.light]: variables.inverseTextColor,
//  [GUI.Colors.dark]: variables.textColor,
//}