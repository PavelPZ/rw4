import React from 'react'

import { classNames, withStyles } from 'rw-mui-w/styles/withStyles'
import { sheet } from 'rw-mui-u/View/View' 

const view: Mui.CodeSFCWeb<MuiView.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const View = withStyles<MuiView.Shape>(sheet, { name: Mui.Names.View })(view)

export default View