﻿import React from 'react'

import { getIcon } from '../../app-common/gui/ionic'
import { getColors, getTextColor } from '../../app-common/gui/colors'
import { navigateUrl, navigatePush } from '../../app-common/lib/router'

import { renderCSS } from '../lib/fela'
import { colorToStyle } from './lib'
import { Button as MDButton, ButtonProps, FixedPositions } from './react-md'


export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary,
    shadow, label, iconRight, disabled, iconOS, iconActive, href, children, onPress, ...rest } = props
  let actMode = mode
  const fixed = 'fixed'
  const fixPosition = actMode.startsWith(fixed) ? actMode.substr(fixed.length).toLowerCase() as FixedPositions : null
  //actMode = (iconName || iconLogo) && !fixPosition && typeof label == 'undefined' && React.Children.count(props.children)==0 ? GUI.ButtonMode.icon : actMode
  const rounded = actMode == GUI.ButtonMode.rounded || actMode == GUI.ButtonMode.roundedMini
  const press = onPress || (typeof href != 'undefined' ? () => navigatePush(href) : () => { })

  let classNames = ''
  if (typeof label == 'undefined' && React.Children.count(props.children) == 0) {
    classNames = renderCSS({
      '& .md-icon-text': { display: 'none', } as CSSProperties, //uschovej SPAN s textem
      '& .md-icon-separator': { justifyContent: 'center' } as CSSProperties, //vycentruj ICON
    } as any)
  }

  //colors
  const colorProps: ButtonProps = {}
  const colorStyle: CSSProperties = { textAlign: 'center' } //error for RnButton when HREF is not null
  if (color == GUI.Colors.primary) colorProps.primary = true
  else if (color == GUI.Colors.secondary) colorProps.secondary = true
  else {
    const colors = getColors(colorToStyle[color] || color, shadow)
    if (color != GUI.Colors.default) {
      if (actMode == GUI.ButtonMode.flat) // || actMode == GUI.ButtonMode.icon)
        colorStyle.color = colors.background
      else {
        colorStyle.backgroundColor = colors.background
        colorStyle.color = colors.text
      }
    }
  }

  //icon
  let iconClassName = getIcon(iconName, iconLogo, iconOS, iconActive)
  if (iconClassName) iconClassName = renderCSS({ fontSize: 24, lineHeight: 1 }) + ' icon ion-' + iconClassName
  //fixed
  if (fixPosition)
    return <MDButton floating fixed fixedPosition={fixPosition} {...colorProps} className={renderCSS(colorStyle)} iconClassName={iconClassName} />

  //other
  const mdProps: ButtonProps = {
    flat: actMode == GUI.ButtonMode.flat,
    raised: actMode == GUI.ButtonMode.raised,
    floating: rounded,
    icon: actMode == GUI.ButtonMode.icon,
    mini: actMode == GUI.ButtonMode.roundedMini,
    iconBefore: !iconRight,
    disabled,
    ...colorProps,
    iconClassName,
  }
  return <MDButton
    {...mdProps}
    {...colorProps}
    className={renderCSS(colorStyle) + ' ' + classNames}
    iconClassName={iconClassName}
    href={!href ? undefined : navigateUrl(href)}
    onClick={ev => { ev.preventDefault(); ev.stopPropagation(); press() }}
  >{label}</MDButton>
}

