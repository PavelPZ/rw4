import React from 'react'
import ReactDOM from 'react-dom'
import { Store, Provider as ReduxProvider } from 'react-redux'
import { Provider as LocProvider, } from './app-common/loc'
import { Provider as RouterProvider, init as routerRouter } from './app-common/router'

import { promiseAll } from './app-common/lib'
import { init as initAppCommon } from './index-init'
import { init as initRecording } from './app-common/recording'

//********** WEB specific
import createHistory from 'history/createBrowserHistory'
import { platform as loginPlatform, Provider as LoginProvider } from './app-web/web-login'
import { platform as mediaQueryPlatform } from './app-web/web-media'
import { Provider as RecordingProvider, BlockGuiComp } from './app-web/web-recording'
import { Provider as DrawerProvider, render as DrawerRender } from './app-web/web-drawer'

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

  const store = initAppCommon() as Store<IState>

  await promiseAll([
    routerRouter(),
    mediaQueryPlatform.init()
  ])

  let noRouteApp: JSX.Element = null

  //noRouteApp = <ReactMDApp/>
  noRouteApp = <DrawerApp/>
  //noRouteApp = <LocTestApp />
  //noRouteApp = <ValidateTestApp />
  //noRouteApp = <RestAPI />


  const appAll =
    <ReduxProvider store={store} >
      <LocProvider>
        <LoginProvider overlays={[<BlockGuiComp key={999} />]}>
          <RecordingProvider>
            <DrawerRender drawer={<DrawerProvider/>}>
              <RouterProvider />
            </DrawerRender>
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
    //appAll
    //appNoRoute
    //appMin
    appNo
    //appNoLogin
    , document.getElementById('content'))
}


