import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'
//import { StyleRules as muiStyleRules} from 'material-ui/styles/withStyles'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from './createMuiTheme'
import warning from 'invariant'
import pure from 'recompose/pure'
import { View } from 'react-native'
import { toPlatformSheetLow, toRuleLow } from 'rw-mui-u/styles/toPlatform'

let defaultTheme: Mui.Theme
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

export const Styler: React.SFC<{}> = props => <View>{props.children}</View>

const styleOverride = <R extends Mui.Shape>(renderedClasses: Mui.PlatformSheetNative<R>, classesProp: Mui.PlatformSheetNative<R>, name: string) => {  
  type untyped = Mui.PlatformSheetNative<Mui.Shape>
  if (!classesProp) return renderedClasses
  const stylesWithOverrides = { ...renderedClasses as untyped }  //destructor does not work with generics
  Object.keys(classesProp).forEach(key => {
    warning(!!stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...(classesProp as untyped)[key] };
  })
  return stylesWithOverrides as Mui.PlatformSheetNative<R>
}

const styleCreator = <R extends Mui.Shape>(styleOrCreator: Mui.PlatformSheetCreator<R>, theme: Mui.Theme, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Mui.PlatformSheetNative<R>
  const styles = typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator
  return styleOverride(styles, overrides, name)
}

export const sheetCreator = <R extends Mui.Shape>(styleOrCreator: Mui.SheetGetter<R>) => {
  const styleOrCreatorEx: Mui.PlatformSheetCreator<R> = (theme: Mui.Theme) => {
    if (typeof styleOrCreator == 'function') return toPlatformSheet(styleOrCreator(theme) as Mui.PartialSheet<R>)
    else return styleOrCreator
  }
  return styleOrCreatorEx
}

export const withStyles = <R extends Mui.Shape>(styleOrCreator: Mui.PlatformSheetCreator<R>, options?: Mui.WithStylesOptions) => (Component: Mui.CodeComponentType<R>) => {
  const Style: Mui.SFC<R> = (props, context: Mui.TMuiThemeContextValue) => {
    const { flip, name } = options
    const { classes: common, classesNative, classesWeb, style, web, native, onClick, onPress, ...other } = props as Mui.Props<Mui.Shape>//as any //without any: does not works in TS

    const theme = context.theme || getDefaultTheme()

    const classes = styleOverride(
      styleCreator(styleOrCreator, theme, name),
      toPlatformSheet({ common, native: classesNative, web: classesWeb } as Mui.PartialSheet<R>),
      name)

    const newProps = { ...other, ...native, onPress: onPress || onClick , theme, classes, style: toRule(style), flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Mui.CodePropsNative<R>

    return <Component {...newProps } />
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component as any)
  return pure(Style)
}

export const toRule = <T extends Mui.NativeCSS>(style: Mui.Rule<T>) => toRuleLow(style, true) as T
export const toPlatformSheet = <R extends Mui.Shape>(rules: Mui.PartialSheet<R>) => toPlatformSheetLow(rules, true) as Mui.PlatformSheetNative<R>

export default withStyles

export const classNames = <T extends Mui.NativeCSS>(...styles: Array<T | T[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.filter(p => !!p).map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}