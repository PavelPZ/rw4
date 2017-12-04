import React from 'react'

import { classNames, withStyles } from 'reactx-mui/native/styles/withStyles'
import { sheet } from 'reactx-mui/common/Text/Text' 
import { Text as RNText } from 'react-native' 

const text: Mui.CodeSFCNative<MuiText.Shape> = props => {
  const { classes, style, innerRef, ...rest } = props
  return <RNText style={classNames<RN.TextStyle>(classes.root, style)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Text = withStyles<MuiText.Shape>(sheet, { name: Mui.Names.Text })(text)

export default Text