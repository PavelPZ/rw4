import React from 'react'
import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

export interface IIconProps extends React.Attributes {
  style?: RN.TextStyle
  w?: SvgIconProps
  src: GUI.mdi_icons
  color?: string
  size?: number
}

const icon: React.SFC<IIconProps> = props => {
  const { src, w = {}, color, size } = props
  if (!w.style) w.style = {}
  if (size) {
    //w.viewBox = `0 0 1 1`
    //w.viewBox = `0 0 ${size} ${size}`
    w.style.width = w.style.height = size
  }
  if (color) w.style.fill = color
  return <SvgIcon {...w}>
    <path d={src} />
  </SvgIcon>
}

export default icon