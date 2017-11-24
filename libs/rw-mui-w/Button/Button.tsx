import Button, { ButtonProps } from 'material-ui/Button/Button'
import makeCompatible from 'rw-mui-w/styles/styler'

const universal = makeCompatible<ButtonProps, Mui.IButtonStyle>(Button)

export default universal