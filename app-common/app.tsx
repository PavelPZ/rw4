import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import PropTypes from 'prop-types'

import { reducer as routerReducer, saga as routerSaga } from './router'
import { reducer as loginReducer } from './login'
import { reducer as mediaQueryReducer } from './media-query'
import { reducer as locReducer } from './loc'
import { reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer } from './recording'

window.lmGlobal = {
  //initializers: [],
  platform: {}
}

export const contextType = <T extends {}>(comp: React.ComponentType<T>) => {
  comp.contextTypes = { ...comp.contextTypes, store: PropTypes.any }
  return comp
}

export const init = () => {

  const reducers: App.IReducer = (st, action: any) => {
    const state = recordingGlobalReducer(st, action)
    return {
      router: routerReducer(state.router, action),
      login: loginReducer(state.login, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      loc: locReducer(state.loc, action),
      recording: recordingReducer(state.recording, action),
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, recordingMiddleware))

  function* rootSaga() {
    const rootRes = yield all({
      routerSaga: call(routerSaga),
      recordingSaga: call(recordingSaga),
    });
  }

  sagaMiddleware.run(rootSaga)

  return window.lmGlobal.store

}