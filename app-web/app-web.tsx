import React from 'react';
import { App as CommonApp, initApp } from '../app-common/app'
import { platform as loginPlatform, Provider as LoginProvider, init as loginInit } from './web-login'

export const init = async () => {
  window.lmGlobal.platform = {
    loginPlatform: loginPlatform({ fbAppId: '198385910196240', fbAPIVersion: 'v2.10', googleClientId: '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com' })
  }

  await loginInit()

  initApp()

}


const App = () => <LoginProvider><CommonApp /></LoginProvider>

export default App
