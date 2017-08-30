import React from 'react';
import { Text, Button, View, Route } from 'react-native';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'
import { registerRouter } from '../../../app-common/lib/router'
//import { createStore, combineReducers } from 'redux'

interface IRoutePar extends Router.IRoutePar {
  count:number
}

const appRouterComp: React.SFC<IRoutePar> = pr => {
  console.log('@@@ appRouterComp render')
  const props: IRoutePar = {count:777} //(pr as any).navigation.state.params
  return <View style={{ flex: 1, marginTop: 30 }}>
    <Text>SCREEN {props.count}</Text>
    <Button title='Click' onPress={() => AppRouterComp.navigate({ count: cnt++ })} />
  </View>
}
let cnt = 0;

export const AppRouterComp: Router.IRoute<IRoutePar> = registerRouter(appRouterComp, 'Main', '/:count')

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
      screen: AppRouterComp
    }
    //SubMain: {
    //  screen: Tab
    //}
  });

export const initState: Router.IState < string, any> = { routeName: 'Main', params: { count: 999 } }

const firstAction = NavigationActions.navigate(initState)
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

const App = connect(state => { console.log('@@@ App.connect'); return state.router })(app);

//export const appReducer = combineReducers({
//  router: navReducer,
//});

//const appReducer = (state, action) =>({
//  router: navReducer(state, action)
//});


//const store = createStore(appReducer);

class Root extends React.Component {
  render() {
    console.log('@@@ Root.render')
    return (
      <View>
        <App />
      </View>
    );
  }
}

export default Root

