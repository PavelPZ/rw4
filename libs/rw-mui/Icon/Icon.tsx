import React from 'react'

import { withStyles } from 'rw-mui-n/styles/withStyles2'
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

import { expandStyle } from 'rw-mui/styles/styler'
import { classNames } from 'rw-mui-n/styles/styler'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

const icon: Mui2.SFC<Mui2.IIconPropsCode, Mui2.IIconSheet> = props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<CSS.RNIconStyle>(props)
  return <MIcon name={name} style={classNames(iconClass, style)} {...rest} />
}

const Icon = withStyles(sheet, { name: Mui.Names.Icon })<Mui2.IIconProps>(icon)

export default Icon
