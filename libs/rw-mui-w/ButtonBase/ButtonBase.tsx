import MuiButtonBase, { styles} from 'material-ui/ButtonBase/ButtonBase'
import { withStyles } from 'rw-mui-w/styles/withStyles'

const ButtonBase = withStyles<MuiButtonBase.Shape>(styles, { name: Mui.Names.Typography })(MuiButtonBase as any)

export default ButtonBase

