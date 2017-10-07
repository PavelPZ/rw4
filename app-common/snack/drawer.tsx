import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { providerConnector as drawerConnector } from '../lib/drawer'
import { providerConnector as routerConnector } from '../lib/router'
import { View, Text, Animated, AnimatedView } from '../gui/gui'

const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

interface IAnimation {
  to: (value: number) => void
  cancel: () => void
}

class drawerLayout extends React.PureComponent<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> {

  render() {
    const { props, props: { drawerVisible, windowSize } } = this
    return <AnimatedView {...{ anim: { propName: 'left', targetValue: windowSize != Media.TWindowSize.desktop && (this.props.drawerVisible ? 0 : -240)}}} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, marginTop: window.lmGlobal.topMargin, flexDirection: 'row', }}>
      <View key={1} style={{ width:240, backgroundColor: 'purple' }}>
        <Text> 
          as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs
          as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs  as df as fas df asd fs
        </Text>
      </View>
      <View key={2} style={{ flex: 1, backgroundColor: 'yellow' }}>
        <Text key={1} onPress={() => {
          const { windowSize } = props
          props.debugSetWindowSize(windowSize == Media.TWindowSize.desktop ? Media.TWindowSize.mobile : (windowSize == Media.TWindowSize.tablet ? Media.TWindowSize.desktop : Media.TWindowSize.tablet))
        }}>Window size: {props.windowSize}</Text>
        <Text key={2} onPress={() => props.showDrawer(!props.drawerVisible)}>Drawer visible Drawer visible Drawer visible</Text>
        {props.children}
      </View>
    </AnimatedView>
  }
}

export const DrawerLayout = drawerConnector(drawerLayout)

const app: React.SFC<Router.IRouterStateProps> = props => {
  return null //<DrawerLayout />
}

const App = routerConnector(app)

export default App

      //<View style={[absoluteStretch, { left: animProp }]} {...responder.panHandlers}>
      //  <View style={[absoluteStretch, { backgroundColor: 'green', marginLeft: openMenuOffset }]}>
      //    <Text onPress={() => this.openMenu(true)}>YYY ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
      //  </View>
      //  <View style={[absoluteStretch, { backgroundColor: 'red', width: openMenuOffset }]}>
      //    <Text onPress={() => this.openMenu(false)}>XXX fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd ad fas f asd fasd f asd fasd f asdf asd </Text>
      //  </View>
      //</View>
