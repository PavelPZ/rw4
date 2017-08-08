import React from 'react';
import { App as CommonApp, initApp } from '../app-common/app'
import { platform as loginPlatform, Provider as LoginProvider } from './web-login'

window.lmGlobal.platform = { 
  loginPlatform
}

initApp ()

export const App = () => <LoginProvider><CommonApp /></LoginProvider>
export default App