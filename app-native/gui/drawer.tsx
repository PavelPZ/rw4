import React from 'react';
import { View, Animated, TouchableWithoutFeedback, PanResponder } from 'react-native'

export class AnimatedDrawer extends React.PureComponent<GUI.IAnimatedMobileDrawerProps> {
  rendered: boolean
  value = new Animated.Value(this.props.drawerVisible ? 1 : 0)
  animation: ReactNative.Animated.CompositeAnimation

  render() {
    const { animation, rendered, value, props } = this
    const { isTablet, duration, content, menu, drawerVisible: willBeVisible, drawerWidth, showDrawer, screenWidth } = props
    const doAnimation = (willBeVisible: boolean, newDrawerState?: boolean) => {
      this.animation = Animated.timing(value, { toValue: willBeVisible ? 1 : 0, duration: duration || App.Consts.animationDurationMsec, delay: 1 })
      this.animation.start(() => { this.animation = null; if (typeof (newDrawerState) != 'undefined') showDrawer(newDrawerState) })
    }
    if (animation) { animation.stop(); this.animation = null }
    const opacityValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, 0, 0.85] })
    const leftValue = value.interpolate({ inputRange: [0, 1], outputRange: [-drawerWidth, 0] })
    const widthValue = isTablet ? null : value.interpolate({ inputRange: [0, 0.1, 1], outputRange: [0, screenWidth, screenWidth] })
    if (!rendered)
      this.rendered = true
    else {
      doAnimation(willBeVisible)
    }

    const uninterpolate = (dx: number, hide?: boolean) => {
      let val = (hide ? drawerWidth + dx : dx) / drawerWidth
      return val < 0 ? 0 : (val > 1 ? 1 : val)
    }
    const dxStart = 0.11 * drawerWidth

    const onPanResponderRelease = (e, gestureState) => { if (uninterpolate(gestureState.dx) > 0.4/*pomer sirky draweru, po kterem se drawer otevre*/) doAnimation(true, true); else doAnimation(false) }
    const toVisibleHandlers = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => {
        if (e.nativeEvent.pageX > (isTablet ? 60 : 40 /*sirka pruhu vlevo, citriveho na drag start*/) || (gestureState.dx > 10 && Math.abs(gestureState.dy) < 10)) return false
        value.setValue(0.11)
        return true
      },
      onPanResponderMove: (e, gestureState) => value.setValue(uninterpolate(gestureState.dx + dxStart)),
      onPanResponderRelease: onPanResponderRelease,
      onPanResponderTerminate: onPanResponderRelease,
    })
    const onHideResponderRelease = (e, gestureState) => { if (gestureState.dx < -40) doAnimation(false, false) }
    const toHideHandlers = PanResponder.create({
      onMoveShouldSetPanResponderCapture: (e, gestureState) => gestureState.dx < -10 && Math.abs(gestureState.dy) < 10,
      onPanResponderMove: (e, gestureState) => value.setValue(uninterpolate(gestureState.dx, true)),
      onPanResponderRelease: onHideResponderRelease,
      onPanResponderTerminate: onHideResponderRelease
    })

    if (isTablet)
      return <View style={absoluteStretch as any} {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers}>
        <Animated.View style={{ left: leftValue as any, position: 'absolute', top: 0, right: 0, bottom: 0, flexDirection: 'row' }} >
          {React.cloneElement(menu, { ...menu.props, key: 1, style: { ...menu.props.style, width: drawerWidth } })}
          {React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, flex: 1 } })}
        </Animated.View>
      </View>
    else
      return <View style={absoluteStretch as any} {...!willBeVisible ? toVisibleHandlers.panHandlers : toHideHandlers.panHandlers}>
        {React.cloneElement(content, { ...content.props, key: 0, style: { ...content.props.style, ...absoluteStretch } })}
        <TouchableWithoutFeedback key={1} onPress={() => showDrawer(false)}>
          <Animated.View style={{ opacity: opacityValue as any, width: widthValue as any, ...topBottom, left: 0, backgroundColor: 'gray' }} />
        </TouchableWithoutFeedback>
        <Animated.View key={2} style={{ left: leftValue as any, ...topBottom, width: drawerWidth }} >
          {React.cloneElement(menu, { ...menu.props, style: { ...menu.props.style, flex: 1 } })}
        </Animated.View>
      </View>
  }
}

const absoluteStretch = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const topBottom = { position: 'absolute', top: 0, bottom: 0 }
