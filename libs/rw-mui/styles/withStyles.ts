import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'
//import { StyleRules as muiStyleRules} from 'material-ui/styles/withStyles'
import { MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme from './createMuiTheme'
import warning from 'invariant'
import pure from 'recompose/pure'

//export type RNStyles = RN.TextStyle | RN.ViewStyle | RN.ImageStyle
//export type StyleRules = muiStyleRules //Record<ClassKey, Partial<TextStyle>>;//  {} | muiStyleRules
//export type StyleRulesCallback<T extends StyleRules> = (theme: Mui.Theme) => T

export interface WithStylesOptions {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export interface WithStyles<T extends Mui.StyleRules> {
  classes: T
  theme?: Mui.Theme
}

export interface StyledComponentProps<T extends Mui.StyleRules> {
  classes?: Partial<T>
  innerRef?: React.Ref<any>
}

//interface IThemeOverrides extends Theme {
//  overrides?: { [name: string]: StyleRules }
//}


let defaultTheme: Mui.Theme
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

const styleOverride = (renderedClasses: Mui.StyleRules, classesProp: Mui.StyleRules, name:string) => {
  if (!classesProp) return renderedClasses
  const stylesWithOverrides: Mui.StyleRules = { ...renderedClasses }
  Object.keys(classesProp).forEach(key => {
    warning(!!stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...classesProp[key] };
  })
  return stylesWithOverrides
}

const styleCreator = <T extends Mui.StyleRules>(styleOrCreator: T | Mui.StyleRulesCallback<T>, theme: Mui.Theme, name?: string) => {
  const overrides = theme.overrides && name && theme.overrides[name]
  const styles: Mui.StyleRules = typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator
  return styleOverride(styles, overrides, name)
}

const withStyle = <TRules extends Mui.StyleRules>(styleOrCreator: TRules | Mui.StyleRulesCallback<TRules>, options: WithStylesOptions = {}) => <C, Removals extends keyof C = never>(Component: React.ComponentType<C & WithStyles<TRules>>) => {
  const Style: Mui.SFC<C, TRules, Removals> = (props, context: Mui.TMuiThemeContextValue) => {
    const { withTheme = false, flip, name } = options
    const { classes: classesProp, innerRef, ...other } = props as any //without any: does not works in TS
    const theme = context.theme || getDefaultTheme()

    const classes = /*override with component.props.classes*/styleOverride(/*count STYLES based on theme and override it with theme.overrides[name]. !!! result should be cached !!!*/styleCreator(styleOrCreator, theme, name), classesProp, name)

    const newProps: C & WithStyles<TRules> = { ...other, classes, flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' }

    if (withTheme) newProps.theme = context.theme

    return React.createElement(Component, newProps)
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component as any)
  return pure(Style)
}

export default withStyle

