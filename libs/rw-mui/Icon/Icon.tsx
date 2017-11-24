import React from 'react'

import withStyles from 'rw-mui-n/styles/withStyles'
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

import { expandStyle } from 'rw-mui/styles/styler'
import { classNames } from 'rw-mui-n/styles/styler'
import { getClasses, styles } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

const icon: Mui.SFC<Mui.IIconProps, Mui.IIconStyle> = props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<CSS.RNIconStyle>(props)
  return <MIcon name={name} style={classNames(iconClass, style)} {...rest} />
}

const Icon = withStyles(styles, { name: Mui.Names.Icon })<Mui.IIconProps>(icon)

export default Icon
