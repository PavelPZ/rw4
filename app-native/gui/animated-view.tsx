import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native'

export class AnimatedView extends React.Component<GUI.IAnimatedViewProps> {

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
    const anim = <Animated.View style={{ ...style, [propName]: animValue }}>{this.props.children}</Animated.View>
    return onPress ? <TouchableWithoutFeedback onPress={onPress}>{anim}</TouchableWithoutFeedback> : anim
  }

  animatedValue: Animated.Value
  animation: ReactNative.Animated.CompositeAnimation
  hideAfterAnim: boolean

}