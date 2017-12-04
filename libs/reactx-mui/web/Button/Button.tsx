import MuiButton from 'material-ui/Button/Button'
import { beforeWithStyles } from 'reactx-mui/web/styles/withStyles'

import React from 'react'

//const Button = withStyles<MuiButton.Shape>(styles, { name: Mui.Names.Typography })(MuiButton)
const Button = beforeWithStyles<MuiButton.Shape>(MuiButton)

//const x = <Button classes={{ common: {}, native: {} }} onClick={ev => ev && ev.preventDefault()} />

export default Button