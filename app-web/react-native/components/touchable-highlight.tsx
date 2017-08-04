import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from 'web-fela';
import { ViewStyle, ClickHandler } from './lib';
import ReactNative from 'react-native'

export type IWebTouchableHighlight = ReactNative.TouchableHighlightProperties & {children?};

//D:\rw\know-how\react-native-web\src\components\Touchable\TouchableHighlight.js
export const TouchableHighlight = (props: IWebTouchableHighlight) => {

  const {
    activeOpacity = 0.85,
    underlayColor = 'black',
    onPress,
    children,
    //onHideUnderlay, onShowUnderlay, style, //avoid TS Error
    ...otherPropsTyped
    } = props;
  const otherProps = otherPropsTyped as any;

  ClickHandler(onPress, otherProps);

  const styles: CSSProperties = {
    ...ViewStyle,
    position: 'relative',
    overflow: 'hidden',
  };

  const afterStyles: CSSProperties = {
    content: '',
    display: 'block',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0,
    transitionDuration: '0.25s',
    transitionProperty: 'opacity',
    backgroundColor: underlayColor,
    ':active': {
        opacity: 1 - activeOpacity
    },
  };


  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-touchable-highlight ' + renderCSS(styles);

  return <div {...otherProps} >{children}<div className={renderCSS(afterStyles)}></div></div>;
}
