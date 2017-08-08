declare namespace Login {

  const enum Consts {
    name = 'login',
    LOGIN = 'login/LOGIN', 
    facebook = 'facebook', google = 'google',
  }

  type TProviders = Consts.google | Consts.facebook

  interface ILoginAction extends App.Action<Consts.LOGIN>, ILoginInfo { }

  const enum TLoginStatus { unsupported, logged, unlogged }

  interface ILoginInfo {
    logged: TLoginStatus
    email?: string
    name?: string
    firstName?: string
    lastName?: string
    picture?: string
    provider?: TProviders
  }


  interface IState extends ILoginInfo {
  }

  interface IPlatform {
    doLogin(returnUrl: Router.IState)
    doLogout()
  }

  type ILoginButtonProps = ILoginButtonMapProps & ILoginButtonDispatchProps

  interface ILoginButtonMapProps {
    logged: TLoginStatus
  }

  interface ILoginButtonDispatchProps {
    doLoginAction: () => void
  }

}

interface IState {
  login?: Login.IState
}

interface IPlatforms {
  loginPlatform?: Login.IPlatform
}