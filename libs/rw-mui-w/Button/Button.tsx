import MuiButton, { styles } from 'material-ui/Button/Button'
import { withStyles } from 'rw-mui-w/styles/withStyles'

import React from 'react'

const Button = withStyles<MuiButton.Shape>(styles, { name: Mui.Names.Typography })(MuiButton)

//const x = <Button classes={{ common: {}, native: {} }} onClick={ev => ev && ev.preventDefault()} />

export default Button