declare namespace Router {

  const enum Consts { SAGA = 'ROUTER_SAGA', ROUTER = 'ROUTER' }

  interface IState {
    name: string
    par
  }

  interface IAction {
    type: Consts.SAGA | Consts.ROUTER
    payload: IState
  }

  interface IRoute extends React.SFC {
    name?: string
    load?: (par) => Promise<() => Promise<any>>
    needsLogin?: boolean;
  }
}

interface IState {
  router?: Router.IState
}
