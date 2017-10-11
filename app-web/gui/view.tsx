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
  render() { return <div {...this.props} /> }
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

//export const Swiper: React.SFC<GUI.ISwiperProps> = props => {
//  const { onSwipe, onSwipeDown, onSwipeRight, onSwipeLeft, onSwipeUp, ...rest } = props
//  return <View {...rest} />
//}

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

interface IAnimatedMobileDrawerProps {
  content: JSX.Element
  menu: JSX.Element
  visibleOpacity: [number, number]
  visibleLeft: [number, number]
  willBeVisible: boolean
  drawerWidth: number
  hideDrawer: () => void
  duration?: number
}

Animated.View = Animated$View

export class AnimatedMobileDrawer2 extends React.PureComponent<IAnimatedMobileDrawerProps> {
  rendered: boolean
  value = new Animated.Value(0)
  animation: ReactNative.Animated.CompositeAnimation
  backdropVisible: boolean
  render() {
    const { backdropVisible, animation, rendered, value, props } = this
    const { duration, visibleOpacity, visibleLeft, content, menu, willBeVisible, drawerWidth, hideDrawer } = props
    if (animation) animation.stop()
    const opacityValue = value.interpolate({ inputRange: [0, 1], outputRange: visibleOpacity })
    const leftValue = value.interpolate({ inputRange: [0, 1], outputRange: visibleLeft })
    if (!rendered)
      this.rendered = true
    else {
      if (willBeVisible /*zacatek animace backdropu*/) this.backdropVisible = true
      this.animation = Animated.timing(value, { toValue: willBeVisible ? 1 : 0, duration: duration || App.Consts.animationDurationMsec, delay: 1 })
      this.animation.start(res => { delete this.animation; if (!willBeVisible) { this.backdropVisible = false; this.forceUpdate() } })
    }
    return [
      React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, ...absoluteStretch } }),
      this.backdropVisible && <Animated.View key={1} onClick={hideDrawer} style={{ opacity: opacityValue as any, ...absoluteStretch, backgroundColor: 'gray' }} />,
      <Animated.View key={2} style={{ left: leftValue as any, position: 'absolute', top: 0, bottom: 0, width: drawerWidth, maxWidth: '85vw', display: 'flex' }} >
        {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
      </Animated.View>
    ] as any
  }
}
const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

export class AnimatedMobileDrawer extends React.PureComponent<IAnimatedMobileDrawerProps> {
  rendered: boolean
  backdropVisible: boolean
  animateMenu: gsap.TweenLite
  animateBackdrop: gsap.TweenLite
  divBackdrop: HTMLElement
  divMenu: HTMLElement

  render() {
    const { backdropVisible, animateMenu, animateBackdrop, divBackdrop, divMenu, rendered, props } = this
    const { duration, visibleOpacity, visibleLeft, content, menu, willBeVisible: tv, drawerWidth, hideDrawer } = props
    const willBeVisible = rendered ? tv : true
    let menuLeft:any = visibleLeft[willBeVisible ? 0 : 1]
    let backdropOpacity: any = visibleOpacity[willBeVisible ? 0 : 1]
    if (animateMenu) { menuLeft = divMenu.style.left; animateMenu.kill(); delete this.animateMenu } if (animateBackdrop) { backdropOpacity = divBackdrop.style.opacity; animateBackdrop.kill(); delete this.animateBackdrop }
    const doAnimate = () => {
      const { divBackdrop, divMenu, props } = this
      const { duration, visibleOpacity, visibleLeft, willBeVisible } = props
      const dur = duration || App.Consts.animationDurationMsec
      this.animateMenu = TweenLite.to(divMenu, dur / 1000, { left: visibleLeft[willBeVisible ? 1 : 0] })
      this.animateBackdrop = TweenLite.to(divBackdrop, dur / 1000, { opacity: visibleOpacity[willBeVisible ? 1 : 0], onComplete: () => { delete this.animateMenu; delete this.animateBackdrop; if (!willBeVisible) { this.backdropVisible = false; this.forceUpdate() } } })
    }
    let doAnimateInRef: (div: HTMLElement) => void
    if (!rendered)
      this.rendered = true
    else {
      if (willBeVisible /*zacatek animace backdropu*/) this.backdropVisible = true
      if (divBackdrop) doAnimate(); else doAnimateInRef = (div: HTMLElement) => {
        this.divBackdrop = div
        setTimeout(doAnimate, 1)
      }
    }
    return [
      React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, ...absoluteStretch } }),
      this.backdropVisible && <div key={1} ref={doAnimateInRef} onClick={hideDrawer} style={{ ...absoluteStretch, backgroundColor: 'gray', opacity: backdropOpacity } as CSSProperties} />,
      <div key={2} ref={div => this.divMenu = div} style={{ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, display: 'flex', left: menuLeft }} >
        {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
      </div>
    ] as any
  }
}



export const Container = View
export const Header = View
export const Footer = View
export const Content = View
