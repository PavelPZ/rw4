import React from 'react'
import { StandardProps } from 'material-ui/index'
import { ClassNameMap } from 'material-ui/styles/withStyles'
import { styleWeb } from 'rw-styler/index'
import { renderStyle } from 'rw-fela-w/index'
import hoistNonReactStatics from 'hoist-non-react-statics'

const styleToClasses = <ClassKey extends string>(styles: Mui.StyleRules) => {
  if (!styles) return null
  const res: Partial<ClassNameMap<ClassKey>> = {}
  for (const p in styles) res[p] = renderStyle(styles[p])
  return res
}

const makeCompatible = <C, TRules extends Mui.StyleRules, Removals extends keyof C = never>(Web: React.ComponentType<StandardProps<C, keyof TRules, Removals>>) => {
  const native: Mui.SFC<C, TRules> = props => {
    const { style, classes, onClick, ...rest } = props as { style: TRules[Mui.Names.rootRule], classes: Record<string, Partial<CSS.Style>>, [p: string]: any }
    return <Web style={styleWeb(style)} classes={styleToClasses<keyof TRules>(classes)} { ...rest } />
  }
  hoistNonReactStatics(native, Web)
  return native
}

export default makeCompatible