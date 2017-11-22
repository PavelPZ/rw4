import muiComponent from 'material-ui/ButtonBase/ButtonBase'
import makeCompatible from '../styles/makeCompatible'

const universal = makeCompatible<Mui.IButtonBaseProps, Mui.IButtonBaseStyle, ViewStyle, 'style' | 'onClick' >(muiComponent)
export default universal