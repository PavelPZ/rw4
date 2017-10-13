//********** LIBRARIES
import React from 'react'

import { Provider as ReduxProvider, connect } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import { Platform, Animated } from 'react-native';

//********** COMMON
import { initGUI } from './app-common/gui/gui'
import { WaitForRendering, promiseAll } from './app-common/lib/lib'
import { Provider as RouterProvider, globalReducer as globalRouterReducer, middleware as routerMiddleware, init as initRouter } from './app-common/lib/router'
import { init as initRecording, reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/lib/recording'
import { Provider as LocProvider, reducer as locReducer } from './app-common/lib/loc'
import { reducer as mediaQueryReducer } from './app-common/lib/media-query'
import { DrawerLayout } from './app-common/gui/drawer'
import { reducer as drawerReducer } from './app-common/gui/drawer'

//********** NATIVE specific
import createHistory from 'history/createMemoryHistory'
import { RecorderButton, LayerProvider, BlockGuiComp, init as initRoot, } from './app-native/gui/lib'
import { getAnimator as getRouteAnimator } from './app-native/lib/native-router'
import { AppLoading, Constants } from 'expo'
import { Icon } from './app-native/gui/icon'
import { Button } from './app-native/gui/button'
import { Content } from './app-native/gui/content'
import { AnimatedDrawer } from './app-native/gui/drawer'
import { Container, Header, Footer, Text, StyleProvider, H1, H2, H3, View } from 'native-base'
import { Theme, colorToStyle } from './app-native/gui/theme'
import { init as initMediaQuery } from './app-native/lib/native-media-query'

import { ToastContainer as Toast } from 'native-base/src/basic/ToastContainer'
import { ActionSheetContainer as ActionSheet } from 'native-base/src/basic/Actionsheet'

//************ aplikace k testovani

import { AppPage } from './app-common/snack/app-router'

//class AppComp extends React.Component { render() { return <Text>HALLO</Text>} }
//import AppComp from './app-native/snack/native-base/index'
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
//import AppComp from './app-common/snack/gui/icon'
//import AppComp from './app-native/snack/native-base/header'
//import AppComp from './app-native/snack/picker'
//import AppComp from './app-native/snack/animation'
//import AppComp from './app-native/snack/animation2'
//import AppComp from './app-native/snack/animation3'
//import AppComp from './app-native/snack/tab-view'
//import AppComp from './app-native/snack/tab-view/main'
//import AppComp from './app-native/snack/design-dump-colors'
//import AppComp from './app-common/snack/gui/button'
//import AppComp from './app-native/snack/native-base-button'
//import AppComp from './app-native/snack/drawer'
//import AppComp from './app-common/snack/drawer'
import AppComp from './app-native/snack/page'


//console.log('APP')

export const init = async () => {
  window.rn = true
  window.platform = {
    OS: Platform.OS,
    loginPlatform: null,
    recordingPlatform: {
      guiSize: Recording.TGuiSize.icon,
      //recordingJSON
    },
    restAPIPlatform: { serviceUrl: 'http://localhost:3434/rest-api.ashx' }, //NEFUNGUJE
    routerPlatform: {
      startRoute: AppPage.getRoute({ title: 'START TITLE | xxx' }),
      history: createHistory() as Router.IHistory,
      //computeState: (act, st) => Navigator.router.getStateForAction({ type: 'Navigation/NAVIGATE', routeName: act.params && act.params.query && act.params.query.isModal ? 'Modal' : 'Root', params: act } as NavigationNavigateAction, st),
      rootUrl: '/web-app.html',
      getAnimator: getRouteAnimator,
    },
  }
  initGUI({ colorToStyle: {}, Button, Icon, H1, H2, H3, View, Container, Header, Footer, Content, Text, AnimatedDrawer, Animated })

  const recordingJSON = await require('./App_Data/recording.json')
  //console.log('recordingJSON:\n', JSON.stringify(recordingJSON,null,2))
  await promiseAll([
    initRouter(),
    initRecording(recordingJSON),
    initRoot(),
  ])

  const reducers: App.IReducer = (st, action: any) => {
    const state = globalRouterReducer(recordingGlobalReducer(st, action), action)
    const res = {
      ...state,
      recording: recordingReducer(state.recording, action),
      blockGui: blockGuiReducer(state.blockGui, action),
      loc: locReducer(state.loc, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      drawer: drawerReducer(state.drawer, action),
    }
    return res
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = window.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  await promiseAll([
    initMediaQuery(),
  ])

  const rootSaga = function* () {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }

  sagaMiddleware.run(rootSaga)

  const AppAll: React.SFC<{}> = props => <ReduxProvider store={store}>
    <LocProvider>
      <Theme>
        <LayerProvider>
          <RouterProvider key={1} />
          <BlockGuiComp key={2} />
          <RecorderButton key={3} />
          <Toast ref={c => { if (!Toast.toastInstance) Toast.toastInstance = c }} key={4} />
          <ActionSheet ref={c => { if (!ActionSheet.actionsheetInstance) ActionSheet.actionsheetInstance = c }} key={5} />
        </LayerProvider>
      </Theme>
    </LocProvider>
  </ReduxProvider>

  return new Promise<JSX.Element>(resolve => resolve(
    //<AppAll />
    <AppComp />
  ))
}


const Root: React.SFC = () => <WaitForRendering finalContent={init()} waitContent={<AppLoading />} />

export default Root
//export default AppComp
