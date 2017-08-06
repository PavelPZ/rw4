declare namespace Router {

  const enum Consts { SAGA = 'ROUTER_SAGA', ROUTER = 'ROUTER' }

  type IState = IStateLow<string, {}>

  interface IStateLow<TName extends string, TPar extends {}> {
    routerName: TName
    par?: TPar
  }

  interface IAction {
    type: Consts.SAGA | Consts.ROUTER
    newState: IState
  }

  interface IRoute<T = {}> {
    routerName?: string
    load?: TLoader<T>
    needsLogin?: boolean
    navigate?: (par:T) => void
  }

  type TRoute = React.ComponentType & IRoute

  type TUnloader = () => void
  type TLoader<T = {}> = (par:T) => Promise<TUnloader>
}

interface IState {
  router?: Router.IState
}
