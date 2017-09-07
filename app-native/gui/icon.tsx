import React from 'react'
import { getIcon } from '../../app-common/gui/ionic'
import { Icon as NbIcon } from 'native-base'
import { fillColorToStyle } from '../../app-common/gui/colors'

export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { name, logoId, OS, color, shadow, style, ...other } = props
  const st: any = { ...style}
  fillColorToStyle(color, st, shadow)
  return <NbIcon name={getIcon(name, logoId, OS, props.active)} {...other} style={st}/>
}