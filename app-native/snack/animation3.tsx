import React from 'react'

import {
  StyleSheet,
  Animated,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

var ACTION_TIMER = 1000;

var COLORS = ['blue', 'green'];

export default class AnimatedButtonPress extends React.PureComponent {

  state = {
    pressAction: new Animated.Value(0),
    textComplete: '',
    buttonWidth: 120,
    buttonHeight: 30
  }

  _value = 0

  componentWillMount() {
    console.log(this.state)
    this.state.pressAction.addListener((v) => this._value = v.value);
  }

  handlePressIn() {
    const th = this
    console.log('handlePressIn')
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(res => th.animationActionComplete(res));
  }

  handlePressOut() {
    console.log('handlePressOut')
    Animated.timing(this.state.pressAction, {
      duration: this._value * ACTION_TIMER,
      toValue: 0
    }).start();
  }

  animationActionComplete(res: Animated.EndResult) {
    console.log('animationActionComplete: ', res)
    this.setState({ textComplete: res.finished ? 'You held it long enough to fire the action!' : '' })
  }

  getButtonWidthLayout(e: ReactNative.LayoutChangeEvent) {

    //!!!! not called
    //const st = {
    //  buttonWidth: e.nativeEvent.layout.width - 6,
    //  buttonHeight: 30
    //}
    //console.log('getButtonWidthLayout', e, st)
    //this.setState(st)
  }

  getProgressStyles() {
    var width = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.buttonWidth]
    });
    var bgColor = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS
    })
    const res = {
      width: width,
      height: this.state.buttonHeight,
      backgroundColor: bgColor
    }
    return res
  }

  render() {
    const th = this
    return <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={() => th.handlePressIn()} onPressOut={() => th.handlePressOut()} >
        <View style={styles.button} onLayout={e => th.getButtonWidthLayout(e)}>
          <Animated.View style={[styles.bgFill, th.getProgressStyles()]} />
          <Text style={styles.text}>Press And Hold Me</Text>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Text>{this.state.textComplete}</Text>
      </View>
    </View>
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  } as ReactNative.ViewStyle,
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: 'black'
  },
  text: {
    color: 'black'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0,
  }
}

