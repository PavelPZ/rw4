import React from 'react';
import { Button as MDButton, ButtonProps } from 'react-md'
import { getColors2 } from '../../app-common/gui/colors'
//import { colorToStyle } from '../../app-common/gui/gui'
import { getIcon2 } from '../../app-common/gui/ionic'
import { renderCSS } from 'rw-mui-w/styles/styler'
import { navigateUrl, navigatePush } from 'rw-router/index'

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { floating, flat, iconAfter, iconName, outline, children, webStyle, web = {}, onPress, href, disabled, ...rest} = props

  const { onClick, className } = web
  let colorPair = getColors2(props)

  //color
  //let colorPair: CSSProperties = disabled ? { backgroundColor: 'lightgray', color: 'white' } : getColors(color, shadow) || success && getColors(GUI.Colors.success) || info && getColors(GUI.Colors.info) ||
  //  dark && getColors(GUI.Colors.dark) || info && getColors(GUI.Colors.info) || warning && getColors(GUI.Colors.warning) || danger && getColors(GUI.Colors.danger)
  if (colorPair && (flat || outline)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor } //background <==> color
  let style: CSSProperties = { ...colorPair }
  //pouze ikona pro NON icon buttons
  const hasChildren = React.Children.count(children) > 0
  const iconOnly = !floating && !hasChildren
  //icon
  let iconClassName = ''//getIcon2(props)
  if (iconClassName) iconClassName = renderCSS({ fontSize: 24 }) + ' ion ion-' + iconClassName
  //pouze ikona
  if (iconOnly && !flat) style = { ...style, minWidth: 50, paddingLeft: 31 }
  //children
  const childs = !hasChildren || floating ? '' : children

  //click
  let click: (event: React.MouseEvent<HTMLElement>) => void
  if (onClick) click = onClick
  else if (onPress || typeof href != 'undefined') click = ev => { ev.stopPropagation(); ev.preventDefault(); if (onPress) onPress(); else navigatePush(href) }

  style = { ...style, ...webStyle }

  const mdProps: ButtonProps = {
    //...rest,
    //...webRest,
    //swapTheming: bordered,
    iconBefore: !iconAfter,
    iconClassName,
    flat: flat && !iconOnly,
    icon: flat && iconOnly,
    floating,
    raised: (!flat && !floating) || outline,
    href: !href ? undefined : navigateUrl(href),
    className: className + ' ' + renderCSS(style),
    onClick: click,
    disabled
  }
  return <MDButton {...mdProps}>{childs}</MDButton>
}
