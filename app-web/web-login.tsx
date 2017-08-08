// http://localhost:3434
//Google: kubakaca@gmail.com/pkzippkzip, My Project project (https://developers.google.com/identity/sign-in/web/devconsole-project, link Google API console), clientId '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com'
//https://developers.google.com/identity/sign-in/web/sign-in
//FB: kubakaca@gmail.com/pkzippkzip, PZApp aplikace (https://developers.facebook.com, MyApps, select app), AppId 198385910196240, secret 6a2ab7859e9ae26239a2e5c6c4cfdd8f, login button: https://developers.facebook.com/docs/facebook-login/web/login-button
//https://developers.facebook.com/docs/facebook-login/web/login-button

import React from 'react'
import { connect } from 'react-redux'
import { View, Text, Button } from '../polyfill/index'
import { registerRouter, navigate, actRoute } from '../app-common/router'
import { isLogged } from '../app-common/login'
import { renderCSS, styleLib } from 'web-fela'

export class Provider extends React.PureComponent {

  constructor() {
    super()
    provider = this
  }

  loginHTML: HTMLDivElement
  appPage: HTMLDivElement
  returnUrl: Router.IState

  render() {
    console.log('LOGIN: start Login rendering')
    return <div>
      <div ref={div => this.loginHTML = div} className={renderCSS({ zIndex: 100, display: 'none', ...styleLib.absoluteScreen, justifyContent: 'space-around', flexDirection: 'row' })}>
        <div className={renderCSS({ flex: 1, maxWidth: 800 })}>
          <div tabIndex={1} ref={async div => { console.log('LOGIN: finish Login rendering'); await init(); this.renderButton() }} id="my-signin" className="g-signin2" />
          <div tabIndex={2}  className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false" data-scope="public_profile email" />
        </div>
      </div>
      <div ref={div => this.appPage = div} style={{ zIndex: 1, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
        {this.props.children}
      </div>
    </div>
  }
  //ref={div => { debugger; FB && FB.XFBML.parse(div) }} 
  //ref={div => setTimeout(() => FB.XFBML.parse(this.loginHTML),1)}

  show(isShow: boolean, returnUrl: Router.IState) {
    this.returnUrl = returnUrl
    this.loginHTML.style.display = isShow ? 'flex' : 'none'
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

export const platform = (par: Login.IPlatformPar) => ({
  par,
  doLogin: (returnUrl: Router.IState) => isLogged() == Login.TLoginStatus.unlogged && provider.show(true, returnUrl),
  doLogout: () => {
    if (isLogged() != Login.TLoginStatus.logged) return
    if (window.lmGlobal.store.getState().login.provider == Login.Consts.facebook)
      FB.logout()
    else {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => console.log('google: User signed out.'))
    }
    provider.onLogout()
  }
} as Login.IPlatform)

const onFBLogged = () => {
  FB.api('/me?fields=first_name,last_name,picture,name,email', response => {
    if (!response.email) return;
    const { name, first_name, last_name, picture, email } = response
    provider.onLogin(Login.Consts.facebook, name, first_name, last_name, picture && picture.data && picture.data.url, email)
  });
}

export const init = () => {
  const { googleClientId, fbAppId, fbAPIVersion} = window.lmGlobal.platform.loginPlatform.par
  return Promise.all([
    googleInit(googleClientId),
    facebookInit(fbAppId, fbAPIVersion)
  ])
}

const googleInit = (clientId: string) => new Promise(resolve => {
  const head = document.getElementsByTagName('head')[0]
  const meta = document.createElement('meta') as HTMLMetaElement
  meta.name = 'google-signin-client_id'
  meta.content = clientId
  head.insertAdjacentElement('afterbegin', meta)
  window['googleAsyncInit'] = () => {
    if (provider) provider.renderButton()
    console.log('LOGIN: finish googleInit')
    setTimeout(resolve, 1000)
    //resolve()
  }
  loadScript('google-platform', `https://apis.google.com/js/platform.js?onload=googleAsyncInit`)
})


const facebookInit = (appId: string, apiVersion: string) => new Promise(resolve => {
  window['fbAsyncInit'] = () => {
    FB.init({
      appId: appId,
      cookie: true,
      xfbml: true,
      version: 'v2.10'
    });
    FB.getLoginStatus(response => {
      if (response.status != 'connected') return
      onFBLogged()
    });
    FB.Event.subscribe('auth.statusChange', response => {
      if (response.authResponse)
        onFBLogged()
      else
        console.log('facebook: User signed out.')
    });
    console.log('LOGIN: finish facebookInit')
    setTimeout(resolve, 1000)
    //resolve()
  }

  //loadScript('facebook-jssdk', `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=${apiVersion}`)
  //loadScript('facebook-jssdk', `//connect.facebook.net/en_US/all.js#xfbml=1`)
  loadScript('facebook-jssdk', 'http://connect.facebook.net/en_US/all.js#xfbml=1')
})

const loadScript = (id: string, url: string) => {
  if (document.getElementById(id)) return
  const js = document.createElement('script')
  js.id = id
  js.src = url
  const fjs = document.getElementsByTagName('script')[0]
  fjs.parentNode.insertBefore(js, fjs)
}

