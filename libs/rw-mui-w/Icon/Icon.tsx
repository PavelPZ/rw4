import React from 'react'

import withStyles from 'rw-mui-w/styles/withStyles'
import { classNames } from 'rw-mui-w/styles/styler'
import { getClasses, styles } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = (props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<string>(props)
  return <SvgIcon className={classNames(iconClass)} style={style} {...rest}>
    <path d={name} />
  </SvgIcon>
}) //as any as React.ComponentType<Mui.IIconProps & Mui.WithStyles<Mui.IIconStyle>>

const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

export default Icon

