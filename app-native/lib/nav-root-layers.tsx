import React from 'react'
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation'
import { connect } from 'react-redux'
import { View, ViewProperties, Text } from "react-native";
import { connectStyle } from 'native-base-shoutem-theme'
import mapPropsToStyleNames from 'native-base/src/Utils/mapPropsToStyleNames'
import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'

//COMMON
import { Provider as RouterProvider } from '../../app-common/lib/router'
import { providerConnector as recordingProviderConnector, blockGuiConnector } from '../../app-common/lib/recording'

//*** BLOCK GUI
const blockGui: React.SFC<BlockGui.IState> = props => props.state == BlockGui.State.no ? null :
  <View style={{ justifyContent: 'center', alignItems: 'center', zIndex: 99, elevation: 99, flex: 1, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
const BlockGuiComp = blockGuiConnector(blockGui)

//*** RECORDER
const Btn: React.SFC<{ title: string; click: () => void }> = props =>
  <View style={{ zIndex: 100, elevation: 100, position: 'absolute', left: 10, bottom: 10 }} >
    <Text onPress={props.click}>{props.title}</Text>
  </View>

const PlayAllBtn: React.SFC<Recording.IProps> = props => {
  if (props.playLists && props.playLists.length > 0 && props.mode == Recording.TModes.no) return <Btn title='PLAY ALL' click={() => props.playStart(allSelected(props.playLists.length))} />
  if (props.mode == Recording.TModes.playing) return <Btn title='CANCEL' click={props.playCancel} />
  return null
}
const allSelected = (len: number) => { const res = []; for (let i = 0; i < len; i++) res[i] = i; return res }

const recorderButton: React.SFC<Recording.IProps> = props => {
  switch (props.guiSize) {
    case Recording.TGuiSize.no: return null
    case Recording.TGuiSize.icon: return <PlayAllBtn {...props}/>
    default: throw 'not implemented'
  }
}

const RecorderButton = recordingProviderConnector(recorderButton)

//*** PROVIDER AND NAVIGATOR
class provider extends React.Component<ViewProperties> {
  _root
  render() {
    return (
      <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
        <NavigProvider />
        <BlockGuiComp />
        <RecorderButton/>
        <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} />
        <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} />
      </View>
    );
  }
}

export const Provider = connectStyle("NativeBase.Root", {}, mapPropsToStyleNames)(provider);

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
