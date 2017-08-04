import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from 'web-fela';
import { ViewStyle } from './lib';
import ReactNative from 'react-native'

export type IWebView = ReactNative.ViewProperties;

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View = (props: IWebView) =>  {

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
