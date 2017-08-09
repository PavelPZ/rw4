import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { loginProcessing } from './login'

import createHistory from 'history/createBrowserHistory'
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
  res.urlPatern = pattern
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
export const init = (_startRoute: Router.IState) => {
  startRoute = _startRoute
  history = createHistory({ basename: '/web-app.html' }) as Router.IHistory
  debugger
  navigate(url2state(history.location))
  //let res = JSON.stringify(patterns.map((p, idx) => ({ u: idx, o: p.match(history.location.pathname), q: qs.parse(history.location.search.split('?')[1]) })), null, 2)
  const unlisten = history.listen((location, action) => {
    navigate(url2state(history.location))
    //res = JSON.stringify(patterns.map((p, idx) => ({ u: idx, o: p.match(location.pathname), q: qs.parse(location.search.split('?')[1]) })), null, 2)
    //alert(JSON.stringify(patterns.map((p, idx) => {
    //  const m = match(p, location)
    //  return { idx, m, url: m ? stringify(p, m) : '-' }
    //}), null, 2))
  })
  //history.push('/xxx/users/123?a=3&b=4')
  //history.push('/yyy/users/?a=3&b=4')
  //history.push('/zzz/users?a=3&b=4')
  //history.push('/ooo/users345?a=3&b=4')
  //history.push('')
  //history.push('/')
  //history.push('/api/users/12')
  //history.push('/api/users/')
}

let startRoute: Router.IState
let history: Router.IHistory

const url2state = (loc: Router.ILocation) => {
  const { pathname, search } = loc
  if (!pathname || pathname=='/') return startRoute
  let res: Router.IState
  const idx = pathname.indexOf('/', 1)
  const routerName = pathname.substring(1, idx)
  const toParse = encodeURI(pathname.substr(idx))
  const route = routes[routerName] as Router.IRoute
  invariant(!!route, `Route "${routerName}" not found`)
  return { routerName, par: match(route.urlPatern as UrlPattern, toParse, loc.search) as Router.IRoutePar }
}

interface IRouteUrl {
  router: string
  query?: {}
}

const match = (pattern: UrlPattern, pathname: string, search: string) => {
  const par = pattern.match(pathname) as IRouteUrl
  invariant(!!par, `Wrong route url "${pathname}"`)
  if (!search) return par
  const q = qs.parse(search.substr(1)) as {}
  par.query = q
  return par
}

const stringify = (pattern: UrlPattern, m: Router.IState) => {
  if (!m) return null
  const { routerName, par: { query, ...par } } = m
  const res = '/' + routerName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
  return res
}