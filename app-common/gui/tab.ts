import React from 'react'
import { connect } from 'react-redux'

// **** for user action
export const changeIndex = (props: GUI.ITabOwnProps, idx: number) => window.lmGlobal.store.dispatch({ ...props.userAction, idx: idx, data: props.buttons[idx].data } as GUI.ITabUserAction)
//export const changeNavigateIndex = <TName extends string = string, TParams extends Router.IRoutePar = any>(props: GUI.ITabOwnProps, idx: number) => changeIndex(props, idx) as GUI.ITabNavigateAction<TName, TParams>

// **** for reducer
export const providerConnector = connect<GUI.ITabState, GUI.ITabDispatch, GUI.ITabOwnProps>(
  (state: IState, ownProps: GUI.ITabOwnProps) => {
    let res = state
    ownProps.statePath.forEach(subPath => res = res[subPath])
    return res as GUI.ITabState
  },
  (dispatch, ownProps: GUI.ITabOwnProps) => ({
    changeIndex: (index: number) => dispatch({ type: GUI.TabConsts.SET_INDEX, index, statePath: ownProps.statePath } as GUI.ITabAction),
  } as GUI.ITabDispatch)
)

export const reducer: App.IReducer<GUI.ITabState> = (state, action: GUI.ITabAction) => {
  if (!state) return { index:0 }
  switch (action.type) {
    case GUI.TabConsts.SET_INDEX: return { index: action.index }
    default: return state
  }
}
