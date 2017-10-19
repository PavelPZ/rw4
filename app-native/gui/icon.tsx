import React from 'react'
import { StyleSheet, TouchableNativeFeedback } from 'react-native'

//D:\rw\rw4\node_modules\react-native-elements\src\icons\Icon.js
////backgroundColor: reverse ? color : raised ? 'white' : 'transparent',
//backgroundColor: reverse ? color : raised ? 'white' : undefined,


import { getIcon2 } from '../../app-common/gui/ionic'
import { Icon as RNEIcon } from 'react-native-elements'
import { getColors2 } from '../../app-common/gui/colors'

export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { iconName, iconOS, style, active, reverse, onPress, disabled } = props
  const colors = getColors2(props, true)
  const rneProps: RNE.IconProps = {
    name: getIcon2(props),
    type: 'ionicon',
    color: colors.color,
    underlayColor: colors.backgroundColor,
    reverseColor: colors.backgroundColor,
    reverse,
    onPress: disabled ? undefined : onPress,
  }
  return <RNEIcon {...rneProps} />
}
