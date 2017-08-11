import React from 'react'
import { connect } from 'react-redux'

class provider extends React.PureComponent<Loc.IState> {
  render() {
    return React.Children.only(this.props.children)
  }
}
const providerConnector = connect((state: IState) => state.loc)
export const Provider = providerConnector(provider)

export const reducer: App.IReducer<Loc.IState> = (state, action) => {
  return state
  //switch (action.type) {
  //  case Router.Consts.NAVIGATE_END: return action.newState
  //  default: return state || { routerName: null }
  //}
}

export const s = (ctx: Loc.ILocContext, file: string, sendId: number, enSource: string) => enSource
export const ss = (ctx: Loc.ILocContext, file: string, sendId: number, enSource: string[], mask: (pars: string[]) => React.ReactNode[]) => {
  switch (ctx.loc.mode) {
    case Loc.IContextMode.none:
      /*TODO vezmi preklad z ctx.loc.data*/
      return mask(enSource)
    case Loc.IContextMode.loc:
      /*TODO vezmi preklad z ctx.loc.data*/
      return <div>{mask(enSource)}</div>
    default:
      //TODO: do ctx.loc.data dej enSource
      return mask(enSource)
  }
}

export const cl = <T extends any>(ctx: Loc.ILocContext, event: React.MouseEventHandler<T>) => {
  switch (ctx.loc.mode) {
    case Loc.IContextMode.loc: return (ev: React.MouseEvent<T>) => { if (ev) ev.preventDefault() }
    default: return event
  }
}