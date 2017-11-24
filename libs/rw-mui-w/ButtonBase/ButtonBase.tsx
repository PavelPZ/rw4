import ButtonBase, { ButtonBaseProps} from 'material-ui/ButtonBase/ButtonBase'
import makeCompatible from '../styles/styler'

const universal = makeCompatible<ButtonBaseProps, Mui.IButtonBaseStyle>(ButtonBase)
export default universal