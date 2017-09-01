//********** LIBRARIES
import React from 'react'
import { View, Text } from 'react-native'

class AppComp extends React.Component { render() { return <Text>Hallo world</Text> } }

import { Provider as ReduxProvider, connect } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import { addNavigationHelpers, NavigationActions, DrawerNavigator } from 'react-navigation';

//********** COMMON
import { WaitForRendering, promiseAll } from './app-common/lib/lib'
import { reducer as routerReducer, middleware as routerMiddleware, init as initRouter } from './app-common/lib/router'
import { init as initRecording, reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/lib/recording'
import { Provider as LocProvider, reducer as locReducer} from './app-common/lib/loc'

//********** NATIVE specific
import createHistory from 'history/createMemoryHistory'
import { Provider as RecordingProvider } from './app-native/lib/nat-recording'

//************ aplikace k testovani

import { AppRouterComp } from './app-common/snack/app-router'
//class AppComp extends React.Component { render() { return <Text>Hallo world</Text> } }
//import AppComp from './app-native/snack/redux-simple';
//import AppComp from './app-native/snack/navigation';
//import AppComp from './app-native/snack/navigation/navigation-redux';
//import AppComp from './app-native/snack/navigation/playground/App';
//import AppComp from './app-native/snack/assets';
//import AppComp from './app-native/snack/navigation/redux/index';
//import AppComp from './app-native/snack/navigation/stack';
//import AppComp from './app-native/snack/navigation/stack-detailed';
//import { AppRouterComp } from './app-native/snack/navigation/app-navigation';
//import AppComp from './app-common/snack/react-navigation';  
//import AppComp from './app-native/snack/icons';

const AppNavigator = DrawerNavigator({
  ...AppRouterComp.nativeScreenDef()
})

const routerProvider: React.SFC<{ navProp, dispatch }> = ({ navProp, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: navProp })} />

const RouterProvider = connect(state => ({ navProp: state.router }))(routerProvider);

export const init = async () => {
  window.lmGlobal = {
    isNative: true,
    platform: {
      loginPlatform: null,
      recordingPlatform: { guiSize: Recording.TGuiSize.no },
      restAPIPlatform: { serviceUrl: 'http://localhost:3434/rest-api.ashx' }, //NEFUNGUJE
      routerPlatform: {
        startRoute: AppRouterComp.getRoute({ title: 'START TITLE | xxx' }),
        history: createHistory() as Router.IHistory,
        computeState: (act, st) => AppNavigator.router.getStateForAction({ ...act, type: 'Navigation/NAVIGATE' }, st),
        rootUrl: '/web-app.html'
      }
    }
  }

  const reducers: App.IReducer = (st, action: any) => {
    const state = recordingGlobalReducer(st, action)
    return {
      router: routerReducer(state.router, action),
      recording: recordingReducer(state.recording, action),
      loc: locReducer(state.loc, action),
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  await promiseAll([
    initRecording()
  ])

  const store = window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  await promiseAll([
    initRouter(),
  ])

  function* rootSaga() {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }

  sagaMiddleware.run(rootSaga)

  const appAll = <ReduxProvider store={store}>
    <LocProvider>
      <RecordingProvider>
        <RouterProvider />
      </RecordingProvider>
    </LocProvider>
  </ReduxProvider>

  return new Promise<JSX.Element>(resolve => resolve(appAll))
}

const Root: React.SFC = () => <WaitForRendering finalContent={init()} waitContent={<View style={{ marginTop: 20 }}><Text style={{ fontSize: 24 }}>Waiting...</Text></View>} />

//export default Root;
export default AppComp;