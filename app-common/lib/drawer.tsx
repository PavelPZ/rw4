import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'

export const providerConnector: ComponentDecorator<Drawer.IProps, Drawer.IOwnProps>  = connect(
  (state: IState) => ({drawerVisible: state.drawer.drawerVisible, windowSize: state.mediaQuery.windowSize} as Drawer.IProps),
)

export const reducer: App.IReducer<Drawer.IState> = (state, action: Drawer.Action) => {
  if (!state) return { }
  switch (action.type) {
    case Drawer.Consts.SHOW: return { drawerVisible: action.visible}
    default: return state
  }
}


