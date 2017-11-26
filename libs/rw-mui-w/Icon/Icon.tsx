import React from 'react'

import { classNames, withStyles } from 'rw-mui-w/styles/withStyles'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui2.CodeSFC<Mui2.IIconProps, Mui2.IIconSheet> = (props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<string>(props)
  return <SvgIcon className={classNames(iconClass)} style={style} {...rest}>
    <path d={name} />
  </SvgIcon>
}) 

const Icon = withStyles<Mui2.IIconSheet>(sheet, { name: Mui2.Names.Icon })<Mui2.IIconProps>(icon)

export default Icon

