import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from '../polyfill/index'
import { registerRouter, navigate, actRoute } from '../app-common/router'
import { isLogged } from '../app-common/login'

export class Provider extends React.PureComponent {

  constructor() {
    super()
    provider = this
  }

  loginHTML: HTMLDivElement
  appPage: HTMLDivElement
  returnUrl: Router.IState
  alreadyRendered:boolean

  render() {
    return <div>
      <div ref={div => this.loginHTML = div} style={{ zIndex: 100, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, display: 'none' }}>
        <div ref={div => this.renderButton()} id="my-signin" className="g-signin2"></div>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" data-scope="public_profile email" ></div>
      </div>
      <div ref={div => this.appPage = div} style={{ zIndex: 1, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
        {this.props.children}
      </div>
    </div>
  }

  show(isShow: boolean, returnUrl: Router.IState) {
    this.returnUrl = returnUrl
    this.loginHTML.style.display = isShow ? 'block' : 'none'
    this.appPage.style.display = !isShow ? 'block' : 'none'
  }

  onLogin(provider: Login.TProviders, name: string, firstName: string, lastName: string, picture: string, email: string) {
    const loginAction: Login.ILoginAction = {
      type: Login.Consts.LOGIN, logged: Login.TLoginStatus.logged, provider: provider, 
      name, firstName, lastName, picture, email
    }
    window.lmGlobal.store.dispatch(loginAction)
    if (this.returnUrl) navigate(this.returnUrl)
    this.show(false, null)
    delete this.returnUrl
  }

  onLogout() {
    const loginAction: Login.ILoginAction = { type: Login.Consts.LOGIN, logged: Login.TLoginStatus.unlogged, }
    window.lmGlobal.store.dispatch(loginAction)
    navigate(actRoute())
  }

  renderButton() {
    gapi.signin2.render('my-signin', {
      scope: 'profile email',
      width: 240,
      height: 50,
      longtitle: true,
      theme: 'dark',
      onsuccess: googleUser => {
        const profile = googleUser.getBasicProfile();
        provider.onLogin(Login.Consts.google, profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail())
      },
      onfailure: () => alert('onfailure'),
    });
  }
}
let provider: Provider

export const platform: Login.IPlatform = {
  doLogin: (returnUrl: Router.IState) => isLogged() == Login.TLoginStatus.unlogged && provider.show(true, returnUrl),
  doLogout: () => {
    if (isLogged() != Login.TLoginStatus.logged) return
    if (window.lmGlobal.store.getState().login.provider == Login.Consts.facebook)
      FB.logout()
    else {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => console.log('User signed out.'))
    }
    provider.onLogout()
  }
}

const onFBLogged = () => {
  FB.api('/me?fields=first_name,last_name,picture,name,email', response => {
    if (!response.email) return;
    const { name, first_name, last_name, picture, email } = response
    provider.onLogin(Login.Consts.facebook, name, first_name, last_name, picture && picture.data && picture.data.url, email)
  });
}

window['fbAsyncInit'] = () => {
  FB.init({
    appId: '198385910196240',
    cookie: true,
    xfbml: true,
    version: 'v2.10'
  });
  FB.getLoginStatus(response => {
    if (response.status != 'connected') return
    onFBLogged()
  });
  //FB.AppEvents.logPageView(); analytics
  FB.Event.subscribe('auth.statusChange', response => {
    if (response.authResponse) {
      onFBLogged()
    } else {
      //alert('canceled');
      //console.log('---->User cancelled login or did not fully authorize.');
    }
  });
}
((d, s, id) => {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10";
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk')

//export const platform = { doLogin: (returnUrl: Router.IState) => LoginComp.navigate({ returnUrl }) }

//export class loginComp extends React.PureComponent<WebLogin.IRoutePar> {
//  render() {
//    return <div>
//      <h2>LOGIN</h2>
//      <div ref={div => renderButton()} id="my-signin" className="g-signin2"></div>
//      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div> 
//    </div>
//  }
//}

//export const LoginComp: Router.IRoute<WebLogin.IRoutePar> = registerRouter(loginComp, Login.Consts.name)
