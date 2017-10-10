import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { providerConnector as drawerConnector } from '../lib/drawer'
import { providerConnector as routerConnector } from '../lib/router'
import { View, Text, Animated, AnimatedMobileDrawer, AnimatedTabletDrawer } from '../gui/gui'

const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

const nonMobileMenuWidth = 256

const mobile: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {
  const { drawerVisible, windowSize, showDrawer, rnWidth } = props
  const { content, menu, ...rest } = props
  const { lmGlobal: { isNative } } = window //https://react-md.mlaursen.com/components/drawers
  const drawerWidth = Math.min(320, (isNative ? rnWidth : window.innerWidth) - 56)

  return <AnimatedMobileDrawer
    willBeVisible={drawerVisible}
    doShowDrawer={isShow => showDrawer(isShow)}
    content={Content({ ...rest, ...content })}
    menu={Menu({ ...rest, ...menu })}
    drawerWidth={drawerWidth}
    screenWidth={rnWidth}
  />
}

const tablet: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {

  const { drawerVisible, windowSize, showDrawer, rnWidth } = props
  const { content, menu, ...rest } = props

  return <AnimatedTabletDrawer
    willBeVisible={drawerVisible}
    doShowDrawer={isShow => showDrawer(isShow)}
    content={Content({...rest,...content})}
    menu={Menu({...rest,...menu})}
    drawerWidth={nonMobileMenuWidth}
    screenWidth={rnWidth}
    isTablet
  />
}

const desktop: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {

  const { drawerVisible, windowSize } = props
  const { content: cont, menu: men, ...rest } = props
  const menu = Menu({...rest, ...men})
  const content = Content({ ...rest, ...cont}) //<Content {...rest} {...cont} />
  return <View style={{ ...absoluteStretch, flexDirection: 'row', }}>
    {React.cloneElement(menu, { ...menu.props, key: 0, style: { ...menu.props.style, width: nonMobileMenuWidth } })}
    {React.cloneElement(content, { ...content.props, key: 1, style: { ...content.props.style, flex: 1  } })}
  </View>
}

const drawerLayout: React.SFC<Drawer.IOwnProps> = props => {
  let ActDrawer
  switch (props.windowSize) {
    case Media.TWindowSize.mobile: ActDrawer = mobile; break
    case Media.TWindowSize.tablet: ActDrawer = tablet; break
    case Media.TWindowSize.desktop: ActDrawer = desktop; break
  }
  return <ActDrawer {...props} />
}

const Content: React.SFC<Drawer.IContent> = props => {
  const { header, content, style, nodeChilds, nodeType: NodeType, node, ...rest } = props
  if (NodeType) return <NodeType { ...props } />
  if (node) return node
  if (nodeChilds) return <View style={{ ...style as any }}>{props.nodeChilds.map(Node => <Node { ...props } />)}</View>
  return <View style={{ ...style as any }}>
    <ContentHeader key={1} {...header } {...rest } style={{ height: 50 }} />
    <ContentContent key={2} {...content } {...rest } style={{ flex: 1 }} />
  </View>
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
  const { header, content, style, nodeChilds, nodeType: NodeType, node, ...rest } = props
  if (NodeType) return <NodeType { ...props } />
  if (node) return node
  return <View style={props.style as any}>

  </View>
}

export const DrawerLayout = drawerConnector(drawerLayout)

