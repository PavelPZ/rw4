import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'

import { reducer as routerReducer, Provider as RouterProvider, saga as routerSaga } from './router'

const reducers: App.IReducer = (state, action) => ({
  ...routerReducer(state, action)
})

const sagaMiddleware = createSagaMiddleware()

window.lmGlobal = {
  store: createStore<IState>(reducers, {}, applyMiddleware(sagaMiddleware))
}

function* rootSaga() {
  const rootRes = yield all({
    routerSaga: call(routerSaga)
  }); //run in parallel. Infinite loop.
}

sagaMiddleware.run(rootSaga)

const App = (props: App.IAppProps) => {
  window.lmGlobal.platform = props.platform
  return <ReduxProvider store={window.lmGlobal.store as Store<IState>}>
    <RouterProvider />
  </ReduxProvider>
}

export default App;