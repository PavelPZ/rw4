import React from 'react'
import { getIcon } from '../../app-common/gui/ionic'
import { Icon as NbIcon } from 'native-base'
import { getColor } from '../../app-common/gui/colors'
import { colorToStyle } from '../../app-native/gui/theme'

export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { name, logoId, OS, color, shadow, style, ...other } = props
  const st: any = { ...style}
  colorToStyle(color, st, shadow)
  return <NbIcon name={getIcon(name, logoId, OS, props.active)} {...other} style={st}/>
}