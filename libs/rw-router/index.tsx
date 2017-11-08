import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'

import qs from 'qs'
import UrlPattern from 'url-pattern'

const routes: { [name: string]: Router.IRouteComponent } = {}

export const providerConnector = connect<Router.IRouterState, Router.IRouterDispatch>(
  (state: IState) => ({ ...state.router, ...state.mediaQuery }),
  (dispatch) => ({
    debugSetWindowSize: windowSize => dispatch({ type: Media.Consts.WEB_CHANGE_MEDIA, windowSize } as Media.IWebChangeMediaAction),
  } as Router.IRouterDispatch)
)

export const globalReducer: App.IReducer<IState> = (state, action: Router.IAction) => {
  if (!state.router) { //prvni INIT redux action
    const router = getStateFromUrl()
    let newState: IState = { ...state, router }
    const newRoute = routes[router.routeName]
    if (newRoute.reducer) newState = newRoute.reducer(newState, { type: Router.Consts.ROUTE_CREATE, routeChanged: true } as Router.ICreateDestroyAction) //init prvni route state
    return newState
  }
  const { router: { routeName: oldRouteName } } = state
  switch (action.type) {
    case Router.Consts.NAVIGATE_END:
      let newState = state
      const { newState: { routeName: newRouteName } } = action
      const routeChanged = newRouteName !== oldRouteName
      const oldRoute = routes[oldRouteName]
      const newRoute = routes[newRouteName]
      if (oldRoute.reducer) newState = oldRoute.reducer(newState, { type: Router.Consts.ROUTE_DESTROY, routeChanged: routeChanged } as Router.ICreateDestroyAction)
      newState = { ...newState, router: action.newState}
      if (newRoute.reducer) newState = newRoute.reducer(newState, { type: Router.Consts.ROUTE_CREATE, routeChanged: routeChanged } as Router.ICreateDestroyAction)
      //newState = { ...newState, router: action.newState, drawer: {} }
      return newState
    default:
      const actRoute = routes[oldRouteName]
      return actRoute.reducer ? actRoute.reducer(state, action) : state
  }
}

class provider extends React.PureComponent<Router.IRouterProps> {
  render() {
    const props = this.props
    if (!props || !props.routeName) return null

    if (animateOut) animateOut.abort()
    if (animateIn) animateIn.abort()
    animateOut = null; animateIn = null;
    const Route = routes[props.routeName]
    //const { getAnimator } = window.platform.routerPlatform
    const { params: pars, ...mediaPars } = props
    const params: Router.IRouterPageProps = { ...pars, ...mediaPars }

    return <Route key={routeCount++} {...params} refForAnimation={async div => {
      if (!div) return
      animateOut = _getAnimator(div, true)
      animateIn = _getAnimator(div, false)
      await animateIn.start()
    }} />
  }
}
let routeCount = 0
//let startAnimateOut: () => IPromiseExtensible
let animateOut: Utils.IPromise
let animateIn: Utils.IPromise

export const Provider = providerConnector(provider)

// ***** EXPORTS

export const goBack = () => _history.goBack()

export const canGoBack = () => window.rn ? _history.canGo(-1) : true

export const actRoute = () => window.store.getState().router

//navigace BEZ history.push. S history.push viz navigateUrl
export const navigate = (routeName?: string | Router.IState, params?) => {
  let newState: Router.IState;
  if (!routeName) newState = _startRoute
  else if (typeof (routeName) !== 'string') newState = routeName
  else newState = { routeName: routeName, params: params }
  window.store.dispatch({ type: Router.Consts.NAVIGATE_START, newState })
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

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<Router.IRouterPageProps<TPar>>, routeName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
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
export const middleware: Redux.Middleware = (middlAPI: Redux.MiddlewareAPI<IState>) => next => a => {
  const action: Router.IAction = a as any
  if (action.type != Router.Consts.NAVIGATE_START) { next(a); return a }
  const newState = action.newState
  let isAsync = false
  const router = routes[newState.routeName];
  // login needed => ignore NAVIGATE_START
  if (_loginProcessing && _loginProcessing (router.needsLogin && router.needsLogin(newState.params), newState)) { animateOut = null; return a }
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
    if (animateOut) await animateOut.start()
    //console.log('after startAnimateOut')
    middlAPI.dispatch(navigateEnd)
  }
  asyncRoute()
  return a
}
let navigActionId = 0
let beforeUnload: () => void

export const init = (startRoute: Router.IState, history: Router.IHistory, getAnimator: Router.TGetAnimator, rootUrl: string/*html stranka s aplikaci*/, loginProcessing: Router.TLoginProcessing) => {
  _getAnimator = getAnimator
  _history = history
  _startRoute = startRoute
  _loginProcessing = loginProcessing
  //const { startRoute, rootUrl, history } = window.platform.routerPlatform
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
  getStateFromUrl = () => url2state(history.location)
  //navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => {
    //console.log(JSON.stringify(location,null,2))
    const navigAction = url2state(history.location)
    navigate(navigAction)
  })
}

let historyPush: (urlPattern: UrlPattern, state: Router.IState) => void
let historyUrl: (urlPattern: UrlPattern, state: Router.IState) => string
let getStateFromUrl: () => Router.IState
let _getAnimator: Router.TGetAnimator
let _history: Router.IHistory
let _startRoute: Router.IState
let _loginProcessing: Router.TLoginProcessing