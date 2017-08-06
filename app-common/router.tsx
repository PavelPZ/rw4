import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { isLogged } from './login'

const routes: { [name: string]: Router.IRoute } = {}

const providerConnector = connect((state: IState) => state.router)
const provider = (props: Router.IState) => React.createElement(routes[props.name], props.par)

const reduce: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  switch (action.type) {
    case Router.Consts.ROUTER: return action.payload
    default: return state
  }
}

// ***** EXPORTS
export const registerRouter = (router: Router.IRoute) => { invariant(!routes[router.name], 'registerRouter: route %0 already exists', router.name); routes[router.name] = router }

export const reducer: App.IReducer = (state, action) => ({
  router: reduce(state.router, action)
})

export const createAction = (name: string, par) => ({ type: Router.Consts.SAGA, payload: { name, par } } as Router.IAction)

export const Provider = providerConnector(provider)

export function* saga() {
  let routeUnloader: () => void
  while (true) {
    const { payload } = (yield take(Router.Consts.SAGA)) as Router.IAction
    const route = routes[payload.name];
    if (route.needsLogin && !isLogged()) { /*TODO*/ }
    if (routeUnloader) yield routeUnloader()
    routeUnloader = null;
    if (route.load) routeUnloader = yield route.load(payload.par)
    const renderAction: Router.IAction = { type: Router.Consts.ROUTER, payload: payload };
    yield put(renderAction)
  }
}
