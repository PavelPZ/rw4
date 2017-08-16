import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import PropTypes from 'prop-types'

import { reducer as routerReducer, saga as routerSaga } from './router'
import { reducer as loginReducer } from './login'
import { reducer as mediaQueryReducer } from './media-query'
import { reducer as locReducer } from './loc'

window.lmGlobal = {
  initializers: [],
  platform: {}
}

export const contextType = <T extends React.ComponentType>(comp: T) => {
  comp.contextTypes = { ...comp.contextTypes, store: PropTypes.any }
  return comp
}

export const init = () => {

   const reducers: App.IReducer = (state, action: any) => ({
    router: routerReducer(state.router, action),
    login: loginReducer(state.login, action),
    mediaQuery: mediaQueryReducer(state.mediaQuery, action),
    loc: locReducer(state.loc, action),
  })

  const sagaMiddleware = createSagaMiddleware()

  window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware))

  function* rootSaga() {
    const rootRes = yield all({
      routerSaga: call(routerSaga)
    });
  }

  sagaMiddleware.run(rootSaga)

  return window.lmGlobal.store

}