import React from 'react'
import { navigatePush } from '../../app-common/lib/router'
import { getIcon2 } from '../../app-common/gui/ionic'
import { getColors2 } from '../../app-common/gui/colors'

import { TouchableNativeFeedback, TouchableHighlight } from 'react-native'
import { Button as RNEButton } from 'react-native-elements'
import { Icon } from './icon'

//D:\rw\rw4\node_modules\react-native-elements\src\buttons\Button.js
////LM
//  //leftIcon: PropTypes.object,
//  //rightIcon: PropTypes.object,
//  //iconRight: PropTypes.object,

////LM
//alignSelf: 'center'



export const Button: React.SFC<GUI.IButtonProps> = props => {
  const { flat: transparent, floating, iconAfter, children, onPress, outline, href, disabled } = props

  //click
  let press = () => { }
  if (onPress) press = onPress; else if (typeof href != 'undefined') press = () => navigatePush(href)
  let title = children && !floating && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
  const iconId = getIcon2(props)

  //if (floating || (!title && iconId && transparent)) {
  //  const iconProps: GUI.IIconProps = { native: { inButton: true }, ...props as any, onPress: press }
  //  return <Icon {...iconProps} reverse={floating} />
  //}

  if (title && window.platform.OS == 'android') title = title.toUpperCase()
  if (!title) title = ''
  let { color, backgroundColor } = getColors2(props)
  if (transparent || outline)[color, backgroundColor] = [backgroundColor, 'transparent']
  const iconProps = iconId && { name: iconId, type: 'ionicon', color }

  const mdProps = {
    onPress,
    ...iconId && (iconAfter ? { rightIcon: iconProps } : { icon: iconProps }),
    disabled,
    color,
    transparent,
    backgroundColor,
    disabledStyle: { backgroundColor },
    title,
    outline,
    borderRadius: floating ? 24 : 2,
    buttonStyle: !title && iconId ? { paddingLeft: 18, paddingRight: 7, } : {},
    containerViewStyle: floating ? { backgroundColor: 'transparent' } : {},
    raised: !transparent && !disabled,
  } as RNE.ButtonProps

  console.log(mdProps)
  return <RNEButton {...mdProps} />
}
