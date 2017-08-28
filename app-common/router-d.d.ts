declare namespace Router {

  const enum Consts {
    NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END', //'router/NAVIGATE_END',
  }

  //type IState = IStateLow<string, {}>

  interface IRoutePar {
    query?: {}
  }

  type IRouterProviderProps = IState

  interface IGlobalState {
    nav: IState
    toolbar
    drawerHeader
    drawerContent
  }

  interface IState<TName extends string = string, TParams extends IRoutePar = IRoutePar> {
    routeName: TName
    params?: TParams
  }

  interface IAction {
    type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
    newState: IState //null => LOGIN redirect
  }

  //interface IInitPar {
  //  startRoute: IState
  //  rootUrl: string //html stranka s aplikaci
  //  history: Router.IHistory
  //}

  interface IRoute<TParams extends IRoutePar = IRoutePar> {
    routeName?: string
    beforeLoad?: TLoader<TParams>
    needsLogin?: (params: TParams) => boolean
    navigate?: (params: TParams) => void //navigace S history.push
    urlPattern?
    getRoute?: (params: TParams) => Router.IState<string, TParams>
  }

  type IRouteComponent<TPar extends IRoutePar = IRoutePar> = React.ComponentType & IRoute<TPar>

  type TUnloader = () => void
  type TLoader<TParams extends IRoutePar = IRoutePar> = (params: TParams) => Promise<TUnloader>

  //******** history x location
  interface ILocation {
    search: string
    pathname: string
  }
  interface IHistory {
    push(path: string, state?: any): void
    location: ILocation
    listen(callback: (location, action: string) => void)
  }

  interface IPlatform {
    computeState?: (action: IState, st) => any //pro Native: dej RN
    startRoute: IState
    rootUrl?: string //html stranka s aplikaci
    history: Router.IHistory
  }

}

interface IState {
  router?: Router.IState
}

interface IPlatforms {
  routerPlatform?: Router.IPlatform
}

