import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'

import { reducer as routerReducer, Provider as RouterProvider, saga as routerSaga } from './router'
import { reducer as loginReducer } from './login'
import { AppRouterComp } from './snack/app-router'

window.lmGlobal = {
  initializers: [],
  platform: {}
}

export const initApp = () => {
  const reducers: App.IReducer = (state, action) => ({
    router: routerReducer(state.router, action),
    login: loginReducer(state.login, action),
  })

  const sagaMiddleware = createSagaMiddleware()

  window.lmGlobal.store = createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware))

  function* rootSaga() {
    const rootRes = yield all({
      routerSaga: call(routerSaga)
    });
  }

  sagaMiddleware.run(rootSaga)

  AppRouterComp.navigate({ title: 'START TITLE' })

}

export const App = () => {
  return <ReduxProvider store={window.lmGlobal.store as Store<IState>}>
    <RouterProvider />
  </ReduxProvider>
}
