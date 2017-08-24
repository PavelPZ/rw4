import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import { WaitForRendering } from './app-common/lib'
import { View, Text } from 'react-native'
import { reducer as routerReducer, } from './app-common/router'
import { Provider as RouterProvider } from './app-common/router'

//import { Text } from 'react-native'
//class App extends React.Component { render() { return <Text>Hallo world</Text>} }

//import App from './app-native/snack/redux-simple';
//import App from './app-native/snack/navigation';
//import App from './app-native/snack/navigation/playground/App';
//import App from './app-native/snack/navigation/redux/index';
//import App from './app-native/snack/navigation/stack';
//import App from './app-native/snack/navigation/stack-detailed';
import App, { navReducer } from './app-native/snack/navigation/navigation-redux2';
//import App from './app-common/snack/react-navigation';  
//import App from './app-native/snack/icons';

export const init = async () => {
  window.lmGlobal = {
    isNative:true,
    platform: {
      loginPlatform: null,
      mediaQueryPlatform: null,
      recordingPlatform: null,
      restAPIPlatform: { serviceUrl: 'rest-api.ashx' }
    }
  }

  const reducers: App.IReducer = (state, action: any) => {
    return {
      router: routerReducer(state.router, action),
      nav: navReducer(state.nav, action)
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware))
  //const store = window.lmGlobal.store = createStore<IState>(reducers, {})

  function* rootSaga() {
    const rootRes = yield all({
    });
  }

  sagaMiddleware.run(rootSaga)


  const appMin = <ReduxProvider store={store} ><RouterProvider appOrRoute={<App />} /></ReduxProvider>

  return new Promise<JSX.Element>(resolve => resolve(appMin))
}

const Root: React.SFC = () => <WaitForRendering finalContent={init()} waitContent={<View style={{ marginTop: 20 }}><Text style={{ fontSize:24 }}>Waiting...</Text></View>} />

export default Root;

