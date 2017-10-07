import React from 'react';
import { renderCSS } from '../lib/fela'
import Animated from 'animated'
import { TweensAnimate } from '../gui/lib'

//export type IWebView = ViewProperties;

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View: React.SFC<ReactNative.ViewProperties> = props => {
  const { style, ...otherPropsTyped } = props

  const ruleProps: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...style as any as CSSProperties
  }

  return <div {...otherPropsTyped as any} className={renderCSS(ruleProps)} />
}

class animatedView extends React.Component<any> {
  render() {
    //const animValues = {}
    //const values: CSSProperties = {
    //  display: 'flex',
    //  flexDirection: 'column',
    //}
    //for (const p in this.props.style as any) {
    //  const val = this.props.style[p]
    //  if (p=='left') animValues[p] = val
    //  else values[p] = val
    //}
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...this.props.style as any as CSSProperties
    }
    return <div style={this.props.style as any} className={this.props.className}>{this.props.children}</div>
  }
}

//react-native-animatable: https://snack.expo.io/SJfJguhrW
//https://blog.bam.tech/developper-news/5-tips-to-make-a-great-component-to-page-animation-in-react-native

//export const AnimatedView: React.ComponentType<ReactNative.ViewProperties> = Animated.createAnimatedComponent(animatedView)
export const AnimatedView2: React.ComponentType<any> = Animated.createAnimatedComponent(animatedView)

interface IAnim {
  propName: string //jmeno animacni property, napr. LEFT, OPACITY apod
  targetValue: number //cilova hodnota animace
  duration?: number
  backdropShow?: boolean //render anim komponenty vraci null. objevi se a zacne se animovat pri backdropShow===true. Pri backdropShow===false provede animaci a render vrati null
}

//easing: https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js
const elastic = (bounciness = 1) => {
  const p = bounciness * Math.PI
  return t => 1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p)
}

export class AnimatedView extends React.Component<ReactNative.ViewProperties & { anim?: IAnim, onPress?}> {

  render() {
    const { animatedValue, animation, props: { onPress, anim: { propName, targetValue, duration, backdropShow } } } = this
    if (backdropShow === true /*zacatek animace backdropu*/) this.hideAfterAnim = false
    if (this.hideAfterAnim /*pri poslednim ukonceni backdropu animace se nastavilo hideAfterAnim*/) return null
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...this.props.style as any as CSSProperties,
    }
    let animValue: any
    if (isNaN(targetValue))
      animValue = 0
    else if (animatedValue) { //druhy a dalsi RENDER
      if (animation) animation.stop()
      this.animation = Animated.timing(animatedValue, { toValue: targetValue, duration: duration || App.Consts.animationDurationMsec, delay: 1 })
      this.animation.start(res => { delete this.animation; if (backdropShow === false) { this.hideAfterAnim = true; this.forceUpdate() } })
      animValue = animatedValue
    } else { //prvni RENDER
      animValue = this.animatedValue = new Animated.Value(targetValue)
      if (backdropShow === false) this.hideAfterAnim = true //backdrop je schovan
    }
    if (this.hideAfterAnim) return null //prvni backdrop render => render je prazdny
    const anim = <AnimatedView2 style={{ [propName]: animValue }} className={renderCSS(style)}>{this.props.children}</AnimatedView2>
    return onPress ? <div onClick={onPress}>{anim}</div> : anim
  }

  animatedValue: Animated.Value
  animation: ReactNative.Animated.CompositeAnimation
  hideAfterAnim: boolean

}

export class AnimatedView3 extends React.PureComponent<ReactNative.ViewProperties & { anim?: IAnim, onPress?}> {

  render() {
    const { lastValue, animate, div, props: { onPress, anim: { targetValue, propName, duration, backdropShow } } } = this
    if (backdropShow === true /*zacatek animace backdropu*/) this.hideAfterAnim = false
    if (this.hideAfterAnim /*pri poslednim ukonceni backdropu animace se nastavilo hideAfterAnim*/) return null
    const startAnimation = async (div: HTMLElement) => {
      this.lastValue = div.style[propName]
      this.animate = new TweensAnimate(div, (duration || App.Consts.animationDurationMsec) / 1000, { [propName]: targetValue })
      await this.animate
      if (backdropShow === false) { this.hideAfterAnim = true; this.forceUpdate() }
    }
    let doStartAnimation: (div: HTMLElement) => void = null
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...this.props.style as any as CSSProperties,
    }
    if (isNaN(targetValue))
      this.lastValue = 0
    else if (typeof lastValue != 'undefined') { //druhy a dalsi RENDER
      if (animate) animate.stop()
      if (!div) doStartAnimation = startAnimation //prvni animace: DIV jeste neexistuje, zacatek animace proved v REF={}...
      else startAnimation(div)
    } else { //prvni RENDER, init values
      this.lastValue = targetValue
      if (backdropShow === false) this.hideAfterAnim = true
    }
    if (this.hideAfterAnim) return null
    return <div onClick={onPress} ref={div => { this.div = div; if (div && doStartAnimation) doStartAnimation(div) }} style={{ [propName]: this.lastValue }} className={renderCSS(style)}>{this.props.children}</div>
  }

  animate: TweensAnimate
  div: HTMLElement
  lastValue
  hideAfterAnim: boolean

}


export const Container = View
export const Header = View
export const Footer = View
export const Content = View

//const ViewStyle: CSSProperties = {
//  display: 'flex',
//  flexDirection: 'column',
//  //alignItems: 'stretch',
//  //borderWidth: 0,
//  //borderStyle: 'solid',
//  //boxSizing: 'border-box',
//  //margin: 0,
//  //padding: 0,
//  //position: 'relative',
//  //// fix flexbox bugs
//  //minHeight: 0,
//  //minWidth: 0,
//};