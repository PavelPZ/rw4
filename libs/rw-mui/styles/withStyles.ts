import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'
//import { StyleRules as muiStyleRules} from 'material-ui/styles/withStyles'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from './createMuiTheme'
import warning from 'invariant'
import pure from 'recompose/pure'

let defaultTheme: Mui.Theme
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

const styleOverride = <T extends Mui2.TypedSheet>(renderedClasses: Mui2.PlatformSheetNative<T>, classesProp: Mui2.PlatformSheetNative<T>, name: string) => {
  if (!classesProp) return renderedClasses
  const stylesWithOverrides = { ...renderedClasses as Mui2.SheetUntyped } as Mui2.PlatformSheetNative<T> //destructor does not work with generics
  Object.keys(classesProp).forEach(key => {
    warning(!!stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...classesProp[key] };
  })
  return stylesWithOverrides
}

const styleCreator = <T extends Mui2.TypedSheet>(styleOrCreator: Mui2.SheetCreatorNative<T>, theme: Mui.Theme, name?: string) => {
  const overrides = (theme.overrides && name && theme.overrides[name]) as Mui2.PlatformSheetNative<T>
  const styles = typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator
  return styleOverride(styles, overrides, name)
}

//<R extends TypedSheet>(style: origStyleRules<keyof R>, options?: Mui.WithStylesOptions) => <C>(component: CodeComponentType<C, R>) => ComponentType<C, R>
export const withStyles = <R extends Mui2.TypedSheet>(styleOrCreator: Mui2.SheetCreatorNative<R>, options?: Mui2.WithStylesOptions) => <C>(Component: Mui2.CodeComponentType<C, R>) => {
  const Style: Mui2.SFC<C, R> = (props, context: Mui.TMuiThemeContextValue) => {
    const { withTheme = false, flip, name } = options
    const { classes: classesProp, innerRef, ...other } = props as Mui2.Props<Mui2.TypedSheet, Mui2.SheetUntyped>//as any //without any: does not works in TS
    const theme = context.theme || getDefaultTheme()

    const classes = /*override with component.props.classes*/styleOverride(
      /*count STYLES based on theme and override it with theme.overrides[name]. !!! result should be cached !!!*/styleCreator(styleOrCreator, theme, name),
      toPlatformSheet(classesProp) as any, name)

    const newProps = { ...other, classes, flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' } as Mui2.CodeProps<C, R>

    if (withTheme) newProps.theme = context.theme

    return React.createElement(Component, newProps)
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component as any)
  return pure(Style)
}

export const toRule = <T extends Mui2.NativeCSS>(style: Mui2.Rule<T>) => {
  if (!style) return null
  const { web, native, ...rest } = style as Mui2.RuleUntyped
  let st: Style
  return { ...rest, ...native } as T
}

export const toPlatformSheet = <R extends Mui2.TypedSheet>(rules: Mui2.Sheet<R>) => {
  if (!rules) return null
  const res: Mui2.PlatformSheetNative<R> = {} as any
  for (const p in rules) res[p] = toRule(rules[p])
  return res
}

export default withStyles

//export const classNames = <T extends Mui2.NativeCSS>(...styles: Array<T | T[] | string | string[]>) => {
export const classNames = <T extends Mui2.NativeCSS>(...styles: Array<T | T[]>) => {
  if (!styles) return null
  return Object.assign({}, ...styles.map(p => {
    if (Array.isArray(p)) return Object.assign({}, ...p)
    else return p
  })) as T
}