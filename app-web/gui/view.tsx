import React from 'react';
import { renderCSS } from '../lib/fela'
import { ViewProperties } from 'react-native'

//export type IWebView = ViewProperties;

//D:\rw\know-how\react-native-web\src\components\View\index.js
export class View extends React.PureComponent<ViewProperties> {
  render() {
    const props = this.props
    const {
      style,
      //onTouchCancel, onTouchEnd, onTouchEndCapture, onTouchMove, onTouchStart, //avoid TS Error
      //accessibilityLabel, accessible, hitSlop, onAcccessibilityTap, onLayout, onMagicTap, pointerEvents, removeClippedSubviews,
      //testID, accessibilityComponentType, accessibilityLiveRegion, collapsable, importantForAccessibility, needsOffscreenAlphaCompositing,
      ...otherPropsTyped
    } = props;
    const otherProps = otherPropsTyped;

    const convertViewStyles = (native: ReactNative.StyleProp<ReactNative.ViewStyle>) => native as any as CSSProperties; //vadi textShadowColor, fontWeight, textAlign, transform

    const ruleProps: CSSProperties = {
      ...ViewStyle,
      ...convertViewStyles(style)
    };

    return <div {...otherProps as any} className={renderCSS(ruleProps)} />;
  }
}

//export const Container = props => {
//  debugger
//  return <View {...props} />
//}
export const Container = View
export const Header = View
export const Footer = View
export const Content = View

const ViewStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  borderWidth: 0,
  borderStyle: 'solid',
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
  position: 'relative',
  // fix flexbox bugs
  minHeight: 0,
  minWidth: 0,
};