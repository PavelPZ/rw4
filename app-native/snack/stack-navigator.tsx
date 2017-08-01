//two drawers waiting for: https://github.com/react-community/react-navigation/pull/1803

import React from 'react';
import { Text, Button, View } from 'react-native';
import { StackNavigator, NavigationStackScreenOptions, NavigationStackRouterConfig } from 'react-navigation';

const Screen1 = ({ navigation }) => {
  const params = navigation.state.params;
  return <View>
    <Text>Name: {params ? params.name : 'none'}</Text>
    <Button onPress={() => navigation.navigate('Screen2', { descr: 'info from screen1' })} title="Open Screen2" />
  </View>
}
(Screen1 as any).navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params } = state;
  return {
    title: 'Screen1',
    headerRight: <Button title='Button' onPress={() => setParams({ name: 'headerRight' })} />,
    headerLeft: <Button title='Button' onPress={() => setParams({ name: 'headerLeft' })} />,
    //headerTitle: 'headerTitle',
    headerTitle: <Text>headerTitle</Text>
  } as NavigationStackScreenOptions
}

const Screen2 = ({ navigation }) => {
  const params = navigation.state.params;
  return <View>
    <Text>Name: {params ? params.name : 'none'}, descr: {params ? params.descr : 'none'}</Text>
    <Button onPress={() => navigation.navigate('Screen1')} title="Open Screen1" />
  </View>
}
(Screen2 as any).navigationOptions = props => {
  const { navigation } = props;
  const { state, setParams } = navigation;
  const { params = {} as any } = state;
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

  },
  Screen2: {
    screen: Screen2,
  },
}, {
  initialRouteName: 'Screen2',
  paths: {
    Screen1: 's1',
    Screen2: 's2',
  }
} as NavigationStackRouterConfig);


export default Stack;