import React from 'react';
import { connect, Store } from 'react-redux'
import { put, take } from 'redux-saga/effects'
import invariant from 'invariant'

export const isLogged = () => {
  const { login: { email } } = window.lmGlobal.store.getState()
  return !!email
}

export function* saga() {
  while (true) {
    yield take(Login.Consts.LOGIN_START)
    yield take(Login.Consts.LOGOUT_START)
  }
}
