import React from 'react';
import { connect, Store } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'
import { actRoute } from './router'

export const createLoginButton = connect<Login.ILoginButtonMapProps, Login.ILoginButtonDispatchProps, React.HTMLAttributes<{}>>(
  (state: IState) => ({ logged: state.login.logged } as Login.ILoginButtonMapProps),
  (dispatch) => ({
    doLoginAction: () => {
      const logSt = isLogged()
      if (logSt == Login.TLoginStatus.unsupported) return
      const { loginPlatform } = window.platform
      if (logSt == Login.TLoginStatus.unlogged) loginPlatform.doLogin(actRoute()); else loginPlatform.doLogout()
    }
  })
)

export const loginProcessing = (needsLogin: boolean, returnUrl: Router.IState) => {
  const logSt = isLogged()
  if (logSt == Login.TLoginStatus.unsupported) return false
  const { loginPlatform } = window.platform
  if (needsLogin && logSt == Login.TLoginStatus.unlogged) { setTimeout(() => loginPlatform.doLogin(returnUrl), 1); return true }
  return false;
}
export const isLogged = () => {
  if (!window.platform.loginPlatform || !window.platform.loginPlatform.providerExist) return true
  const login = window.store.getState().login
  return login && login.logged
}

export const reducer: App.IReducer<Login.IState> = (state, action: Login.ILoginAction) => {
  if (!state) { const { loginPlatform } = window.platform; state = { logged: loginPlatform ? Login.TLoginStatus.unlogged : Login.TLoginStatus.unsupported } }
  switch (action.type) {
    case Login.Consts.LOGIN: const { type, ...rest } = action; return { logged: Login.TLoginStatus.logged, ...rest }
    default: return state
  }
}

