import React from 'react';
import { Text, Button, View, Route } from 'react-native';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'
//import { createStore, combineReducers } from 'redux'

const Screen = props => <View style={{ marginTop:20 }}>
  <Text>SCREEN {props.navigation.state.params.count}</Text>
  <Button title='Click' onPress={() => {
    props.navigation.navigate('Main', { count: cnt++ })  
  }} />
</View>
let cnt = 0;

//const Stack = StackNavigator({
//  Screen: {
//    screen: Screen
//  }
//});

//const Tab = TabNavigator({
//  Tab1: {
//    screen: Stack
//  },
//  Tab2: {
//    screen: Stack
//  }

//});

export const AppNavigator = DrawerNavigator({
  Main: {
    screen: Screen
  }
  //SubMain: {
  //  screen: Tab
  //}
});

export const initState: Router.IState = { routeName: 'Main', params: { count: 999 } }

const firstAction = NavigationActions.navigate({ routeName: 'Main', params: { count: 999 } })
const initialState = AppNavigator.router.getStateForAction(firstAction)
console.log('@@@ initialNavState', JSON.stringify(initialState, null, 2))

export const navReducer = (state, action) => {
  if (!state) return initialState
  switch (action.type) {
    case Router.Consts.NAVIGATE_END:
      console.log('@@@ navReducer action', JSON.stringify(action, null, 2))
      const nextState = AppNavigator.router.getStateForAction(action, state);
      console.log('@@@ navReducer', JSON.stringify(nextState, null, 2))
      // Simply return the original `state` if `nextState` is null or undefined.
      return nextState || state;
    default: return state
  }
}


const app: React.SFC<{ router, dispatch }> = ({ router, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: router })} />

const App = connect(state => ({ router: state.router }))(app);

//export const appReducer = combineReducers({
//  router: navReducer,
//});

//const appReducer = (state, action) =>({
//  router: navReducer(state, action)
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

