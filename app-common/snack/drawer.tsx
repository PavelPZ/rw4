import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { providerConnector as drawerConnector } from '../lib/drawer'
import { providerConnector as routerConnector } from '../lib/router'
import { View, Text, Animated, AnimatedView } from '../gui/gui'
import GestureRecognizer from '../../app-native/gui/react-native-swipe-gesture'

const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

const drawerLayoutTablet: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {

  const { drawerVisible, windowSize } = props
  const { content, menu, ...rest } = props
  return <AnimatedView {...{ anim: { propName: 'left', targetValue: drawerVisible ? 0 : -256 } }} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, marginTop: window.lmGlobal.topMargin, flexDirection: 'row', }}>
    <Menu key={1} {...rest} {...menu} style={{ width: 256 }} />
    <Content key={2} {...rest} {...content} style={{ flex: 1 }} />
  </AnimatedView>
}

const drawerLayoutMobile: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {

  const { drawerVisible, windowSize, showDrawer, rnWidth } = props
  const drawerWidth = Math.min(rnWidth - 56, 320) //https://react-md.mlaursen.com/components/drawers
  const { content, menu, ...rest } = props
  return <GestureRecognizer style={{ ...absoluteStretch as any, marginTop: window.lmGlobal.topMargin }} onSwipeRight={isEdge => isEdge && showDrawer(true)} onSwipeLeft={() => showDrawer(false)}>
    <Content key={1} {...rest} {...content} style={{ ...absoluteStretch as any }} />
    <AnimatedView key={2} {...{ onPress: () => drawerVisible && showDrawer(false), anim: { propName: 'opacity', targetValue: drawerVisible ? 0.85 : 0, backdropShow: !!drawerVisible } }} style={{ ...absoluteStretch as any, backgroundColor: 'gray' }} />
    <AnimatedView key={3} {...{ anim: { propName: 'left', targetValue: drawerVisible ? 0 : -drawerWidth } }} style={{ position: 'absolute', top: 0, bottom: 0, width: drawerWidth, flexDirection: 'row' }}>
      <Menu {...rest} {...menu} style={{ flex: 1 }} />
    </AnimatedView>
  </GestureRecognizer>
}

const drawerLayoutDesktop: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {

  const { drawerVisible, windowSize } = props
  const { content, menu, ...rest } = props
  return <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, marginTop: window.lmGlobal.topMargin, flexDirection: 'row', }}>
    <Menu key={1} {...rest} {...menu} style={{ width: 256 }} />
    <Content key={2} {...rest} {...content} style={{ flex: 1 }} />
  </View>
}

const drawerLayout: React.SFC<Drawer.IOwnProps> = props => {
  let ActDrawer
  switch (props.windowSize) {
    case Media.TWindowSize.mobile: ActDrawer = drawerLayoutMobile; break
    case Media.TWindowSize.tablet: ActDrawer = drawerLayoutTablet; break
    case Media.TWindowSize.desktop: ActDrawer = drawerLayoutDesktop; break
  }
  return <ActDrawer {...props} />
}

const Content: React.SFC<Drawer.IContent> = props => {
  const { header, content, style, nodeChilds, nodeType: Node, node, ...rest } = props
  if (Node) return <Node { ...props } />
  if (node) return node
  return [
    props.nodeChilds && <View style={{ ...style as any }}>{props.nodeChilds.map(Node => <Node { ...props } />)}</View>,
    !props.nodeChilds && <View style={{ ...style as any }}>
      <ContentHeader key={1} {...header } {...rest } style={{ height: 50 }} />
      <ContentContent key={2} {...content } {...rest } style={{ flex: 1 }} />
    </View>
  ] as any
}

const ContentHeader: React.SFC<Drawer.IContentHeader> = props => {
  const { left, body, right, style, nodeChilds, node: Node, ...rest } = props
  if (Node) return <Node { ...props } />
  return <View style={style as any}>
    {props.nodeChilds && props.nodeChilds.map(Node => <Node { ...props } />)}
    {!props.nodeChilds && [

    ]}
  </View>
}

const ContentContent: React.SFC<Drawer.IContentContent> = props => {
  const { style, node: Node, ...rest } = props
  if (Node) return <Node { ...props } />
  return <View style={style as any}>
    {props.children}
  </View>
}

const Menu: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IMenu> = props => {
  if (props.node) return <props.node { ...props } />
  return <View style={props.style as any}>

  </View>
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
