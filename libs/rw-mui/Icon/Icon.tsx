import React from 'react'

import { withStyles, classNames } from 'rw-mui-n/styles/withStyles'
import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

//import { expandStyle } from 'rw-mui/styles/styler'
//import { classNames } from 'rw-mui-n/styles/styler'
import { getClasses, sheet } from 'rw-mui-u/Icon/Icon'
export * from 'rw-mui-u/Icon/Icon'

const icon: Mui.CodeSFC<MuiIcon.Shape> = props => {
  const { classes: { iconClass }, name, style, rest } = getClasses<Mui.RNIconStyle>(props)
  return <MIcon name={name} style={classNames(iconClass, style as Mui.RNIconStyle)} {...rest} />
}

const Icon = withStyles<MuiIcon.Shape>(sheet, { name: Mui.Names.Icon })(icon)

export default Icon
