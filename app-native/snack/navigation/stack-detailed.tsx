import React from 'react';
import { Text, Button, View, ViewStyle } from 'react-native';
import { StackNavigator, StackNavigatorConfig, NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';
import { IScreenProps, modifyNavigator, modifyScreen, IScreen } from '../../../app-common';

const InnerScreenComp: IScreen = props => <View style={{ flex: 1 }}>
  <Text><Text onPress={() => {
    console.log(JSON.stringify(props, null, 2))
    props.navigation.goBack()
  }}>BACK</Text> INNER SCREEN</Text>
  <Button onPress={() => InnerScreenComp.navigate(props, 'InnerScreen')} title="Open InnerScreen" />
</View>
modifyScreen(InnerScreenComp);

const InnerStack = StackNavigator({
  InnerScreen: {
    screen: InnerScreenComp,
  }
}, {
  navigationOptions: { header: null }
} as StackNavigatorConfig)
modifyNavigator(InnerStack);

const MainScreenComp: IScreen<IMainStackProps, IMainScreenProps> = props => {
  console.log('MainScreenComp: ' + JSON.stringify(props, null, 2))
  const { siblings, params } = props.navigation.state
  const { testProp } = props.screenProps //IMainStackProps
  return <View style={{ flex: 1 }}>
    <Text>{!siblings || siblings.length <= 1 ? null : <Text onPress={() => {
      props.navigation.goBack(siblings[1])
    }}>BACK</Text>} MAIN SCREEN</Text>
    <Button onPress={() => MainScreenComp.navigate(props, 'MainScreen', { testProp2: 3 })} title="Open MainScreen" />
    <Button onPress={() => MainScreenComp.setParams(props, { testProp2: 2 })/*IMainScreenProps*/} title="Set Params" />
    <Text>{params ? params.testProp2 : ''}</Text>
    <InnerStack screenProps={{ parentNavig: props.navigation }} />
  </View>
}
interface IMainScreenProps { testProp2: number }
modifyScreen(MainScreenComp);

const MainStack = StackNavigator({
  MainScreen: {
    screen: MainScreenComp,
  }
}, {
  navigationOptions: { header: null }
} as StackNavigatorConfig)
interface IMainStackProps { testProp: number }

modifyNavigator(MainStack);

const App = () => <View style={{ flex: 1, marginTop: 30 }}>
  <MainStack screenProps={{ testProp: 1 } as IMainStackProps} />
  {/*<MainStack style={{ backgroundColor: 'red' } as ViewStyle } onNavigationStateChange={(prevState, currentState) => {
    const routes = currentState.routes; const last = routes[routes.length - 1];
    last['parent'] = currentState.routes.map(r => r.key);
    console.log('onNavigationStateChange: ' + JSON.stringify({ prevState, currentState }, null, 2))
  }} />*/}
</View>

export default App

const Stack = StackNavigator({
  MainScreen: {
    screen: InnerStack,
  },
  SubScreen: {
    screen: InnerStack,
  }

});


//const initialState = Stack.router.getStateForAction(Stack.router.getActionForPathAndParams('MainScreen'));
//console.log(JSON.stringify(initialState,null,2))
