import React from 'react';
import { renderCSS } from '../lib/fela'
import Animated from 'animated'

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

interface IAnimation {
  cancel: () => void
}
interface IAnim {
  propName: string
  targetValue: number
}
export class AnimatedView extends React.Component<ReactNative.ViewProperties & { anim?: IAnim } & React.ClassAttributes<AnimatedView>> {

  componentWillReceiveProps(nextProps, nextContext) {
    const { anim: { targetValue } } = nextProps
    if (targetValue === false || typeof targetValue == 'undefined') return
    const { animation, animatedValue } = this
    if (animation) animation.stop()
    //easing: https://github.com/facebook/react-native/blob/master/Libraries/Animated/src/Easing.js
    this.animation = Animated.timing(animatedValue, { toValue: nextProps.anim.targetValue, duration: 125})
    //this.animation = Animated.spring(animatedValue, { toValue: nextProps.anim.targetValue })
    setTimeout(() => this.animation.start(res => { delete this.animation }), 1)
  }

  cancel() {
    const { animation } = this
    if (animation) animation.stop()
  }

  render() {
    const { animatedValue, props: { anim: { propName }} } = this
    const style: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...this.props.style as any as CSSProperties,
    }
    return <AnimatedView2 style={{ [propName]: animatedValue }} className={renderCSS(style)}>{this.props.children}</AnimatedView2 >
  }

  animatedValue = new Animated.Value(this.props.anim.targetValue)
  animation: ReactNative.Animated.CompositeAnimation
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