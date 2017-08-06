import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'

const statePropName = 'router'
interface IRouterState {
  routeName: string
  routePar
}

const ROUTER_SAGA = 'ROUTER_SAGA'
const ROUTER = 'ROUTER'
interface IAction {
  type: 'ROUTER_SAGA' | 'ROUTER'
  payload: IRouterState
}

interface IRoute extends React.SFC {
  name:string
  load: (par) => Promise<() => Promise<any>>
  needsLogin?:boolean;
}

const routes: { [routeName: string]: IRoute } = {}

const providerConnector = connect(state => state[statePropName] as IRouterState)
const provider = (props: IRouterState) => React.createElement(routes[props.routeName], props.routePar)

const reduce = (state, action: IAction) => {
  let routerState = state[statePropName]
  switch (action.type) {
    case ROUTER: return { ...state, [statePropName]: action.payload }
    default: return state
  }
}

// ***** EXPORTS
export const registerRouter = (router: IRoute) => { invariant(!routes[router.name], 'registerRouter: route %0 already exists', router.name); routes[router.name] = router }

export const reducer = (state, action) => ({
  [statePropName]: reduce(state, action)
})

export const createAction = (routeName: string, routePar) => ({ type: ROUTER_SAGA, payload: { routeName, routePar } } as IAction)

export const Provider = providerConnector(provider)

export function* saga() {
  let routeUnloader: () => void
  while (true) {
    const { payload } = (yield take(ROUTER_SAGA)) as IAction
    const route = routes[payload.routeName];
    if (routeUnloader) yield routeUnloader()
    const routeLoader = route.load
    routeUnloader = yield routeLoader(payload.routePar)
    const renderAction: IAction = { type: ROUTER, payload: payload };
    yield put(renderAction)
  }
}
