declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
    urlMask = '/:title',
    loadDelay = 300,
  }

  interface IRoutePar extends Router.IRoutePar {
    title?: string
  }

}

