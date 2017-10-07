import React from 'react'
import { Button, Text, StyleSheet, PanResponder, PanResponderInstance, PanResponderGestureState, GestureResponderEvent, View, Dimensions, Animated, TouchableWithoutFeedback } from 'react-native'

import { connect } from 'react-redux'

type TAnimationFunction = <T extends Animated.AnimationConfig = Animated.AnimationConfig>(
  value: Animated.AnimatedValue | Animated.AnimatedValueXY,
  config: T | number | Animated.AnimatedValue | { x: number, y: number } | Animated.AnimatedValueXY
) => Animated.CompositeAnimation

export interface IProps {
  isRight?: boolean//false
  windowSize?: Media.TWindowSize

  //onChange?: (isOpen: boolean) => void
  //initIsOpen?: boolean //false
  menuContent?: (props?) => JSX.Element
  content?: (props?) => JSX.Element
  fixed?: boolean //LM extension
  style?: ReactNative.ViewStyle
}

//interval, kdy se zacina MOVE. Pro CLOSE: dal se jiz nic netestuje. Pro OPEN: testuje se jeste zdali je move uvnitr 0..edgeHitWidth a MOVE je vetsi nez barrierForward
const edgeHitWidth = 60
const toleranceX = 10
const toleranceY = 10

export default class SideMenu extends React.PureComponent<IProps> {
  responder: PanResponderInstance
  deviceScreen = Dimensions.get('window')
  width = this.deviceScreen.width
  barrierForward = this.deviceScreen.width / 4 //pro OPEN: jak velky pohyb je minimalne potreba, aby se pri ukonceni pohybu dokoncila animace
  openMenuOffset = this.deviceScreen.width * (2 / 3)
  animProp: Animated.Value
  animationFunction: TAnimationFunction //https://stackoverflow.com/questions/34677717/react-native-animated-spring-speed
  state = { isOpen: this.props.windowSize != Media.TWindowSize.mobile }
  value:number

  constructor(props: IProps) {
    super(props)
    const { props: { windowSize }, state: { isOpen } } = this
    if (windowSize != Media.TWindowSize.desktop) {
      this.animProp = new Animated.Value(windowSize == Media.TWindowSize.mobile ? this.mobileAnimValue(isOpen) : this.tabletAnimValue(isOpen))
      this.animProp.addListener(({ value }) => this.value = value)
      //this.animationFunction = (animProp, toValue) => Animated.spring(animProp, { toValue, speed: 24, bounciness: 4 })
      this.animationFunction = (animProp, toValue) => Animated.spring(animProp, { toValue, speed: 24, bounciness: 1 })
    }
    //this.animProp = new Animated.Value(this.state.isOpen ? this.openMenuOffset * this.menuPositionMultiplier() : 0)
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

  //componentWillReceiveProps(props: IProps): void {
  //  this.openMenu(props.initIsOpen)
  //}

  menuPositionMultiplier() {
    return this.props.isRight ? -1 : 1
  }

  onPanResponderMove(e: ReactNative.GestureResponderEvent, gestureState: ReactNative.PanResponderGestureState) {
    //console.log(gestureState.dx, gestureState.vx, gestureState.moveX) //vx je rychlost, moveX je souradnice POINTERu
    //this.animProp.setValue((this.state.isOpen ? this.openMenuOffset : 0) + gestureState.dx) //dx je celkova delka x-move v pixelech. Kladna pro otevirani, zaporna pro zavirani
    this.mobileMove(gestureState.dx)
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

    //if (this.state.isOpen) return false //z OPEN stavu se nejde dostat SWIPEm

    const x = Math.round(Math.abs(gestureState.dx))
    const y = Math.round(Math.abs(gestureState.dy))

    const touchMoved = x > toleranceX && y < toleranceY

    if (this.state.isOpen) return touchMoved

    const withinEdgeHitWidth = this.props.isRight ?
      gestureState.moveX > (this.deviceScreen.width - edgeHitWidth) :
      gestureState.moveX < edgeHitWidth

    const swipingToOpen = this.menuPositionMultiplier() * gestureState.dx > 0
    console.log('onMoveShouldSetPanResponder', withinEdgeHitWidth && touchMoved && swipingToOpen)
    return withinEdgeHitWidth && touchMoved && swipingToOpen
  }

  openMenu(nextOpen: boolean): void {

    const { props: { windowSize } } = this
    console.log('openMenu', windowSize, nextOpen)

    switch (windowSize) {
      case Media.TWindowSize.desktop: return
      case Media.TWindowSize.mobile: this.mobileOpen(nextOpen); break
      case Media.TWindowSize.tablet: this.tabletOpen(nextOpen); break
    }

    if (this.state.isOpen == nextOpen) return //pouze navrat animace pri nedostatecnem MOVE

    console.log('openMenu, setState', nextOpen)
    this.setState({ isOpen: nextOpen })

    //const newOffset = this.menuPositionMultiplier() * (isOpen ? this.openMenuOffset : 0)
    //const newOffset = this.targetAnimValue(nextOpen)
    //this.animationFunction(this.animProp, newOffset).start()

    //if (this.state.isOpen == nextOpen) return //pouze navrat animace pri nedostatecnem MOVE

    //this.setState({ nextOpen })
    //if (this.props.onChange) {
    //  if (isOpen) this.props.onChange(isOpen)
    //  else setTimeout(() => this.props.onChange(isOpen), 150)
    //}
  }

  targetAnimValue(isOpen: boolean) {
    return this.menuPositionMultiplier() * (isOpen ? this.openMenuOffset : 0)
  }

  render() {

    const { props: { windowSize } } = this
    switch (windowSize) {
      case Media.TWindowSize.desktop: return null
      case Media.TWindowSize.mobile: return this.mobileRender()
      case Media.TWindowSize.tablet: return null
      default: throw '?'
    }


    //const { width, openMenuOffset, animProp, responder, state: { isOpen }, props: { isRight, style, menuContent, fixed, children } } = this

    //const animatedStyle = fixed ? { left: animProp } : { transform: [{ translateX: animProp }] }

    //const menuStyle = isRight ? { left: width - openMenuOffset } : { right: width - openMenuOffset } //set LEFT or RIGHT position

    ////MENU existuje (po prvnim objeveni) stale. Odkryva a zakryva se Animated.View s obsahem a ev. TouchableWithoutFeedback backDropem
    //return <View style={[styles.container, style]} >
    //  <View key={1} style={[styles.menu, menuStyle]}><Text>{count++}</Text>{menuContent}</View>
    //  <Animated.View key={2} style={[styles.animatedStyle, animatedStyle]} {...fixed ? {} : responder.panHandlers}>
    //    {children}
    //    {!fixed && isOpen && <TouchableWithoutFeedback key={2} onPress={() => this.openMenu(false)}>
    //      <View style={styles.overlay} />
    //    </TouchableWithoutFeedback>}
    //  </Animated.View>
    //</View>
  }

  tabletAnimValue(actOpen: boolean): number {
    const { width, openMenuOffset, animProp, props: { isRight } } = this
    return actOpen ? (isRight ? width - openMenuOffset : 0) : (isRight ? width : -openMenuOffset)
  }

  tabletOpen(nextOpen: boolean): void {
  }

  mobileMove(dx: number) {
    //console.log(gestureState.dx, gestureState.vx, gestureState.moveX) //vx je rychlost, moveX je souradnice POINTERu
    //console.log(this.state.isOpen, this.mobileAnimValue(!this.state.isOpen), dx)
    this.animProp.setValue(this.mobileAnimValue(this.state.isOpen) + (this.props.isRight ? -dx : dx)) //dx je celkova delka x-move v pixelech. Kladna pro otevirani, zaporna pro zavirani
  }

  mobileAnimValue(actOpen: boolean): number {
    const { width, openMenuOffset, animProp, props: { isRight } } = this
    //return actOpen ? (isRight ? width - openMenuOffset : 0) : (isRight ? width : -openMenuOffset)
    return actOpen ? 0 : -openMenuOffset
  }

  mobileOpen(nextOpen: boolean): void {
    //const { width, openMenuOffset, animProp, props: { isRight } } = this

    //animProp.setValue(this.mobileAnimValue(!nextOpen))
    //animProp.setValue(this.value)
    //console.log('Anim from: ', this.value, 'to', this.mobileAnimValue(nextOpen), this.state.isOpen, nextOpen)

    this.animationFunction(this.animProp, this.mobileAnimValue(nextOpen)).start()
  }

  mobileRender() {

    const { width, openMenuOffset, animProp, responder, state: { isOpen }, props: { isRight, menuContent, content } } = this

    //const menuStyle = isRight ? { left: 0 } : { right: width - openMenuOffset } //set LEFT or RIGHT position

    //return <View style={[absoluteStretch, { marginTop: 24 }]}>
    //  <View style={[absoluteStretch, { backgroundColor: 'green' }]}>
    //    <Text onPress={() => this.openMenu(true)}>ZZZad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //  </View>
    //  {isOpen && false && <TouchableWithoutFeedback onPress={() => this.openMenu(false)}>
    //    <View style={[absoluteStretch, { backgroundColor: 'gray', opacity: 0.8 }]} />
    //  </TouchableWithoutFeedback>}
    //  <Animated.View style={[absoluteStretch, { transform: [{ translateX: animProp }] }]} {...responder.panHandlers}>
    //    <View style={[absoluteStretch, { backgroundColor: 'red', width: openMenuOffset }]}>
    //      <Text onPress={() => this.openMenu(false)}>DDDad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //  </Animated.View>
    //</View>

    //MENU existuje (po prvnim objeveni) stale. Odkryva a zakryva se Animated.View s obsahem a ev. TouchableWithoutFeedback backDropem
    //return <View style={styles.container} >
    //  {content(absoluteStretch)}
    //{isOpen && <TouchableWithoutFeedback key={1} onPress={() => this.openMenu(false)}>
    //  <View style={styles.overlay} />
    //</TouchableWithoutFeedback>}
    //  <Animated.View key={2} style={[styles.animatedStyle, { transform: [{ translateX: animProp }] }]} {...responder.panHandlers}>
    //    {menuContent(absoluteStretch)}
    //  </Animated.View>
    //</View>
    //transform: [{ translateX: 0 }]  left: animProp

    //************** TABLET
    //return <View style={[absoluteStretch, { marginTop: 24 }]}>
    //  <Animated.View style={[absoluteStretch, { left: animProp }]} {...responder.panHandlers}>
    //    <View style={[absoluteStretch, { backgroundColor: 'green', marginLeft: openMenuOffset }]}>
    //      <Text onPress={() => this.openMenu(true)}>YYY ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //    <View style={[absoluteStretch, { backgroundColor: 'red', width: openMenuOffset }]}>
    //      <Text onPress={() => this.openMenu(false)}>XXX fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //  </Animated.View>
    //</View>

    //************** MOBILE
    //return <View style={[absoluteStretch, { marginTop: 24 }]}>
    //  <Animated.View style={[absoluteStretch, { left: animProp, width: width + openMenuOffset, flexDirection: 'row' }]} {...responder.panHandlers}>
    //    <View style={[{ backgroundColor: 'red', width: openMenuOffset }]}>
    //      <Text onPress={() => this.openMenu(false)}>XXX fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //    <View style={{ width: width }}>
    //      <View style={[absoluteStretch, { backgroundColor: 'green' }]}>
    //        <Text onPress={() => this.openMenu(true)}>YYY ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //      </View>
    //    {isOpen && <TouchableWithoutFeedback key={1} onPress={() => this.openMenu(false)} >
    //      <View style={[absoluteStretch, { backgroundColor: 'gray', opacity: 0.8 }]}/>
    //    </TouchableWithoutFeedback>}
    //    </View>
    //  </Animated.View>
    //</View>

    //************** MOBILE OK
    //return <View style={[absoluteStretch, { marginTop: 24 }]}>
    //  <Animated.View style={[absoluteStretch, { left: animProp }]} {...responder.panHandlers}>
    //    <View style={[absoluteStretch, { marginLeft: openMenuOffset, backgroundColor: 'green' }]}>
    //      <Text onPress={() => this.openMenu(true)}>YYY ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //    {isOpen && <TouchableWithoutFeedback key={1} onPress={() => this.openMenu(false)} >
    //      <View style={[absoluteStretch, { backgroundColor: 'gray', opacity: 0.8 }]}/>
    //    </TouchableWithoutFeedback>}
    //    <View style={[absoluteStretch, { backgroundColor: 'red', width: openMenuOffset }]}>
    //      <Text onPress={() => this.openMenu(false)}>XXX fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //  </Animated.View>
    //</View>

    //************** MOBILE RIGHT
    return <View style={[absoluteStretch, { marginTop: 24 }]}>
      <Animated.View style={[absoluteStretch, { right: animProp }]} {...responder.panHandlers}>
        <View style={[absoluteStretch, { marginRight: openMenuOffset, backgroundColor: 'green', width, left:undefined }]}>
          <Text onPress={() => this.openMenu(true)}>YYY ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
        </View>
        <View style={[absoluteStretch, { backgroundColor: 'red', width: openMenuOffset, right:0, left:undefined }]}>
          <Text onPress={() => this.openMenu(false)}>XXX fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
        </View>
      </Animated.View>
    </View>


    //return <View style={[absoluteStretch, { marginTop: 24 }]}>
    //  <View style={[absoluteStretch, { backgroundColor: 'green' }]}>
    //    <Text>ZZZad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //  </View>
    //  <TouchableWithoutFeedback onPress={() => { }}>
    //    <View style={[absoluteStretch, { backgroundColor: 'gray', opacity: 0.8 }]} />
    //  </TouchableWithoutFeedback>
    //  <Animated.View style={[absoluteStretch, { transform: [{ translateX: 0 }] } ]} >
    //    <View style={[absoluteStretch, { backgroundColor: 'red', width: 200, left: 0 }]}>
    //      <Text>DDDad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
    //    </View>
    //  </Animated.View>
    //</View>

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
    flex: 1,
    marginTop: 24,
    //justifyContent: 'center',
  } as ReactNative.ViewStyle,
  menu: { //obsah menu
    ...absoluteStretch,
    backgroundColor: 'yellow',
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