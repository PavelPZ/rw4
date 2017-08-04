import React from 'react';
import ReactDOM from 'react-dom';

//import App from './app-web/snack/react-md';
import App from './app-common/snack/react-navigation';

export function init() {
  ReactDOM.render(<App />, document.getElementById('content'));
}
