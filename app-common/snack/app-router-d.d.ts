declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
  }

  type INavigate = Router.IStateLow<Consts.name, { title: string }>

  interface IRoutePar {
    title?: string
  }

}

