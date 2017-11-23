import muiComponent from 'material-ui/Button/Button'
import makeCompatible from 'rw-mui-w/styles/styler'

const universal = makeCompatible<Mui.IButtonProps, Mui.IButtonStyle, 'style' | 'onClick'>(muiComponent)

export default universal