import React from 'react'

import { classNames, withStyles } from 'xmui/native/styles/withStyles'
import { sheet } from 'xmui/common/ScrollView/ScrollView'
import { ScrollView as ScrollViewRN } from 'react-native' 

const scrollView: Mui.CodeSFCNative<MuiScrollView.Shape> = props => {
  const { classes, style, ...rest } = props
  console.log('scrollView: ', React.Children.count(rest.children))
  return <ScrollViewRN style={classNames(classes.root, style)} {...rest}/>
}

const ScrollView = withStyles<MuiScrollView.Shape>(sheet, { name: Mui.Names.ScrollView })(scrollView)

export default ScrollView