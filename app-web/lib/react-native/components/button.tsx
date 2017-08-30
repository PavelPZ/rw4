import React from 'react'
import PropTypes from 'prop-types'
import { renderCSSs } from 'web-fela'
import { MouseHandler } from './lib'
import ReactNative from 'react-native'
import { Button as MDButton } from '../../react-md'

export type IWebButton = ReactNative.ButtonProperties & DReactNative.ButtonEx; // & IWebProps;

//D:\rw\know-how\react-native-web\src\components\Button\index.js
//https://github.com/facebook/react-native/blob/master/Libraries/Components/Button.js
export const Button = (props: IWebButton) => {

  const {
    title,
    onPress,
    color,
    primary = true,
    //children,
    //tabIndex,
    //flat,
    ...otherPropsTyped
    } = props;
  
  return <MDButton {...otherPropsTyped} primary={primary} raised onClick={MouseHandler(onPress)}>{title}</MDButton>
}
