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

//******************* ANIMATED animace, pomuze ladeni v REACT NATIVE
//react-native-animatable: https://snack.expo.io/SJfJguhrW
//https://blog.bam.tech/developper-news/5-tips-to-make-a-great-component-to-page-animation-in-react-native

class animated$View extends React.Component<any> {
  render() { return <div style={this.props.style as any} className={this.props.className}>{this.props.children}</div> }
}

export const Animated$View: React.ComponentType<any> = Animated.createAnimatedComponent(animated$View)

//easing: https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js
const elastic = (bounciness = 1) => {
  const p = bounciness * Math.PI
  return t => 1 - Math.pow(Math.cos(t * Math.PI / 2), 3) * Math.cos(t * p)
}

export class AnimatedView3 extends React.Component<GUI.IAnimatedViewProps> {

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
    const anim = <Animated$View style={{ [propName]: animValue }} className={renderCSS(style)}>{this.props.children}</Animated$View>
    return onPress ? <div onClick={onPress}>{anim}</div> : anim
  }

  animatedValue: Animated.Value
  animation: ReactNative.Animated.CompositeAnimation
  hideAfterAnim: boolean

}

export const Swiper: React.SFC<GUI.ISwiperProps> = props => {
  const { onSwipe, onSwipeDown, onSwipeRight, onSwipeLeft, onSwipeUp, ...rest } = props
  return <View {...rest} />
}

//******************* GSAP animace pro web
export class AnimatedView extends React.PureComponent<GUI.IAnimatedViewProps> {

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
