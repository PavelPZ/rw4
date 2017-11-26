import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { toPlatformSheet } from 'rw-mui/styles/withStyles'
import { toRule } from 'rw-mui/styles/withStyles'

import warning from 'warning'

export const iconColor = (color: string) => ({ native: { color }, web: { fill: color } } as IconStyle)
export const iconSize = (size: number) => ({ native: { fontSize: size }, web: { width: size, height: size } } as IconStyle)

export const sheet: Mui2.SheetCreator<Mui2.IIconSheet> = theme => toPlatformSheet<Mui2.IIconSheet>({
  root: iconSize(24),
  colorAccent: iconColor(theme.palette.secondary.A200),
  colorAction: iconColor(theme.palette.action.active),
  colorContrast: iconColor(theme.palette.getContrastText(theme.palette.primary[500])),
  colorDisabled: iconColor(theme.palette.action.disabled),
  colorError: iconColor(theme.palette.error[500]),
  colorPrimary: iconColor(theme.palette.primary[500]),
  colorInherit: {},
})

export const getClasses = <T extends Mui2.AllCSS | string>({ classes, color = 'inherit', children, theme, innerRef, style, ...rest }: Mui2.CodeProps<Mui2.IIconProps, Mui2.IIconSheet>) => {
  const childs = React.Children.toArray(children)
  warning(childs.length == 1 && typeof childs[0] === 'string', 'single child as string needed')
  return {
    name: childs[0] as string,
    classes: {
      iconClass: [classes.root, classes[`color${capitalizeFirstLetter(color)}`]] as T[]
    },
    rest,
    style
  }
}
