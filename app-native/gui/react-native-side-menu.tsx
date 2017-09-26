import React from 'react'
import { StyleSheet, PanResponder, View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'

export interface IProps {
  edgeHitWidth?: number //60
  toleranceX?: number //10
  toleranceY?: number //10
  isRight?: boolean//false
  animationFunction?: Function
  onChange?: Function
  isOpen?: boolean //false
  autoClosing?: boolean //true
  menu?: JSX.Element
  animationStyle?: (value: Animated.Value | number) => ReactNative.ViewStyle
  fixed?: boolean //LM extension
  style?: ReactNative.ViewStyle
}

export default class SideMenu extends React.PureComponent<IProps> {
  responder
  onMoveShouldSetPanResponder: Function
  onPanResponderMove: Function
  onPanResponderRelease: Function
  onPanResponderTerminate: Function
  prevLeft = 0
  isOpen = this.props.isOpen
  isMenuCreated = this.props.isOpen && true
  deviceScreen = Dimensions.get('window')
  width = this.deviceScreen.width
  height = this.deviceScreen.height
  barrierForward = this.deviceScreen.width / 4
  openMenuOffset = this.deviceScreen.width * (2 / 3)
  left: Animated.Value
  value:number

  constructor(props: IProps) {
    super(props)

    this.left = new Animated.Value(props.isOpen ? this.openMenuOffset * this.menuPositionMultiplier() : 0)
    this.left.addListener(({ value }) => this.value = Math.abs(value / this.openMenuOffset))


    this.onMoveShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
    this.onPanResponderMove = this.handlePanResponderMove.bind(this)
    this.onPanResponderRelease = this.handlePanResponderEnd.bind(this)
    this.onPanResponderTerminate = this.handlePanResponderEnd.bind(this)
  }

  shouldOpenMenu(dx: number): boolean {
    return dx > this.barrierForward
  }

  componentWillMount(): void {
    this.responder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onStartShouldSetResponderCapture: () => true
    } as any)
  }

  componentWillReceiveProps(props: IProps): void {
    if (typeof props.isOpen !== 'undefined' && this.isOpen !== props.isOpen && (props.autoClosing || this.isOpen === false)) {
      this.openMenu(props.isOpen)
    }
  }

  moveLeft(offset: number) {
    const newOffset = this.menuPositionMultiplier() * offset

    this.props.animationFunction(this.left, newOffset).start()

    this.prevLeft = newOffset
  }

  menuPositionMultiplier() {
    return this.props.isRight ? -1 : 1
  }

  handlePanResponderMove(e: Object, gestureState) {
    if ((this.left as any).__getValue() * this.menuPositionMultiplier() >= 0) {
      let newLeft = this.prevLeft + gestureState.dx
      this.left.setValue(newLeft)
    }
  }

  handlePanResponderEnd(e: Object, gestureState) {
    const offsetLeft = this.menuPositionMultiplier() *
      ((this.left as any).__getValue() + gestureState.dx)

    this.openMenu(this.shouldOpenMenu(offsetLeft))
  }

  handleMoveShouldSetPanResponder(e: any, gestureState: any): boolean {
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
    const { openMenuOffset } = this;
    this.moveLeft(isOpen ? openMenuOffset : 0)
    this.isOpen = isOpen
    if (isOpen) this.isMenuCreated = true

    this.forceUpdate()
    this.props.onChange(isOpen)
  }

  render() {

    const { width, height, openMenuOffset } = this
    const animatedStyle = [styles.frontView, { width, height }, this.props.animationStyle(this.left),]
    const menuStyle = this.props.isRight ? { left: width - openMenuOffset } : { right: width - openMenuOffset } //set LEFT or RIGHT position

    return <View style={[styles.container, this.props.style]} >
      <View key={1} style={[styles.menu, menuStyle]}>{this.isMenuCreated && this.props.menu}</View>
      <Animated.View key={2} style={animatedStyle} {...this.props.fixed && this.isOpen ? {} : this.responder.panHandlers}>
        {this.props.children}
        {!this.props.fixed && this.isOpen && <TouchableWithoutFeedback onPress={() => this.openMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>}
      </Animated.View>
    </View>
  }
}

SideMenu['defaultProps'] = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  onChange: () => { },
  isRight: false,
  animationStyle: (value: number) => ({
    transform: [{
      translateX: value,
    }],
  }),
  animationFunction: (prop, value) => Animated.spring(prop, {
    toValue: value,
    friction: 8,
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
  container: {
    ...absoluteStretch,
    //justifyContent: 'center',
  } as ReactNative.ViewStyle,
  menu: {
    ...absoluteStretch,
  },
  frontView: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
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