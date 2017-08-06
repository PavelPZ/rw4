declare namespace Router {

  const enum Consts { SAGA = 'ROUTER_SAGA', ROUTER = 'ROUTER' }

  type IState = IStateLow<string, {}>

  interface IStateLow<TName extends string, TPar extends {}> {
    routerName: TName
    par: TPar
  }

  interface IAction {
    type: Consts.SAGA | Consts.ROUTER
    payload: IState
  }

  interface IRoute {
    routerName?: string
    load?: (par) => Promise<() => Promise<any>>
    needsLogin?: boolean;
  }

  type TRoute = React.ComponentType & IRoute
}

interface IState {
  router?: Router.IState
}
