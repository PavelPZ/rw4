import React from 'react'

import { classNames, withStyles } from 'xmui/web/styles/withStyles'
import { sheet } from 'xmui/common/ScrollView/ScrollView' 

const scrollView: Mui.CodeSFCWeb<MuiScrollView.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const ScrollView = withStyles<MuiScrollView.Shape>(sheet, { name: Mui.Names.ScrollView })(scrollView)

export default ScrollView