import Typography, { TypographyProps } from 'material-ui/Typography/Typography'
import makeCompatible from 'rw-mui-w/styles/styler'

const universal = makeCompatible<TypographyProps, Typography.IStyle>(Typography)
export default universal
