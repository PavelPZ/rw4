import React from 'react'
import { createRenderer, combineRules } from 'fela';
import { render } from 'fela-dom';
import pluginExtend from "fela-plugin-extend";
import pluginPrefixer from "fela-plugin-prefixer";
import pluginFallbackValue from "fela-plugin-fallback-value";
import pluginLvha from "fela-plugin-lvha";
import pluginUnit from "fela-plugin-unit";

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
export const renderRule = (rule: DFela.TRule) => renderer.renderRule(rule)
export const renderRules = (...rules: DFela.TRule[]) => renderer.renderRule(combineRules(...rules))

