import React from 'react';
import { App as CommonApp, initApp } from '../app-common/app'
import { platform as loginPlatform, Provider as LoginProvider } from './web-login'
import { AppRouterComp } from '../app-common/snack/app-router'
//import { init as webRouterInit } from './web-router'

export const init = async () => {
  window.lmGlobal.platform = {
    loginPlatform: loginPlatform({ fbAppId: '198385910196240', fbAPIVersion: 'v2.10', googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com', loc:'cs-CZ' })
  }
  //webRouterInit()
  initApp(AppRouterComp.getRoute({ title: 'START TITLE' }))
  //AppRouterComp.navigate({ title: 'START TITLE' })
}

const App = () => <LoginProvider><CommonApp /></LoginProvider>

export default App
