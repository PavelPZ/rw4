import React from 'react'
import { navigatePush } from 'rw-router/index'
//import { getIcon2 } from '../../app-common/gui/ionic'
import { getColors2 } from '../../app-common/gui/colors'

import { Button as RNEButton } from 'react-native-elements'
//import { Icon } from './other'

//D:\rw\rw4\node_modules\react-native-elements\src\buttons\Button.js
////LM
//  //leftIcon: PropTypes.object,
//  //rightIcon: PropTypes.object,
//  //iconRight: PropTypes.object,

export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { flat: transparent, floating, iconAfter, children, onPress, outline, href, disabled, iconName } = props

  //click
  let press = () => { }
  if (onPress) press = onPress; else if (typeof href != 'undefined') press = () => navigatePush(href)
  let title = children && !floating && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
  //const iconId = getIcon2(props)

  if (title && window.platform.OS == 'android') title = title.toUpperCase()
  if (!title) title = ''
  let { color, backgroundColor } = getColors2(props)
  if (transparent || outline)[color, backgroundColor] = [backgroundColor, 'transparent']
  const iconProps: RNE.IconObject = iconName && { name: iconName, color }

  const mdProps = {
    onPress: press,
    ...iconName && (iconAfter ? { rightIcon: iconProps } : { icon: iconProps }),
    disabled,
    color,
    transparent,
    backgroundColor,
    disabledStyle: { backgroundColor },
    title,
    outline,
    borderRadius: floating ? 24 : 2,
    buttonStyle: !title && iconName ? { paddingLeft: 18, paddingRight: 7, } : {}, //aby ikona bez textu byla uprostred buttonu nebo outlined buttonu
    containerViewStyle: floating ? { backgroundColor: 'transparent', alignSelf: 'center' } : { alignSelf: 'center'},
    raised: !transparent && !disabled,
  } as RNE.ButtonProps

  //console.log(mdProps)
  return <RNEButton {...mdProps} />
}
