import React from 'react'
import ReactDOM from 'react-dom'
import { Store, Provider as ReduxProvider } from 'react-redux'
import { Provider as LocProvider, } from './app-common/loc'
import { Provider as RouterProvider } from './app-common/router'

import { init as initAppCommon } from './app-common/app'

//********** WEB specific
import createHistory from 'history/createBrowserHistory'
import { platform as loginPlatform, Provider as LoginProvider } from './app-web/web-login'
import { platform as mediaQueryPlatform } from './app-web/web-media'
import { Provider as RecordingProvider } from './app-web/web-recording'

//************ aplikace k testovani
import { AppRouterComp } from './app-common/snack/app-router'
import ReactMDApp from './app-web/snack/react-md-test';
import DrawerApp from './app-web/snack/drawer';
import LocTestApp from './app-common/snack/loc-test';
import ValidateTestApp from './app-web/snack/validate-test';

//*********** spusteni
export const init = () => {
  window.lmGlobal.platform = {
    loginPlatform: loginPlatform({ fbAppId: '198385910196240', fbAPIVersion: 'v2.10', googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com', loc: 'cs-CZ' }),
    mediaQueryPlatform,
  }

  const store = initAppCommon() as Store<IState>

  mediaQueryPlatform.init()

  const appOrRoute: Router.IInitPar = { history: createHistory() as Router.IHistory, rootUrl: '/web-app.html', startRoute: AppRouterComp.getRoute({ title: 'START TITLE' }) }
  //const appOrRoute = <ReactMDApp/>
  //const appOrRoute = <DrawerApp/>
  //const appOrRoute = <LocTestApp />
  //const appOrRoute = <ValidateTestApp />
  

  const appAll =
    <ReduxProvider store={store} >
      <LocProvider>
        <LoginProvider>
          <RecordingProvider>
            <RouterProvider appOrRoute={appOrRoute} />
          </RecordingProvider>
        </LoginProvider>
      </LocProvider>
    </ReduxProvider>

  const appMin =
    <ReduxProvider store={store} >
      <RouterProvider appOrRoute={appOrRoute} />
    </ReduxProvider>

  const appNo = appOrRoute

  const appNoLogin =
    <ReduxProvider store={store} >
      <LocProvider>
        <RouterProvider appOrRoute={appOrRoute} />
      </LocProvider>
    </ReduxProvider>

  ReactDOM.render(
    appAll
    //appMin
    //appNo
    //appNoLogin
    , document.getElementById('content'))
}


