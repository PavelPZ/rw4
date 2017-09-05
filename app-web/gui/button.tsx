import React from 'react'
import { Button as MDButton, ButtonProps, FixedPositions } from '../lib/react-md'
import { getIcon } from '../../app-common/gui/ionic'
import { getColor, getTextColor } from '../../app-common/gui/colors'
import { renderCSS } from 'web-fela'

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { mode = GUI.ButtonMode.raised, iconName, iconLogo, color = GUI.Colors.primary, label, iconRight, disabled, iconOS, iconActive } = props
  let actMode = mode
  const fixed = 'fixed'
  const isFixed = actMode.startsWith(fixed)

  if ((iconName || iconLogo) && !isFixed && typeof label == 'undefined') actMode = GUI.ButtonMode.icon

  //colors
  const colorProps: ButtonProps = {}
  const colorStyle: CSSProperties = {}
  if (color == GUI.Colors.primary) colorProps.primary = true
  else if (color == GUI.Colors.secondary) colorProps.secondary = true
  else if (color != GUI.Colors.default) {
    if (actMode == GUI.ButtonMode.flat || actMode == GUI.ButtonMode.icon)
      colorStyle.color = getColor(color)
    else {
      colorStyle.backgroundColor = getColor(color)
      colorStyle.color = getTextColor(color)
    }
  }
  //icon
  let iconClassName = getIcon(iconName, iconLogo, iconOS, iconActive)
  if (iconClassName) iconClassName = renderCSS({ fontSize: 24, lineHeight:1 }) + ' icon ion-' + iconClassName
  //fixed
  if (isFixed) {
    const fx = actMode.substr(fixed.length).toLowerCase() as FixedPositions
    return <MDButton floating fixed fixedPosition={fx} {...colorProps} className={renderCSS(colorStyle)} iconClassName={iconClassName} />
  }
  //other
  const mdProps: ButtonProps = {
    flat: actMode == GUI.ButtonMode.flat,
    raised: actMode == GUI.ButtonMode.raised,
    floating: actMode == GUI.ButtonMode.rounded,
    icon: actMode == GUI.ButtonMode.icon,
    label,
    iconBefore: !iconRight,
    disabled,
    ...colorProps,
    iconClassName,
  }
  return <MDButton
    {...mdProps}
    {...colorProps}
    className={renderCSS(colorStyle)}
    iconClassName={iconClassName} 
    onClick={ev => { ev.stopPropagation() }}
  />
}

