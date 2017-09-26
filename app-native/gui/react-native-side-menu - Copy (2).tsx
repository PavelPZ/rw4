import React from 'react'
import { Text, StyleSheet, PanResponder, PanResponderInstance, PanResponderGestureState, GestureResponderEvent, View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'

type TAnimationFunction = <T extends Animated.AnimationConfig = Animated.AnimationConfig>(
  value: Animated.AnimatedValue | Animated.AnimatedValueXY,
  config: T | number | Animated.AnimatedValue | { x: number, y: number } | Animated.AnimatedValueXY
) => Animated.CompositeAnimation

export interface IProps {
  isRight?: boolean//false
  onChange?: (isOpen: boolean) => void
  initIsOpen?: boolean //false
  menu?: JSX.Element
  fixed?: boolean //LM extension
  style?: ReactNative.ViewStyle
}

//interval, kdy se zacina MOVE. Pro CLOSE: dal se jiz nic netestuje. Pro OPEN: testuje se jeste ydali je move uvnitr 0..edgeHitWidth a MOVE je vetsi nez barrierForward
const edgeHitWidth = 60
const toleranceX = 10
const toleranceY = 10

export default class SideMenu extends React.PureComponent<IProps> {
  responder: PanResponderInstance
  prevLeft = 0 //0 pro zavrene, openMenuOffset pro otevrene menu. Ridi zaklad pro DRAG fazi (k prevLeft se pripocte gestureState.dx)
  deviceScreen = Dimensions.get('window')
  width = this.deviceScreen.width
  barrierForward = this.deviceScreen.width / 4 //pro OPEN: jak velky pohyb je minimalne potreba, aby se pri ukonceni pohybu dokoncila animace
  openMenuOffset = this.deviceScreen.width * (2 / 3)
  left: Animated.Value
  animationFunction: TAnimationFunction //https://stackoverflow.com/questions/34677717/react-native-animated-spring-speed
  animationStyle: (value: Animated.Value) => {}
  state = { isOpen: this.props.initIsOpen}

  constructor(props: IProps) {
    super(props)
    this.left = new Animated.Value(this.state.isOpen ? this.openMenuOffset * this.menuPositionMultiplier() : 0)
    this.animationFunction = (prop, value) => Animated.spring(prop, { toValue: value, speed: 24, bounciness: 4 })
    this.animationStyle = value => (props.fixed ? { left: value } : { transform: [{ translateX: value }]})
  }

  componentWillMount(): void {
    this.responder = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShouldSetPanResponder.bind(this),
      onPanResponderMove: this.onPanResponderMove.bind(this),
      onPanResponderRelease: this.onPanResponderRelease.bind(this),
      onPanResponderTerminate: this.onPanResponderRelease.bind(this),
      //onStartShouldSetResponderCapture: event => true
    })
  }

  componentWillReceiveProps(props: IProps): void {
    this.openMenu(props.initIsOpen) 
  }

  menuPositionMultiplier() {
    return this.props.isRight ? -1 : 1
  }

  onPanResponderMove(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    //console.log(gestureState.dx, gestureState.vx, gestureState.moveX) //vx je rychlost, moveX je souradnice POINTERu
    this.left.setValue(this.prevLeft + gestureState.dx) //dx je celkova delka x-move v pixelech. Kladna pro otevirani, zaporna pro zavirani
  }

  onPanResponderRelease(e: GestureResponderEvent, gestureState: PanResponderGestureState) {
    //const offsetLeft = this.menuPositionMultiplier() * (this.value + gestureState.dx)
    if (this.state.isOpen) this.openMenu(false)
    else {
      const offsetLeft = this.menuPositionMultiplier() * gestureState.dx
      //kontrola velikosti MOVE:
      if (offsetLeft > this.barrierForward) this.openMenu(true) //ok => dokonci OPEN
      else this.openMenu(false) //navrat animace pri nedostatecnem move, menu zustane CLOSED
    }
  }

  onMoveShouldSetPanResponder(e: GestureResponderEvent, gestureState: PanResponderGestureState): boolean {
    const x = Math.round(Math.abs(gestureState.dx))
    const y = Math.round(Math.abs(gestureState.dy))

    const touchMoved = x > toleranceX && y < toleranceY

    if (this.state.isOpen) return touchMoved

    const withinEdgeHitWidth = this.props.isRight ?
      gestureState.moveX > (this.deviceScreen.width - edgeHitWidth) :
      gestureState.moveX < edgeHitWidth

    const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0
    return withinEdgeHitWidth && touchMoved && swipingToOpen
  }

  openMenu(isOpen: boolean): void {

    const newOffset = this.menuPositionMultiplier() * (isOpen ? this.openMenuOffset : 0)
    this.animationFunction(this.left, newOffset).start()

    this.prevLeft = newOffset
    if (this.state.isOpen == isOpen) return //pouze navrat animace pri nedostatecnem MOVE

    this.setState({ isOpen })
    if (this.props.onChange) {
      if (isOpen) this.props.onChange(isOpen)
      else setTimeout(() => this.props.onChange(isOpen), 150)
    }
  }

  render() {

    const { width, openMenuOffset, left, responder, state: { isOpen }, props: { style, menu, fixed, children }  }  = this
    const animatedStyle = [styles.animatedStyle, this.animationStyle(left),]
    const menuStyle = this.props.isRight ? { left: width - openMenuOffset } : { right: width - openMenuOffset } //set LEFT or RIGHT position

    //MENU existuje (po prvnim objeveni) stale. Odkryva a zakryva se Animated.View s obsahem a ev. TouchableWithoutFeedback backDropem
    return <View style={[styles.container, style]} >
      <View key={1} style={[styles.menu, menuStyle]}><Text>{count++}</Text>{menu}</View>
      <Animated.View key={2} style={animatedStyle} {...fixed ? {} : responder.panHandlers}>
        {children}
        {!fixed && isOpen && <TouchableWithoutFeedback onPress={() => this.openMenu(false)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>}
      </Animated.View>
    </View>
  }
}

let count = 0

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
    backgroundColor: 'white',
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