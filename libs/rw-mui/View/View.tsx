import React from 'react'

import { classNames, withStyles } from 'rw-mui-n/styles/withStyles'
import { sheet } from 'rw-mui-u/View/View' 

const view: Mui.CodeSFCNative<MuiView.Shape> = props => {
  const { classes, style, ...rest } = props
  return <View style={classNames(classes.root, style)} {...rest} />
}

const View = withStyles<MuiIcon.Shape>(sheet, { name: Mui.Names.View })(view)

export default View