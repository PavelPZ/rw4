﻿import React from 'react'

import { classNames, withStyles } from 'rw-mui-w/styles/withStyles'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui.CodeSFC<MuiIcon.IProps, MuiIcon.ISheet> = (props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<string>(props)
  return <SvgIcon className={classNames(iconClass)} style={style} {...rest}>
    <path d={name} />
  </SvgIcon>
}) 

const Icon = withStyles<MuiIcon.ISheet>(sheet, { name: Mui.Names.Icon })<MuiIcon.IProps>(icon)

export default Icon

