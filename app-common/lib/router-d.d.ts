﻿declare namespace Router {

  const enum Consts {
    NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END', //'router/NAVIGATE_END',
    modal = 'modal-'
  }

  //type IState = IStateLow<string, {}>

  interface IRoutePar {
    query?: { isModal?: boolean }
    onRef?: (root: HTMLDivElement) => void //for ROUTER animation - callback when animated HTML element is ready
  }

  type IRouterProviderProps = IState 

  interface IGlobalState {
    nav: IState
    toolbar
    drawerHeader
    drawerContent
  }

  interface IState<TName extends string = string, TParams extends IRoutePar = any> {
    routeName: TName
    params?: TParams
  }

  interface IAction {
    type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
    newState: IState //null => LOGIN redirect
    navigActionId?: number //pro sparovani Consts.NAVIGATE_START a Consts.NAVIGATE_END a hlidani rychlych BACK kliku v browseru nebo androidu
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
    getRoute?: (params: TParams, isModal?:boolean) => Router.IState<string, TParams>
    nativeScreenDef?: () => { [name: string]: { screen: IRouteComponent<TParams> } }
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
    goBack()
    canGo?: (n: number) => boolean
  }

  interface IPlatform {
    //computeState?: (action: IState, st) => any //pro Native: dej RN
    startRoute: IState
    rootUrl?: string //html stranka s aplikaci
    history: Router.IHistory
    backHandler?: () => boolean
    animator: IRouterAnimateClass
  }

  interface IRouterAnimate {
    animate(): Promise<void>
    cancel()
  }
  interface IRouterAnimateClass {
    new(div: HTMLElement, display:boolean)
  }


}

interface IState {
  router: {
    router?: Router.IState
  }
}

interface IPlatforms {
  routerPlatform?: Router.IPlatform
}

