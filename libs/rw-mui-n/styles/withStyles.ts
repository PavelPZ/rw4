import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
//import mui_withStyles, { StyleRules, StyleRulesCallback, WithStyles, WithStylesOptions, StyledComponentProps } from 'material-ui/styles/withStyles'
import { TMuiThemeContextValue, MuiThemeContextTypes } from './MuiThemeProvider'
import createMuiTheme, { Theme } from './createMuiTheme'
import warning from 'invariant'
import pure from 'recompose/pure'

export type RNStyles = RN.TextStyle | RN.ViewStyle | RN.ImageStyle
export type StyleRules = {}
export type StyleRulesCallback<T extends StyleRules> = (theme: Theme) => T

export interface WithStylesOptions {
  flip?: boolean;
  withTheme?: boolean;
  name?: string;
}

export interface WithStyles<T extends StyleRules> {
  classes: T
  theme?: Theme
}

export interface StyledComponentProps<T extends StyleRules> {
  classes?: Partial<T>
  innerRef?: React.Ref<any>
}

interface IThemeOverrides extends Theme {
  overrides?: { [name: string]: StyleRules }
}


let defaultTheme: Theme
const getDefaultTheme = () => defaultTheme || (defaultTheme = createMuiTheme())

const styleOverride = (styles: StyleRules, overrides: StyleRules, name:string) => {
  if (!overrides) return styles
  const stylesWithOverrides: StyleRules = { ...styles }
  Object.keys(overrides).forEach(key => {
    warning(stylesWithOverrides[key], `Material-UI: you are trying to override a style that does not exist.\r\nFix the '${key}' key of 'theme.overrides.${name}'.`)
    stylesWithOverrides[key] = { ...stylesWithOverrides[key], ...overrides[key] };
  })
  return stylesWithOverrides
}

const styleCreator = <T extends StyleRules>(styleOrCreator: T | StyleRulesCallback<T>, theme: IThemeOverrides, name?: string) => {
  const overrides = theme.overrides && name && theme.overrides[name]
  const styles: StyleRules = typeof styleOrCreator === 'function' ? styleOrCreator(theme) : styleOrCreator
  return styleOverride(styles, overrides, name)
}

const withStyle = <T extends StyleRules>(styleOrCreator: T | StyleRulesCallback<T>, options: WithStylesOptions = {}) => <P>(Component: React.ComponentType<P & WithStyles<T>>) => {
  const Style: React.SFC<P & StyledComponentProps<T>> = (props, context: TMuiThemeContextValue) => {
    console.log('withStyle 1', options)
    const { withTheme = false, flip, name } = options
    console.log(name)
    const { classes: classesProp, innerRef, ...other } = props as any //without any: does not works in TS
    const theme = context.theme || getDefaultTheme()

    const classes = styleOverride(styleCreator(styleOrCreator, theme, name), classesProp, name)

    const newProps: P & WithStyles<T> = { ...other, classes, flip: typeof flip === 'boolean' ? flip : theme.direction === 'rtl' }

    if (withTheme) newProps.theme = context.theme

    return React.createElement(Component, newProps)
  }
  Style.contextTypes = MuiThemeContextTypes
  Style['options'] = options
  hoistNonReactStatics(Style, Component)
  return pure(Style)
}

export default withStyle

