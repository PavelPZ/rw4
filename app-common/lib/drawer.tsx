import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'

export const providerConnector: ComponentDecorator<Drawer.IStateProps & Drawer.IDispatchProps, {}>  = connect(
  (state: IState) => state.drawer,
  (dispatch) => ({
    show: () => dispatch({ type: Drawer.Consts.SHOW, isShow: true } as Drawer.Action),
    hide: () => dispatch({ type: Drawer.Consts.SHOW, isShow: false } as Drawer.Action),
  } as Drawer.IDispatchProps)
)

export const reducer: App.IReducer<Drawer.IState> = (state, action: Drawer.Action) => {
  if (!state) return { visible: false, toolbarTitle:'' }
  switch (action.type) {
    case Drawer.Consts.SHOW: return state
    default: return state
  }
}


