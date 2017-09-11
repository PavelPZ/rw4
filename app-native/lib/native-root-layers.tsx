import React from 'react'
import { connect } from 'react-redux'

import { Provider as RouterProvider, goBack, canGoBack } from '../../app-common/lib/router'
import { Icon } from '../../app-common/gui/gui'
import { providerConnector as recordingProviderConnector, blockGuiConnector } from '../../app-common/lib/recording'

import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation'
import { View, ViewProperties, BackHandler, Platform } from "react-native";
import { connectStyle } from 'native-base-shoutem-theme'
import mapPropsToStyleNames from 'native-base/src/Utils/mapPropsToStyleNames'
import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'
import { Font, Asset, Constants } from 'expo'
import { Fab, Container, Content, Header, Footer, Left, Body, Right, Text, Button } from 'native-base';

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

//*** ROOT LAYERS PROVIDER
export const Provider: React.SFC<{}> = props => <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
  <NavigProvider />
  <BlockGuiComp zIndex={blockGuiZindex} />
  <RecorderButton />
  <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
  <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} />
</View>

//export const Provider = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(provider);

//*** NAVIGATOR
export const AppNavigator = DrawerNavigator({
  Drawer: {
    screen: StackNavigator({
      Modal: {
        screen: RouterProvider,
        navigationOptions: ({ navigation }) => ({
          header:null
        })
        //navigationOptions: ({ navigation }) => {
        //  const route = navigation.state.params as Router.IState
        //  return {
        //    headerTitle: `${route.params['title'].substr(10)}`,
        //    headerRight: <Text>RIGHT</Text>,
        //    headerLeft: <Text onPress={goBack}>LEFT</Text>
        //  }
        //}
      }
    })
  },
  Root: {
    screen: RouterProvider
  },
}, {
    contentComponent: props => <Text>DRAWER</Text>
  })

const navigProvider: React.SFC<{ navProp, dispatch }> = ({ navProp, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: navProp })} />

const NavigProvider = connect((state: IState) => ({ navProp: state.router }))(navigProvider);

//*** PAGE TEMPLATE

export const PageHeader: React.SFC<GUI.IPageTemplateProps> = (props) => {
  const { content, footer, header } = props
  const toText = (nd: React.ReactNode) => typeof nd == 'string' ? <Text>{nd}</Text> : nd
  let left: React.ReactNode = null
  let right: React.ReactNode = null
  switch (header.type) {
    case GUI.PageHeaderType.modalOKCancel:
      left = <Button transparent>
        <Icon name={GUI.IonicNames.close} />
      </Button>
      right = <Button success>
        <Icon name={GUI.IonicNames.checkmark} />
      </Button>
      break
    case GUI.PageHeaderType.modalOK:
      left = <Button transparent>
        <Icon name={GUI.IonicNames.arrowBack} />
      </Button>
      right = toText(header.right)
      break
    case GUI.PageHeaderType.drawer:
      left = <Button transparent>
        <Icon name={GUI.IonicNames.menu} />
      </Button>
      right = toText(header.right)
      break
    case GUI.PageHeaderType.other:
      right = toText(header.right)
      left = toText(header.left)
      break
  }
  return <Container style={{ flex: 1 }}>
    <Header key={0}>
      <Left key={0}>{left}</Left>
      <Body key={1}>{toText(header.body)}</Body>
      <Right key={2}>{right}</Right>
    </Header>
    <Content key={1}>
      {content}
    </Content>
    {footer && <Footer key={2}>{toText(footer)}</Footer>}
  </Container>
}