declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
    urlMask = '/:title',
    loadDelay = 600,
  }

  interface IRoutePar extends Router.IRoutePar {
    title?: string
  }

}

declare namespace Drawer {

  interface IToolbarActions {
    appRouter?: string
  }
}


