import React from 'react'
import { connect, InferableComponentEnhancerWithProps } from 'react-redux'
import { View, Text, AnimatedDrawer} from '../gui/gui'

export const providerConnector: InferableComponentEnhancerWithProps<Drawer.IState & Drawer.IDispatch, {}> = connect(
  (state: IState) => ({ ...state.drawer, ...state.mediaQuery } /*as Drawer.IState*/),
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
  const { rnWidth } = props
  const drawerWidth = Math.min(320, (window.rn ? rnWidth : window.innerWidth) - 56) //https://react-md.mlaursen.com/components/drawers
  return <AnimatedDrawer
    {...props}
    drawerWidth={drawerWidth}
    screenWidth={rnWidth}
  />
}

const tablet: React.SFC<Drawer.IProps> = props => {
  const { children, ...rest } = props
  const { rnWidth } = props
  return <AnimatedDrawer
    {...props}
    drawerWidth={nonMobileMenuWidth}
    screenWidth={rnWidth}
  />
}

const desktop: React.SFC<Drawer.IProps> = props => {
  const { children, rnWidth,...rest } = props
  return <AnimatedDrawer
    {...props}
    drawerWidth={nonMobileMenuWidth}
    screenWidth={rnWidth}
  />

}
const absoluteStretch: RN.ViewStyle = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }
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

