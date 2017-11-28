import Typography, { styles } from 'material-ui/Typography/Typography'
import { withStyles } from 'rw-mui-w/styles/withStyles'

const typography = withStyles<Typography.ISheet>(styles, { name: Mui.Names.Typography })(Typography)
export default typography
