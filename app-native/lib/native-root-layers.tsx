﻿//https://blog.bam.tech/developper-news/5-tips-to-make-a-great-component-to-page-animation-in-react-native
//https://github.com/oblador/react-native-animatable
//https://github.com/leecade/react-native-swiper
//https://blog.callstack.io/react-native-animations-revisited-part-i-783143d4884
//http://browniefed.com/blog/react-native-press-and-hold-button-actions/
//https://github.com/react-native-community/react-native-tab-view
//https://github.com/skv-headless/react-native-scrollable-tab-view


import React from 'react'
import { connect } from 'react-redux'

import { Provider as RouterProvider, goBack, canGoBack } from '../../app-common/lib/router'
import { footerConnector } from '../../app-common/gui/gui'
import { PromiseExtensible } from '../../app-common/lib/lib'
import { providerConnector as recordingProviderConnector, blockGuiConnector } from '../../app-common/lib/recording'

//import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation'
import { /*LayoutAnimation, NativeModules,*/ BackHandler, Platform, Animated } from "react-native";
import { connectStyle } from 'native-base-shoutem-theme'
import mapPropsToStyleNames from 'native-base/src/Utils/mapPropsToStyleNames'
import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'
import { Font, Asset, Constants } from 'expo'
import { View, Fab, Container, Content, Header, Footer, Left, Body, Right, Text, Button, Title, Subtitle, Icon } from 'native-base';
import SideMenuLow from '../gui/react-native-side-menu'

//COMMON

//INIT NATIVE-BASE
export const init = async () => {
  //https://facebook.github.io/react-native/docs/backhandler.html
  if (Platform.OS == 'android') BackHandler.addEventListener('hardwareBackPress', () => {
    if (!canGoBack()) return false
    goBack()
    return true
  })
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  })
}

//*** BLOCK GUI
const blockGuiZindex = 99

const blockGuiComp: React.SFC<BlockGui.IProps> = props => props.state == BlockGui.State.no ? null :
  <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: props.zIndex, elevation: 99, flex: 1, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
const BlockGuiComp = blockGuiConnector(blockGuiComp)

//*** RECORDER
const Btn: React.SFC<{ play?: boolean; click: () => void }> = props =>
  <Fab active onPress={props.click} position="bottomLeft" style={{ backgroundColor: '#5067FF' }} direction="up" containerStyle={{ zIndex: blockGuiZindex + 1, elevation: 100 }}>
    <Icon name={props.play ? GUI.IonicNames.play : GUI.IonicNames.pause} />
  </Fab>


const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn play click={() => props.playStart(allSelected(props.playLists.length))} />
  if (props.mode == Recording.TModes.playing) return <Btn click={props.playCancel} />
  return null
}
const allSelected = (len: number) => { const res = []; for (let i = 0; i < len; i++) res[i] = i; return res }

const recorderButton: React.SFC<Recording.IProps> = props => {
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return null
    case Recording.TGuiSize.icon: return <PlayAllBtn {...props} />
    default: throw 'not implemented'
  }
}

const RecorderButton = recordingProviderConnector(recorderButton)

//init LayoutAnimation
//const { UIManager } = NativeModules
//UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


//*** ROOT LAYERS PROVIDER
export const Provider: React.SFC<{}> = props => <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
  <RouterProvider />
  <BlockGuiComp zIndex={blockGuiZindex} />
  <RecorderButton />
  <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
  <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} />
</View>

export class Page extends React.PureComponent<Router.TRefForAnimation & Router.IRoutePar & { menu?: JSX.Element }> {
  value = new Animated.Value(1)
  componentDidMount() { this.props.refForAnimation(this.value) }
  render() {
    return <SideMenu menu={this.props.menu} isOpen>
      <Animated.View style={{ flex: 1, opacity: this.value as any }}>
        {this.props.children}
      </Animated.View>
    </SideMenu>
  }
}

const sideMenuProvider = connect<any, {}, any>((state: IState) => null)
const SideMenu = sideMenuProvider(SideMenuLow)

//*** PAGE TEMPLATE

//**** ANIMATE
class TweensPromise extends PromiseExtensible<void> {

  constructor(private value: Animated.Value, private display: boolean) { super() }

  doStart() {
    const { value, display } = this
    value.setValue(display ? 1 : 0.05)
    const tw = Animated.timing(value, {
      duration: 125,
      toValue: display ? 0.05 : 1
    })
    value.addListener(v => console.log(v))
    tw.start(res => {
      this.resolve()
      delete this.value
    });
  }

  abort(msg?) {
    const { value, _state } = this
    if (value) value.stopAnimation()
    delete this.value
    if (_state) return this
    return this.abort(msg)
  }
}

export const getAnimator = (animValue: WebNativeCommon.TRouterAnimRoot, display: boolean) => new TweensPromise(animValue, display)
