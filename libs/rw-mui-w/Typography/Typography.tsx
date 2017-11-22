import muiComponent from 'material-ui/Typography/Typography'
import makeCompatible from '../styles/makeCompatible'

const universal = makeCompatible<Mui.ITypographyProps, Mui.ITypographyStyle, TextStyle, 'style'>(muiComponent)
export default universal
