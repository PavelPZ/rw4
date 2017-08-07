declare namespace Router {

  const enum Consts { NAVIGATE_START = 'router/NAVIGATE_START', NAVIGATE_END = 'router/NAVIGATE_END' }

  type IState = IStateLow<string, {}>

  interface IStateLow<TName extends string, TPar extends {}> {
    routerName: TName
    par?: TPar
  }

  interface IAction {
    type: Consts.NAVIGATE_START | Consts.NAVIGATE_END
    newState: IState
  }

  interface IRoute<T = {}> {
    routerName?: string
    load?: TLoader<T>
    needsLogin?: (par:T) => boolean
    navigate?: (par:T) => void
  }

  type TRoute = React.ComponentType & IRoute

  type TUnloader = () => void
  type TLoader<T = {}> = (par:T) => Promise<TUnloader>
}

interface IState {
  router?: Router.IState
}
