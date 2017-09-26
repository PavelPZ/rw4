import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'native-base';
import SideMenu from '../gui/react-native-side-menu'

class drawerExample extends React.Component<Media.IState> {
  state = {isOpen:false}
  render() {
    return <View style={{ flex: 1, marginTop: 30 }}>
      <SideMenu menu={
        <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
          <Text onPress={() => this.setState({ isOpen: false })}>DRAWER CLOSE</Text>
        </View>}
        initIsOpen={this.state.isOpen}
        onChange={isOpen => (this.state.isOpen!=isOpen) && this.setState({isOpen})}>

        <View key={1} style={{backgroundColor: 'yellow' }}>
          <Text onPress={() => this.setState({ isOpen: true })} style={{ alignSelf: 'flex-start' }}>DRAWER OPEN 1</Text>
        </View>
        <View key={2} style={{backgroundColor: 'yellow' }}>
          <Text>{'HALLO WORLD'/*JSON.stringify(this.props, null, 2)*/}</Text>
        </View>
        <Content key={3} idx={2}/>
        <Content key={4} idx={3} />

      </SideMenu>
    </View>
  }
}

class Content extends React.PureComponent<{ idx: number }> {
  render() {
    return <Text>CONTENT {this.props.idx} {counter++}\n asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as</Text>
  }
}

let counter = 0

//const provider = connect<Media.IState, {}, {}>((state: IState) => state.mediaQuery)

//const DrawerExample = provider(drawerExample)

//export default DrawerExample

export default drawerExample