import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

export const registerFile = (fileId: Loc.TFileIds, path: string) => { }

class provider extends React.PureComponent<Loc.IState> {
  render() {
    return React.Children.only(this.props.children)
  }
  getChildContext(): IContext {
    const { children, dispatch, ...rest } = this.props as any //vyhod z props nesmysly
    return {
      loc: rest
    };
  }
  static childContextTypes = { loc: PropTypes.any }
}
const providerConnector = connect((state: IState) => state.loc)
export const Provider = providerConnector(provider)

export const reducer: App.IReducer<Loc.IState> = (state, action) => {
  if (!state) state = { nativeLang: 'en', mode: Loc.IContextMode.none, forceUpdate: 0 }
  return state
  //switch (action.type) {
  //  case Router.Consts.NAVIGATE_END: return action.newState
  //  default: return state || { routerName: null }
  //}
}

export const loc = (ctx: Loc.IContext, file: Loc.TFileIds) => {
  return {
    s: (sentId: number, enSource: string) => s({ ctx, file, sentId, enSource }),
    ss: (sentId: number, enSources: string[], mask: (pars: string[]) => React.ReactNode[]) => ss({ ctx, file, sentId, enSources, mask }),
    cl: <T extends any>(event: React.MouseEventHandler<T>) => cl(ctx, event)
  }
}

export const contextType = <T extends {}>(comp: React.ComponentType<T>) => {
  comp.contextTypes = { ...comp.contextTypes, loc: PropTypes.any }
  return comp
}

export const locWrapper = (props: Loc.ILocSentenceProps, isSS:boolean ) => {
  const { ctx, file, sentId, enSource, enSources, mask } = props
  return <span></span>
}

export const s = (par: Loc.ILocSentenceProps) => {
  const { ctx, file, sentId, enSource } = par
  return par.enSource
}
export const ss = (par: Loc.ILocSentenceProps) => {
  const { ctx, file, sentId, enSources, mask } = par
  switch (ctx.mode) {
    case Loc.IContextMode.batch:
      //TODO: do ctx.loc.data dej enSource
      return mask(enSources)
    case Loc.IContextMode.loc:
      /*TODO vezmi preklad z ctx.loc.data*/
      return <span onClick={() => alert('${file},${sentId}')} style={{ backgroundColor: 'maroon' }}>{mask(enSources) }</span >
    default:
      /*TODO vezmi preklad z ctx.loc.data*/
      return mask(enSources)
  }
}

export const cl = <T extends any>(ctx: Loc.IContext, event: React.MouseEventHandler<T>) => {
  switch (ctx.mode) {
    case Loc.IContextMode.batch: 
    case Loc.IContextMode.loc: return (ev: React.MouseEvent<T>) => { if (ev) ev.preventDefault() }
    default: return event
  }
}