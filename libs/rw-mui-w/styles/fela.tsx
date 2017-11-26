import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import _classnames from 'classnames'

import { createRenderer, combineRules } from 'fela'
import { render } from 'fela-dom'
import pluginExtend from 'fela-plugin-extend'
import pluginPrefixer from 'fela-plugin-prefixer'
import pluginFallbackValue from 'fela-plugin-fallback-value'
import pluginLvha from 'fela-plugin-lvha'
import pluginUnit from 'fela-plugin-unit'

const plugins = {
  plugins: [
    pluginUnit('px'),
    pluginExtend(),
    pluginPrefixer(),
    pluginFallbackValue(),
    pluginLvha(),
  ]
}

//debugger
const renderer = createRenderer(plugins)
//renderer['nodes'].RULE = document.getElementById('fela-rules')
render(renderer)

//Converts CSS rule-set to blank delimited atomic classes
export const ruleToClassNames = (rule: CSSProperties) => rule ? renderer.renderRule(() => rule) : ''
const renderRule = (felaRule: DFela.TRule) => renderer.renderRule(felaRule)
//deprecated:
export const rulesToClassNames = (...rules: CSSProperties[]) => rules ? renderRules(...rules.map(c => () => c)) : ''
const renderRules = (...felaRules: DFela.TRule[]) => renderer.renderRule(combineRules(...felaRules))


export const sheetToClassSheet = <TKey extends string>(sheet: Partial<Record<TKey, CSSProperties>>) => {
  if (!sheet) return null
  const res: Partial<Record<TKey, string>> = {}
  for (const p in sheet) res[p] = ruleToClassNames(sheet[p])
  return res
}

