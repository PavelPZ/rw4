import 'whatwg-fetch' //kvuli MSIE
//Animated
//gsap
//import 'gsap/src/minified/TweenLite.min'
//import 'gsap/src/minified/plugins/CSSPlugin.min'
//import 'gsap/src/minified/easing/EasePack.min'

import SvgIcon from 'material-ui/SvgIcon'

//********** LIBRARIES
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'


//********** COMMON
import { initGUI } from './app-common/gui/gui'
import { Provider as LocProvider, reducer as locReducer } from './app-common/lib/loc'
import { Provider as RouterProvider, globalReducer as globalRouterReducer, middleware as routerMiddleware } from 'rw-router/index'
import { PromiseExtensible, WaitForRendering, promiseAll, getAppId } from './app-common/lib/lib'
import { init as initRecording, reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/lib/recording'
import { reducer as loginReducer } from 'rw-login/index'
import { reducer as mediaQueryReducer } from './app-common/lib/media-query'
import { reducer as drawerReducer } from './app-common/gui/drawer'

//********** WEB specific
import { init as initRouter } from 'rw-router/index-w'
import { loginProcessing } from 'rw-login/index'

//import Animated from 'animated'
import createHistory from 'history/createBrowserHistory'
//import { Provider as LayerProvider } from './app-web/lib/web-root-layers'
import { platform as loginPlatform, Provider as LoginProvider, } from 'rw-login/login-w'
import { init as initMediaQuery } from './app-web/lib/web-media-query'
import { Provider as RecordingProvider, BlockGuiComp } from './app-web/lib/web-recording'
//import { Provider as DrawerProvider } from './app-web/lib/web-drawer'
//import { getAnimator as getRouteAnimator } from './app-web/lib/web-router'
import { Button } from './app-web/gui/button'
import { Icon, H1, H2, H3, H4 } from './app-web/gui/other'
import { View } from './app-web/gui/view'
import { AnimatedDrawer } from './app-web/gui/drawer'
import { Text } from './app-web/gui/text'
import { LayerProvider, Platform, waitChildren } from './app-web/gui/lib'

//************ aplikace k testovani
import { AppPage } from './app-common/snack/app-router'
//import ReactMDApp from './app-web/snack/react-md-test'
//import LocTestApp from './app-common/snack/loc-test'
//import ValidateTestApp from './app-web/snack/validate-test'
//import RestAPI from './app-common/snack/test-restAPI'
//import IonicDesigntime from './app-web/design/ionic-designtime'
//import IconTest from './app-web/snack/icon'
//import ButtonTest from './app-common/snack/gui/button'
//import { ConnectTest, reducer as connectTestReducer } from './app-web/snack/connect-test'
//import AnimatedTransition from './app-web/snack/animated-transition'
//import AnimatedGsap from './app-web/snack/animated-gsap'
//import AnimatedGsapNew from './app-web/snack/animated-gsap-new'
//import Page from './app-web/snack/page'
//import { App1, /*app3Reducer*/ } from './app-web/snack/router-new'
//import DrawerApp from './app-web/snack/drawer'
//import MuiTest from './app-web/snack/material-ui/theming-n'
//import DrawerNativeLikeApp from './app-web/snack/drawer-native-like'
//import Header from './app-web/snack/layout/index'
//import Test from './app-common/snack/mui/icon'
import Test from './app-common/snack/mui/typography'


//*********** spusteni
export const init = async () => {
  window.rn = false

  initRouter(AppPage.getRoute({ title: 'START TITLE | xxx' }), '/web-app.html', loginProcessing)

  window.platform = {
    OS: 'web',
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
    //routerPlatform: {
    //  startRoute: AppPage.getRoute({ title: 'START TITLE | xxx' }),
    //  //startRoute: App1.getRoute({ title: 'from Index' }),
    //  history: createHistory() as Router.IHistory,
    //  rootUrl: '/web-app.html',
    //  getAnimator: getRouteAnimator,
    //},
  }

  await promiseAll([
    initGUI({ Button, Icon, H1, H2, H3, H4, View, Text, AnimatedDrawer }),
    //initRouter(),
    initRecording(),
  ])

  const reducers: App.IReducer = (st, action: any) => {
    //const state = app3Reducer(recordingGlobalReducer(st, action), action)
    const state = recordingGlobalReducer(globalRouterReducer(st, action), action)
    return {
      ...state,
      login: loginReducer(state.login, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      loc: locReducer(state.loc, action),
      recording: recordingReducer(state.recording, action),
      blockGui: blockGuiReducer(state.blockGui, action),
      drawer: drawerReducer(state.drawer, action),
      //connectTest: connectTestReducer((state as any).connectTest, action)
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  const store = window.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, routerMiddleware, recordingMiddleware))

  const rootSaga = function* () {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }
  sagaMiddleware.run(rootSaga)

  const initAfter = () => promiseAll([
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
  //noRouteApp = <AnimatedGsapNew />
  //noRouteApp = <DrawerApp />
  //noRouteApp = <DrawerNativeLikeApp />
  //noRouteApp = <DrawerCommon/>
  //noRouteApp = <Page />
  //noRouteApp = <ButtonTest />
  //noRouteApp = <IconTest />
  //noRouteApp = <Header />
  //noRouteApp = <MuiTest/>
  noRouteApp = <Test />



  const AppAll: React.SFC<{}> = props => {
    const waitForLoginRendered = new PromiseExtensible()
    return <ReduxProvider store={store} >
      <LayerProvider>
        <BlockGuiComp key={1} />
        <LoginProvider key={2} loginRendered={async () => { await initAfter(); waitForLoginRendered.resolve() }} zIndex={100} />
        <LocProvider key={3}>
          <WaitForRendering waitFor={waitForLoginRendered} waitContent={waitChildren}>
            <RecordingProvider>
              <RouterProvider />
            </RecordingProvider>
          </WaitForRendering>
        </LocProvider>
      </LayerProvider>
    </ReduxProvider>
  }

  const AppRouter: React.SFC<{}> = props => <ReduxProvider store={store} >
    <LayerProvider>
      <BlockGuiComp key={1} />
      <WaitForRendering key={2} waitFor={initAfter()} waitContent={waitChildren}>
        <RouterProvider />
      </WaitForRendering>
    </LayerProvider>
  </ReduxProvider>

  const AppContent: React.SFC<{}> = props => <ReduxProvider store={store} >
    <LayerProvider>
      <BlockGuiComp key={1} />
      <WaitForRendering key={2} waitFor={initAfter()} waitContent={waitChildren}>
        {appNo}
      </WaitForRendering>
    </LayerProvider>
  </ReduxProvider>


  const appNo = noRouteApp

  ReactDOM.render(
    //<AppRouter />
    //<AppAll />
    //<AppContent />
    appNo
    , document.getElementById('content'))
}
