import React from 'react'
import ReactDOM from 'react-dom'
import { Store, Provider as ReduxProvider } from 'react-redux'
import { Provider as LocProvider, } from './app-common/loc'
import { Provider as RouterProvider } from './app-common/router'


import createHistory from 'history/createBrowserHistory'

import { initApp } from './app-common/app'
import { platform as loginPlatform, Provider as LoginProvider } from './app-web/web-login'
import { platform as mediaQueryPlatform } from './app-web/web-media'

import { AppRouterComp } from './app-common/snack/app-router'
import ReactMDApp from './app-web/snack/react-md-test';
//import App from './app-common/snack/react-navigation';
import DrawerApp from './app-web/snack/drawer';
import LocTestApp from './app-common/snack/loc-test';

export const init = () => {
  window.lmGlobal.platform = {
    loginPlatform: loginPlatform({ fbAppId: '198385910196240', fbAPIVersion: 'v2.10', googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com', loc: 'cs-CZ' }),
    mediaQueryPlatform,
  }

  initApp()

  const appOrRoute: Router.IInitPar = { history: createHistory() as Router.IHistory, rootUrl: '/web-app.html', startRoute: AppRouterComp.getRoute({ title: 'START TITLE' }) }
  //const appOrRoute = <ReactMDApp/>
  //const appOrRoute = <DrawerApp/>
  //const appOrRoute = <LocTestApp/>

  const appAll =
    <ReduxProvider store={window.lmGlobal.store as Store<IState>} >
      <LoginProvider>
        <LocProvider>
          <RouterProvider appOrRoute={appOrRoute} />
        </LocProvider>
      </LoginProvider>
    </ReduxProvider>

  const appMin =
    <ReduxProvider store={window.lmGlobal.store as Store<IState>} >
      <RouterProvider appOrRoute={appOrRoute} />
    </ReduxProvider>

  const appNo = appOrRoute

  const appNoLogin =
    <ReduxProvider store={window.lmGlobal.store as Store<IState>} >
      <LocProvider>
        <RouterProvider appOrRoute={appOrRoute} />
      </LocProvider>
    </ReduxProvider>

  //const appElement = <LoginProvider children={app} /> //for Router.IInitPar
  //const appElement = app //for non route apps

  ReactDOM.render(appAll, document.getElementById('content'))
}


