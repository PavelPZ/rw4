import React from 'react';
import { Text, Button, View, ViewStyle } from 'react-native';
import { TabNavigator, TabNavigatorConfig, NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';
import { modifyNavigator, modifyScreen, IScreen } from '../../../app-common';

const Tab1ScreenComp: IScreen<ITab1NavigatorProps, ITab1ScreenProps> = props => {
  const { siblings, params } = props.navigation.state
  const { testProp } = props.screenProps //IMainStackProps
  return <View style={{ flex: 1 }}>
    <Text>{!siblings || siblings.length <= 1 ? null : <Text onPress={() => {
      props.navigation.goBack(siblings[1])
    }}>BACK</Text>} MAIN SCREEN</Text>
    <Button onPress={() => Tab1ScreenComp.navigate(props, { testProp2: 3 })} title="Open MainScreen" />
    <Button onPress={() => Tab1ScreenComp.setParams(props, { testProp2: 2 })/*IMainScreenProps*/} title="Set Params" />
    <Text>{params ? params.testProp2 : ''}</Text>
  </View>
}
interface ITab1ScreenProps { testProp2: number }
modifyScreen(Tab1ScreenComp, 'TAB1');

const MainStack = TabNavigator({
  Tab1: {
    screen: Tab1ScreenComp,
  },
  Tab2: {
    screen: Tab1ScreenComp,
  }
}, {
  navigationOptions: { }
} as TabNavigatorConfig)
interface ITab1NavigatorProps { testProp: number }

modifyNavigator(MainStack);

const App = () => <View style={{ flex: 1, marginTop: 30 }}>
  <MainStack screenProps={{ testProp: 1 } as ITab1NavigatorProps} />
</View>

export default App
