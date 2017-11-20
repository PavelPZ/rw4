import React from 'react'
import { View, TouchableWithoutFeedback, Animated, Easing, Platform, Text, LayoutRectangle } from 'react-native';

import withStyles, { StyleRulesCallback, WithStyles } from '../styles/withStyles'

export interface IButtonBaseProps {
  disabled?: boolean
  disableRipple?: boolean
  onClick: () => void
  rootRef?: React.Ref<any>
  style?: RN.ViewStyle
}

export type ButtonBaseClassKeyView = 'root' | 'ripple' | 'disabled'

type IButtonBaseStyle = Record<ButtonBaseClassKeyView, RN.ViewStyle>

export const styles: StyleRulesCallback<IButtonBaseStyle> = theme => ({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    backgroundColor: theme.palette.common.black
  },
  disabled: {
  }
})

const maxOpacity = 0.12
const buttonBase: React.SFC<IButtonBaseProps & WithStyles<IButtonBaseStyle>> = props => {
  const {
    classes,
    style,
    children,
    disabled,
    disableRipple,
    onClick,
    ...other
  } = props

  const actStyle = {
    ...classes.root || null,
    ...(disabled && classes.disabled) || null,
    ...style || null,
  }

  let ripple: RippleEffect
  let rect: LayoutRectangle
  return <TouchableWithoutFeedback disabled={disabled} onPress={onClick} onPressIn={() => ripple && ripple.onPressedIn(rect)} onPressOut={() => ripple && ripple.onPressedOut()} onLayout={({ nativeEvent: { layout } }) => rect = layout}>
    <View style={actStyle}>
      {!disabled && !disableRipple && <RippleEffect style={classes.ripple} ref={rv => ripple = rv} />}
      {children}
    </View>
  </TouchableWithoutFeedback>
}

class RippleEffect extends React.PureComponent<{ style: RN.ViewStyle }> {
  state: Partial<LayoutRectangle> = {}
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
  onPressedIn(layout: LayoutRectangle) {
    console.log('onPressedIn', layout)
    if (!layout) return
    this.clear()
    this.scale = Animated.timing(this.scaleValue, {
      toValue: 1,
      duration: 225,
      easing: Easing.bezier(0.0, 0.0, 0.2, 1),
      useNativeDriver: Platform.OS === 'android',
    })
    this.scale.start()
    const { width, height } = layout
    const { width: stWidth, height: stHeight } = this.state
    if (width !== stWidth || height != stHeight) this.setState(layout)
  }
  onPressedOut() {
    console.log('onPressedOut')
    this.opacity = Animated.timing(this.opacityValue, {
      duration: 225,
      toValue: 0,
      useNativeDriver: Platform.OS === 'android',
    })
    this.opacity.start(() => this.clear())
  }
  render() {
    const { scaleValue, opacityValue, state: { width, height }, props: { style: st } } = this
    if (!width || !height) return null
    const radius = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2))

    const style = {
      ...st,
      position: 'absolute',
      left: -(radius - width / 2),
      top: - (radius - height / 2),
      width: radius * 2,
      height: radius * 2,
      borderRadius: radius,
      transform: [{ scale: scaleValue }],
      opacity: opacityValue,
    }

    //console.log(radius, style, this.props)

    return <Animated.View style={style} />
  }
}

const ButtonBase = withStyles(styles)<IButtonBaseProps>(buttonBase)

export default ButtonBase