import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import invariant from 'invariant'
import { loginProcessing } from './login'

import qs from 'qs'
import UrlPattern from 'url-pattern'


const routes: { [name: string]: Router.IRouteComponent } = {}

const providerConnector = connect<Router.IRouterProviderProps, {}, Router.IRouterProviderOwnProps>((state: IState) => state.router)

const provider: React.SFC<Router.IRouterProviderProps & Router.IRouterProviderOwnProps> = props => {
  if (!initialized) {
    initialized = true
    const { appOrRoute } = props
    routeInitPar = appOrRoute as Router.IInitPar
    if (!!routeInitPar.rootUrl && !!routeInitPar.startRoute.routerName) {
      init(routeInitPar)
    } else {
      routeInitPar = null
      notRouterApp = appOrRoute as JSX.Element
      if (!notRouterApp) throw new Error('!notRouterApp')
    }
  }
  
  if (notRouterApp)
    return notRouterApp
  else
    return props && props.routerName ? React.createElement(routes[props.routerName] as React.ComponentClass<any>, props.params) : null
}
let routeInitPar: Router.IInitPar
let initialized: boolean
let notRouterApp: JSX.Element

// ***** EXPORTS
export const actRoute = () => window.lmGlobal.store.getState().router

//navigace BEZ history.push. S history.push viz Router.TRoute.navigate
export const navigate = (routerName?: string | Router.IState, params?) => {
  let newState: Router.IState;
  if (!routerName) newState = routeInitPar.startRoute
  else if (typeof (routerName) !== 'string') newState = routerName
  else newState = { routerName: routerName, params: params }
  window.lmGlobal.store.dispatch({ type: Router.Consts.NAVIGATE_START, newState })
}

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routerName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {
  invariant(!routes[routerName], 'registerRouter: route %0 already exists', routerName);
  const res = Object.assign(router, extension) as Router.IRouteComponent
  res.routerName = routerName
  res.getRoute = (params: TPar) => ({ routerName, params }) 
  const pattern = new UrlPattern(urlMask)
  res.urlPattern = pattern
  res.navigate = (par: TPar) => historyPushLow(pattern, res.getRoute(par))
  routes[routerName] = res
  return res as Router.IRouteComponent<TPar>
}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  if (!state) state = { routerName: null }
  switch (action.type) {
    case Router.Consts.NAVIGATE_START:
      const newState = action.newState
      let isAsync = false
      const route = routes[newState.routerName];
      if (loginProcessing(route.needsLogin && route.needsLogin(newState.params), newState)) {
        action[Router.Consts.$asyncProcessed] = true
        return state
      }
      //SYNC NAVIGATE
      if (!routeUnloader && !route.load) {
        action[Router.Consts.$asyncProcessed] = true; return newState
      }
      const asyncPart = async () => {
        //ASYNC NAVIGATE
        if (!window.lmGlobal.isNative) notifyNavigationStart() //notifications for resolving quick BACK x FORWARD
        if (routeUnloader) await routeUnloader()
        routeUnloader = null;
        if (route.load) routeUnloader = await route.load(newState.params)
        const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: newState }
        window.lmGlobal.store.dispatch(navigateEnd)
      }
      asyncPart()
      return state
    case Router.Consts.NAVIGATE_END:
      if (!window.lmGlobal.isNative) notifyNavigationEnd() //notifications for resolving quick BACK x FORWARD
      return action.newState
    default: return state
  }
}
let routeUnloader: () => void

export const Provider = providerConnector(provider)

//export function* saga() {
  //let routeUnloader: () => void
  //while (true) {
  //  const { newState } = (yield take(Router.Consts.NAVIGATE_START)) as Router.IAction
  //  //console.log(`saga NAVIGATE_START: ${navigateStartQueue.length}`)
  //  const route = routes[newState.routerName];
  //  const navigateEnd: Router.IAction = { type: Router.Consts.NAVIGATE_END, newState: null };
  //  if (loginProcessing(route.needsLogin && route.needsLogin(newState.par), newState)) {
  //    window.lmGlobal.store.dispatch(navigateEnd)  //dummy navigationEND action: every _START action must finish with _END action
  //    //yield put(navigateEnd) 
  //    continue
  //  }
  //  if (routeUnloader) yield routeUnloader()
  //  routeUnloader = null;
  //  if (route.load) routeUnloader = yield route.load(newState.par)
  //  navigateEnd.newState = newState
  //  window.lmGlobal.store.dispatch(navigateEnd) 
  //  //yield put(navigateEnd) 
  //  //console.log(`saga NAVIGATE_END: ${navigateStartQueue.length}`)
  //}
//}

const init = (initPar: Router.IInitPar) => {
  if (!initPar) return

  const { startRoute, rootUrl, history } = initPar

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
    //parse /<routerName>/<pathname>
    const idx = pathname.indexOf('/', 1)
    const routerName = pathname.substring(1, idx)
    const toParse = encodeURI(pathname.substr(idx))
    //get router
    const route = routes[routerName] as Router.IRoute
    invariant(!!route, `Route "${routerName}" not found`)
    //match by router.urlPatttern
    return { routerName, params: match(route.urlPattern as UrlPattern, toParse, loc.search) } as Router.IState
  }

  const stringify = (pattern: UrlPattern, state: Router.IState) => {
    invariant(!!state, 'State required')
    if (!state) return null
    const { routerName, params: { query, ...par } } = state
    const res = rootUrl + '/' + routerName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
    return res
  }

  historyPushLow = (urlPattern, state) => history.push(stringify(urlPattern, state))

  //*** resolving quick BACK x FORWARD browser button clicks
  notifyNavigationEnd = () => {
    navigationCount--
    if (navigationCount > 0 || navigateStartQueue.length == 0) return
    const navigAction = navigateStartQueue[0]
    navigateStartQueue = navigateStartQueue.slice(1)
    setTimeout(() => navigate(navigAction),1)
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