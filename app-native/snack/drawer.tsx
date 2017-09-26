import React from 'react';
import { connect } from 'react-redux';
import {Button , View, Text } from 'react-native';
import SideMenu from '../gui/react-native-side-menu'

export default class App extends React.PureComponent {
  state = { windowSize: Media.TWindowSize.mobile }
  sideMenu: SideMenu
  render() {
    const changeWindowSize = windowSize => this.setState({ windowSize: windowSize == Media.TWindowSize.desktop ? Media.TWindowSize.mobile : (windowSize == Media.TWindowSize.tablet ? Media.TWindowSize.desktop : Media.TWindowSize.tablet) })
    return <SideMenu isRight
      ref={sideMenu => this.sideMenu = sideMenu}
      key={count++}
      windowSize={this.state.windowSize}
      menuContent={props => <View style={[props]}>
        <Button key={1} onPress={() => this.sideMenu.openMenu(false)} title='CLOSE MENU' />
      </View>}
      content={props => <View key={999} style={props}>
        <Button key={1} onPress={() => this.sideMenu.openMenu(true)} title='OPEN MENU' />
        <Button key={2} onPress={() => changeWindowSize(this.state.windowSize)} title='CHANGE SCREEN' />
      </View>}
    />
  }
}
let count = 0


//class drawerExample extends React.Component<Media.IState> {
//  state = {isOpen:false}
//  render() {
//    return <View style={{ flex: 1, marginTop: 30 }}>
//      <SideMenu menu={
//        <View style={{ flex: 1, backgroundColor: 'lightgray' }}>
//          <Text onPress={() => this.setState({ isOpen: false })}>DRAWER CLOSE</Text>
//        </View>}
//        initIsOpen={this.state.isOpen}
//        onChange={isOpen => (this.state.isOpen!=isOpen) && this.setState({isOpen})}>

//        <View key={1} style={{backgroundColor: 'yellow' }}>
//          <Text onPress={() => this.setState({ isOpen: true })} style={{ alignSelf: 'flex-start' }}>DRAWER OPEN 1</Text>
//        </View>
//        <View key={2} style={{backgroundColor: 'yellow' }}>
//          <Text>{'HALLO WORLD'/*JSON.stringify(this.props, null, 2)*/}</Text>
//        </View>
//        <Content key={3} idx={2}/>
//        <Content key={4} idx={3} />

//      </SideMenu>
//    </View>
//  }
//}

class Content extends React.PureComponent<{ idx: number }> {
  render() {
    return <Text>CONTENT {this.props.idx} {counter++}\n asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as asdfas df asd f as</Text>
  }
}

let counter = 0

//const provider = connect<Media.IState, {}, {}>((state: IState) => state.mediaQuery)

//const DrawerExample = provider(drawerExample)

//export default DrawerExample

//export default drawerExample