import React from 'react'

import { classNames, withStyles } from 'rw-mui-w/styles/withStyles'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon' 
export * from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui.CodeSFCWeb<MuiIcon.Shape> = (props => {
  const { classes: { iconClass }, name, style, rest, innerRef } = getClasses<string>(props as Mui.CodeProps<MuiIcon.Shape>)
  return <SvgIcon className={classNames(iconClass)} style={style} ref={div => innerRef && innerRef(div)} {...rest}>
    <path d={name} />
  </SvgIcon>
}) 

const Icon = withStyles<MuiIcon.Shape>(sheet, { name: Mui.Names.Icon })(icon)

export default Icon

