declare namespace Router {

  const enum Consts {
    NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END',
    ROUTE_CREATE = 'ROUTE_CREATE', ROUTE_DESTROY = 'ROUTE_DESTROY',
    modal = 'modal-'
  }

  //type IState = IStateLow<string, {}>

  interface IRoutePar {
    query?: { isModal?: boolean }
  }
  //interface IPagePar extends Media.IMediaProps/*, Drawer.IShowDrawer*/ {
  //  refForAnimation?: (root: WebNativeCommon.TRouterAnimRoot) => void //callback pro page transiton
  //  //drawerMenu?: Drawer.IOwnProps
  //  //drawerVisible?:boolean
  //}

  type IRouterStateProps<TRoutePar extends IRoutePar = any> = IState<string, TRoutePar> & Media.IMediaProps
  interface IRouterDispatchProps {
    debugSetWindowSize?: (windowSize: Media.TWindowSize) => void
  }
  
  type IPageProps<TRoutePar extends IRoutePar = IRoutePar> = TRoutePar & Media.IMediaProps & { refForAnimation?: (root: WebNativeCommon.TRouterAnimRoot) => void } & IRouterDispatchProps

  //interface IPageDispatchProps {
  //  showDrawer?:(visible:boolean) => void
  //}

  interface IState<TName extends string = string, TRoutePar extends IRoutePar = any> {
    routeName: TName
    params?: TRoutePar
  }

  interface IAction {
    type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
    newState: IState //null => LOGIN redirect
    navigActionId?: number //pro sparovani Consts.NAVIGATE_START a Consts.NAVIGATE_END a hlidani rychlych BACK kliku v browseru nebo androidu
  }

  interface ICreateDestroyAction {
    type: Consts.ROUTE_CREATE | Consts.ROUTE_DESTROY
    routeChanged:boolean
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
    navigateModal?: (params: TParams) => void
    urlPattern?
    getRoute?: (params: TParams, isModal?: boolean) => Router.IState<string, TParams>
    nativeScreenDef?: () => { [name: string]: { screen: IRouteComponent<TParams> } }
    reducer?: (state: App.IGlobalState, action: App.Action) => App.IGlobalState
  }

  type IRouteComponent<TPar extends IRoutePar = IRoutePar> = React.ComponentType<IPageProps<TPar>> & IRoute<IPageProps<TPar>>

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
    goBack()
    canGo?: (n: number) => boolean
  }

  interface IPlatform {
    //computeState?: (action: IState, st) => any //pro Native: dej RN
    startRoute: IState
    rootUrl?: string //html stranka s aplikaci
    history: Router.IHistory
    backHandler?: () => boolean
    getAnimator?: (div: WebNativeCommon.TRouterAnimRoot, display: boolean) => IPromiseExtensible<void>
  }

  interface IRouterAnimator {
    new(div: HTMLElement, display: boolean)
  }


}

interface IState {
  router?: Router.IState
}

interface IPlatforms {
  routerPlatform?: Router.IPlatform
}

