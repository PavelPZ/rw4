//********** LIBRARIES
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'


//********** COMMON
import { Provider as LocProvider, } from './app-common/loc'
import { Provider as RouterProvider, init as initRouter, reducer as routerReducer, middleware as routerMiddleware } from './app-common/router'
import { promiseAll } from './app-common/lib'
import { init as initRecording, reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/recording'
import { Provider as DrawerProvider, reducer as drawerReducer } from './app-common/drawer'
import { reducer as loginReducer } from './app-common/login'
import { reducer as mediaQueryReducer } from './app-common/media-query'
import { reducer as locReducer } from './app-common/loc'

//********** WEB specific
import createHistory from 'history/createBrowserHistory'
import { platform as loginPlatform, Provider as LoginProvider } from './app-web/web-login'
import { platform as mediaQueryPlatform } from './app-web/web-media'
import { Provider as RecordingProvider, BlockGuiComp } from './app-web/web-recording'

//************ aplikace k testovani
import { AppRouterComp } from './app-common/snack/app-router'
import ReactMDApp from './app-web/snack/react-md-test';
import DrawerApp from './app-web/snack/drawer';
import LocTestApp from './app-common/snack/loc-test';
import ValidateTestApp from './app-web/snack/validate-test';
import RestAPI from './app-common/snack/test-restAPI';

//*********** spusteni
export const init = async () => {

  window.lmGlobal = {
    isNative: false,
    platform: {
      loginPlatform: loginPlatform({ fbAppId: '198385910196240', fbAPIVersion: 'v2.10', googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com', loc: 'cs-CZ' }),
      mediaQueryPlatform,
      recordingPlatform: { guiSize: Recording.TGuiSize.icon },
      restAPIPlatform: { serviceUrl: 'rest-api.ashx' },
      routerPlatform: {
        startRoute: AppRouterComp.getRoute({ title: 'START TITLE | xxx' }),
        history: createHistory() as Router.IHistory,
        rootUrl: '/web-app.html'
      }
    }
  }

  await promiseAll([
    initRecording()
  ])


  const reducers: App.IReducer = (st, action: any) => {
    const state = recordingGlobalReducer(st, action)
    return {
      router: routerReducer(state.router, action),
      login: loginReducer(state.login, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      loc: locReducer(state.loc, action),
      recording: recordingReducer(state.recording, action),
      blockGui: blockGuiReducer(state.blockGui, action),
      drawer: drawerReducer(state.drawer, action),
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  function* rootSaga() {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }

  sagaMiddleware.run(rootSaga)

  await promiseAll([
    initRouter(),
    mediaQueryPlatform.init()
  ])

  let noRouteApp: JSX.Element = null

  //noRouteApp = <ReactMDApp/>
  //noRouteApp = <DrawerApp/>
  //noRouteApp = <LocTestApp />
  //noRouteApp = <ValidateTestApp />
  //noRouteApp = <RestAPI />


  const appAll =
    <ReduxProvider store={store} >
      <LocProvider>
        <LoginProvider overlays={[<BlockGuiComp key={999} />]}>
          <RecordingProvider>
            <DrawerProvider>
              <RouterProvider />
            </DrawerProvider>
          </RecordingProvider>
        </LoginProvider>
      </LocProvider>
    </ReduxProvider>

  const appNoRoute =
    <ReduxProvider store={store} >
      <LocProvider>
        <LoginProvider overlays={[<BlockGuiComp key={999} />]}>
          <RecordingProvider>
            {noRouteApp}
          </RecordingProvider>
        </LoginProvider>
      </LocProvider>
    </ReduxProvider>

  const appMin =
    <ReduxProvider store={store} >
      <RouterProvider />
    </ReduxProvider>

  const appNo = noRouteApp

  const appNoLogin =
    <ReduxProvider store={store} >
      <LocProvider>
        <RouterProvider />
      </LocProvider>
    </ReduxProvider>

  ReactDOM.render(
    appAll
    //appNoRoute
    //appMin
    //appNo
    //appNoLogin
    , document.getElementById('content'))
}


