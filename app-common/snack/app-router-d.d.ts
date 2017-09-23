declare namespace AppRouter {

  const enum Consts {
    name = 'app-router',
    urlMask = '/:title',
    loadDelay = 600,
  }

  interface IRouteProps extends Router.IPageProps {
    title?: string
  }

}

declare namespace Drawer {

  interface IToolbarActions {
    appRouter?: string
  }
}


