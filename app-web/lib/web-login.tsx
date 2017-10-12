// http://localhost:3434
//Google: kubakaca@gmail.com/pkzippkzip, My Project project (https://developers.google.com/identity/sign-in/web/devconsole-project, link Google API console), clientId '79001294507-haubsvbmtj5lu4a30hp4kb44hl66qhoc.apps.googleusercontent.com'
//https://developers.google.com/identity/sign-in/web/sign-in
//FB: kubakaca@gmail.com/pkzippkzip, PZApp aplikace (https://developers.facebook.com, MyApps, select app), AppId 198385910196240, secret 6a2ab7859e9ae26239a2e5c6c4cfdd8f, login button: https://developers.facebook.com/docs/facebook-login/web/login-button
//https://developers.facebook.com/docs/facebook-login/web/login-button

import React from 'react'
import invariant from 'invariant'

import { navigate, actRoute } from '../../app-common/lib/router'
import { isLogged } from '../../app-common/lib/login'
import { getIcon } from '../../app-common/gui/ionic'
import { Button } from '../../app-common/gui/gui'

import { renderCSS, styleLib } from './fela'
import { Portal, Paper } from '../gui/react-md';

export const platform = (par: Login.IPlatformPar) => ({
  par,
  doLogin: (returnUrl: Router.IState) => isLogged() == Login.TLoginStatus.unlogged && provider && provider.show(true, returnUrl),
  doLogout: () => {
    if (isLogged() != Login.TLoginStatus.logged) return
    if (window.store.getState().login.provider == Login.Consts.facebook) {
      FB.logout()
      console.log('facebook: User signed out.')
    } else {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => console.log('google: User signed out.'))
    }
    provider.onLogout()
  }
} as Login.IPlatform)

let element

export class Provider extends React.PureComponent<WebLogin.IProviderProps> {

  constructor() {
    super()
    invariant(!provider, 'cannot create more web-login.Provider')
    provider = this
  }

  loginHTML: HTMLDivElement
  returnUrl: Router.IState

  render() {
    console.log('LOGIN: start Login rendering')
    return <Portal ref={div => this.loginHTML = div['_container']} visible className={renderCSS({ display: 'none', backgroundColor: 'white', position: 'fixed', left: 0, top: 0, bottom: 0, right: 0, alignItems: 'flex-start', justifyContent: 'center', zIndex: this.props.zIndex })} >
      <Paper className={renderCSS({ display: 'flex', flexDirection: 'column', flex: 1, height: 150, maxWidth: 300, alignItems: 'center', justifyContent: 'space-around', marginTop: 100 })} zDepth={3}>
        <div ref={div => { element = div; init().then(() => { this.props.loginRendered(); window.platform.loginPlatform.providerExist = true }) }}>
          <Button iconLogo={GUI.IonicLogos.logoGoogle} label='GOOGLE' color={GUI.Colors.info} />
        </div>
        <Button iconLogo={GUI.IonicLogos.logoFacebook} label='FACEBOOK' onPress={facebookLoginBtnClick} color={GUI.Colors.info} />
      </Paper>
    </Portal>
  }
  //        <div id="my-signin" className="g-signin2" tabIndex={1} ref={div => { console.log('LOGIN: finish Login rendering'); init().then(this.props.loginRendered) }} />

  show(isShow: boolean, returnUrl: Router.IState) {
    this.returnUrl = returnUrl
    this.loginHTML.style.display = isShow ? 'flex' : 'none'
  }

  onLogin(provider: Login.TProviders, name: string, firstName: string, lastName: string, picture: string, email: string) {
    window.store.dispatch<Login.ILoginAction>({
      type: Login.Consts.LOGIN, logged: Login.TLoginStatus.logged, provider: provider,
      name, firstName, lastName, picture, email
    })
    if (this.returnUrl) navigate(this.returnUrl)
    delete this.returnUrl
    this.show(false, null)
  }

  onLogout() {
    window.store.dispatch<Login.ILoginAction>({ type: Login.Consts.LOGIN, logged: Login.TLoginStatus.unlogged, })
    navigate(actRoute())
  }
}

//*********** PRIVATE
let provider: Provider

const init = () => {
  const { googleClientId, facebook, loc } = window.platform.loginPlatform.par
  const { fbAppId, fbAPIVersion } = facebook[window.platform.appPlatform.instanceId]
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

  window['googleAsyncInit'] = () => {
    gapi.load('auth2', function () {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      const auth2 = gapi.auth2.init({
        client_id: clientId,
        cookiepolicy: 'single_host_origin',
      })
      const onUser = googleUser => {
        if (!googleUser) return
        const profile = googleUser.getBasicProfile()
        if (!profile) return
        provider.onLogin(Login.Consts.google, profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail())
      }
      auth2.attachClickHandler(element, {}, onUser, error => {})
      auth2.then(() => {
        console.log('LOGIN: finish googleInit')
        onUser(auth2.currentUser.get())
        resolve()
      })
    })
  }


  //const head = document.getElementsByTagName('head')[0]
  //const meta = document.createElement('meta') as HTMLMetaElement
  //meta.name = 'google-signin-client_id'
  //meta.content = clientId
  //head.insertAdjacentElement('afterbegin', meta)
  //window['googleAsyncInit'] = () => {
  //  renderButton()
  //  resolve()
  //}
  loadScript('google-platform', `https://apis.google.com/js/platform.js?hl=${loc}&onload=googleAsyncInit`)
})

//const renderButton = () => {
//  gapi.auth2.attachClickHandler(element, {},
//    googleUser => {
//      const profile = googleUser.getBasicProfile();
//      provider.onLogin(Login.Consts.google, profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail())
//    }, error => {
//      alert(JSON.stringify(error, undefined, 2));
//    });

//  //gapi.signin2.render('my-signin', {
//  //  scope: 'profile email',
//  //  width: 200,
//  //  height: 40,
//  //  longtitle: false, //jinak nefunguje prihlaseni
//  //  theme: 'dark',
//  //  onsuccess: googleUser => {
//  //    const profile = googleUser.getBasicProfile();
//  //    provider.onLogin(Login.Consts.google, profile.getName(), profile.getGivenName(), profile.getFamilyName(), profile.getImageUrl(), profile.getEmail())
//  //  },
//  //  onfailure: () => {
//  //  },
//  //});
//}

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
      console.log('LOGIN: finish facebookInit')
      resolve()
      if (response.status != 'connected') return
      onFBLogged()
    })
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
  }, { scope: 'email,public_profile' })


const onFBLogged = () => {
  FB.api('/me?fields=first_name,last_name,picture,name,email', response => {
    if (!response.email) return;
    const { name, first_name, last_name, picture, email } = response
    provider.onLogin(Login.Consts.facebook, name, first_name, last_name, picture && picture.data && picture.data.url, email)
  });
}


