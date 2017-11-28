import MuiButton, { styles } from 'material-ui/Button/Button'
import { withStyles } from 'rw-mui-w/styles/withStyles'

//import React from 'react'
//const x = <Button classes={{ common: {}, native: {} }} onClick={null} />

const Button = withStyles<MuiButton.Shape>(styles, { name: Mui.Names.Typography })(MuiButton as any)

export default Button