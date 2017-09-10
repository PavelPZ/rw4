import React from 'react';
import PropTypes from 'prop-types';
import { renderCSS } from '../lib/fela'
import { MouseHandler } from './lib';
import { TextProperties } from 'react-native';

//export type IWebText = ReactNative.TextProperties

//d:\rw\know-how\react-native-web\src\components\Text\index.js
export const Text: React.SFC<TextProperties> = props => {
  const {
    numberOfLines,
    onPress,
    selectable,
    style,
    ...otherPropsTyped
  } = props;
  const otherProps = otherPropsTyped as CSSProperties & { className };

  const st = style as any as CSSProperties; //vadi textShadowColor, fontWeight, textAlign, transform
  if (st && st.textDecorationLine) { st.textDecoration = st.textDecorationLine; delete st.textDecorationLine; } 

  // allow browsers to automatically infer the language writing direction
  //if (otherProps != undefined) otherProps.dir = 'auto';

  const ruleProps: CSSProperties = {
    borderWidth: 0,
    font: 'inherit',
    margin: 0,
    padding: 0,
    textDecorationLine: 'none',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    ...(selectable === false ? { userSelect: 'none' } as CSSProperties : null),
    ...(numberOfLines === 1 ? {
      maxWidth: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    } as CSSProperties : null),
    ...(onPress ? { cursor: 'pointer' } : null),
    ...st
  };

  if (!otherProps.className) otherProps.className = '';
  otherProps.className += ' component-text ' + renderCSS(ruleProps);

  return <div {...otherProps as any} onClick={MouseHandler(onPress)} />;
};

