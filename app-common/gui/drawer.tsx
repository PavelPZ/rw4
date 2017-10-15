import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { View, Text, AnimatedDrawer, getDrawerHeader } from '../gui/gui'

const getContent = (pars: Drawer.IContent, st: Drawer.IStyled) => <Content {...pars} {...st} />
const getMenu = (pars: Drawer.IMenu, st: Drawer.IStyled) => <Menu {...pars} {...st} />

export const providerConnector: ComponentDecorator<Drawer.IStateDispatch, {}> = connect(
  (state: IState) => ({ ...state.drawer, ...state.mediaQuery } as Drawer.IState),
  dispatch => ({
    showDrawer: visible => dispatch({ type: Drawer.Consts.SHOW, visible }),
  } as Drawer.IDispatch)
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

const mobile: React.SFC<Drawer.IProps> = props => {
  const { children, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  const drawerWidth = Math.min(320, (window.rn ? rnWidth : window.innerWidth) - 56) //https://react-md.mlaursen.com/components/drawers
  return <AnimatedDrawer
    {...props}
    getContent={getContent}
    getMenu={getMenu}
    drawerWidth={drawerWidth}
    screenWidth={rnWidth}
  />
}

const tablet: React.SFC<Drawer.IProps> = props => {
  const { children, ...rest } = props
  const { refForAnimation, windowSize, showDrawer, rnWidth } = props
  return <AnimatedDrawer
    {...props}
    getContent={getContent}
    getMenu={getMenu}
    drawerWidth={nonMobileMenuWidth}
    screenWidth={rnWidth}
    isTablet
  />
}

const desktop: React.SFC<Drawer.IProps> = props => {
  const { content, menu, children, drawerVisible, refForAnimation, ...rest } = props
  const { windowSize } = props
  return <View style={{ ...absoluteStretch, flexDirection: 'row', }} >
    {getMenu(menu, { key: 1, style: { width: nonMobileMenuWidth } })}
    {getContent(content, { key: 2, style: { flex: 1 } })}
  </View>
}
const absoluteStretch: ReactNative.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
const nonMobileMenuWidth = 256

const drawerLayout: React.SFC<Drawer.IProps> = props => {
  let ActDrawer
  switch (props.windowSize) {
    case Media.TWindowSize.mobile: ActDrawer = mobile; break
    case Media.TWindowSize.tablet: ActDrawer = tablet; break
    case Media.TWindowSize.desktop: ActDrawer = desktop; break
  }
  return ActDrawer(props)
  //return mobile(props)
}

export const DrawerLayout = providerConnector(drawerLayout)

class Content extends React.Component<Drawer.IContent> {

  shouldComponentUpdate(nextProps: Drawer.IContent) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style, key, web, webStyle }
    if (node) return node(styled)
    return <View {...styled} >
      {getDrawerHeader(true, { ...header })}
      {contentContent({ ...content, ...rest })}
    </View>
  }
}

const contentContent = ({ node, style, key, web, webStyle, items, ...rest }: Drawer.IContentContent) => {
  const styled: Drawer.IStyled = { key: 20, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled)
  return <View {...styled}>
    {items}
  </View>
}

class Menu extends React.Component<Drawer.IMenu> {

  shouldComponentUpdate(nextProps) { return false }

  render() {
    const { header, content, node, style, key, web, webStyle, children, ...rest } = this.props
    const styled = { style: { ...style, zIndex: 1, backgroundColor: 'white' }, key, web: { ...web, className: 'md-paper--1' }, webStyle }
    if (node) return node(styled)
    return <View {...styled}>
      {getDrawerHeader(false, { ...header })}
      {menuContent({ ...content, ...rest })}
    </View>
  }
}

const menuContent = (props: Drawer.IMenuContent) => {
  const { node, style, items, ...rest } = props
  const styled: Drawer.IStyled = { key: 30, style: { flex: 1, padding: 8 }, webStyle: { overflow: 'auto' } }
  if (node) return node(styled)
  return <View {...styled}>
    {items}
  </View>
}



