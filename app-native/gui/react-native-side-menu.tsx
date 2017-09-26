import React from 'react'
import { Text, StyleSheet, PanResponder, PanResponderInstance, PanResponderGestureState, GestureResponderEvent, View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'

type TAnimationFunction = <T extends Animated.AnimationConfig = Animated.AnimationConfig>(
  value: Animated.AnimatedValue | Animated.AnimatedValueXY,
  config: T | number | Animated.AnimatedValue | { x: number, y: number } | Animated.AnimatedValueXY
) => Animated.CompositeAnimation

export interface IProps {
  edgeHitWidth?: number //60
  toleranceX?: number //10
  toleranceY?: number //10
  isRight?: boolean//false
  animationFunction?: TAnimationFunction
  onChange?: Function
  isOpen?: boolean //false
  autoClosing?: boolean //true
  menu?: JSX.Element
  animationStyle?: (value: Animated.Value | number) => ReactNative.ViewStyle
  fixed?: boolean //LM extension
  style?: ReactNative.ViewStyle
}

export default class SideMenu extends React.PureComponent<IProps> {
  responder: PanResponderInstance
  prevLeft = 0 //0 pro zavrene, openMenuOffset pro otevrene menu
  isOpen = this.props.isOpen
  isMenuCreated = this.props.isOpen && true
  deviceScreen = Dimensions.get('window')
  width = this.deviceScreen.width
  height = this.deviceScreen.height
  barrierForward = this.deviceScreen.width / 4
  openMenuOffset = this.deviceScreen.width * (2 / 3)
  left: Animated.Value
  value: number //0..1 pri open, 1..0 pri close

  constructor(props: IProps) {
    super(props)

    this.left = new Animated.Value(props.isOpen ? this.openMenuOffset * this.menuPositionMultiplier() : 0)
    this.left.addListener(({ value }) => { this.value = Math.abs(value / this.openMenuOffset); /*console.log(this.value)*/ })
  }

  componentWillMount(): void {
    this.responder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this),
      onPanResponderTerminate: this.onPanResponderRelease.bind(this),
      onStartShouldSetResponderCapture: () => true
    } as any)
  }

  componentWillReceiveProps(props: IProps): void {
    if (typeof props.isOpen !== 'undefined' && this.isOpen !== props.isOpen && (props.autoClosing || this.isOpen === false)) {
      this.openMenu(props.isOpen)
    }
  }

  menuPositionMultiplier() {
    return this.props.isRight ? -1 : 1
  }

  onPanResponderMove(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    //console.log(gestureState.dx, gestureState.vx, gestureState.moveX) //vx je rychlost, moveX je souradnice POINTERu
    this.left.setValue(this.prevLeft + gestureState.dx) //dx je celkova delka x-move v pixelech. Kladna pro otevirani, zaporna pro zavirani
  }

  onPanResponderRelease(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    const offsetLeft = this.menuPositionMultiplier() * (this.value + gestureState.dx)
    this.openMenu(offsetLeft > this.barrierForward)
  }

  onMoveShouldSetPanResponder(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean {
    const x = Math.round(Math.abs(gestureState.dx))
    const y = Math.round(Math.abs(gestureState.dy))

    const touchMoved = x > this.props.toleranceX && y < this.props.toleranceY

    if (this.isOpen) {
      return touchMoved
    }

    const withinEdgeHitWidth = this.props.isRight ?
      gestureState.moveX > (this.deviceScreen.width - this.props.edgeHitWidth) :
      gestureState.moveX < this.props.edgeHitWidth

    const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0
    return withinEdgeHitWidth && touchMoved && swipingToOpen
  }

  openMenu(isOpen: boolean): void {

    const moveLeft = (offset: number) => {
      const newOffset = this.menuPositionMultiplier() * offset
      this.props.animationFunction(this.left, newOffset).start()
      this.prevLeft = newOffset
    }

    moveLeft(isOpen ? this.openMenuOffset : 0)
    this.isOpen = isOpen
    if (isOpen) this.isMenuCreated = true

    //this.forceUpdate()
    if (!isOpen) setTimeout(() => this.props.onChange(isOpen),150)
  }

  render() {

    const { width, height, openMenuOffset } = this
    const animatedStyle = [styles.animatedStyle, this.props.animationStyle(this.left),]
    //const animatedStyle = [styles.animatedStyle, { height, right: 0 }, this.props.animationStyle(this.left),]
    const menuStyle = this.props.isRight ? { left: width - openMenuOffset } : { right: width - openMenuOffset } //set LEFT or RIGHT position

    return <View style={[styles.container, this.props.style]} >
      <View key={1} style={[styles.menu, menuStyle]}><Text>{count++}</Text>{this.isMenuCreated && this.props.menu}</View>
      <Animated.View key={2} style={animatedStyle} {...this.props.fixed && this.isOpen ? {} : this.responder.panHandlers}>
        {this.props.children}
        {!this.props.fixed && this.isOpen && <TouchableWithoutFeedback onPress={() => this.openMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>}
      </Animated.View>
    </View>
  }
}

let count = 0

SideMenu['defaultProps'] = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60, 
  children: null,
  menu: null,
  onChange: () => { },
  isRight: false,
  //animationStyle: (value: number) => ({
  //  transform: [{
  //    scaleX: value,
  //  }],
  //}),
  //animationStyle: (value: number) => ({
  //  transform: [{
  //    translateX: value,
  //  }],
  //}),
  animationStyle: (value: number) => ({
    left: value
  }),
  //animationFunction: (prop, value) => Animated.timing(prop, {
  //  toValue: value,
  //  duration: 300,
  //}),
  //https://stackoverflow.com/questions/34677717/react-native-animated-spring-speed
  animationFunction: (prop, value) => Animated.spring(prop, {
    toValue: value,
    speed: 24,
    bounciness: 4
  }),
  isOpen: false,
  autoClosing: true,
} as IProps

const absoluteStretch = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
} as ReactNative.ViewStyle

const styles = {
  container: { //ROOT, obsahuje animated a menu
    ...absoluteStretch,
    //justifyContent: 'center',
  } as ReactNative.ViewStyle,
  menu: { //obsah menu
    ...absoluteStretch,
  },
  animatedStyle: { //animated, obsahuje overlay
    ...absoluteStretch,
    flex: 1,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  } as ReactNative.ViewStyle,
  overlay: {
    ...absoluteStretch,
    //LM extension
    backgroundColor: 'lightgray',
    opacity: 0.8
    //backgroundColor: 'transparent',
  } as ReactNative.ViewStyle,
}