import React from 'react'
import { getIcon } from '../../app-common/gui/ionic'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { name, logoId, OS, ...other } = props
  console.log(JSON.stringify(other,null,2))
  //console.log(getIcon(name, logoId, OS, props.active))
  return <Ionicons name={getIcon(name, logoId, OS, props.active)} {...other}  />
}