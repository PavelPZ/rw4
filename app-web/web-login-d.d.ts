declare namespace WebLogin {

  const enum Consts {
    name = 'web-login',
    googleSignInBtnId = 'lm-google-signin-btn-id',
    //fbLoginEventName = 'fb_login_event_name'
    fbLoginEventName = 'onFBLogin'
  }

  type INavigate = Router.IStateLow<Consts.name, {}>

  interface IRoutePar {
    returnUrl: Router.IState
  }

}

declare const gapi
declare const FB


