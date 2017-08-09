declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
    urlMask = '/:title'
  }

  type INavigate = Router.IState<Consts.name, IRoutePar>

  interface IRoutePar extends Router.IRoutePar {
    title?: string
  }

}

