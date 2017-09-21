import React from 'react';
import { Middleware, MiddlewareAPI, Action, Dispatch } from 'redux'
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'
import { loginProcessing } from './login'
import { shallowEqual } from './lib'

import qs from 'qs'
import UrlPattern from 'url-pattern'

const routes: { [name: string]: Router.IRouteComponent } = {}


const providerConnector = connect<Router.IRouterProviderProps, {}, {}>(
  (state: IState) => state.router,
)


class provider extends React.PureComponent<Router.IRouterProviderProps> {
  render() {
    const props = this.props
    if (!props || !props.routeName) return null

    if (animateOut) animateOut.abort() 
    if (animateIn) animateIn.abort() 
    animateOut = null; animateIn = null; startAnimateOut = null

    const { params } = props
    const Route = routes[props.routeName] as React.ComponentClass<Router.IRoutePar>
    const { getAnimator } = window.lmGlobal.platform.routerPlatform

    return <Route key={routeCount++} {...params} refForAnimation={async div => {
      if (!div) return
      startAnimateOut = () => animateOut = getAnimator(div, true)
      animateIn = getAnimator(div, false)
      await animateIn
    }} />
  }
}
let routeCount = 0
let startAnimateOut: () => IPromiseExtensible
let animateOut: IPromiseExtensible
let animateIn: IPromiseExtensible

export const Provider = providerConnector(provider)

// ***** EXPORTS

export const goBack = () => window.lmGlobal.platform.routerPlatform.history.goBack()

export const canGoBack = () => window.lmGlobal.isNative ? window.lmGlobal.platform.routerPlatform.history.canGo(-1) : true

export const actRoute = () => window.lmGlobal.store.getState().router

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
  const pattern = !urlMask ? null : new UrlPattern(urlMask)
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
  action.navigActionId = navigActionId++
  next(action)
  //SYNC NAVIGATE_END
  const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState, navigActionId: action.navigActionId }
  //if (false && !beforeUnload && !router.beforeLoad) { //kvuli animaci neexistuje synchronni Navigate 
  //  if (navigateEnd.navigActionId != navigActionId - 1) return a
  //  next(navigateEnd)
  //  return a
  //}
  //ASYNC NAVIGATE_END
  const asyncRoute = async () => {
    if (navigateEnd.navigActionId != navigActionId - 1) return
    if (beforeUnload) await beforeUnload()
    if (navigateEnd.navigActionId != navigActionId - 1) return
    beforeUnload = null;
    if (router.beforeLoad) beforeUnload = await router.beforeLoad(newState.params)
    if (navigateEnd.navigActionId != navigActionId - 1) return
    //console.log('before startAnimateOut')
    if (startAnimateOut) await startAnimateOut()
    //console.log('after startAnimateOut')
    middlAPI.dispatch(navigateEnd)
  }
  asyncRoute()
  return a
}
let navigActionId = 0
let beforeUnload: () => void

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  if (!state) return getLocationState() // window.lmGlobal.platform.routerPlatform.startRoute
  switch (action.type) {
    case Router.Consts.NAVIGATE_END: return action.newState
    default: return state
  }
}

export const init = () => {
  const { startRoute, rootUrl, history } = window.lmGlobal.platform.routerPlatform

  const match = (pattern: UrlPattern, pathname: string, search: string) => {
    const par = !pattern ? {} : pattern.match(pathname) as Router.IRoutePar
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
    let toParse = ''
    let routeName: string
    if (idx < 0)
      routeName = pathname.substring(1)
    else {
      routeName = pathname.substring(1, idx)
      toParse = encodeURI(pathname.substr(idx))
    }
    //get router
    const route = routes[routeName] as Router.IRoute
    invariant(!!route, `Route "${routeName}" not found`)
    //match by router.urlPatttern
    return { routeName, params: !toParse ? {} : match(route.urlPattern as UrlPattern, toParse, loc.search) } as Router.IState
  }

  const stringify = (pattern: UrlPattern, state: Router.IState) => {
    if (!state) return rootUrl
    const { routeName, params: { query, ...par } } = state
    const res = rootUrl + '/' + routeName + (!pattern ? '' : pattern.stringify(par)) + (query ? '?' + qs.stringify(query) : '')
    return res
  }

  historyPush = (urlPattern, state) => history.push(stringify(urlPattern, state))
  historyUrl = (urlPattern, state) => stringify(urlPattern, state)
  getLocationState = () => url2state(history.location)
  //navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => {
    //console.log(JSON.stringify(location,null,2))
    const navigAction = url2state(history.location)
    navigate(navigAction)
  })
}

let historyPush: (urlPattern: UrlPattern, state: Router.IState) => void
let historyUrl: (urlPattern: UrlPattern, state: Router.IState) => string
let getLocationState: () => Router.IState
