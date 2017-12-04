import React from 'react'

import { classNames, withStyles } from 'reactx-mui/web/styles/withStyles'
import { sheet } from 'reactx-mui/common/Template/Template' 

const template: Mui.CodeSFCWeb<MuiTemplate.Shape> = props => {
  const { classes, ...rest } = props 
  return <div className={classNames(classes.root)} {...rest} />
}

const Template = withStyles<MuiTemplate.Shape>(sheet, { name: Mui.Names.Template })(template)

export default Template