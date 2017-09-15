import React, { Component } from 'react';
import { Drawer, View, Text } from 'native-base';
import SideMenu from 'react-native-side-menu'

export default class DrawerExample extends Component {
  state = {isOpen:false}
  render() {
    return <View style={{ flex: 1, marginTop: 30 }}>
      <SideMenu menu={
        <View style={{ flex: 1 }}>
          <Text onPress={() => this.setState({ isOpen: false })}>DRAWER CLOSE</Text>
        </View>}
        isOpen={this.state.isOpen}
        bounceBackOnOverdraw={false}
        onChange={isOpen => this.setState({ isOpen })}>
        <View style={{ flex: 1, backgroundColor: 'white', opacity: this.state.isOpen ? 0.3 : 1 }}>
          <Text onPress={() => this.setState({ isOpen: true })} style={{ alignSelf: 'flex-start' }}>DRAWER OPEN 1</Text>
        </View>
      </SideMenu>
    </View>
  }
}
/*
*/