import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'

export const providerConnector: ComponentDecorator<Drawer.IDispatchProps & Drawer.IStateProps, Drawer.IOwnProps> = connect(
  (state: IState) => ({ ...state.drawer, ...state.mediaQuery } as Drawer.IStateProps),
  (dispatch, ownProps) => ({
    showDrawer: visible => dispatch({ type: Drawer.Consts.SHOW, visible }),
  } as Drawer.IDispatchProps)
)

export const reducer: App.IReducer<Drawer.IState> = (state, action: Drawer.Action | Media.INativeChangeMediaAction | Media.IWebChangeMediaAction) => {
  if (!state) return { }
  switch (action.type) {
    case Drawer.Consts.SHOW: return { drawerVisible: action.visible }
    case Drawer.Consts.TOOGLE: return { drawerVisible: !state.drawerVisible }
    case Media.Consts.WEB_CHANGE_MEDIA:
    case Media.Consts.NATIVE_CHANGE_DIMENSION: return { drawerVisible: action.windowSize != Media.TWindowSize.mobile }
    default: return state
  }
}


