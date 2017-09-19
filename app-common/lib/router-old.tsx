﻿import React from 'react';
import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'
import { loginProcessing } from './login'

import qs from 'qs'
import UrlPattern from 'url-pattern'

const routes: { [name: string]: Router.IRouteComponent } = {}

/*
LM
D:\rw\rw4\node_modules\@types\react-redux\index.d.ts
https://github.com/reactjs/react-redux/blob/master/docs/api.md
areStatesEqual ?: (olsState, newState) => boolean
*/
const providerConnector = connect<Router.IRouterProviderProps, {}, {}>(
  (state: IState) => state.router.router,
  undefined,
  //undefined,
  //{
  //  areStatesEqual: (o: IState, n: IState) => {
  //    return true
  //  }
  //}
)

const provider: React.SFC<Router.IRouterProviderProps> = props => {
  return props && props.routeName ? React.createElement(routes[props.routeName] as React.ComponentClass<any>, { ...props.params, key: props.routeName  /*kvuli react native LayoutAnimation a web */ }) : null
}
let counter = 0

export const Provider = providerConnector(provider)

// ***** EXPORTS

export const goBack = () => window.lmGlobal.platform.routerPlatform.history.goBack()

export const canGoBack = () => window.lmGlobal.isNative ? window.lmGlobal.platform.routerPlatform.history.canGo(-1) : true

export const actRoute = () => window.lmGlobal.store.getState().router.router

//navigace BEZ history.push. S history.push viz navigateUrl
export const navigate = (routeName?: string | Router.IState, params?) => {
  let newState: Router.IState;
  if (!routeName) newState = window.lmGlobal.platform.routerPlatform.startRoute
  else if (typeof (routeName) !== 'string') newState = routeName
  else newState = { routeName: routeName, params: params }
  window.lmGlobal.store.dispatch({ type: Router.Consts.NAVIGATE_START, newState })
}

export const navigatePushHome = () => navigatePush(null)

export const navigatePush = (route: Router.IState) => {
  if (!route || !route.routeName) {
    historyPush(null, null)
    return
  }
  const router = routes[route.routeName]
  historyPush(router.urlPattern, route)
}

export const navigateUrl = (route: Router.IState) => {
  if (!route || !route.routeName) return historyUrl(null, null)
  const router = routes[route.routeName]
  return historyUrl(router.urlPattern, route)
}

//const adjustRouterProps = <T extends Router.IRoutePar>(props: T) => {
//  //if (window.lmGlobal.isNative) {
//  //  const p = props as any as Router.INativeRoutePar
//  //  return p.navigation.state.params as T
//  //} else
//    return props
//}

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routeName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
  invariant(!routes[routeName], 'registerRouter: route %0 already exists', routeName);
  const res = Object.assign(router, extension) as Router.IRouteComponent
  res.routeName = routeName
  res.getRoute = (params: TPar, isModal?: boolean) => {
    if (isModal) {
      if (!params) params = {} as TPar
      if (!params.query) params.query = {}
      params.query.isModal = true
    }
    return { routeName, params }
  }
  const pattern = new UrlPattern(urlMask)
  res.urlPattern = pattern
  res.navigate = (par: TPar) => historyPush(pattern, res.getRoute(par))
  res.navigateModal = (par: TPar) => historyPush(pattern, res.getRoute(par, true))
  res.nativeScreenDef = () => ({ [routeName]: { screen: res } })
  routes[routeName] = res
  return res as Router.IRouteComponent<TPar>
}

/*
LM: D:\rw\rw4\node_modules\redux\index.d.ts
export interface Middleware<S> {
  (api: MiddlewareAPI<S>): (next: Dispatch<S>) => Dispatch<S>;
}
*/
export const middleware: Middleware<IState> = middlAPI => next => a => {
  const action: Router.IAction = a as any
  if (action.type != Router.Consts.NAVIGATE_START) { next(a); return a }
  const newState = action.newState
  let isAsync = false
  const router = routes[newState.routeName];
  // login needed => ignore NAVIGATE_START
  if (loginProcessing(router.needsLogin && router.needsLogin(newState.params), newState)) return a
  //send NAVIGATE_START
  action.navigActionId = navigActionIdCounter++
  next(action)
  //SYNC NAVIGATE_END
  const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState, navigActionId: action.navigActionId }
  if (!beforeUnload && !router.beforeLoad) {
    if (navigateEnd.navigActionId != navigActionIdCounter - 1) return a
    next(navigateEnd)
    return a
  }
  //ASYNC NAVIGATE_END
  const asyncRoute = async () => {
    if (navigateEnd.navigActionId != navigActionIdCounter - 1) return
    if (beforeUnload) await beforeUnload()
    if (navigateEnd.navigActionId != navigActionIdCounter - 1) return
    beforeUnload = null;
    if (router.beforeLoad) beforeUnload = await router.beforeLoad(newState.params)
    if (navigateEnd.navigActionId != navigActionIdCounter - 1) return
    middlAPI.dispatch(navigateEnd)
  }
  asyncRoute()
  return a
}
let navigActionIdCounter = 0
let beforeUnload: () => void

//const computeReactNavigation = (newState: Router.IState, state?: Router.IState) => {
//  const computeState = window.lmGlobal.platform.routerPlatform.computeState
//  //console.log('computeReactNavigation: ', newState)
//  return computeState ? computeState(newState, state) : newState
//}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  if (!state) return window.lmGlobal.platform.routerPlatform.startRoute
  switch (action.type) {
    case Router.Consts.NAVIGATE_END: return action.newState
    default: return state
  }
}

//export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
//  //if (!state) return computeReactNavigation(window.lmGlobal.platform.routerPlatform.startRoute)
//  if (!state) return window.lmGlobal.platform.routerPlatform.startRoute
//  switch (action.type) {
//    //case Router.Consts.NAVIGATE_START:
//    //  //console.log('Router.Consts.NAVIGATE_START: ', action)
//    //  if (!window.lmGlobal.isNative) notifyNavigationStart() //notifications for resolving quick BACK x FORWARD
//    //  return state
//    case Router.Consts.NAVIGATE_END:
//      //console.log('Router.Consts.NAVIGATE_END')
//      //if (!window.lmGlobal.isNative) notifyNavigationEnd() //notifications for resolving quick BACK x FORWARD
//      //return computeReactNavigation(action.newState, state)
//      return action.newState
//    default: return state
//  }
//}

export const init = () => {
  const { startRoute, rootUrl, history } = window.lmGlobal.platform.routerPlatform

  const match = (pattern: UrlPattern, pathname: string, search: string) => {
    const par = pattern.match(pathname) as Router.IRoutePar
    //console.log('match: ', pathname, '\r\n', JSON.stringify(par, null, 2))
    invariant(!!par, `Wrong route url "${pathname}"`)
    if (!search) return par
    const q = qs.parse(search.substr(1)) as {}
    par.query = q
    //console.log('match: ', JSON.stringify(par,null,2))
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
    if (!state || !pattern) return rootUrl
    const { routeName, params: { query, ...par } } = state
    const res = rootUrl + '/' + routeName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
    return res
  }

  historyPush = (urlPattern, state) => history.push(stringify(urlPattern, state))
  historyUrl = (urlPattern, state) => stringify(urlPattern, state)

  //*** resolving quick BACK x FORWARD browser button clicks
  //notifyNavigationEnd = () => {
  //  navigationCount--
  //  if (navigationCount > 0 || navigateStartQueue.length == 0) return
  //  const navigAction = navigateStartQueue[0]
  //  navigateStartQueue = navigateStartQueue.slice(1)
  //  setTimeout(() => navigate(navigAction), 1)
  //}
  //notifyNavigationStart = () => navigationCount++
  //let navigationCount = 0
  //let navigateStartQueue = []

  navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => {
    //console.log(JSON.stringify(location,null,2))
    const navigAction = url2state(history.location)
    //if (navigationCount > 0) navigateStartQueue.push(navigAction) //wait for finishing last navigation
    //else
    navigate(navigAction)
  })
}

let historyPush: (urlPattern: UrlPattern, state: Router.IState) => void
let historyUrl: (urlPattern: UrlPattern, state: Router.IState) => string

//notifications for resolving quick BACK x FORWARD
//let notifyNavigationEnd: () => void
//let notifyNavigationStart: () => void