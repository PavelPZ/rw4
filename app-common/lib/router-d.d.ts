export const enum Consts {
  NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END',
  ROUTE_CREATE = 'ROUTE_CREATE', ROUTE_DESTROY = 'ROUTE_DESTROY',
  modal = 'modal-'
}

export interface IRoutePar {
  query?: { isModal?: boolean }
}
//interface IPagePar extends Media.IMediaProps/*, Drawer.IShowDrawer*/ {
//  refForAnimation?: (root: WebNativeCommon.TRouterAnimRoot) => void //callback pro page transiton
//  //drawerMenu?: Drawer.IOwnProps
//  //drawerVisible?:boolean
//}

export type IRouterState<TRoutePar extends IRoutePar = any> = IState<string, TRoutePar> & Media.IMediaProps
export interface IRouterDispatch {
  debugSetWindowSize?: (windowSize: Media.TWindowSize) => void
}
export type IRouterProps = IRouterState & IRouterDispatch

//==IRouterProps, IRoutePar je posunut na misto IState
export type IRouterPageProps<TRoutePar extends IRoutePar = IRoutePar> = TRoutePar & Media.IMediaProps & { refForAnimation?: (root: WebNativeCommon.TRouterAnimRoot) => void } & IRouterDispatch

export interface IState<TName extends string = string, TRoutePar extends IRoutePar = any> {
  routeName: TName
  params?: TRoutePar
}

export interface IAction {
  type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
  newState: IState //null => LOGIN redirect
  navigActionId?: number //pro sparovani Consts.NAVIGATE_START a Consts.NAVIGATE_END a hlidani rychlych BACK kliku v browseru nebo androidu
}

export interface ICreateDestroyAction {
  type: Consts.ROUTE_CREATE | Consts.ROUTE_DESTROY
  routeChanged: boolean
}


//interface IInitPar {
//  startRoute: IState
//  rootUrl: string //html stranka s aplikaci
//  history: Router.IHistory
//}

export interface IRoute<TParams extends IRoutePar = IRoutePar> {
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

export type IRouteComponent<TPar extends IRoutePar = IRoutePar> = React.ComponentType<IRouterPageProps<TPar>> & IRoute<IRouterPageProps<TPar>>

export type TUnloader = () => void
export type TLoader<TParams extends IRoutePar = IRoutePar> = (params: TParams) => Promise<TUnloader>

//******** history x location
export interface ILocation {
  search: string
  pathname: string
}
export interface IHistory {
  push(path: string, state?: any): void
  location: ILocation
  listen(callback: (location, action: string) => void)
  goBack()
  canGo?: (n: number) => boolean
}

export interface IPlatform {
  //computeState?: (action: IState, st) => any //pro Native: dej RN
  startRoute: IState
  rootUrl?: string //html stranka s aplikaci
  history: Router.IHistory
  backHandler?: () => boolean
  getAnimator?: (div: WebNativeCommon.TRouterAnimRoot, display: boolean) => IPromiseExtensible<void>
}

export interface IRouterAnimator {
  new(div: HTMLElement, display: boolean)
}
