import React from 'react'
import { Icon } from 'react-native-elements'

export interface IIconProps extends Icon.IIconProps {
  n?: RNE.IconProps
}

const icon: React.SFC<IIconProps> = props => {
  const { src, n = {}, color, size } = props
  n.type = 'material-community'
  if (color) n.color = color
  if (size) n.size = size
  return <Icon {...n}>{src}</Icon>
}

export default icon