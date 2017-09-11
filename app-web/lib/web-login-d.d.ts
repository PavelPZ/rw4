declare namespace WebLogin {

  const enum Consts {
    name = 'web-login',
    googleSignInBtnId = 'lm-google-signin-btn-id',
    //fbLoginEventName = 'fb_login_event_name'
    fbLoginEventName = 'onFBLogin'
  }

  //type INavigate = Router.IState<Consts.name, {}>

  interface IRoutePar {
    returnUrl: Router.IState
  }

  interface IProviderProps {
    //overlays?: React.ReactElement<any>[]
    loginRendered: () => void
    zIndex:number
  }

}

declare const gapi
declare const FB


