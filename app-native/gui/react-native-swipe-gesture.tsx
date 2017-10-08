import React from 'react'
import { Dimensions, View, PanResponder, PanResponderInstance } from 'react-native'

const config = {
  edgeLen: 50,
  clickTolerance: 10,
  minOffset: 50,
  offsetRatio: 0.4,
}

export class Swiper extends React.PureComponent<GUI.ISwiperProps> {

  panResponder: PanResponderInstance
  deviceScreen = Dimensions.get('window')

  componentWillMount() {
    const onPanResponderRelease = this.onPanResponderRelease.bind(this)
    const onStartShouldSetPanResponder = this.onStartShouldSetPanResponder.bind(this)
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: onStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: onStartShouldSetPanResponder,
      onPanResponderRelease: onPanResponderRelease,
      onPanResponderTerminate: onPanResponderRelease
    });
  }

  onStartShouldSetPanResponder(e: ReactNative.GestureResponderEvent, gestureState: ReactNative.PanResponderGestureState) {
    return e.nativeEvent.touches.length === 1 && (Math.abs(gestureState.dx) > config.clickTolerance || Math.abs(gestureState.dy) > config.clickTolerance)
  }

  //_gestureIsClick(gestureState: ReactNative.PanResponderGestureState) {
  //  return Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5;
  //}

  onPanResponderRelease(e: ReactNative.GestureResponderEvent, gestureState: ReactNative.PanResponderGestureState) {
    const swipeDirection = this.getSwipeDirection(e, gestureState)
    this.triggerSwipeHandlers(swipeDirection, gestureState, e)
  }

  triggerSwipeHandlers(swipeDirection: GUI.swipeDirections, gestureState: ReactNative.PanResponderGestureState, e: ReactNative.GestureResponderEvent) {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props
    onSwipe && onSwipe(swipeDirection, gestureState, e)
    const { moveX, moveY, dx, dy } = gestureState
    const { width, height } = this.deviceScreen
    switch (swipeDirection) {
      case GUI.swipeDirections.SWIPE_RIGHT:
        onSwipeRight && onSwipeRight(moveX - dx < config.edgeLen, gestureState, e)
        break
      case GUI.swipeDirections.SWIPE_LEFT:
        onSwipeLeft && onSwipeLeft(moveX - dx > width - config.edgeLen, gestureState, e)
        break
      case GUI.swipeDirections.SWIPE_DOWN:
        onSwipeDown && onSwipeDown(moveY - dy < config.edgeLen, gestureState, e)
        break
      case GUI.swipeDirections.SWIPE_UP:
        onSwipeUp && onSwipeUp(moveY - dy > height - config.edgeLen, gestureState, e)
        break
    }
  }

  getSwipeDirection(e: ReactNative.GestureResponderEvent, gestureState: ReactNative.PanResponderGestureState): GUI.swipeDirections {
    const isValidSwipe = (velocity: number, offset: number, otherOffset: number) => {
      //return Math.abs(velocity) > swipeConfig.velocityThreshold && Math.abs(directionalOffset) < swipeConfig.directionalOffsetThreshold;
      return Math.abs(offset) > config.minOffset && Math.abs(otherOffset / offset) < config.offsetRatio
    }

    const { vx, dy, vy, dx } = gestureState
    console.log(dx, dy)
    if (isValidSwipe(vx, dx, dy))
      return dx > 0 ? GUI.swipeDirections.SWIPE_RIGHT : GUI.swipeDirections.SWIPE_LEFT
    else if (isValidSwipe(vy, dy, dx))
      return dy > 0 ? GUI.swipeDirections.SWIPE_DOWN : GUI.swipeDirections.SWIPE_UP
    else
      return null
  }

  render() {
    return (<View {...this.props} {...this.panResponder.panHandlers} />)
  }
}