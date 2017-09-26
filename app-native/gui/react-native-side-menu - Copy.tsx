﻿import React from 'react'
import { StyleSheet, PanResponder, View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'

export interface IProps {
  edgeHitWidth?: number //60
  toleranceX?: number //10
  toleranceY?: number //10
  menuPosition?: 'start' | 'end' //left
  onChange?: Function
  onMove?: Function
  onSliding?: Function
  openMenuOffset?: number //deviceScreen.width * (2 / 3),
  hiddenMenuOffset?: number
  disableGestures?: Function | boolean //false
  animationFunction?: Function
  onStartShouldSetResponderCapture?: Function
  isOpen?: boolean //false
  bounceBackOnOverdraw?: boolean //true
  autoClosing?: boolean //true
  menu?: JSX.Element
  animationStyle?: (value: Animated.Value | number) => ReactNative.ViewStyle
  fixed?: boolean //LM extension
  style?: ReactNative.ViewStyle
}

export interface ISideMenuState {
  width: number,
  height: number,
  openOffsetMenuPercentage: number,
  openMenuOffset: number,
  hiddenMenuOffsetPercentage: number,
  hiddenMenuOffset: number,
  left: Animated.Value,
}

interface IWindowDimensions { width: number, height: number }

export interface IEvent {
  nativeEvent: {
    layout: {
      width: number,
      height: number,
    },
  },
}

const deviceScreen: IWindowDimensions = Dimensions.get('window')
const barrierForward: number = deviceScreen.width / 4

function shouldOpenMenu(dx: number): boolean {
  return dx > barrierForward;
}



export default class SideMenu extends React.PureComponent <IProps, ISideMenuState> {
  //onLayoutChange: Function;
  responder
  onStartShouldSetResponderCapture
  onMoveShouldSetPanResponder: Function
  onPanResponderMove: Function
  onPanResponderRelease: Function
  onPanResponderTerminate: Function
  prevLeft = 0
  isOpen = this.props.isOpen
  isMenuCreated = this.props.isOpen && true 

  constructor(props) {
    super(props)

    //this.prevLeft = 0;
    //this.isOpen = !!props.isOpen

    const initialMenuPositionMultiplier = props.menuPosition === 'right' ? -1 : 1
    const openOffsetMenuPercentage = props.openMenuOffset / deviceScreen.width
    const hiddenMenuOffsetPercentage = props.hiddenMenuOffset / deviceScreen.width
    const left: Animated.Value = new Animated.Value(
      props.isOpen
        ? props.openMenuOffset * initialMenuPositionMultiplier
        : props.hiddenMenuOffset,
    );

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onStartShouldSetResponderCapture = props.onStartShouldSetResponderCapture.bind(this)
    this.onMoveShouldSetPanResponder = this.handleMoveShouldSetPanResponder.bind(this)
    this.onPanResponderMove = this.handlePanResponderMove.bind(this)
    this.onPanResponderRelease = this.handlePanResponderEnd.bind(this)
    this.onPanResponderTerminate = this.handlePanResponderEnd.bind(this)

    this.state = {
      width: deviceScreen.width,
      height: deviceScreen.height,
      openOffsetMenuPercentage,
      openMenuOffset: deviceScreen.width * openOffsetMenuPercentage,
      hiddenMenuOffsetPercentage,
      hiddenMenuOffset: deviceScreen.width * hiddenMenuOffsetPercentage,
      left,
    }

    this.state.left.addListener(({ value }) => this.props.onSliding(Math.abs((value - this.state.hiddenMenuOffset) / (this.state.openMenuOffset - this.state.hiddenMenuOffset))))
  }

  componentWillMount(): void {
    this.responder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
      onPanResponderTerminate: this.onPanResponderTerminate,
      onStartShouldSetResponderCapture: this.onStartShouldSetResponderCapture,
    } as any)
  }

  componentWillReceiveProps(props: IProps): void {
    if (typeof props.isOpen !== 'undefined' && this.isOpen !== props.isOpen && (props.autoClosing || this.isOpen === false)) {
      this.openMenu(props.isOpen)
    }
  }

  onLayoutChange(e: IEvent) {
    const { width, height } = e.nativeEvent.layout
    const openMenuOffset = width * this.state.openOffsetMenuPercentage
    const hiddenMenuOffset = width * this.state.hiddenMenuOffsetPercentage
    this.setState({ width, height, openMenuOffset, hiddenMenuOffset })
  }

  moveLeft(offset: number) {
    const newOffset = this.menuPositionMultiplier() * offset

    this.props.animationFunction(this.state.left, newOffset).start()

    this.prevLeft = newOffset
  }

  menuPositionMultiplier(): -1 | 1 {
    return this.props.menuPosition === 'end' ? -1 : 1
  }

  handlePanResponderMove(e: Object, gestureState) {
    if ((this.state.left as any).__getValue() * this.menuPositionMultiplier() >= 0) {
      let newLeft = this.prevLeft + gestureState.dx

      if (!this.props.bounceBackOnOverdraw && Math.abs(newLeft) > this.state.openMenuOffset) {
        newLeft = this.menuPositionMultiplier() * this.state.openMenuOffset
      }

      this.props.onMove(newLeft)
      this.state.left.setValue(newLeft)
    }
  }

  handlePanResponderEnd(e: Object, gestureState) {
    const offsetLeft = this.menuPositionMultiplier() *
      ((this.state.left as any).__getValue() + gestureState.dx)

    this.openMenu(shouldOpenMenu(offsetLeft))
  }

  handleMoveShouldSetPanResponder(e: any, gestureState: any): boolean {
    if (this.gesturesAreEnabled()) {
      const x = Math.round(Math.abs(gestureState.dx))
      const y = Math.round(Math.abs(gestureState.dy))

      const touchMoved = x > this.props.toleranceX && y < this.props.toleranceY

      if (this.isOpen) {
        return touchMoved
      }

      const withinEdgeHitWidth = this.props.menuPosition === 'end' ?
        gestureState.moveX > (deviceScreen.width - this.props.edgeHitWidth) :
        gestureState.moveX < this.props.edgeHitWidth

      const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0
      return withinEdgeHitWidth && touchMoved && swipingToOpen
    }

    return false;
  }

  openMenu(isOpen: boolean): void {
    const { hiddenMenuOffset, openMenuOffset } = this.state;
    this.moveLeft(isOpen ? openMenuOffset : hiddenMenuOffset)
    this.isOpen = isOpen
    if (isOpen) this.isMenuCreated = true

    this.forceUpdate()
    this.props.onChange(isOpen)
  }

  gesturesAreEnabled(): boolean {
    const { disableGestures } = this.props
    return typeof disableGestures === 'function' ? !disableGestures() : !disableGestures
  }

  render() {

    const { width, height } = this.state
    const animatedStyle = [ styles.frontView, { width, height }, this.props.animationStyle(this.state.left), ]
    const menuStyle = {[this.props.menuPosition === 'end' ? 'left' : 'right']: this.state.width - this.state.openMenuOffset } //set LEFT or RIGHT position

    return <View style={[styles.container, this.props.style]} onLayout={this.onLayoutChange} >
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

const provider = connect<{ isOpen?: boolean, fixed?: boolean }, {}, IProps>((state: IState) => ({ isOpen: true, fixed: true }))
class SideMenu2 extends React.PureComponent<IProps> {
  render() { return null }
}
const SideMenuStore = provider(SideMenu)


SideMenu['defaultProps'] = {
  toleranceY: 10,
  toleranceX: 10,
  edgeHitWidth: 60,
  children: null,
  menu: null,
  openMenuOffset: deviceScreen.width * (2 / 3),
  disableGestures: false,
  menuPosition: 'start',
  hiddenMenuOffset: 0,
  onMove: () => { },
  onStartShouldSetResponderCapture: () => true,
  onChange: () => { },
  onSliding: () => { },
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
  bounceBackOnOverdraw: true,
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