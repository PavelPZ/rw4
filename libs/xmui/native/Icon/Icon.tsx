import React from 'react'

import { withStyles, classNames, toPlatformSheet } from 'xmui/native/styles/withStyles'

import { MaterialCommunityIcons as MIcon } from '@expo/vector-icons'

import { getClasses, sheet } from 'xmui/common/Icon/Icon'
export * from 'xmui/common/Icon/Icon'

const icon: Mui.CodeSFCNative<MuiIcon.Shape> = props => {
  const { classes: { iconClass }, name, style, rest, innerRef} = getClasses<Mui.RNIconStyle>(props)
  return <MIcon name={name} style={classNames(iconClass, style as Mui.RNIconStyle)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Icon = withStyles<MuiIcon.Shape>(sheet, { name: Mui.Names.Icon })(icon)

export default Icon
