import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { isLogged } from './login'

const routes: { [name: string]: Router.TRoute } = {}

const providerConnector = connect((state: IState) => state.router)

const provider = (props: Router.IState) => props && props.routerName ? React.createElement(routes[props.routerName] as React.ComponentClass, props.par) : null

// ***** EXPORTS
export const navigate = (routerName: string, par) => {
  const action: Router.IAction = { type: Router.Consts.SAGA, newState: { routerName, par } }
  window.lmGlobal.store.dispatch(action)
}

export const registerRouter = <T extends {}>(router: React.ComponentType<T>, routerName: string, extension?: Router.IRoute<T>) => {
  const res = Object.assign(router, extension) as Router.TRoute;
  res.routerName = routerName
  res.navigate = (par: T) => navigate(routerName, par)
  invariant(!routes[res.routerName], 'registerRouter: route %0 already exists', res.name);
  routes[routerName] = res
  return res as Router.IRoute<T>
}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  switch (action.type) {
    case Router.Consts.ROUTER: return action.newState
    default: return state || { routerName: null }
  }
}

export const Provider = providerConnector(provider)

export function* saga() {
  let routeUnloader: () => void
  while (true) {
    const { newState } = (yield take(Router.Consts.SAGA)) as Router.IAction
    const route = routes[newState.routerName];
    if (route.needsLogin && !isLogged()) { /*TODO*/ }
    const blockGui = routeUnloader || route.load;
    if (blockGui) { /*TODO block gui start*/ }
    if (routeUnloader) yield routeUnloader()
    routeUnloader = null;
    if (route.load) routeUnloader = yield route.load(newState.par)
    const renderAction: Router.IAction = { type: Router.Consts.ROUTER, newState: newState };
    yield put(renderAction)
    if (blockGui) { /*TODO block gui end*/ }
  }
}
