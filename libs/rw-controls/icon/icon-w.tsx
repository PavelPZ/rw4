import React from 'react'
import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

export interface IIconProps {
  n: 
  w: SvgIconProps
  src: IIconSource
}

export interface IIconSource {
  name: string
  path: string
}


const icon: React.SFC<IIconProps> = props => {
  const { src, w } = props
  return <SvgIcon {...w}>
    <path d={src.path} />
  </SvgIcon>
}

export default icon