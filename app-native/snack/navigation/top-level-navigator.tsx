import React from 'react';
import { Text, Button, View, ViewStyle } from 'react-native';
import { StackNavigator, StackNavigatorConfig, NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';
import { IScreenProps, modifyNavigator } from 'app-common';

const InnerScreenComp = (props: IScreenProps) => <View style={{ flex: 1 }}>
  <Text><Text onPress={() => {
    console.log(JSON.stringify(props, null, 2))
    props.navigation.goBack()
  }}>BACK</Text> INNER SCREEN</Text>
  <Button onPress={() => props.navigation.navigate('InnerScreen')} title="Open InnerScreen" />
</View>


const InnerStack = StackNavigator({
  InnerScreen: {
    screen: InnerScreenComp,
  }
}, {
  navigationOptions: { header: null }
} as StackNavigatorConfig)

modifyNavigator(InnerStack);

const defaultInnerGetStateForAction = InnerStack.router.getStateForAction
InnerStack.router.getStateForAction = (action, state) => {
  const res = defaultInnerGetStateForAction(action, state)
  //console.log('getInnerStateForAction: ' + JSON.stringify({ action, state, res }, null, 2))
  return res
}

const MainScreenComp = (props: IScreenProps<IMainStackProps, IMainScreenProps>) => {
  console.log('MainScreenComp: ' + JSON.stringify(props, null, 2))
  const { siblings } = props.navigation.state
  return <View style={{ flex: 1 }}>
    <Text>{!siblings || siblings.length <= 1 ? null : <Text onPress={() => {
      //props.navigation.setParams({ testProp2:2 })
      props.navigation.goBack(siblings[1])
    }}>BACK</Text>} MAIN SCREEN</Text>
    <Button onPress={() => props.navigation.navigate('MainScreen')} title="Open MainScreen" />
    <InnerStack screenProps={{ parentNavig: props.navigation }} />
  </View>
}
interface IMainScreenProps { testProp2: number }

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
