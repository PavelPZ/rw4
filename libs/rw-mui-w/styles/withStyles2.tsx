import React from 'react'
import withStylesMui from 'material-ui/styles/withStyles'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { sheetToClassSheet } from './fela'

const origWithStyles = withStylesMui as Mui2.muiWithStyles

const beforeWithStyles = <C, R extends Mui2.TypedSheet>(Component: Mui2.muiComponentType<C, keyof R>) => {
  type TKey = keyof R
  const res: Mui2.SFC<C, R> = (props: Mui2.Props<{}, Mui2.TypedSheet>) => {
    const { classes: sheet, style, ...rest } = props
    const classes = sheetToClassSheet(toPlatformSheet(sheet) as Mui2.PlatformSheetWeb<R>)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui2.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyles = <C, R extends Mui2.TypedSheet>(style: Mui2.muiSheetCreator<keyof R>, options: Mui.WithStylesOptions) =>
  (comp: Mui2.muiComponentType<C, keyof R>) =>
    beforeWithStyles(origWithStyles(style, options)(comp))

const befireWithStyleDistinct = <C, R extends Mui2.TypedSheet, TKey extends string>(Component: Mui2.muiComponentType<C, TKey>) => {
  const res: React.SFC<Mui2.PropsDistinct<C, R, TKey>> = (props: Mui2.PropsDistinct<{}, Mui2.TypedSheet, string>) => {
    const { classes: { web: inlineStyles }, style, ...rest } = props
    const classes = sheetToClassSheet(inlineStyles)
    const webProps = { style: toRule(style), classes, ...rest } as (C & Mui2.muiProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyleDistinct = <C, R extends Mui2.TypedSheet>(style: Mui2.muiSheet<keyof R>, options?: Mui.WithStylesOptions) =>
  (comp: Mui2.CodeComponentTypeDistinct<C, R>) =>
    befireWithStyleDistinct(origWithStyles(style, options)(comp as Mui2.muiCodeComponentType<any, string>))


export const toRule = (rule: Mui2.RuleUntyped) => {
  if (!rule) return null
  const { web, native, ...rest } = rule
  return { ...rest, ...web } as Mui2.WebCSS 
}

export const toPlatformSheet = <R extends Mui2.TypedSheet>(rules: Mui2.Sheet<R>) => {
  if (!rules) return null
  const res: Mui2.PlatformSheet<R> = {} as any
  for (const p in rules) res[p] = toRule(rules[p])
  return res
}