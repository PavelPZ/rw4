import 'whatwg-fetch' //kvuli MSIE
//gsap
import 'gsap/src/minified/TweenLite.min' 
import 'gsap/src/minified/plugins/CSSPlugin.min' 
import 'gsap/src/minified/easing/EasePack.min' 

//********** LIBRARIES
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'


//********** COMMON
import { Provider as LocProvider, reducer as locReducer } from './app-common/lib/loc'
import { Provider as RouterProvider, init as initRouter, reducer as routerReducer, middleware as routerMiddleware } from './app-common/lib/router'
import { promiseAll, getAppId } from './app-common/lib/lib'
import { init as initRecording, reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/lib/recording'
import { reducer as loginReducer } from './app-common/lib/login'
import { reducer as mediaQueryReducer } from './app-common/lib/media-query'
import { reducer as drawerReducer } from './app-common/lib/drawer'

//********** WEB specific
import createHistory from 'history/createBrowserHistory'
import { Provider as LayerProvider } from './app-web/lib/web-root-layers'
import { platform as loginPlatform, Provider as LoginProvider, } from './app-web/lib/web-login'
import { init as initMediaQuery } from './app-web/lib/web-media-query'
import { Provider as RecordingProvider, BlockGuiComp } from './app-web/lib/web-recording'
import { Provider as DrawerProvider } from './app-web/lib/web-drawer'
import { Button } from './app-web/gui/button'
import { Icon } from './app-web/gui/icon'
import { View, Container, Header, Footer, Content } from './app-web/gui/view'
import { Text } from './app-web/gui/text'
import { H1, H2, H3, Platform, colorToStyle, WaitForRendering, waitChildren } from './app-web/gui/lib'

//************ aplikace k testovani
import { AppRouterComp } from './app-common/snack/app-router'
import ReactMDApp from './app-web/snack/react-md-test'
import DrawerApp from './app-web/snack/drawer'
import LocTestApp from './app-common/snack/loc-test'
import ValidateTestApp from './app-web/snack/validate-test'
import RestAPI from './app-common/snack/test-restAPI'
import IonicDesigntime from './app-web/design/ionic-designtime'
import IonicTest from './app-common/snack/gui/icon'
import ButtonTest from './app-common/snack/gui/button'
import { ConnectTest, reducer as connectTestReducer } from './app-web/snack/connect-test'
import Animated from './app-web/snack/animated-transition'
import AnimatedGsap from './app-web/snack/animated-gsap'
import AnimatedGsapNew from './app-web/snack/animated-gsap-new'

//*********** spusteni
export const init = async () => {
  window.lmGlobal = {
    isNative: false,
    platform: {
      appPlatform: {
        instanceId: getAppId({
          localhost: 'localhost',
          test: 'zvahov.langmaster.cz:6080'
        }),
      },
      loginPlatform: loginPlatform({
        facebook: {
          localhost: { fbAppId: '198385910196240', fbAPIVersion: 'v2.10' },
          test: { fbAppId: '341123529665594', fbAPIVersion: 'v2.10' }
        },
        googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com', loc: 'en-GB'
      }),
      recordingPlatform: { guiSize: Recording.TGuiSize.icon },
      restAPIPlatform: { serviceUrl: 'rest-api.ashx' },
      routerPlatform: {
        startRoute: AppRouterComp.getRoute({ title: 'START TITLE | xxx' }),
        history: createHistory() as Router.IHistory,
        rootUrl: '/web-app.html'
      },
      guiPlatform: { Platform, colorToStyle, Button, Icon, H1, H2, H3, View, Container, Header, Footer, Content, Text }
    }
  }

  await promiseAll([
    initRecording()
  ])

  const reducers: App.IReducer = (st, action: any) => {
    const state = recordingGlobalReducer(st, action)
    return {
      router: {
        router: routerReducer(state.router.router, action)
      },
      login: loginReducer(state.login, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      loc: locReducer(state.loc, action),
      recording: recordingReducer(state.recording, action),
      blockGui: blockGuiReducer(state.blockGui, action),
      drawer: drawerReducer(state.drawer, action),
      connectTest: connectTestReducer((state as any).connectTest, action)
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = window.lmGlobal.store = createStore<IState>(reducers, { router: {}}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  const rootSaga = function* () {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }
  sagaMiddleware.run(rootSaga)

  const initAfter = () => promiseAll([
    initRouter(),
    initMediaQuery(),
  ])

  let noRouteApp: JSX.Element = null

  //noRouteApp = <ReactMDApp/>
  //noRouteApp = <DrawerApp/>
  //noRouteApp = <LocTestApp />
  //noRouteApp = <ValidateTestApp />
  //noRouteApp = <RestAPI />
  //noRouteApp = <IonicDesigntime />
  //noRouteApp = <IonicTest />
  //noRouteApp = <ReduxProvider store={store} ><ConnectTest /></ReduxProvider>
  //noRouteApp = <Animated />
  //noRouteApp = <AnimatedGsap />
  noRouteApp = <AnimatedGsapNew />

  const AppAll: React.SFC<{}> = props => {
    let loginRendered: () => void
    const waitForLoginRendered = new Promise<void>(resolve => loginRendered = resolve)
    return <ReduxProvider store={store} >
      <LayerProvider childs={[
        <BlockGuiComp key={1} zIndex={99} />,
        <LoginProvider key={2} loginRendered={async () => { await initAfter(); loginRendered() }} zIndex={100} />,
        <LocProvider key={3}>
          <WaitForRendering waitFor={waitForLoginRendered} waitChildren={waitChildren}>
            <DrawerProvider>
              <RecordingProvider>
                <RouterProvider />
              </RecordingProvider>
            </DrawerProvider>
          </WaitForRendering>
        </LocProvider>
      ]} />
    </ReduxProvider>
  }

  const appNo = noRouteApp

  ReactDOM.render(
    //<AppAll />
    appNo
    , document.getElementById('content'))
}


