import React from 'react'
import { createStore, Store, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'
import { StyleSheet, Text, View, Button } from 'react-native'
//move ES dir to SAGA ROOT dir
import createSagaMiddleware, { delay } from 'redux-saga/index'
import { all, call, put, takeEvery, takeLatest, take } from 'redux-saga/effects'


interface IState {
  counter: number;
}

function* numbers() {
  while (true) {
    yield 1
    yield 2
    yield 3
  }
}
const gen = numbers();

const reducers = (state: IState, action) => ({
  counter: action.type == 'COUNTER' ? gen.next().value : state.counter,
});

const sagaMiddleware = createSagaMiddleware()

export let store = createStore<IState>(reducers, { counter: 0 }, applyMiddleware(sagaMiddleware))

const compConnector = connect(st => st, dispatch => ({ onPress: () => dispatch({ type: 'COUNTER_START' }) }))

const comp = (props: IState & { onPress }) => <View style={styles.container}>
  <Button title='Add Count' onPress={props.onPress} />
  <Text>{props.counter}</Text>
</View>

const Comp = compConnector(comp)

export default class App extends React.Component {
  render() {
    return <Provider store={store}>
      <Comp />
    </Provider>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//*** saga
function* counterSaga() {
  while (true) {
    const start = yield take(['COUNTER', 'COUNTER_START'])
    console.log(`counterSaga start: ${JSON.stringify(start)}`);
    if (start.type == 'COUNTER') continue; //!!!! never happends
    yield delay(500)
    //setTimeout(() => store.dispatch({ type: "COUNTER" }),1) //went back to SAGA
    const putRes = yield put({ type: "COUNTER" }) //did not go back to SAGA
    console.log(`counterSaga putRes: ${JSON.stringify(putRes)}`);
  }
}
function* counterSaga2() {
  while (true) {
    const start = yield take(['COUNTER'])
    console.log(`counterSaga2 start: ${JSON.stringify(start)}`);
  }
}

function* rootSaga() {
  const rootRes =  yield all({ counterSaga2: call(counterSaga2), counterSaga: call(counterSaga) }); //run in parallel
  console.log(`rootSaga: ${JSON.stringify(rootRes)}`); //never happends
}

sagaMiddleware.run(rootSaga)
//sagaMiddleware.run(counterSaga2)


