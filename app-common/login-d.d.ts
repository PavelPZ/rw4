declare namespace Login {

  const enum Consts {
    name = 'login',
    LOGIN = 'login/LOGIN', 
    facebook = 'facebook', google = 'google',
  }

  type TProviders = Consts.google | Consts.facebook

  interface ILoginAction extends App.Action<Consts.LOGIN>, ILoginInfo { } //common action for login x logout

  const enum TLoginStatus { unsupported, logged, unlogged }

  interface ILoginInfo { //common for login action and login state
    logged: TLoginStatus
    email?: string
    name?: string
    firstName?: string
    lastName?: string
    picture?: string
    provider?: TProviders
  }


  interface IState extends ILoginInfo { }

  interface IPlatformPar { fbAppId: string; fbAPIVersion: string; googleClientId: string; loc:string }

  interface IPlatform {
    par: IPlatformPar
    doLogin: (returnUrl: Router.IState) => void
    doLogout: () => void
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