import React from 'react';
import ReactDOM from 'react-dom';

//import Button from 'react-md/Buttons';
//const App = Button;

import App from './app-web/snack/react-md-test';
//import App from './app-common/snack/react-navigation';

export function init() {
  ReactDOM.render(<App />, document.getElementById('content'));
}
