import React from 'react';
import CommonApp from '../app-common/app'
import { platform as loginPlatform, Provider as LoginProvider } from './web-login'

window.lmGlobal.platform = { 
  loginPlatform
}

export const App = () => <LoginProvider><CommonApp /></LoginProvider>
export default App