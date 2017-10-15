import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { View, Text, Animated, AnimatedDrawer } from '../gui/gui'
import { Content, Menu } from '../../app-web/snack/page'

export const providerConnector: ComponentDecorator<Drawer.IDispatchProps & Drawer.IStateProps, {}> = connect(
  (state: IState) => ({ ...state.drawer, ...state.mediaQuery } as Drawer.IStateProps),
  (dispatch, ownProps) => ({
    showDrawer: visible => dispatch({ type: Drawer.Consts.SHOW, visible }),
  } as Drawer.IDispatchProps)
)

export const reducer: App.IReducer<Drawer.IState> = (state, action: Drawer.Action | Media.INativeChangeMediaAction | Media.IWebChangeMediaAction) => {
  if (!state) return {}
  switch (action.type) {
    case Drawer.Consts.SHOW: return { drawerVisible: action.visible }
    case Drawer.Consts.TOOGLE: return { drawerVisible: !state.drawerVisible }
    case Media.Consts.WEB_CHANGE_MEDIA:
    case Media.Consts.NATIVE_CHANGE_DIMENSION: return { drawerVisible: action.windowSize != Media.TWindowSize.mobile }
    default: return state
  }
}

const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }

const nonMobileMenuWidth = 256

const drawerLayout: React.SFC<Drawer.IOwnProps> = props => {
  let ActDrawer
  switch (props.windowSize) {
    case Media.TWindowSize.mobile: ActDrawer = mobile; break
    case Media.TWindowSize.tablet: ActDrawer = tablet; break
    case Media.TWindowSize.desktop: ActDrawer = desktop; break
  }
  return ActDrawer(props)
}

const mobile: React.SFC<Drawer.IOwnProps> = props => {
  const { content, menu, children, drawerVisible, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  const drawerWidth = Math.min(320, (window.rn ? rnWidth : window.innerWidth) - 56) //https://react-md.mlaursen.com/components/drawers
  return <AnimatedDrawer
    willBeVisible={drawerVisible}
    doShowDrawer={isShow => showDrawer(isShow)}
    content={<Content { ...rest} {...content } />}
    menu={<Menu { ...rest} {...menu } />}
    drawerWidth={drawerWidth}
    screenWidth={rnWidth}
    refForAnimation={refForAnimation}
  />
}

const tablet: React.SFC<Drawer.IOwnProps> = props => {
  const { content, menu, children, drawerVisible, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  return <AnimatedDrawer
    willBeVisible={drawerVisible}
    doShowDrawer={isShow => showDrawer(isShow)}
    content={<Content { ...rest} {...content } />}
    menu={<Menu { ...rest} {...menu } />}
    drawerWidth={nonMobileMenuWidth}
    screenWidth={rnWidth}
    refForAnimation={refForAnimation}
    isTablet
  />
}

const desktop: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {
  const { content, menu, children, drawerVisible, refForAnimation, ...rest } = props
  const { windowSize } = props
  const mm = <Menu {...rest} { ...menu}/>
  const cc = <Content { ...rest} {...content} />
  return <View style={{ ...absoluteStretch, flexDirection: 'row', }} webRef={refForAnimation}>
    {React.cloneElement(mm, { ...mm.props, key: 0, style: { ...mm.props.style, width: nonMobileMenuWidth } })}
    {React.cloneElement(cc, { ...cc.props, key: 1, style: { ...cc.props.style, flex: 1  } })}
  </View>
}

//************ CONTENT

//const Content: React.SFC<Drawer.IContent> = props => {
//  const { header, content, style, node, ...rest } = props
//  if (node) return node
//  return <View key={1} style={{ width: 256, zIndex: 1 }} web={{ className: 'md-paper--1' }}> {/*<Container key={1} style={{ flex:0, width:256, backgroundColor: '#fafafa', ...elevation }}>*/}
//    <ContentHeader key={1} {...header } {...rest } style={{ height: 50 }} />
//    <ContentContent key={2} {...content } {...rest } style={{ flex: 1 }} />
//  </View>
//}

//const ContentHeader: React.SFC<Drawer.IContentHeader> = props => {
//  const { left, body, right, style, node, ...rest } = props
//  if (node) return node
//  return <View style={style}>
//  </View>
//}

//const ContentContent: React.SFC<Drawer.IContentContent> = props => {
//  const { style, node, ...rest } = props
//  if (node) return node
//  return <View style={style as any}>
//    {props.children}
//  </View>
//}

//const Menu: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IMenu> = props => {
//  const { header, content, style, nodeChilds, nodeType: NodeType, node, ...rest } = props
//  if (NodeType) return <NodeType { ...props } />
//  if (node) return node
//  return <View style={props.style as any}>

//  </View>
//}

export const DrawerLayout = providerConnector(drawerLayout)

