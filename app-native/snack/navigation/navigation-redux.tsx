import React from 'react';
import { Text, Button, View } from 'react-native';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers } from 'redux'

const Screen = (props) => <View>
  <Text>SCREEN</Text>
  <Button title='Click' onPress={() => {
    props.navigation.navigate('Screen', {count:cnt++})
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
    screen: Tab
  },
  SubMain: {
    screen: Tab
  }
});

const firstAction = NavigationActions.navigate({ routeName: 'Tab1' })
const initialState = AppNavigator.router.getStateForAction(firstAction)
console.log('@@@ initialNavState', JSON.stringify(initialState, null, 2))

const navReducer = (state, action) => {
  console.log('navReducer action', JSON.stringify(action, null, 2))
  const nextState = AppNavigator.router.getStateForAction(action, state);
  console.log('navReducer', JSON.stringify(nextState, null, 2))
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


class App extends React.Component<{ nav, dispatch }> {
  render() {
    //console.log('App.render', JSON.stringify(this.props, null, 2))
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}

const AppWithNavigationState = connect(state => ({ nav: state.nav }))(App);

const appReducer = combineReducers({
  nav: navReducer,
});

//const appReducer = (state, action) =>({
//  nav: navReducer(state, action)
//});


const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default Root