import React from 'react'

import { classNames, withStyles } from 'xmui/web/styles/withStyles'
import { sheet } from 'xmui/common/View/View' 

const view: Mui.CodeSFCWeb<MuiView.Shape> = props => {
  const { classes, innerRef, ...rest } = props
  return <div className={classNames(classes.root)} ref={div => innerRef && innerRef(div)} {...rest} />
}

const View = withStyles<MuiView.Shape>(sheet, { name: Mui.Names.View })(view)

export default View