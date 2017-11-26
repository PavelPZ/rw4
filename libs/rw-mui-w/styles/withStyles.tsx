import React from 'react'
import withStylesMui from 'material-ui/styles/withStyles'
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import createGenerateClassName from 'material-ui/styles/createGenerateClassName'
import { create } from 'jss';
import preset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider'

import { sheetToClassSheet } from './fela'

/*
Order of FELA x JSS <style>'s tag:
1. .html file
  <!-- insertion-point-jss -->  <-- JSS sheet's
  <style data-fela-type="RULE" type="text/css" id="fela-rules"></style> <-- FELA sheets

2. create jss instance, as in rw-mui-w/styles/withStyles, doc in https://material-ui-next.com/customization/css-in-js/

3. react app root is JssProvider:
import JssProvider from 'react-jss/lib/JssProvider'
import { jss } from 'rw-mui-w/styles/withStyles'
<JssProvider jss={jss}>
</JssProvider>

*/

const jss = create(preset())
jss.options.createGenerateClassName = createGenerateClassName
jss.options.insertionPoint = 'insertion-point-jss'

export const FelaLike: React.SFC<{}> = props => <JssProvider jss={jss}>{props.children}</JssProvider>

const origWithStyles = withStylesMui as Mui.muiWithStyles

const beforeWithStyles = <C, R extends Mui.TypedSheet>(Component: Mui.muiComponentType<C, keyof R>) => {
  type TKey = keyof R
  const res: Mui.SFC<C, R> = props => {
    const { classes: sheet, style, ...rest } = props as Mui.Props<{}, Mui.TypedSheet>
    const classes = sheetToClassSheet(toPlatformSheet(sheet) as Mui.PlatformSheetWeb<R>)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <R extends Mui.TypedSheet>(styleOrCreator: Mui.SheetCreatorWeb<R>, options?: Mui.WithStylesOptions) => <C extends object>(comp: Mui.muiComponentType<C, keyof R>) =>
  beforeWithStyles<C,R>(origWithStyles(styleOrCreator, options)(comp as Mui.muiCodeComponentType<C, keyof R>))

const beforeWithStyleDistinct = <C, TKey extends string>(Component: Mui.muiComponentType<C, TKey>) => {
  const res: React.SFC<Mui.PropsDistinct<C, {}, TKey>> = (props: Mui.PropsDistinct<{}, Mui.TypedSheet, string>) => {
    const { classes: { web: inlineStyles }, style, ...rest } = props
    const classes = sheetToClassSheet(inlineStyles)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyleDistinct = <R extends Mui.TypedSheet, TKey extends string>(styleOrCreator: Mui.SheetCreatorWeb<R>, options?: Mui.WithStylesOptions) => <C extends object>(comp: Mui.CodeComponentTypeDistinct<C, {}, TKey>) =>
  beforeWithStyleDistinct<C, TKey>(origWithStyles(styleOrCreator, options)(comp as Mui.muiCodeComponentType<C, TKey>))


export const toRule = (rule: Mui.RuleUntyped) => {
  if (!rule) return null
  const { web, native, ...rest } = rule
  return { ...rest, ...web } as React.CSSProperties
}

export const toPlatformSheet = <R extends Mui.TypedSheet>(rules: Mui.Sheet<R>) => {
  if (!rules) return null
  const res: Mui.PlatformSheetWeb<R> = {} as any
  for (const p in rules) res[p] = toRule(rules[p])
  return res
}

export const classNames = _classnames
