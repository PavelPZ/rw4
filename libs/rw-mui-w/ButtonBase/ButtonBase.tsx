import muiComponent from 'material-ui/ButtonBase/ButtonBase'
import makeCompatible from '../styles/styler'

const universal = makeCompatible<Mui.IButtonBaseProps, Mui.IButtonBaseStyle, 'style' | 'onClick' >(muiComponent)
export default universal