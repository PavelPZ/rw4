import React from 'react';
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
  //if (!initialized) {
  //  initialized = true
  //  const { appOrRoute } = props
  //  routeInitPar = appOrRoute as Router.IInitPar
  //  if (!!routeInitPar.rootUrl && !!routeInitPar.startRoute.routeName) {
  //    init(routeInitPar)
  //  } else {
  //    routeInitPar = null
  //    notRouterApp = appOrRoute as JSX.Element
  //    if (!notRouterApp) throw new Error('!notRouterApp')
  //  }
  //}

  //if (notRouterApp)
  //  return notRouterApp
  //else
  return props && props.routeName ? React.createElement(routes[props.routeName] as React.ComponentClass<any>, props.params) : null
}
//let routeInitPar: Router.IInitPar
//let initialized: boolean
//let notRouterApp: JSX.Element

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

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routeName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
  invariant(!routes[routeName], 'registerRouter: route %0 already exists', routeName);
  const res = Object.assign(router, extension) as Router.IRouteComponent
  res.routeName = routeName
  res.getRoute = (params: TPar) => ({ routeName, params })
  const pattern = new UrlPattern(urlMask)
  res.urlPattern = pattern
  res.navigate = (par: TPar) => historyPushLow(pattern, res.getRoute(par))
  routes[routeName] = res
  return res as Router.IRouteComponent<TPar>
}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {

  const compute = (newState: Router.IState, state?: Router.IState) => {
    const computeState = window.lmGlobal.platform.routerPlatform.computeState
    return computeState ? computeState(newState, state) : newState
  }

  if (!state) return compute(window.lmGlobal.platform.routerPlatform.startRoute)
  switch (action.type) {
    case Router.Consts.NAVIGATE_START:
      console.log('@@@ Router.Consts.NAVIGATE_START', JSON.stringify(action, null, 2))
      const newState = action.newState
      let isAsync = false
      const route = routes[newState.routeName];
      if (loginProcessing(route.needsLogin && route.needsLogin(newState.params), newState)) {
        action[Router.Consts.$asyncProcessed] = true
        return state
      }
      //SYNC NAVIGATE
      if (!routeUnloader && !route.beforeLoad) {
        console.log('@@@ reducer ', JSON.stringify(state, null, 2))
        action[Router.Consts.$asyncProcessed] = true;
        return compute(action.newState, state)
      }
      const asyncPart = async () => {
        //ASYNC NAVIGATE
        if (!window.lmGlobal.isNative) notifyNavigationStart() //notifications for resolving quick BACK x FORWARD
        if (routeUnloader) await routeUnloader()
        routeUnloader = null;
        if (route.beforeLoad) routeUnloader = await route.beforeLoad(newState.params)
        const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState }
        window.lmGlobal.store.dispatch(navigateEnd)
      }
      asyncPart()
      return state
    case Router.Consts.NAVIGATE_END:
      if (!window.lmGlobal.isNative) notifyNavigationEnd() //notifications for resolving quick BACK x FORWARD
      return compute(action.newState, state)
    default: return state
  }
}
let routeUnloader: () => void

export const Provider = providerConnector(provider)

export const init = () => {
  const { startRoute, rootUrl, history } = window.lmGlobal.platform.routerPlatform

  const match = (pattern: UrlPattern, pathname: string, search: string) => {
    const par = pattern.match(pathname) as Router.IRoutePar
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