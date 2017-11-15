import React from 'react'
//import { Icon } from 'react-native-elements'
import { MaterialIcons as Icon } from '@expo/vector-icons'

export interface IIconProps extends Icon.IIconProps {
  n?: RNE.IconProps
}

const icon: React.SFC<IIconProps> = props => {
  console.log(props)
  const { src, color, size } = props
  console.log(Icon)
  return <Icon name={src} size={size} color={color}/>
}

export default icon