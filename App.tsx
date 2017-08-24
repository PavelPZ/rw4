import React from 'react'
import { Store, Provider as ReduxProvider } from 'react-redux'

import { init as initAppCommon, promiseAll } from './app-common/app'

//import { Text } from 'react-native'
//class App extends React.Component { render() { return <Text>Hallo world</Text>} }

//import App from './app-native/snack/redux-simple';
//import App from './app-native/snack/navigation';
//import App from './app-native/snack/navigation/playground/App';
//import App from './app-native/snack/navigation/redux/index';
//import App from './app-native/snack/navigation/stack';
//import App from './app-native/snack/navigation/stack-detailed';
import App from './app-native/snack/navigation/navigation-redux2';
//import App from './app-common/snack/react-navigation';  
//import App from './app-native/snack/icons';

export const init = async () => {
}

const appMin =
  <ReduxProvider store={store} >
  </ReduxProvider>

export default App;

