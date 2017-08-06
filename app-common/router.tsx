import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { isLogged } from './login'

const routes: { [name: string]: Router.TRoute } = {}

const providerConnector = connect((state: IState) => state.router)
const provider = (props: Router.IState) => React.createElement(routes[props.routerName] as React.ComponentClass, props.par)

const reduce: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  switch (action.type) {
    case Router.Consts.ROUTER: return action.payload
    default: return state
  }
}

// ***** EXPORTS
export const navigate = (routerName: string, par) => {
  const action: Router.IAction = { type: Router.Consts.SAGA, payload: { routerName, par } }
  window.lmGlobal.store.dispatch(action)
}

export const registerRouter = <T extends {}>(router: React.ComponentType<T>, routerName: string, extension?: Router.IRoute) => {
  const res = Object.assign(router, { routerName: routerName }, extension) as Router.TRoute;
  invariant(!routes[res.routerName], 'registerRouter: route %0 already exists', res.name);
  routes[routerName] = res
  return res
}

export const reducer: App.IReducer = (state, action) => ({
  router: reduce(state.router, action)
})

export const createAction = (routerName: string, par) => ({ type: Router.Consts.SAGA, payload: { routerName, par } } as Router.IAction)

export const Provider = providerConnector(provider)

export function* saga() {
  let routeUnloader: () => void
  while (true) {
    const { payload } = (yield take(Router.Consts.SAGA)) as Router.IAction
    const route = routes[payload.routerName];
    if (route.needsLogin && !isLogged()) { /*TODO*/ }
    const blockGui = routeUnloader || route.load;
    if (blockGui) { /*TODO block gui start*/ }
    if (routeUnloader) yield routeUnloader()
    routeUnloader = null;
    if (route.load) routeUnloader = yield route.load(payload.par)
    const renderAction: Router.IAction = { type: Router.Consts.ROUTER, payload: payload };
    yield put(renderAction)
    if (blockGui) { /*TODO block gui end*/ }
  }
}
