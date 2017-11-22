import React from 'react'
import { StyledComponentProps, StandardProps } from 'material-ui/index'
import { ClassNameMap } from 'material-ui/styles/withStyles'
import { styleWeb } from 'rw-styler/index'
import { renderStyle } from 'rw-fela-w/index'

const styleToClasses = <ClassKey extends string>(styles: Mui.StyleRules) => {
  if (!styles) return null
  const res: Partial<ClassNameMap<ClassKey>> = {}
  for (const p in styles) res[p] = renderStyle(styles[p])
  return res
}


const native2Web = <C, TRules extends Mui.StyleRules, TRootStyle extends CSS.Style, Removals extends keyof C = never>(Web: React.ComponentType<StandardProps<C, keyof TRules, Removals>>) => {
  const native: Mui.SFC<C, TRules, TRootStyle, Removals> = props => {
    const { style, classes, ...rest } = props as { style: TRootStyle, classes: Record<string, Partial<CSS.Style>>, [p: string]: any }
    return <Web style={styleWeb(style)} classes={styleToClasses<keyof TRules>(classes)} { ...rest } />
  }
  return native
}

export default native2Web