//import React from 'react';
//import { Button as MDButton, ButtonProps } from 'react-md'
//import { getColors } from '../../app-common/gui/colors'
////import { colorToStyle } from '../../app-common/gui/gui'
//import { getIcon2 } from '../../app-common/gui/ionic'
//import { renderCSS } from '../lib/fela'
//import { navigateUrl, navigatePush } from '../../app-common/lib/router'

//export const Button: React.SFC<GUI.IButtonProps> = props => {
//  const { flat, light, iconAfter, iconName, dark, success, info, warning, danger, children, color, shadow, bordered, web = {}, webStyle, onPress, href, ...rest } = props
//  const { className = '', onClick: click, ...webRest } = web
//  const { floating, raised, disabled, primary, secondary } = props

//  //color
//  let colorPair: CSSProperties = disabled ? { backgroundColor: 'lightgray', color: 'white' } : getColors(color, shadow) || success && getColors(GUI.Colors.success) || info && getColors(GUI.Colors.info) ||
//    dark && getColors(GUI.Colors.dark) || info && getColors(GUI.Colors.info) || warning && getColors(GUI.Colors.warning) || danger && getColors(GUI.Colors.danger)
//  if (colorPair && (flat || bordered)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor } //background <==> color
//  let style: CSSProperties = { ...colorPair }
//  //pouze ikona pro NON icon buttons
//  const hasChildren = React.Children.count(children) > 0
//  const iconOnly = !floating && !hasChildren
//  //icon
//  let iconClassName = getIcon2(props)
//  if (iconClassName) iconClassName = renderCSS({ fontSize: 24 }) + ' ion ion-' + iconClassName
//  //pouze ikona
//  if (iconOnly && !flat) style = { ...style, minWidth: 50, paddingLeft: 31 }
//  //children
//  const childs = !hasChildren || floating ? '' : children

//  //click
//  let onClick: (event: React.MouseEvent<HTMLElement>) => void
//  if (click) onClick = click
//  else if (onPress || typeof href != 'undefined') onClick = ev => { ev.stopPropagation(); ev.preventDefault(); if (onPress) onPress(); else navigatePush(href) }

//  style = { ...style, ...webStyle }

//  const mdProps: ButtonProps = {
//    ...rest,
//    ...webRest,
//    swapTheming: bordered,
//    iconBefore: !iconAfter,
//    iconClassName,
//    flat: flat && !iconOnly,
//    icon: flat && iconOnly,
//    primary: primary || !light && !dark && !success && !info && !warning && !danger && !color && !secondary, //default is PRIMARY
//    href: !href ? undefined : navigateUrl(href),
//    raised: !flat && !floating || bordered,
//    className: className + ' ' + renderCSS(style),
//    onClick
//  }
//  return <MDButton {...mdProps}>{childs}</MDButton>
//}
////import React from 'react'

////import { getIcon } from '../../app-common/gui/ionic'
////import { getColors, getTextColor } from '../../app-common/gui/colors'
////import { navigateUrl, navigatePush } from '../../app-common/lib/router'

////import { renderCSS } from '../lib/fela'
////import { colorToStyle } from './lib'
////import { Button as MDButton, ButtonProps, FixedPositions } from './react-md'

////export const Button: React.SFC<GUI.IButtonProps> = props => {
////  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary,
////    shadow, label, iconRight, disabled, iconOS, iconActive, href, children, onPress, ...rest } = props
////  let actMode = mode
////  const fixed = 'fixed'
////  const fixPosition = actMode.startsWith(fixed) ? actMode.substr(fixed.length).toLowerCase() as FixedPositions : null
////  //actMode = (iconName || iconLogo) && !fixPosition && typeof label == 'undefined' && React.Children.count(props.children)==0 ? GUI.ButtonMode.icon : actMode
////  const rounded = actMode == GUI.ButtonMode.rounded || actMode == GUI.ButtonMode.roundedMini
////  const press = onPress || (typeof href != 'undefined' ? () => navigatePush(href) : () => { })

////  let classNames = ''
////  if (typeof label == 'undefined' && React.Children.count(props.children) == 0) {
////    classNames = renderCSS({
////      '& .md-icon-text': { display: 'none', } as CSSProperties, //uschovej SPAN s textem
////      '& .md-icon-separator': { justifyContent: 'center' } as CSSProperties, //vycentruj ICON
////    } as any)
////  }

////  //colors
////  const colorProps: ButtonProps = {}
////  const colorStyle: CSSProperties = { textAlign: 'center' } //error for RnButton when HREF is not null
////  if (color == GUI.Colors.primary) colorProps.primary = true
////  else if (color == GUI.Colors.secondary) colorProps.secondary = true
////  else {
////    const colors = getColors(colorToStyle[color] || color, shadow)
////    if (color != GUI.Colors.default) {
////      if (actMode == GUI.ButtonMode.flat) // || actMode == GUI.ButtonMode.icon)
////        colorStyle.color = colors.backgroundColor
////      else {
////        colorStyle.backgroundColor = colors.backgroundColor
////        colorStyle.color = colors.color
////      }
////    }
////  }

////  //icon
////  let iconClassName = getIcon(iconName, iconLogo, iconOS, iconActive)
////  if (iconClassName) iconClassName = renderCSS({ fontSize: 24, lineHeight: 1 }) + ' icon ion-' + iconClassName
////  //fixed
////  if (fixPosition)
////    return <MDButton floating fixed fixedPosition={fixPosition} {...colorProps} className={renderCSS(colorStyle)} iconClassName={iconClassName} />

////  //other
////  const mdProps: ButtonProps = {
////    flat: actMode == GUI.ButtonMode.flat,
////    raised: actMode == GUI.ButtonMode.raised,
////    floating: rounded,
////    icon: actMode == GUI.ButtonMode.icon,
////    mini: actMode == GUI.ButtonMode.roundedMini,
////    iconBefore: !iconRight,
////    disabled,
////    ...colorProps,
////    iconClassName,
////  }
////  return <MDButton
////    {...mdProps}
////    {...colorProps}
////    className={renderCSS(colorStyle) + ' ' + classNames}
////    iconClassName={iconClassName}
////    href={!href ? undefined : navigateUrl(href)}
////    onClick={ev => { ev.preventDefault(); ev.stopPropagation(); press() }}
////  >{label}</MDButton>
////}

