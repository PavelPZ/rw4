import React from 'react'
import { StandardProps } from 'material-ui/index'
import { ClassNameMap } from 'material-ui/styles/withStyles'
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import { createRenderer, combineRules } from 'fela'
import { render } from 'fela-dom'
import pluginExtend from 'fela-plugin-extend'
import pluginPrefixer from 'fela-plugin-prefixer'
import pluginFallbackValue from 'fela-plugin-fallback-value'
import pluginLvha from 'fela-plugin-lvha'
import pluginUnit from 'fela-plugin-unit'

const renderer = createRenderer({
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    pluginLvha(),
  ]
})
render(renderer)

export const renderCSS = (css: CSSProperties) => css ? renderer.renderRule(() => css) : ''
export const renderCSSs = (...csss: CSSProperties[]) => csss ? renderRules(...csss.map(c => () => c)) : ''
export const renderStyle = (css: CSS.Style) => css ? renderer.renderRule(() => expandStyle(css)) : ''
const renderRule = (rule: DFela.TRule) => renderer.renderRule(rule)
const renderRules = (...rules: DFela.TRule[]) => renderer.renderRule(combineRules(...rules))


export const expandStyle = (style: Style) => {
  if (!style) return null
  const { web, native, ios, android, window, ...rest } = style
  return { ...rest || null, ...web || null } as CSSProperties
}

export const expandStyles = (styles: Mui.StyleRules) => {
  if (!styles) return null
  const res: Record<string, CSSProperties> = {}
  for (const p in styles) res[p] = expandStyle(styles[p])
  return res
}

const styleToClasses = <TRules extends Mui.StyleRules>(styles: TRules) => {
  if (!styles) return null
  const res: { [name: string]: string } = {}
  for (const p in styles) res[p] = renderStyle(styles[p])
  return res as Partial<ClassNameMap<keyof TRules>>
}

const makeCompatible = <C, TRules extends Mui.StyleRules>(MuiLike: React.ComponentType<StandardProps<C, keyof TRules>>) => {
  const RwLike: Mui.SFC<C, TRules> = props => {
    const { style, classes, ...rest } = props as Mui.StandardProps<{}, Mui.StyleRules> //{ style: TRules[Mui.Names.rootRule], classes: Record<string, Partial<CSS.Style>>, [p: string]: any }
    const clss = styleToClasses(classes as TRules)
    return <MuiLike style={expandStyle(style)} classes={clss} { ...rest } />
  }
  hoistNonReactStatics(RwLike, MuiLike)
  return RwLike
}

export const classNames = _classnames

export default makeCompatible