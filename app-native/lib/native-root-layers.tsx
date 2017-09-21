//https://blog.bam.tech/developper-news/5-tips-to-make-a-great-component-to-page-animation-in-react-native
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
import { LayoutAnimation, NativeModules, BackHandler, Platform } from "react-native";
import { connectStyle } from 'native-base-shoutem-theme'
import mapPropsToStyleNames from 'native-base/src/Utils/mapPropsToStyleNames'
import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'
import { Font, Asset, Constants } from 'expo'
import { View, Fab, Container, Content, Header, Footer, Left, Body, Right, Text, Button, Title, Subtitle, Icon } from 'native-base';


export const getAnimator = (div: WebNativeCommon.TRouterAnimRoot, display: boolean) => new PromiseExtensible(resolve => resolve())

export const AnimationRoot: React.ComponentType<Router.TRefForAnimation> = props => <View>{props.children}</View>

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
const { UIManager } = NativeModules
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)


//*** ROOT LAYERS PROVIDER
export const Provider: React.SFC<{}> = props => <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
  <RouterProvider ref={routerProvider => {
    //PATCH routerProvider.setState
    //console.log('RouterProvider ')
    const oldSetState = routerProvider.setState
    routerProvider.setState = ((...args) => {
      //console.log('RouterProvider.setState', pr['selector'].props)
      //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      LayoutAnimation.configureNext(animConfig)
      oldSetState.call(routerProvider, ...args)
    })
  }} />
  <BlockGuiComp zIndex={blockGuiZindex} />
  <RecorderButton />
  <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
  <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} />
</View>

//https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js
const animConfig = { duration: 200, create: { type: LayoutAnimation.Types.easeOut, property: LayoutAnimation.Properties.opacity, } }

//export const Provider = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(provider);

//*** NAVIGATOR
//export const AppNavigator = DrawerNavigator({
//  Drawer: {
//    screen: StackNavigator({
//      Modal: {
//        screen: RouterProvider,
//        navigationOptions: ({ navigation }) => ({
//          header: null
//        })
//        //navigationOptions: ({ navigation }) => {
//        //  const route = navigation.state.params as Router.IState
//        //  return {
//        //    headerTitle: `${route.params['title'].substr(10)}`,
//        //    headerRight: <Text>RIGHT</Text>,
//        //    headerLeft: <Text onPress={goBack}>LEFT</Text>
//        //  }
//        //}
//      }
//    })
//  },
//  Root: {
//    screen: RouterProvider
//  },
//}, {
//    contentComponent: props => <Text>DRAWER</Text>
//  })

//const navigProvider: React.SFC<{ navProp, dispatch }> = ({ navProp, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: navProp })} />

//const NavigProvider = connect((state: IState) => ({ navProp: state.router }))(navigProvider);

//*** PAGE TEMPLATE

export const PageTemplate: React.SFC<GUI.IPageTemplateProps> = (props) => {
  const { content, headerNode, headerProps, footerNode, footerProps } = props
  let left: React.ReactNode = null
  let right: React.ReactNode = null
  const toText = (nd: React.ReactNode) => typeof nd == 'string' ? <Text>{nd}</Text> : nd
  const toPress = (onPress: () => void) => onPress || (() => { })
  if (headerProps)
    switch (headerProps.type) {
      case GUI.PageHeaderType.modalOKCancel:
        left = <Button transparent onPress={toPress(headerProps.onOK)}>
          <Icon name={GUI.IonicNames.close} />
        </Button>
        right = <Button success onPress={toPress(headerProps.onCancel)}>
          <Icon name={GUI.IonicNames.checkmark} />
          {toText(headerProps.okText)}
        </Button>
        break
      case GUI.PageHeaderType.modalOK:
        left = <Button transparent onPress={toPress(headerProps.onOK)}>
          <Icon name={GUI.IonicNames.arrowBack} />
        </Button>
        right = toText(headerProps.right)
        break
      case GUI.PageHeaderType.drawer:
        left = <Button transparent onPress={toPress(headerProps.onDrawer)}>
          <Icon name={GUI.IonicNames.menu} />
        </Button>
        right = toText(headerProps.right)
        break
      case GUI.PageHeaderType.other:
        right = toText(headerProps.right)
        left = toText(headerProps.left)
        break
    }
  return <Container>
    {headerProps &&
      <Header key={0} style={{ justifyContent: 'space-between' }}>
        <Left key={0}>{left}</Left>
        <Body key={1}>
          <Title key={0} >{headerProps.bodyTitle}</Title>
          {headerProps.bodySubtitle && <Subtitle key={1} >{headerProps.bodySubtitle}</Subtitle>}
        </Body>
        <Right key={2}>{right}</Right>
      </Header>}
    {headerNode && !headerProps && <Header key={0}>{toText(headerNode)}</Header>}
    <Content key={1} >
      {content}
    </Content>
    {footerProps && <FooterProvider {...footerProps}/>}
    {footerNode && !footerProps && <Footer key={2}>{toText(footerNode)}</Footer>}
  </Container>
}

const footerProvider: React.SFC<GUI.IPageFooterProps> = props => <Footer style={{ justifyContent: 'flex-end', alignContent: 'center', flexDirection: 'row' }}>
  {props.actions.map((act, idx) => <Button key={idx} transparent onPress={act.onPress}>
    <Icon name={act.icon} style={{ color: 'white' }} />
  </Button>)}
  <Button key={999} transparent onPress={() => { }}>
    <Icon name={GUI.IonicNames.more} style={{ color: 'white' }} />
  </Button>
</Footer>

const FooterProvider = footerConnector(footerProvider)
//console.log(getTheme()['NativeBase.Header'])

//const styles = {
//  container: { flex: 1 } as ViewStyle,
//  header: {},//justifyContent: 'space-between', flexDirection: 'row', alignContent: 'center', backgroundColor: 'blue' } as ViewStyle,
//  headerStyleProvider: {
//    'NativeBase.ViewNB': {
//      '.hdr-header': getTheme()['NativeBase.Header'],
//      '.hdr-left': getTheme()['NativeBase.Left'],
//      '.hdr-body': getTheme()['NativeBase.Body'],
//      '.hdr-right': getTheme()['NativeBase.Right'],
//      '.hdr-title': getTheme()['NativeBase.Title'],
//      '.hdr-subTitle': getTheme()['NativeBase.Subtitle'],
//    },
//  },
//  left: {},// alignSelf: 'flex-start' } as ViewStyle,
//  body: {},// alignSelf: 'center', flexDirection: 'column' } as ViewStyle,
//  title: {},// alignSelf: 'center' } as ViewStyle,
//  subTitle: {},// alignSelf: 'center' } as ViewStyle,
//  right: {},//alignSelf: 'flex-end', flexDirection: 'row' } as ViewStyle,
//  content: { flex: 1 } as ViewStyle,
//  footer: { justifyContent: 'space-between', flexDirection: 'row' } as ViewStyle,
//}