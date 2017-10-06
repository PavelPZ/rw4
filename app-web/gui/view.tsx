import React from 'react';
import { renderCSS } from '../lib/fela'
import { ViewProperties } from 'react-native'

//export type IWebView = ViewProperties;

//D:\rw\know-how\react-native-web\src\components\View\index.js
export const View: React.SFC<ViewProperties> = props => {
  const { style, ...otherPropsTyped } = props

  const ruleProps: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    ...style as any as CSSProperties
  }

  return <div {...otherPropsTyped as any} className={renderCSS(ruleProps)} />
}
class View2 extends React.PureComponent<ViewProperties> {
  render() {
    const props = this.props
    const { style, ...otherPropsTyped } = props

    const ruleProps: CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      ...style as any as CSSProperties
    }

    return <div {...otherPropsTyped as any} className={renderCSS(ruleProps)} />
  }
}

export const Container = View
export const Header = View
export const Footer = View
export const Content = View

//const ViewStyle: CSSProperties = {
//  display: 'flex',
//  flexDirection: 'column',
//  //alignItems: 'stretch',
//  //borderWidth: 0,
//  //borderStyle: 'solid',
//  //boxSizing: 'border-box',
//  //margin: 0,
//  //padding: 0,
//  //position: 'relative',
//  //// fix flexbox bugs
//  //minHeight: 0,
//  //minWidth: 0,
//};