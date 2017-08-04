import React from 'react';
import { modifyNavigator } from '../react-navigator-lib';

// WEB
import addNavigationHelpers from 'react-navigation/lib/addNavigationHelpers'
import { StackNavigator } from '../../app-web/react-navigation/stack-navigator'
import { TabNavigator } from '../../app-web/react-navigation/tab-navigator'
const Text = ({ children, onPress }: { children?, onPress?}) => <span style={{ display: 'block' }} onClick={() => { if (!onPress) return; onPress() }}>{children}</span>
const View = ({ children, style }: { children?, style?}) => <div style={{ fontSize: '18px', ...style }}>{children}</div>

// REACT NATIVE
//import { TabNavigator } from 'react-navigation'
//import { View, Text } from 'react-native'

const MainStack = ({ navigation }) => {
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
  debugger;
  return <View style={{ flex: 1 }}>
    <Text>LEFT TAB</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>
    <Text onPress={() => navigation.goBack()}>Back</Text>
    <Stack/>
  </View>
}

const RightTab = ({ navigation }) => {
  return <View style={{ flex: 1 }}>
    <Text>RIGHT TAB</Text>
    <Text onPress={() => navigation.navigate('RightTabScreen')}>To Right</Text>
    <Text onPress={() => navigation.navigate('LeftTabScreen')}>To Left</Text>
    <Text onPress={() => navigation.goBack()}>Back</Text>
    <Stack/>
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

//modifyNavigator(Stack)

const Tab = TabNavigator({
  LeftTabScreen: {
    screen: LeftTab, //Stack,
  },
  RightTabScreen: {
    screen: Stack,
  }
});
//modifyNavigator(Tab)

const Root = () => <View style={{ flex: 1, marginTop: 30 }}><Tab /></View>


export default Root;