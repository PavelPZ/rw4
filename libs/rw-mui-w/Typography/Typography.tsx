import Typography, { styles } from 'material-ui/Typography/Typography'
import { withStyles } from 'rw-mui-w/styles/withStyles'

const typography = withStyles(styles, { name: Mui.Names.Typography })<MuiTypography.IProps>(Typography)
export default typography
