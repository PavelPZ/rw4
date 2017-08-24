import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'

import { reducer as routerReducer, } from './app-common/router'
import { reducer as loginReducer } from './app-common/login'
import { reducer as mediaQueryReducer } from './app-common/media-query'
import { reducer as locReducer } from './app-common/loc'
import { reducer as recordingReducer, saga as recordingSaga, middleware as recordingMiddleware, globalReducer as recordingGlobalReducer, blockGuiReducer, blockGuiSaga } from './app-common/recording'

export const init = () => {

  const reducers: App.IReducer = (st, action: any) => {
    const state = recordingGlobalReducer(st, action)
    return {
      router: routerReducer(state.router, action),
      login: loginReducer(state.login, action),
      mediaQuery: mediaQueryReducer(state.mediaQuery, action),
      loc: locReducer(state.loc, action),
      recording: recordingReducer(state.recording, action),
      blockGui: blockGuiReducer(state.blockGui, action),
    }
  }

  const sagaMiddleware = createSagaMiddleware()

  window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware, recordingMiddleware))

  function* rootSaga() {
    const rootRes = yield all({
      recordingSaga: call(recordingSaga),
      blockGuiSaga: call(blockGuiSaga),
    });
  }

  sagaMiddleware.run(rootSaga)

  return window.lmGlobal.store

}