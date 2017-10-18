import React from 'react'
import { StyleSheet } from 'react-native'

//D:\rw\rw4\node_modules\react-native-elements\src\icons\Icon.js
////backgroundColor: reverse ? color : raised ? 'white' : 'transparent',
//backgroundColor: reverse ? color : raised ? 'white' : undefined,


import { getIcon } from '../../app-common/gui/ionic'
import { Icon as RNEIcon } from 'react-native-elements'
import { getColors2 } from '../../app-common/gui/colors'

export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { name, OS, style, active, reverse, onPress, native } = props
  const colors = getColors2(props, true)
  const rneProps: RNE.IconProps = {
    name: getIcon(name, OS, active),
    type: 'ionicon',
    color: colors.color,
    underlayColor: colors.backgroundColor,
    reverseColor: colors.backgroundColor,
    reverse,
    ...native,
    onPress,
  }
  //console.log(rneProps)
  return <RNEIcon {...rneProps} />
}
