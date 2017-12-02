import React from 'react'

import { classNames, withStyles } from 'xmui/web/styles/withStyles'
import { sheet } from 'xmui/common/Template/Template' 

const template: Mui.CodeSFCWeb<MuiTemplate.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: Mui.Names.Template })(template)

export default Template