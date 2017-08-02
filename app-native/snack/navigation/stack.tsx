//two drawers waiting for: https://github.com/react-community/react-navigation/pull/1803

import React from 'react';
import { Text, Button, View } from 'react-native';
import { StackNavigator, NavigationStackScreenOptions, NavigationStackRouterConfig, NavigationScreenProp, NavigationRoute, StackNavigatorConfig, NavigationRouteConfig, NavigationScreenConfig } from 'react-navigation';

type TProps<TParams> = {
  navigation: NavigationScreenProp<NavigationRoute<TParams>, any>
}
type TScreenProps = TProps<{ name?: string, descr?: string }>;

const Screen1 = ({ navigation }: TScreenProps) => {
  console.log(JSON.stringify(navigation));
  const { params = { name: 'none' } } = navigation.state;
  return <View>
    <Text>{`Name: ${params.name}`}</Text>
    <Button onPress={() => navigation.navigate('Screen2', { descr: 'info from screen1' })} title="Open Screen2" />
  </View>
}
(Screen1 as any).navigationOptions = ({ navigation }: TScreenProps) => {
  const { state, setParams } = navigation;
  return {
    title: 'Screen1',
    headerRight: <Button title='Button' onPress={() => setParams({ name: 'headerRight' })} />,
    headerLeft: <Button title='Button' onPress={() => setParams({ name: 'headerLeft' })} />,
    //headerTitle: 'headerTitle',
    headerTitle: <Text>headerTitle</Text>
  } as NavigationStackScreenOptions
}

const Screen2 = ({ navigation }: TScreenProps) => {
  const { params = { name: 'none', descr: 'none' } } = navigation.state;
  return <View>
    <Text>{`Name: ${params.name}, descr: ${params.descr}`}</Text>
    <Button onPress={() => navigation.navigate('Screen1')} title="Open Screen1" />
  </View>
}
(Screen2 as any).navigationOptions = ({ navigation }: TScreenProps) => {
  const { state, setParams } = navigation;
  const { params = { name: 'none name', descr: 'none descr' } } = state;
  console.log('params: ' + JSON.stringify(params));
  return {
    title: 'Screen2',
    header: <View style={{ marginTop: 30, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', backgroundColor: 'yellow' }}>
      <Button title='Button' onPress={() => setParams({ name: 'headerRight', descr: 'new descr' })} />
      <Text>{params.descr}</Text>
      <Button title='Button' onPress={() => setParams({ name: 'headerLeft' })} />
    </View>
  } as NavigationStackScreenOptions
}

// Define our stack navigation
const Stack = StackNavigator({
  Screen1: {
    screen: Screen1,
  } as NavigationRouteConfig<{ screen }>, //something wrong here in typedef, with 'screen'
  Screen2: {
    screen: Screen2,
  },
}, {
  initialRouteName: 'Screen2',
  //initialRouteParams: { name: 'initialRouteParams'}
} as StackNavigatorConfig);


export default Stack;