import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { loginProcessing } from './login'

import qs from 'qs'
import UrlPattern from 'url-pattern'


const routes: { [name: string]: Router.TRoute } = {}

const providerConnector = connect((state: IState) => state.router)

const provider = (props: Router.IState) => props && props.routerName ? React.createElement(routes[props.routerName] as React.ComponentClass<any>, props.par) : null

// ***** EXPORTS
export const actRoute = () => window.lmGlobal.store.getState().router

export const navigate = (routerName: string | Router.IState, par?) => {
  if (typeof (routerName) !== 'string') { par = routerName.par; routerName = routerName.routerName }
  const action: Router.IAction = { type: Router.Consts.NAVIGATE_START, newState: { routerName, par } }
  window.lmGlobal.store.dispatch(action)
}

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routerName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
  const res = Object.assign(router, extension) as Router.TRoute;
  res.routerName = routerName
  res.getRoute = (par: TPar) => ({ routerName, par })
  //res.navigate = (par: T) => navigate(routerName, par)
  const pattern = new UrlPattern(urlMask)
  res.navigate = (par: TPar) => history.push(stringify(pattern, res.getRoute(par)))
  res.urlPattern = pattern
  invariant(!routes[res.routerName], 'registerRouter: route %0 already exists', res.name);
  routes[routerName] = res
  return res as Router.IRoute<TPar>
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
    if (loginProcessing(route.needsLogin && route.needsLogin(newState.par), newState)) { continue; }
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

// ***** URL parsing
export const init = (_history: Router.IHistory, _startRoute: Router.IState) => {
  startRoute = _startRoute
  history = _history
  navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => navigate(url2state(history.location)))
}

let startRoute: Router.IState
let history: Router.IHistory
const start = '/web-app.html';

const url2state = (loc: Router.ILocation) => {
  let { pathname, search } = loc
  if (!pathname || pathname == '/') return startRoute
  invariant(pathname.toLowerCase().startsWith(start), '')
  pathname = pathname.substr(start.length)
  if (!pathname || pathname == '/') return startRoute
  let res: Router.IState
  //parse /<routerName>/<pathname>
  const idx = pathname.indexOf('/', 1)
  const routerName = pathname.substring(1, idx)
  const toParse = encodeURI(pathname.substr(idx))
  //get router
  const route = routes[routerName] as Router.IRoute
  invariant(!!route, `Route "${routerName}" not found`)
  //match by router.urlPatttern
  return { routerName, par: match(route.urlPattern as UrlPattern, toParse, loc.search)}
}

const match = (pattern: UrlPattern, pathname: string, search: string) => {
  const par = pattern.match(pathname) as Router.IRoutePar
  invariant(!!par, `Wrong route url "${pathname}"`)
  if (!search) return par
  const q = qs.parse(search.substr(1)) as {}
  par.query = q
  return par
}

const stringify = (pattern: UrlPattern, state: Router.IState) => {
  invariant(!!state, 'State required')
  if (!state) return null
  const { routerName, par: { query, ...par } } = state
  const res = start + '/' + routerName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
  return res
}