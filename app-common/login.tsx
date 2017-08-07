import React from 'react';
import { connect, Store } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'

export const loginProcessing = (needsLogin: boolean, returnUrl: Router.IState) => {
  const { loginPlatform } = window.lmGlobal.platform
  if (needsLogin && !isLogged() && loginPlatform) { setTimeout(() => loginPlatform.doLogin(returnUrl), 1); return true }
  return false;
}
export const isLogged = () => {
  const { login: { logged } } = window.lmGlobal.store.getState()
  return logged
}

export const reducer: App.IReducer<Login.IState> = (state, action: Login.ILoginAction | Login.ILogoutAction) => {
  switch (action.type) {
    case Login.Consts.LOGIN: return { logged:true, ...action }
    case Login.Consts.LOGOUT: return { }
    default: return state || { }
  }
}

