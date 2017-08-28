declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
    urlMask = '/:title',
    loadDelay = 1000,
  }

  interface IRoutePar extends Router.IRoutePar {
    title?: string
  }

  interface IState { }

}

declare namespace Drawer {

  interface IToolbarActions {
    appRouter?: string
  }
}


