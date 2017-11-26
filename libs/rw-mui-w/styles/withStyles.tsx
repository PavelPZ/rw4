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

const origWithStyles = withStylesMui as Mui2.muiWithStyles

const beforeWithStyles = <C, R extends Mui2.TypedSheet>(Component: Mui2.muiComponentType<C, keyof R>) => {
  type TKey = keyof R
  const res: Mui2.SFC<C, R> = props => {
    const { classes: sheet, style, ...rest } = props as Mui2.Props<{}, Mui2.TypedSheet>
    const classes = sheetToClassSheet(toPlatformSheet(sheet) as Mui2.PlatformSheetWeb<R>)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui2.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <R extends Mui2.TypedSheet>(styleOrCreator: Mui2.SheetCreatorWeb<R>, options?: Mui2.WithStylesOptions) => <C extends object>(comp: Mui2.muiComponentType<C, keyof R>) =>
  beforeWithStyles<C,R>(origWithStyles(styleOrCreator, options)(comp as Mui2.muiCodeComponentType<C, keyof R>))

const beforeWithStyleDistinct = <C, TKey extends string>(Component: Mui2.muiComponentType<C, TKey>) => {
  const res: React.SFC<Mui2.PropsDistinct<C, {}, TKey>> = (props: Mui2.PropsDistinct<{}, Mui2.TypedSheet, string>) => {
    const { classes: { web: inlineStyles }, style, ...rest } = props
    const classes = sheetToClassSheet(inlineStyles)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui2.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyleDistinct = <R extends Mui2.TypedSheet, TKey extends string>(styleOrCreator: Mui2.SheetCreatorWeb<R>, options?: Mui2.WithStylesOptions) => <C extends object>(comp: Mui2.CodeComponentTypeDistinct<C, {}, TKey>) =>
  beforeWithStyleDistinct<C, TKey>(origWithStyles(styleOrCreator, options)(comp as Mui2.muiCodeComponentType<C, TKey>))


export const toRule = (rule: Mui2.RuleUntyped) => {
  if (!rule) return null
  const { web, native, ...rest } = rule
  return { ...rest, ...web } as Mui2.WebCSS
}

export const toPlatformSheet = <R extends Mui2.TypedSheet>(rules: Mui2.Sheet<R>) => {
  if (!rules) return null
  const res: Mui2.PlatformSheetWeb<R> = {} as any
  for (const p in rules) res[p] = toRule(rules[p])
  return res
}

export const classNames = _classnames
