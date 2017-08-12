import React from 'react';
import { connect } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { loginProcessing } from './login'

import qs from 'qs'
import UrlPattern from 'url-pattern'


const routes: { [name: string]: Router.TRoute } = {}

const providerConnector = connect<Router.IRouterProviderProps, {}, Router.IRouterProviderOwnProps>((state: IState) => state.router)

class provider extends React.PureComponent<Router.IRouterProviderProps & Router.IRouterProviderOwnProps>  {
  constructor(props) {
    super(props)
    if (provider.initialized) return
    provider.initialized = true
    const { appOrRoute } = props
    let routeInitPar = appOrRoute as Router.IInitPar
    provider.isRoute = !!routeInitPar.rootUrl && !!routeInitPar.startRoute.routerName
    provider.app = provider.isRoute ? null : appOrRoute as JSX.Element
    if (provider.isRoute) init(routeInitPar)
  }
  static isRoute:boolean
  static initialized: boolean
  static app: JSX.Element
  render() {
    const props = this.props

    if (provider.isRoute)
      return props && props.routerName ? React.createElement(routes[props.routerName] as React.ComponentClass<any>, props.par) : null
    else
      return provider.app
    //  switch (React.Children.count(props.children)) {
    //  case 0: return null
    //  case 1: return React.Children.only(props.children) //no route, just default component
    //  default: throw ''
    //}
  }
}

// ***** EXPORTS
export const actRoute = () => window.lmGlobal.store.getState().router

//navigace BEZ history.push. S history.push viz Router.TRoute.navigate
export const navigate = (routerName: string | Router.IState, par?) => {
  if (typeof (routerName) !== 'string') { par = routerName.par; routerName = routerName.routerName }
  const action: Router.IAction = { type: Router.Consts.NAVIGATE_START, newState: { routerName, par } }
  window.lmGlobal.store.dispatch(action)
}

export function registerRouter<TPar extends Router.IRoutePar = Router.IRoutePar>(router: React.ComponentType<TPar>, routerName: string, urlMask?: string, extension?: Router.IRoute<TPar>) {

  const res = Object.assign(router, extension) as Router.TRoute;
  res.routerName = routerName
  res.getRoute = (par: TPar) => ({ routerName, par })
  const pattern = new UrlPattern(urlMask)
  res.urlPattern = pattern
  res.navigate = (par: TPar) => historyPushLow(pattern, res.getRoute(par))
  invariant(!routes[res.routerName], 'registerRouter: route %0 already exists', res.name);
  routes[routerName] = res
  return res as Router.IRoute<TPar>
}

export const reducer: App.IReducer<Router.IState> = (state, action: Router.IAction) => {
  if (!state) state = { routerName: null }
  switch (action.type) {
    case Router.Consts.NAVIGATE_END: return action.newState
    default: return state
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
export const init = (initPar: Router.IInitPar) => {
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
    return { routerName, par: match(route.urlPattern as UrlPattern, toParse, loc.search) }
  }

  const stringify = (pattern: UrlPattern, state: Router.IState) => {
    invariant(!!state, 'State required')
    if (!state) return null
    const { routerName, par: { query, ...par } } = state
    const res = rootUrl + '/' + routerName + pattern.stringify(par) + (query ? '?' + qs.stringify(query) : '')
    return res
  }

  historyPushLow = (urlPattern, state) => history.push(stringify(urlPattern, state))

  //startRoute = initPar.startRoute
  //rootUrl = initPar.rootUrl
  //history = initPar.history
  navigate(url2state(history.location))
  const unlisten = history.listen((location, action) => navigate(url2state(history.location)))
}

let historyPushLow: (urlPattern: UrlPattern, state: Router.IState) => void //vysledek init