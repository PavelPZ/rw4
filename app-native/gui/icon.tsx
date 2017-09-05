﻿import React from 'react'
import { getIcon } from '../../app-common/gui/ionic'
import Ionicons from 'react-native-vector-icons/Ionicons'

//export const Icon: React.SFC<GUI.IIconProps> = props => <Ionicons name={getIcon(props.name, props.logoId, props.OS, props.active)} />
export const Icon: React.SFC<GUI.IIconProps> = props => {
  const { name, logoId, OS, ...other } = props
  console.log(getIcon(name, logoId, OS, props.active))
  return <Ionicons name={getIcon(name, logoId, OS, props.active)} {...other}  />
}