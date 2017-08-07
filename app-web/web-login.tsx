import React from 'react'
import { View, Text, Button } from '../polyfill/index'
import { registerRouter, navigate } from '../app-common/router'

//declare module 'react' {
//  interface HTMLAttributes<T> {
//    onlogin?: string;
//  }
//}

export class Provider extends React.PureComponent {

  constructor() {
    super()
    provider = this
  }

  loginHTML: HTMLDivElement
  appPage: HTMLDivElement

  render() {
    return <div>
      <div ref={div => this.loginHTML = div} style={{ zIndex: 100, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0, display: 'none' }}>
        <div ref={div => renderButton()} id="my-signin" className="g-signin2"></div>
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div>        {/*
        <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div>
        <div ref={div => initFacebook()} className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div>
        <div ref={div => setTimeout(initFacebook, 1)} dangerouslySetInnerHTML={{ __html: `<div onlogin="onFBLogin" className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div>` }}></div>
        */}
      </div>
      <div ref={div => this.appPage = div} style={{ zIndex: 1, position: 'absolute', left: 0, top: 0, bottom: 0, right: 0 }}>
        {this.props.children}
      </div>
    </div>
  }

  show(isShow: boolean) {
    this.loginHTML.style.display = isShow ? 'block' : 'none'
    this.appPage.style.display = !isShow ? 'block' : 'none'
  }
}

//window['onFBLogin'] = () => {
//  FB.api('/me?fields=name,email', response => {
//    if (!response.name) return
//    var text = 'Name: ' + response.name + ', ' + 'Email: ' + response.email
//    alert(text)
//  });
//}

window['fbAsyncInit'] = () => {
  FB.init({
    appId: '198385910196240',
    cookie: true,
    xfbml: true,
    version: 'v2.10'
  });
  //FB.AppEvents.logPageView(); analytics
  FB.Event.subscribe('auth.statusChange', response => {
    if (response.authResponse) {
      FB.api('/me?fields=first_name,last_name,picture,name,email', response => {
        if (!response.name) return;
        const { first_name, last_name, picture, name, email } = response
        var text = `name: ${name}, first_name: ${first_name}, last_name: ${last_name}, picture: ${JSON.stringify(picture)}, email: ${email }`
        alert(text);
      });
    } else {
      alert('canceled');
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

function renderButton() {
  gapi.signin2.render('my-signin', {
    scope: 'profile email',
    width: 240,
    height: 50,
    longtitle: true,
    theme: 'dark',
    onsuccess: googleUser => {
      const profile = googleUser.getBasicProfile();
      const text = `name: ${profile.getName()}, first_name: ${profile.getGivenName()}, last_name: ${profile.getFamilyName()}, picture: ${JSON.stringify(profile.getImageUrl())}, email: ${profile.getEmail()}`
      alert(text)
    },
    onfailure: () => alert('onfailure'),
  });
}

let provider: Provider
export const platform = { doLogin: (returnUrl: Router.IState) => provider.show(true) }

//function renderButton() {
//  gapi.signin2.render(WebLogin.Consts.googleSignInBtnId, {
//    scope: 'profile email',
//    width: 240,
//    height: 50,
//    longtitle: true,
//    theme: 'dark',
//    onsuccess: googleUser => {
//      var profile = googleUser.getBasicProfile();
//      var text = 'ID: ' + profile.getId() + ', ' + 'Name: ' + profile.getName() + ', ' + 'Image URL: ' + profile.getImageUrl() + ', ' + 'Email: ' + profile.getEmail();
//    },
//    onfailure: error => {
//      alert(error);
//    }
//  });
//}

//const fbLogged = (msg: string) => alert(msg)

//window['onFBLogin'] = () => {
//  FB.api('/me?fields=name,email', response => {
//    if (!response.name) return;
//    var text = 'Name: ' + response.name + ', ' + 'Email: ' + response.email;
//    fbLogged(text);
//  });
//}

//function FBsignOut() {
//  FB.logout(function (response) {
//    //window.location.reload();
//  });
//}

////window['fbAsyncInit'] = function () {
////  FB.init({
////    appId: '198385910196240',
////    autoLogAppEvents: true,
////    xfbml: true,
////    version: 'v2.10'
////  });
////  //FB.AppEvents.logPageView();
////};

//const initFBSDK = (d, s, id) => {
//  var js, fjs = d.getElementsByTagName(s)[0];
//  if (d.getElementById(id)) return;
//  js = d.createElement(s); js.id = id;
//  js.src = `//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=${'198385910196240'}`;
//  //js.src = `//connect.facebook.net/en_US/sdk.js`;
//  fjs.parentNode.insertBefore(js, fjs);
//}
//initFBSDK(document, 'script', 'facebook-jssdk')


//window['fbclick'] = () => {
//  FB.login(response => {
//    //debugger;
//    // handle the response
//  }, { scope: 'public_profile,email' })
//}

//export class loginComp extends React.PureComponent<WebLogin.IRoutePar> {
//  render() {
//    return <div>
//      <h2>LOGIN</h2>
//      <div ref={() => renderButton()} id={WebLogin.Consts.googleSignInBtnId} className="g-signin2"></div>
//      <div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" data-scope="public_profile email" ></div>
//    </div>
//  }
//}
////<div ref={() => calFBSDK()} dangerouslySetInnerHTML={{ __html: `<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" onlogin="onFBLogin" data-scope="public_profile email" ></div>` }} />
////      <div dangerouslySetInnerHTML={{ __html: `<div onclick="fbclick()">LOGIN FACEBOOK</div>` }}></div>



////*** EXPORTS
//export const platform = { doLogin: (returnUrl: Router.IState) => LoginComp.navigate({ returnUrl }) }

//export const LoginComp: Router.IRoute<WebLogin.IRoutePar> = registerRouter(loginComp, Login.Consts.name)
const loginHTML = `
<div id="my-signin" class="g-signin2"></div>
<br />
<div id="profile"></div>
<br />
<div onclick="signOut()">Sign Out</div>
<hr />
<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false" onlogin="onFBLogin" data-scope="public_profile email" ></div>
<div id="FBProfile"></div>
<br />
<div onclick="FBsignOut()">FB sign Out</div>
`
const loginSCRIPT = `
<script>
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=198385910196240";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>

<script>
  // http://localhost:3434
  //Google: kubakaca@gmail.com/pkzippkzip, My Project project (https://developers.google.com/identity/sign-in/web/devconsole-project, link Google API console)
  //https://developers.google.com/identity/sign-in/web/sign-in
  //FB: kubakaca@gmail.com/pkzippkzip, PZApp aplikace (https://developers.facebook.com, MyApps, select app), AppId 198385910196240, secret 6a2ab7859e9ae26239a2e5c6c4cfdd8f, login button: https://developers.facebook.com/docs/facebook-login/web/login-button
  //https://developers.facebook.com/docs/facebook-login/web/login-button
  function onSuccess(googleUser) {
    var profile = googleUser.getBasicProfile();
    var text = 'ID: ' + profile.getId() + ', ' + 'Name: ' + profile.getName() + ', ' + 'Image URL: ' + profile.getImageUrl() + ', ' + 'Email: ' + profile.getEmail();
    document.getElementById('profile').innerHTML = text;
  }
  function onFailure(error) {
    alert(error);
  }
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //window.location.reload();
    });
  }
  function renderButton() {
    debugger;
    gapi.signin2.render('my-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }
  function onFBLogin() {
    FB.api('/me?fields=name,email', function (response) {
      var text = 'Name: ' + response.name + ', ' + 'Email: ' + response.email;
      document.getElementById('FBProfile').innerHTML = text;
    });
  }
  function FBsignOut() {
    FB.logout(function (response) {
      //window.location.reload();
    });
  }
  //stranka se neobnovuje!!!! => drzi se lokalni javascript aplikace
  //var timestamp;
  //if (!timestamp) timestamp = new Date().getTime().toString();
  //alert(timestamp);
</script>
<script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
`