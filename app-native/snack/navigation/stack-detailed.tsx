import React from 'react';
import { Text, Button, View, ViewStyle } from 'react-native';
import { StackNavigator, StackNavigatorConfig, NavigationContainer, NavigationAction, NavigationRoute, NavigationStackScreenOptions } from 'react-navigation';
import { modifyNavigator, modifyScreen, IScreen } from '../../../app-common';

const InnerScreen: IScreen<IInnerScreenProps> = props => <View style={{ flex: 1 }}>
  <Text><Text onPress={() => {
    console.log(JSON.stringify(props, null, 2))
    props.navigation.goBack()
  }}>BACK</Text> INNER SCREEN</Text>
  <Button onPress={() => InnerScreen.navigate(props)} title="Open InnerScreen" />
  <Button onPress={() => props.screenProps.mainScreenCompNavigate({ testProp: 333 })} title="Open MainScreen" />
</View>
modifyScreen(InnerScreen, 'INNER_SCREEN');
interface IInnerScreenProps { mainScreenCompNavigate: IMainNavigate }

const InnerStack = StackNavigator({
  ...InnerScreen.routeConfig()
}, {
  navigationOptions: { header: null }
} as StackNavigatorConfig)
modifyNavigator(InnerStack);

const MainScreen: IScreen<IMainScreenProps, IMainScreenState> = props => {
  console.log('MainScreenComp: ' + JSON.stringify(props, null, 2))
  const { siblings, params } = props.navigation.state
  const { testScreenProp } = props.screenProps //IMainStackProps
  return <View style={{ flex: 1 }}>
    <Text>{!siblings || siblings.length <= 1 ? null : <Text onPress={() => {
      props.navigation.goBack(siblings[1])
    }}>BACK</Text>} MAIN SCREEN</Text>
    <Button onPress={() => MainScreen.navigate(props, { testProp: 3 })} title="Open MainScreen" />
    <Button onPress={() => MainScreen.setParams(props, { testProp: 2 })/*IMainScreenProps*/} title="Set Params" />
    <Text>{params ? params.testProp : ''}</Text>
    <InnerStack screenProps={{ mainScreenCompNavigate: par => MainScreen.navigate(props, par) } as IInnerScreenProps} />
  </View>
}
//(MainScreenComp as any).navigationOptions = ({ navigation }) => ({
//  title:'XXX'
//} as NavigationStackScreenOptions) NEFUNGUJE

interface IMainScreenState { testProp: number }
type IMainNavigate = (par: IMainScreenState) => boolean
modifyScreen(MainScreen, 'MAIN_SCREEN');

const MainStack = StackNavigator({
  ...MainScreen.routeConfig()
  //screenProps: { stackScreenProp: 12345 }, NEFUNGUJE
  //navigationOptions: {
  //screenProps: { stackScreenProp: 12345 } NEFUNGUJE
  //}
}, {
  navigationOptions: {
    header: null,
    //screenProps: { stackScreenProp: 12345 } NEFUNGUJE
  }
} as StackNavigatorConfig)
interface IMainScreenProps { testScreenProp: number }

modifyNavigator(MainStack);

const App = () => <View style={{ flex: 1, marginTop: 30 }}>
  <MainStack screenProps={{ testScreenProp: 1 } as IMainScreenProps} />
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
