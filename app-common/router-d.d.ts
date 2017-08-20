﻿declare namespace Router {

  const enum Consts {
    NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END',
  }

  //type IState = IStateLow<string, {}>

  interface IRoutePar {
    query?: {}
  }

  type IRouterProviderProps = IState
  interface IRouterProviderOwnProps {
    appOrRoute: JSX.Element | Router.IInitPar
  }

  interface IState<TName extends string = string, TPar extends IRoutePar = IRoutePar> {
    routerName: TName
    par?: TPar
  }

  interface IAction {
    type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
    newState: IState //null => LOGIN redirect
  }

  interface IInitPar {
    startRoute: IState
    rootUrl: string //html stranka s aplikaci
    history: Router.IHistory
  }

  interface IRoute<TPar extends IRoutePar = IRoutePar> {
    routerName?: string
    load?: TLoader<TPar>
    needsLogin?: (par: TPar) => boolean
    navigate?: (par: TPar) => void //navigace S history.push
    urlPattern?
    getRoute?: (par: TPar) => Router.IState<string, TPar>
  }

  type TRoute = React.ComponentType & IRoute

  type TUnloader = () => void
  type TLoader<TPar extends IRoutePar = IRoutePar> = (par: TPar) => Promise<TUnloader>

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


}

interface IState {
  router?: Router.IState
}
