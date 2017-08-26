import React from 'react'
import { connect } from 'react-redux'

const providerConnector = connect<Drawer.IStateProps, Drawer.IDispatchProps, {}>(
  (state: IState) => state.drawer,
  (dispatch) => ({
    show: () => dispatch({ type: Drawer.Consts.SHOW, isShow: true } as Drawer.Action),
    hide: () => dispatch({ type: Drawer.Consts.SHOW, isShow: false } as Drawer.Action),
  } as Drawer.IDispatchProps)
)

const provider: React.SFC<Drawer.IStateProps & Drawer.IDispatchProps> = props => <div>
</div>

export const reducer: App.IReducer<Drawer.IState> = (state, action: Drawer.Action) => {
  if (!state) return { visible: false }
  switch (action.type) {
    case Drawer.Consts.SHOW: return state
    default: return state
  }
}

export const Provider = providerConnector(provider)

export const render: React.SFC<Drawer.IRenderProps> = props => <div></div>

