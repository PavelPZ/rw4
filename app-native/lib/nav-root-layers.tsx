import React from 'react'
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { View, ViewProperties } from "react-native";
import { connectStyle } from 'native-base-shoutem-theme'
import mapPropsToStyleNames from 'native-base/src/Utils/mapPropsToStyleNames'
import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'
import { Font, Asset } from 'expo'
import { Fab, Icon } from 'native-base';

//INIT NATIVE-BASE
export const init = async () => {
  await Font.loadAsync({
    'Roboto': require('native-base/Fonts/Roboto.ttf'),
    'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
  })
}

//COMMON
import { Provider as RouterProvider } from '../../app-common/lib/router'
import { providerConnector as recordingProviderConnector, blockGuiConnector } from '../../app-common/lib/recording'

//*** BLOCK GUI
const blockGuiComp: React.SFC<BlockGui.IState> = props => props.state == BlockGui.State.no ? null :
  <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: 99, elevation: 99, flex: 1, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
const BlockGuiComp = blockGuiConnector(blockGuiComp)

//*** RECORDER
const Btn: React.SFC<{ play?: boolean; click: () => void }> = props =>
  <Fab active onPress={props.click} position="bottomLeft" style={{ backgroundColor: '#5067FF' }} direction="up" containerStyle={{ zIndex: 100, elevation:100 }}>
    <Icon name={props.play ? 'play' : 'md-pause'} />
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
class provider extends React.Component<ViewProperties> {
  _root
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
        <NavigProvider />
        <BlockGuiComp />
        <RecorderButton />
        <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
        <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} />
      </View>
    );
  }
}

export const Provider = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(provider);

//*** NAVIGATOR
export const AppNavigator = DrawerNavigator({
  Drawer: {
    screen: StackNavigator({
      Modal: {
        screen: RouterProvider
      }
    })
  },
  Root: {
    screen: RouterProvider
  }
})

const navigProvider: React.SFC<{ navProp, dispatch }> = ({ navProp, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: navProp })} />

const NavigProvider = connect((state: IState) => ({ navProp: state.router }))(navigProvider);
