export * from 'rw-fela-w/index'
//import React from 'react'
//import { createRenderer, combineRules } from 'fela';
//import { render } from 'fela-dom';
//import pluginExtend from "fela-plugin-extend";
////import pluginMonolithic from "fela-monolithic";
//import pluginPrefixer from "fela-plugin-prefixer";
//import pluginFallbackValue from "fela-plugin-fallback-value";
//import pluginLvha from "fela-plugin-lvha";
//import pluginUnit from "fela-plugin-unit";
//import flatten from 'lodash/flatten'
//import merge from 'lodash/merge'

//const renderer = createRenderer({
//  plugins: [
//    pluginUnit('px'),
//    pluginExtend(),
//    pluginPrefixer(),
//    pluginFallbackValue(),
//    pluginLvha(),
//    //pluginMonolithic({ prettySelectors: true }),
//  ]
//})
//render(renderer)

//export const renderRules = (...rules: DFela.TRule[]) => renderer.renderRule(combineRules(...rules))
//export const renderRule = (rule: DFela.TRule) => renderer.renderRule(rule)
//export const renderCSSs = (...csss: (CSSProperties | CSSProperties[])[]) => renderCSS(merge({} as CSSProperties, ...flatten(csss)))

//export const renderCSS = (css: CSSProperties) => css ? renderer.renderRule(() => css) : ''
//export const renderKeyFrame = (frame: KeyFrames) => renderer.renderKeyframe(() => frame)
//export const renderStatic = (css: string | CSSProperties) => renderer.renderStatic(css)

//export const styleLib = {
//  fixedScreen: {
//    position: 'fixed', left: 0, top: 0, bottom: 0, right: 0,
//  } as CSSProperties,
//  flexCenterBoth: {
//    display: 'flex', justifyContent: 'center', alignItems: 'center'
//  } as CSSProperties,
//}


//renderStatic(`
//.component-text .component-text {
//  display: inline;
//  white-space: normal;
//}

//.component-button .component-view {
//  display: inline-flex;
//}

///*  RIPPLE */
//.ripple {
//  position: relative;
//  overflow: hidden;
//  transform: translate3d(0, 0, 0);
//}

//  .ripple:after {
//    content: "";
//    display: block;
//    position: absolute;
//    width: 100%;
//    height: 100%;
//    top: 0;
//    left: 0;
//    pointer-events: none;
//    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
//    background-repeat: no-repeat;
//    background-position: 50%;
//    transform: scale(10, 10);
//    opacity: 0;
//    transition: transform .5s, opacity 1s;
//  }

//  .ripple:active:after {
//    transform: scale(0, 0);
//    opacity: .2;
//    transition: 0s;
//  }

//`);