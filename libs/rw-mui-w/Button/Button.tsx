import muiComponent from 'material-ui/Button/Button'
import makeCompatible from '../styles/makeCompatible'

const universal = makeCompatible<Mui.IButtonProps, Mui.IButtonStyle, ViewStyle, 'style' | 'onClick'>(muiComponent)

export default universal