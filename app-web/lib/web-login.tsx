﻿// http://localhost:3434
//Google: kubakaca@gmail.com/pkzippkzip, My Project project (https://developers.google.com/identity/sign-in/web/devconsole-project, link Google API console), clientId '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com'
//https://developers.google.com/identity/sign-in/web/sign-in
//FB: kubakaca@gmail.com/pkzippkzip, PZApp aplikace (https://developers.facebook.com, MyApps, select app), AppId 198385910196240, secret 6a2ab7859e9ae26239a2e5c6c4cfdd8f, login button: https://developers.facebook.com/docs/facebook-login/web/login-button
//https://developers.facebook.com/docs/facebook-login/web/login-button

import React from 'react'
import { connect } from 'react-redux'
//import { View, Text, Button } from '../../polyfill/index'
import { navigate, actRoute } from '../../app-common/lib/router'
import { isLogged } from '../../app-common/lib/login'
import { renderCSS, styleLib } from './fela'
import invariant from 'invariant'
import { Portal } from '../gui/react-md';

export const platform = (par: Login.IPlatformPar) => ({
  par,
  doLogin: (returnUrl: Router.IState) => isLogged() == Login.TLoginStatus.unlogged && provider && provider.show(true, returnUrl),
  doLogout: () => {
    if (isLogged() != Login.TLoginStatus.logged) return
    if (window.lmGlobal.store.getState().login.provider == Login.Consts.facebook) {
      FB.logout()
      console.log('facebook: User signed out.')
    } else {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => console.log('google: User signed out.'))
    }
    provider.onLogout()
  }
} as Login.IPlatform)

export class Provider extends React.PureComponent<WebLogin.IProviderProps> {

  constructor() {
    super()
    invariant(!provider, 'cannot create more web-login.Provider')
    provider = this
  }

  loginHTML: HTMLDivElement
  //appPage: HTMLDivElement
  returnUrl: Router.IState
  //static rendered = new Promise<void>(resolve => Provider.renderedCompleted = resolve)
  //static renderedCompleted: () => void

  render() {
    console.log('LOGIN: start Login rendering')
    return <Portal ref={div => this.loginHTML = div['_container']} visible className={renderCSS({ display: 'none', backgroundColor:'white', position: 'fixed', left: 0, top: 0, bottom: 0, right: 0, justifyContent: 'space-around', flexDirection: 'row', zIndex: this.props.zIndex })} >
      <div className={renderCSS({ flex: 1, maxWidth: 800 })}>
        <div id="my-signin" className="g-signin2" tabIndex={1} ref={div => { console.log('LOGIN: finish Login rendering'); init().then(this.props.loginRendered) }} />
        <br /><br />
        <div onClick={facebookLoginBtnClick}>FACEBOOK</div>
      </div>
    </Portal>
    {/*<div>
      <div ref={div => this.loginHTML = div} className={renderCSS({ display: 'none', ...fixedScreen, justifyContent: 'space-around', flexDirection: 'row' })}>
      <div ref={div => this.appPage = div} className={renderCSS(fixedScreen)}>
        <WaitForRendering waitFor={Provider.rendered} children={this.props.children} waitChildren={waitChildren} />
      </div>
    </div>
    */}
  }

  show(isShow: boolean, returnUrl: Router.IState) {
    this.returnUrl = returnUrl
    this.loginHTML.style.display = isShow ? 'flex' : 'none'
    //this.appPage.style.display = !isShow ? 'block' : 'none'
  }

  onLogin(provider: Login.TProviders, name: string, firstName: string, lastName: string, picture: string, email: string) {
    window.lmGlobal.store.dispatch<Login.ILoginAction>({
      type: Login.Consts.LOGIN, logged: Login.TLoginStatus.logged, provider: provider,
      name, firstName, lastName, picture, email
    })
    if (this.returnUrl) navigate(this.returnUrl)
    delete this.returnUrl
    this.show(false, null)
  }

  onLogout() {
    window.lmGlobal.store.dispatch<Login.ILoginAction>({ type: Login.Consts.LOGIN, logged: Login.TLoginStatus.unlogged, })
    navigate(actRoute())
  }
}

//*********** PRIVATE
let provider: Provider

const init = () => {
  const { googleClientId, facebook, loc } = window.lmGlobal.platform.loginPlatform.par
  const { fbAppId, fbAPIVersion } = facebook[window.lmGlobal.platform.appPlatform.instanceId]
  return Promise.all([
    googleInit(googleClientId, loc),
    facebookInit(fbAppId, fbAPIVersion)
  ])
}

const loadScript = (id: string, url: string) => {
  if (document.getElementById(id)) return
  const js = document.createElement('script')
  js.id = id
  js.src = url
  const fjs = document.getElementsByTagName('script')[0]
  fjs.parentNode.insertBefore(js, fjs)
}

//***** GOOGLE
const googleInit = (clientId: string, loc: string) => new Promise(resolve => {
  const head = document.getElementsByTagName('head')[0]
  const meta = document.createElement('meta') as HTMLMetaElement
  meta.name = 'google-signin-client_id'
  meta.content = clientId
  head.insertAdjacentElement('afterbegin', meta)
  window['googleAsyncInit'] = () => {
    renderButton()
    resolve()
  }
  loadScript('google-platform', `https://apis.google.com/js/platform.js?hl=${loc}&onload=googleAsyncInit`)
})

const renderButton = () => {
  gapi.signin2.render('my-signin', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: false, //jinak nefunguje prihlaseni
    theme: 'dark',
    onsuccess: googleUser => {
      const profile = googleUser.getBasicProfile();
      provider.onLogin(Login.Consts.google, profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail())
    },
    onfailure: () => {
    },
  });
}

//***** FACEBOOK
const facebookInit = (appId: string, apiVersion: string) => new Promise(resolve => {
  window['fbAsyncInit'] = () => {
    FB.init({
      appId: appId,
      cookie: true,
      //xfbml: true,
      version: 'v2.10'
    })
    FB.getLoginStatus(response => {
      if (response.status != 'connected') return
      onFBLogged()
    })
    console.log('LOGIN: finish facebookInit')
    resolve()
  }

  //loadScript('facebook-jssdk', `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=${apiVersion}`)
  //loadScript('facebook-jssdk', `//connect.facebook.net/en_US/all.js#xfbml=1`)
  loadScript('facebook-jssdk', 'http://connect.facebook.net/en_US/all.js#xfbml=1')
})

const facebookLoginBtnClick = () =>
  FB.login(response => {
    if (response.authResponse)
      onFBLogged()
    else
      console.log('User cancelled login or did not fully authorize.') //user hit cancel button
  })


const onFBLogged = () => {
  FB.api('/me?fields=first_name,last_name,picture,name,email', response => {
    if (!response.email) return;
    const { name, first_name, last_name, picture, email } = response
    provider.onLogin(Login.Consts.facebook, name, first_name, last_name, picture && picture.data && picture.data.url, email)
  });
}


