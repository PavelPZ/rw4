import React from 'react'
import withStylesMui from 'material-ui/styles/withStyles'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { stylesToClassNames } from './fela'


const origWithStyles: Mui2.origwithStyles = withStylesMui as Mui2.origwithStyles

function beforeWithStyleMui<C, R extends Mui2.TypedRules>(Component: Mui2.origComponentType<C, keyof R>) {
  type TKey = keyof R
  const res: Mui2.SFC<C, R> = (props: Mui2.Props<{}, Mui2.TypedRules>) => {
    const { classes: inlineClasses, style, ...rest } = props
    const classes = stylesToClassNames(inlineClasses)
    const webProps = { style: expanRule(style), classes, ...rest } as (C & Mui2.origStyledComponentProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const withStyleWeb: Mui2.withStyleWeb = (style, options) => comp => beforeWithStyleMui(origWithStyles(style, options)(comp as Mui2.origToWithStyleComponentType<any, string>))

const muiBeforeWithStyleMui = <C, R extends Mui2.TypedRules, TKey extends string>(Component: Mui2.origComponentType<C, TKey>) => {
  const res: React.SFC<Mui2.muiProps<C, R, TKey>> = (props: Mui2.muiProps<{}, Mui2.TypedRules, string>) => {
    const { classes: { web: inlineStyles }, style, ...rest } = props
    const classes = stylesToClassNames(inlineStyles)
    const webProps = { style: expanRule(style), classes, ...rest } as (C & Mui2.origStyledComponentProps<TKey>)
    return <Component {...webProps} />
  }
  return hoistNonReactStatics(res, Component)
}

export const muiWithStyleWeb: Mui2.muiWithStyleWeb = (style, options) => comp => muiBeforeWithStyleMui(origWithStyles(style, options)(comp as Mui2.origToWithStyleComponentType<any, string>))

function expanRule<T extends Mui2.NativeStyle>(rule: Mui2.Rule<T>): Mui2.ExpandedRule<T> {
  if (!rule) return null
  const { web, native, ...rest } = rule
  return { ...rest, ...web }
}

function expanRulesProc<R extends Mui2.TypedRules>(rules: Mui2.Rules<R>): Mui2.ExpandedRules<R> {
  if (!rules) return null
  const res: Mui2.ExpandedRules<R> = {}
  for (const p in rules) res[p] = expanRule(rules[p])
  return res
}
