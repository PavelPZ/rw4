declare namespace Router {

  const enum Consts { SAGA = 'ROUTER_SAGA', ROUTER = 'ROUTER' }

  type IState = IStateLow<string, {}>

  interface IStateLow<TName extends string, TPar extends {}> {
    routerName: TName
    par?: TPar
  }

  interface IAction {
    type: Consts.SAGA | Consts.ROUTER
    payload: IState
  }

  interface IRoute {
    routerName?: string
    load?: TLoader
    needsLogin?: boolean
  }

  type TRoute = React.ComponentType & IRoute

  type TUnloader = () => void
  type TLoader = (par) => Promise<TUnloader>
}

interface IState {
  router?: Router.IState
}
