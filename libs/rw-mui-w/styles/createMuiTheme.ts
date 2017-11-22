import createMuiTheme from 'material-ui/styles/createMuiTheme'

type TCreateMuiTheme<T = {}> = (options?: Mui.ThemeOptions & T) => Mui.Theme<T>
const cm = createMuiTheme as TCreateMuiTheme

export default cm