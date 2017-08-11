import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'
import createHistory from 'history/createBrowserHistory'

import { reducer as routerReducer, Provider as RouterProvider, saga as routerSaga, init as routerInit } from './router'
import { reducer as loginReducer } from './login'
import { reducer as mediaReducer } from './media'
import { reducer as locReducer, Provider as LocProvider, } from './loc'

window.lmGlobal = {
  initializers: [],
  platform: {}
}

export const initApp = (basicPath: string, startRoute: Router.IState) => {

  const reducers: App.IReducer = (state, action: any) => ({
    router: routerReducer(state.router, action),
    login: loginReducer(state.login, action),
    media: mediaReducer(state.media, action),
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

  const { mediaPlatform } = window.lmGlobal.platform
  mediaPlatform && mediaPlatform.init()

  routerInit(basicPath, createHistory() as Router.IHistory, startRoute)
}

export const App = () => {
  return <ReduxProvider store={window.lmGlobal.store as Store<IState>}>
    <LocProvider>
      <RouterProvider />
    </LocProvider>
  </ReduxProvider>
}
