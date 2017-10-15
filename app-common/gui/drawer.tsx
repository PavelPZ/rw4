import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { View, Text, AnimatedDrawer } from '../gui/gui'

const Menu: React.SFC<Drawer.IMenu> = props => <View style={{ backgroundColor: 'lightgray', width: 256 }}><Text>MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU MENU </Text></View>
const Content: React.SFC<Drawer.IContent> = props => <View style={{ backgroundColor: 'yellow', flex: 1 }}><Text>CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT CONTENT </Text></View>
//import { Content, Menu } from '../../app-web/snack/page'


export const providerConnector: ComponentDecorator<Drawer.IDispatchProps & Drawer.IStateProps, Drawer.IOwnProps> = connect(
  (state: IState) => ({ ...state.drawer, ...state.mediaQuery } as Drawer.IStateProps),
  dispatch => ({
    showDrawer: visible => dispatch({ type: Drawer.Consts.SHOW, visible }),
  } as Drawer.IDispatchProps)
)

export const reducer: App.IReducer<Drawer.IStateProps> = (state, action: Drawer.Action | Media.INativeChangeMediaAction | Media.IWebChangeMediaAction) => {
  if (!state) return {}
  switch (action.type) {
    case Drawer.Consts.SHOW: return { drawerVisible: action.visible }
    case Drawer.Consts.TOOGLE: return { drawerVisible: !state.drawerVisible }
    case Media.Consts.WEB_CHANGE_MEDIA:
    case Media.Consts.NATIVE_CHANGE_DIMENSION: return { drawerVisible: action.windowSize != Media.TWindowSize.mobile }
    default: return state
  }
}

const mobile: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {
  const { content, menu, children, drawerVisible, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  const drawerWidth = Math.min(320, (window.rn ? rnWidth : window.innerWidth) - 56) //https://react-md.mlaursen.com/components/drawers
  return <AnimatedDrawer
    drawerVisible={drawerVisible}
    showDrawer={showDrawer}
    refForAnimation={refForAnimation}
    content={<Content { ...rest} {...content } />}
    menu={<Menu { ...rest} {...menu } />}
    drawerWidth={drawerWidth}
    screenWidth={rnWidth}
  />
}

const tablet: React.SFC<Drawer.IDispatchProps & Drawer.IStateProps & Drawer.IOwnProps> = props => {
  const { content, menu, children, drawerVisible, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  return <AnimatedDrawer
    drawerVisible={drawerVisible}
    showDrawer={showDrawer}
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
  return <View style={{ ...absoluteStretch, flexDirection: 'row', }} >
    {true && [mm,cc]}
    {false && React.cloneElement(mm, { ...mm.props, key: 0, style: { ...mm.props.style, width: nonMobileMenuWidth } })}
    {false && React.cloneElement(cc, { ...cc.props, key: 1, style: { ...cc.props.style, flex: 1  } })}
  </View>
}
const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const nonMobileMenuWidth = 256

const drawerLayout: React.SFC<Drawer.IOwnProps & Drawer.IDispatchProps & Drawer.IStateProps> = props => {
  let ActDrawer
  switch (props.windowSize) {
    case Media.TWindowSize.mobile: ActDrawer = mobile; break
    case Media.TWindowSize.tablet: ActDrawer = tablet; break
    case Media.TWindowSize.desktop: ActDrawer = desktop; break
  }
  //return ActDrawer(props)
  return mobile(props)
}

export const DrawerLayout = providerConnector(drawerLayout)

