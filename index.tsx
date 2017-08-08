import React from 'react'
import ReactDOM from 'react-dom'

//import Button from 'react-md/Buttons';
//const App = Button;

//import App from './app-web/snack/react-md-test';
//import App from './app-common/snack/react-navigation';
//ReactDOM.render(<App />, document.getElementById('content'))

import App, { init as initWebApp } from './app-web/app-web'

export const init = async () => {
  await initWebApp()
  ReactDOM.render(<App />, document.getElementById('content'))
}
