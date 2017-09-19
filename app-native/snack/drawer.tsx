﻿import React, { Component } from 'react';
import { View, Text } from 'native-base';
import SideMenu from '../gui/react-native-side-menu'

export default class DrawerExample extends Component {
  state = {isOpen:false}
  render() {
    return <View style={{ flex: 1, marginTop: 30 }}>
      <SideMenu menu={
        <View style={{ flex: 1 }}>
          <Text onPress={() => this.setState({ isOpen: false })}>DRAWER CLOSE</Text>
        </View>}
        isOpen={this.state.isOpen}
        //bounceBackOnOverdraw={false}
        onChange={isOpen => this.setState({ isOpen })}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <Text onPress={() => this.setState({ isOpen: true })} style={{ alignSelf: 'flex-start' }}>DRAWER OPEN 1</Text>
        </View>
      </SideMenu>
    </View>
  }
}