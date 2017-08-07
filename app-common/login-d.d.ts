declare namespace Login {

  const enum Consts {
    name = 'login',
    LOGIN = 'login/LOGIN', LOGOUT = 'login/LOGOUT', 
    facebook = 'facebook', google = 'google'
  }

  type TProviders = Consts.google | Consts.facebook

  interface ILoginAction extends App.Action<Consts.LOGIN> {
    email: string
    provider: TProviders
    returnUrl: { routerName: string, par }
  }

  interface ILogoutAction extends App.Action<Consts.LOGOUT> { }

  interface IState {
    logged?: boolean
    email?: string
    provider?: TProviders
  }

  interface IPlatform {
    doLogin(returnUrl: Router.IState);
  }

}

interface IState {
  login?: Login.IState
}

interface IPlatforms {
  loginPlatform?: Login.IPlatform
}