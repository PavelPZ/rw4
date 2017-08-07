import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { loginProcessing } from './login'

const routes: { [name: string]: Router.TRoute } = {}

const providerConnector = connect((state: IState) => state.router)

const provider = (props: Router.IState) => props && props.routerName ? React.createElement(routes[props.routerName] as React.ComponentClass, props.par) : null

// ***** EXPORTS
export const navigate = (routerName: string, par) => {
  const action: Router.IAction = { type: Router.Consts.NAVIGATE_START, newState: { routerName, par } }
  window.lmGlobal.store.dispatch(action)
}

export function registerRouter<T>(router: React.ComponentType<T>, routerName: string, extension?: Router.IRoute<T>) {
  const res = Object.assign(router, extension) as Router.TRoute;
  res.routerName = routerName
  res.navigate = (par: T) => navigate(routerName, par)
  invariant(!routes[res.routerName], 'registerRouter: route %0 already exists', res.name);
  routes[routerName] = res
  return res as Router.IRoute<T>
}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  switch (action.type) {
    case Router.Consts.NAVIGATE_END: return action.newState
    default: return state || { routerName: null }
  }
}

export const Provider = providerConnector(provider)

export function* saga() {
  let routeUnloader: () => void
  while (true) {
    const { newState } = (yield take(Router.Consts.NAVIGATE_START)) as Router.IAction
    const route = routes[newState.routerName];
    if (loginProcessing(route.needsLogin && route.needsLogin(newState.par), newState)) continue;
    const blockGui = routeUnloader || route.load;
    if (blockGui) { /*TODO block gui start*/ }
    if (routeUnloader) yield routeUnloader()
    routeUnloader = null;
    if (route.load) routeUnloader = yield route.load(newState.par)
    const renderAction: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState };
    yield put(renderAction)
    if (blockGui) { /*TODO block gui end*/ }
  }
}
