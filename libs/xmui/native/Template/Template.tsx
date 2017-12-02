import React from 'react'

import { classNames, withStyles } from 'xmui/native/styles/withStyles'
import { sheet } from 'xmui/common/Template/Template' 
import { View } from 'react-native' 

const template: Mui.CodeSFCNative<MuiTemplate.Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)} />
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: Mui.Names.Template })(template)

export default Template