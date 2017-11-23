import muiComponent from 'material-ui/Typography/Typography'
import makeCompatible from 'rw-mui-w/styles/styler'

const universal = makeCompatible<Mui.ITypographyProps, Mui.ITypographyStyle, 'style'>(muiComponent)
export default universal
