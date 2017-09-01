import React from 'react';
import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'
import { loginProcessing } from './login'

import qs from 'qs'
import UrlPattern from 'url-pattern'

const routes: { [name: string]: Router.IRouteComponent } = {}

const providerConnector = connect<Router.IRouterProviderProps, {}, {}>((state: IState) => state.router)

const provider: React.SFC<Router.IRouterProviderProps> = props => {
  return props && props.routeName ? React.createElement(routes[props.routeName] as React.ComponentClass<any>, props.params) : null
}

// ***** EXPORTS
export const actRoute = () => window.lmGlobal.store.getState().router

//navigace BEZ history.push. S history.push viz Router.TRoute.navigate
export const navigate = (routeName?: string | Router.IState, params?) => {
  let newState: Router.IState;
  if (!routeName) newState = window.lmGlobal.platform.routerPlatform.startRoute
  else if (typeof (routeName) !== 'string') newState = routeName
  else newState = { routeName: routeName, params: params }
  window.lmGlobal.store.dispatch({ type: Router.Consts.NAVIGATE_START, newState })
}

export const adjustRouterProps = <T extends Router.IRoutePar>(props: T) => {
  if (window.lmGlobal.isNative) {
    const p = props as any as Router.INativeRoutePar
    return p.navigation.state.params as T
  } else
    return props
}

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routeName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
  invariant(!routes[routeName], 'registerRouter: route %0 already exists', routeName);
  const res = Object.assign(router, extension) as Router.IRouteComponent
  res.routeName = routeName
  res.getRoute = (params: TPar) => ({ routeName, params })
  const pattern = new UrlPattern(urlMask)
  res.urlPattern = pattern
  res.navigate = (par: TPar) => historyPushLow(pattern, res.getRoute(par))
  res.nativeScreenDef = () => ({ [routeName]: { screen: res } })
  routes[routeName] = res
  return res as Router.IRouteComponent<TPar>
}

//export const globalReducer: App.IReducer = (state, action: Router.IAction) => {
//  switch (action.type) {
//    case Router.Consts.NAVIGATE_END:
//      if (state.router.params == action.newState.routeName) return state
//    default: return state
//  }
//}

export const middleware: Middleware = (middlAPI: MiddlewareAPI<IState>) => next => a => {
  const action: Router.IAction = a as any
  if (action.type != Router.Consts.NAVIGATE_START) { next(a); return a }
  const newState = action.newState
  let isAsync = false
  const route = routes[newState.routeName];
  // login needed => ignore NAVIGATE_START
  if (loginProcessing(route.needsLogin && route.needsLogin(newState.params), newState)) return a
  //send NAVIGATE_START
  next(a)
  //SYNC NAVIGATE_END
  const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState }
  if (!beforeUnload && !route.beforeLoad) {
    next(navigateEnd)
    return a
  }
  //ASYNC NAVIGATE_END
  const asyncRoute = async () => {
    if (beforeUnload) await beforeUnload()
    beforeUnload = null;
    if (route.beforeLoad) beforeUnload = await route.beforeLoad(newState.params)
    middlAPI.dispatch(navigateEnd)
  }
  asyncRoute()
  return a
}

const computeReactNavigation = (newState: Router.IState, state?: Router.IState) => {
  const computeState = window.lmGlobal.platform.routerPlatform.computeState
  return computeState ? computeState(newState, state) : newState
}


export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  if (!state) return computeReactNavigation(window.lmGlobal.platform.routerPlatform.startRoute)
  switch (action.type) {
    case Router.Consts.NAVIGATE_START:
      console.log('Router.Consts.NAVIGATE_START')
      if (!window.lmGlobal.isNative) notifyNavigationStart() //notifications for resolving quick BACK x FORWARD
      return state
    case Router.Consts.NAVIGATE_END:
      console.log('Router.Consts.NAVIGATE_END')
      if (!window.lmGlobal.isNative) notifyNavigationEnd() //notifications for resolving quick BACK x FORWARD
      return computeReactNavigation(action.newState, state)
    default: return state
  }
}
let beforeUnload: () => void

export const Provider = providerConnector(provider)

export const init = () => {
  const { startRoute, rootUrl, history } = window.lmGlobal.platform.routerPlatform

  const match = (pattern: UrlPattern, pathname: string, search: string) => {
    const par = pattern.match(pathname) as Router.IRoutePar
    console.log('match: ', pathname, '\r\n', JSON.stringify(par, null, 2))
    invariant(!!par, `Wrong route url "${pathname}"`)
    if (!search) return par
    const q = qs.parse(search.substr(1)) as {}
    par.query = q
    return par
  }

  const url2state = (loc: Router.ILocation) => {
    let { pathname, search } = loc
    if (!pathname || pathname == '/') return startRoute
    invariant(pathname.toLowerCase().startsWith(rootUrl), '')
    pathname = pathname.substr(rootUrl.length)
    if (!pathname || pathname == '/') return startRoute
    let res: Router.IState
    //parse /<routeName>/<pathname>
    const idx = pathname.indexOf('/', 1)
    const routeName = pathname.substring(1, idx)
    const toParse = encodeURI(pathname.substr(idx))
    //get router
    const route = routes[routeName] as Router.IRoute
    invariant(!!route, `Route "${routeName}" not found`)
    //match by router.urlPatttern
    return { routeName, params: match(route.urlPattern as UrlPattern, toParse, loc.search) } as Router.IState
  }

  const stringify = (pattern: UrlPattern, state: Router.IState) => {
    invariant(!!state, 'State required')
    if (!state) return null
    const { routeName, params: { query, ...par } } = state
    const res = rootUrl + '/' + routeName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
    return res
  }

  historyPushLow = (urlPattern, state) => history.push(stringify(urlPattern, state))

  //*** resolving quick BACK x FORWARD browser button clicks
  notifyNavigationEnd = () => {
    navigationCount--
    if (navigationCount > 0 || navigateStartQueue.length == 0) return
    const navigAction = navigateStartQueue[0]
    navigateStartQueue = navigateStartQueue.slice(1)
    setTimeout(() => navigate(navigAction), 1)
  }
  notifyNavigationStart = () => navigationCount++
  let navigationCount = 0
  let navigateStartQueue = []

  navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => {
    const navigAction = url2state(history.location)
    if (navigationCount > 0) navigateStartQueue.push(navigAction) //wait for finishing last navigation
    else navigate(navigAction)
  })
}

let historyPushLow: (urlPattern: UrlPattern, state: Router.IState) => void //vysledek init

//notifications for resolving quick BACK x FORWARD
let notifyNavigationEnd: () => void
let notifyNavigationStart: () => void