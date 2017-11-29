import React from 'react'

import { classNames, withStyles } from 'rw-mui-w/styles/withStyles'
import { sheet } from 'rw-mui-u/Text/Text' 

const text: Mui.CodeSFCWeb<MuiText.Shape> = props => {
  const { classes, innerRef, ...rest } = props 
  return <div className={classNames(classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const Text = withStyles<MuiText.Shape>(sheet, { name: Mui.Names.Text })(text)

export default Text