import createMuiTheme from 'material-ui/styles/createMuiTheme'
import { platformOverrides } from 'rw-mui-u/styles/createMuiTheme'

const cm = (options) => platformOverrides(createMuiTheme(options))

export default cm