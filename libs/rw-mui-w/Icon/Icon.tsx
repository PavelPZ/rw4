import React from 'react'

import { withStyles } from 'rw-mui-w/styles/withStyles2'
import { classNames } from 'rw-mui-w/styles/styler'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui2.SFC<Mui2.IIconPropsCode, Mui2.IIconSheet> = (props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<string>(props)
  return <SvgIcon className={classNames(iconClass)} style={style} {...rest}>
    <path d={name} />
  </SvgIcon>
}) //as any as React.ComponentType<Mui.IIconProps & Mui.WithStyles<Mui.IIconStyle>>

type PlatformSheetWeb<R extends Mui2.TypedSheet> = {[P in keyof R]: Mui2.WebCSS}
//const iconSheet = styles as PlatformSheetWeb<Mui2.IIconSheet>
//iconSheet.colorAccent

const Icon = withStyles(sheet, { name: Mui.Names.Icon })(icon)

export default Icon

