import React from 'react'

import { classNames, withStyles } from 'reactx-mui/native/styles/withStyles'
import { sheet } from 'reactx-mui/common/Template/Template' 
import { View } from 'react-native' 

const template: Mui.CodeSFCNative<MuiTemplate.Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)}  {...rest}/>
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: Mui.Names.Template })(template)

export default Template