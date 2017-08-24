import React from 'react';
import { Text, Button, View, Route } from 'react-native';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'
//import { createStore, combineReducers } from 'redux'

const Screen = props => <View style={{ marginTop:20 }}>
  <Text>SCREEN {props.navigation.state.params.count}</Text>
  <Button title='Click' onPress={() => {
    props.navigation.navigate('Screen', { count: cnt++ })  
  }} />
</View>
let cnt = 0;

const Stack = StackNavigator({
  Screen: {
    screen: Screen
  }
});

const Tab = TabNavigator({
  Tab1: {
    screen: Stack
  },
  Tab2: {
    screen: Stack
  }

});

const AppNavigator = DrawerNavigator({
  Main: {
    screen: Screen
  }
  //SubMain: {
  //  screen: Tab
  //}
});

const firstAction = NavigationActions.navigate({ routeName: 'Screen', params: { count: 999 } })
const initialState = AppNavigator.router.getStateForAction(firstAction)
console.log('@@@ initialNavState', JSON.stringify(initialState, null, 2))

export const navReducer = (state, action) => {
  if (!state) return initialState
  console.log('@@@ navReducer action', JSON.stringify(action, null, 2)) 
  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log('@@@ navReducer', JSON.stringify(nextState, null, 2))
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


const app: React.SFC<{ nav, dispatch }> = ({ nav, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: nav })} />

const App = connect(state => ({ nav: state.nav }))(app);

//export const appReducer = combineReducers({
//  nav: navReducer,
//});

//const appReducer = (state, action) =>({
//  nav: navReducer(state, action)
//});


//const store = createStore(appReducer);

//class Root extends React.Component {
//  render() {
//    return (
//      <Provider store={store}>
//        <AppWithNavigationState />
//      </Provider>
//    );
//  }
//}

export default App

