import React from 'react';
import { modifyNavigator } from '../react-navigator-lib';

import addNavigationHelpers from 'react-navigation/lib/addNavigationHelpers'

// WEB
//import { StackNavigator } from '../../app-web/react-navigation/stack-navigator'
//import { TabNavigator } from '../../app-web/react-navigation/tab-navigator'
//const Text = ({ children, onPress }: { children?, onPress?}) => <span style={{ display: 'block' }} onClick={() => { if (!onPress) return; onPress() }}>{children}</span>
//const View = ({ children, style }: { children?, style?}) => <div style={{ fontSize: '18px', ...style }}>{children}</div>

import { TabNavigatorConfig } from 'react-navigation'
import { View, Text, TabNavigator, StackNavigator } from '../../polyfill/index'

const MainStack = ({ navigation }) => {
  console.log('*** MainStack ', JSON.stringify(navigation,null,2));
  return <View style={{ flex: 1 }}>
    <Text>MAIN STACK</Text>
    <Text onPress={() => navigation.navigate('SubStackScreen')}>To Inner</Text>
    <Text onPress={() => navigation.navigate('MainStackScreen')}>To Main</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>

    <Text onPress={() => navigation.goBack()}>Back</Text>
  </View>
}

const InnerStack = ({ navigation }) => { 
  return <View style={{ flex: 1 }}>
    <Text>INNER STACK</Text>
    <Text onPress={() => navigation.navigate('SubStackScreen')}>To Inner</Text>
    <Text onPress={() => navigation.navigate('MainStackScreen')}>To Main</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>

    <Text onPress={() => navigation.goBack()}>Back</Text>
  </View>
}

const LeftTab = ({ navigation }) => {
  return <View style={{ flex: 1 }}>
    <Text>LEFT TAB</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>
    <Text onPress={() => navigation.goBack()}>Back</Text>
    <Stack />
  </View>
}

const RightTab = ({ navigation }) => {
  return <View style={{ flex: 1 }}>
    <Text>RIGHT TAB</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>
    <Text onPress={() => navigation.goBack()}>Back</Text>
    <Stack />
  </View >
}


const Stack = StackNavigator({
  MainStackScreen: {
    screen: MainStack,
  },
  SubStackScreen: {
    screen: InnerStack,
  }
});

modifyNavigator(Stack)

const Tab = TabNavigator({
  LeftTabScreen: {
    screen: Stack,
    navigationOptions: {
      screenProps: {
        test: 'screenProps'
      }
    }
  },
  RightTabScreen: {
    screen: Stack,
  }
},
  {
    navigationOptions: {
      paths: {
        x:'x'
      },
      screenProps: {
        test: 'screenProps'
      }
    }
  } as TabNavigatorConfig
);
modifyNavigator(Tab)

const Root = () => <View style={{ flex: 1, marginTop: 30 }}><Tab /></View>

//import { View, Text } from '../polyfill'
//const Root = () => <View style={{ flex: 1, marginTop: 30 }}><Text>HALLO</Text></View>


export default Root;