import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider as ReduxProvider } from 'react-redux'
import createSagaMiddleware from 'redux-saga/index'
import { all, call } from 'redux-saga/effects'

import {reducer as routerReducer, Provider as RouterProvider, saga as routerSaga} from './router'

const reducers = (state, action) => ({
  ...routerReducer(state, action)
})

const sagaMiddleware = createSagaMiddleware()

export let store = createStore(reducers, {}, applyMiddleware(sagaMiddleware))

function* rootSaga() {
  const rootRes =  yield all({ 
    routerSaga: call(routerSaga) 
  }); //run in parallel. Infinite loop.
}

sagaMiddleware.run(rootSaga)

export default class App extends React.Component {
  render() {
    return <ReduxProvider store={store}>
      <RouterProvider/>
    </ReduxProvider>
  }
}



