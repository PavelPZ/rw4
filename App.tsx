//********** LIBRARIES
import React from 'react'
import { Provider as ReduxProvider, connect } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import { View, Text } from 'react-native'
import { addNavigationHelpers, NavigationActions, DrawerNavigator } from 'react-navigation';

//********** COMMON
import { WaitForRendering } from './app-common/lib'
import { reducer as routerReducer, middleware as routerMiddleware, init as initRouter } from './app-common/router'
import { reducer as recordingReducer, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, } from './app-common/recording'
import { promiseAll } from './app-common/lib'

//********** NATIVE specific
import createHistory from 'history/createMemoryHistory'

//************ aplikace k testovani
//import { Text } from 'react-native'
//class App extends React.Component { render() { return <Text>Hallo world</Text>} }

import { AppRouterComp } from './app-common/snack/app-router'
//import App from './app-native/snack/redux-simple';
//import App from './app-native/snack/navigation';
//import App from './app-native/snack/navigation/playground/App';
//import App from './app-native/snack/navigation/redux/index';
//import App from './app-native/snack/navigation/stack';
//import App from './app-native/snack/navigation/stack-detailed';
//import { AppRouterComp } from './app-native/snack/navigation/app-navigation';
//import App from './app-common/snack/react-navigation';  
//import App from './app-native/snack/icons';

const AppNavigator = DrawerNavigator({
  ...AppRouterComp.nativeScreenDef()
})

const routerProvider: React.SFC<{ router, dispatch }> = ({ router, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: router })} />

const RouterProvider = connect(state => state.router)(routerProvider);

export const init = async () => {
  window.lmGlobal = {
    isNative: true,
    platform: {
      loginPlatform: null,
      mediaQueryPlatform: null,
      recordingPlatform: null,
      restAPIPlatform: { serviceUrl: 'rest-api.ashx' },
      routerPlatform: {
        startRoute: AppRouterComp.getRoute({ title: 'START TITLE | xxx' }),
        history: createHistory() as Router.IHistory,
        computeState: AppNavigator.router.getStateForAction
      }
    }
  }

  const reducers: App.IReducer = (state, action: any) => {
    return {
      router: routerReducer(state.router, action),
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  await promiseAll([
  ])

  const store = window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  await promiseAll([
    initRouter(),
  ])
  
  function* rootSaga() {
    const rootRes = yield all({
    });
  }

  sagaMiddleware.run(rootSaga)

  const appAll = <ReduxProvider store={store} ><RouterProvider /></ReduxProvider>

  return new Promise<JSX.Element>(resolve => resolve(appAll))
}

const Root: React.SFC = () => <WaitForRendering finalContent={init()} waitContent={<View style={{ marginTop: 20 }}><Text style={{ fontSize: 24 }}>Waiting...</Text></View>} />

export default Root;

