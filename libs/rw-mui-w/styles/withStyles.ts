import muiWithStyles from 'material-ui/styles/withStyles'

//import makeCompatible from 'rw-mui-w/styles/styler'

//const withStyles = <TRules extends Mui.StyleRules>(styleOrCreator: TRules | Mui.StyleRulesCallback<TRules>, options: Mui.WithStylesOptions = {}) => <C, Removals extends keyof C = never>(Component: Mui.ComponentType<C, TRules>) => {
//  const Style = makeCompatible<C, TRules>(Component)
//  return <C, TRules>(Style)
//}


const ws = muiWithStyles as any as Mui.withStyles
export default ws