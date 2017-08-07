declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
  }

  type INavigate = Router.IStateLow<Consts.name, IRoutePar>

  interface IRoutePar {
    title?: string
  }

}

