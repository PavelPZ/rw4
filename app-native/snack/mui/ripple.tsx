import React, { PureComponent } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, Easing, Platform, Text } from 'react-native';
import Icon from 'rw-controls/icon/icon-n'
import { Ionicons, IconProps } from '@expo/vector-icons'

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  iconContainer: {
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray',
  } as RN.ViewStyle,
});

const maxOpacity = 0.12
const Ripple: React.SFC<{ color: string; icon: GUI.mdi_icons }> = ({ color, icon }) => {
  let ripple
  return <TouchableWithoutFeedback onPressIn={ripple.onPressedIn} onPressOut={ripple.onPressedOut}>
    <View style={styles.iconContainer}>
      <RippleView color={color} ref={rv => ripple = rv} />
      <View>
        <Text style={{ color: 'white' }}>ICON START</Text>
        <Ionicons name="md-checkmark-circle" size={32} color="yellow" />
        {/*<Icon src={icon} size={size} color={color} />*/}
        <Text style={{ color: 'white' }}>ICON END</Text>
      </View>
    </View>
  </TouchableWithoutFeedback>
}

class RippleView extends React.PureComponent<{color:string}> {
  state = {
    width: 0,
    height: 0,
  }
  scaleValue = new Animated.Value(0.01)
  opacityValue = new Animated.Value(maxOpacity)
  scale: Animated.CompositeAnimation
  opacity: Animated.CompositeAnimation
  clear() {
    const { scale, opacity } = this
    if (scale) scale.stop(); delete this.scale
    if (opacity) opacity.stop(); delete this.opacity
    this.scaleValue.setValue(0.01);
    this.opacityValue.setValue(maxOpacity);
  }
  onPressedIn() {
    this.clear()
    this.scale = Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    })
    this.scale.start()
  }
  onPressedOut() {
    this.opacity = Animated.timing(this.opacityValue, {
      duration: 225,
      toValue: 0,
      useNativeDriver: Platform.OS === 'android',
    })
    this.opacity.start(() => this.clear())
  }
  render() {
    const { scaleValue, opacityValue, state: { width, height }, props: { color } } = this
    const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))

    const style = {
      position: 'absolute',
      left: -(radius - width / 2),
      top: - (radius - height / 2),
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      transform: [{ scale: scaleValue }],
      opacity: opacityValue,
      backgroundColor: color || 'black',
    }

    //console.log(radius, style, this.props)

    return <Animated.View style={style} />
  }
}

class TestPage extends PureComponent {
  render() {
    return (
      <View style={styles.pageContainer}>
        <Text>START</Text>
        <Ripple icon={GUI.mdi_icons.star} color='yellow' />
        <Text>END</Text>
      </View>
    );
  }
}

export default TestPage;

//        <IconToggle icon={GUI.mdi_icons.star} color='black' width={80} height={40} />
