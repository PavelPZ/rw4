import React from 'react'
import { connect } from 'react-redux'

import { shallowEqual } from '../../app-common/lib/lib'

const enum Consts {
  NAME = 'ct/NAME',
  FROM_URL = 'ct/VALUE',
  STATE = 'ct/STATE',
}

interface IAction extends App.ActionLow {
  type: Consts.NAME | Consts.FROM_URL | Consts.STATE
  value: string
}

export interface ITestValue {
  fromUrl?: string
  state?: string
}
export interface ITestState {
  name?: string
  pars?: ITestValue
}

type ITestProps = ITestState
export interface ITestDispatchProps {
  changeName?: (name: string) => void
  changeFromUrl?: (value: string) => void
  changeState?: (value: string) => void
}

interface IMyState extends IState {
  connectTest?: ITestState
}

export const reducer: App.IReducer<ITestState> = (state, action: IAction) => {
  if (!state) return { name: 'IN ', pars: reducer2(undefined, action) }
  switch (action.type) {
    case Consts.NAME: return { ...state, name: action.value }
    default:
      const pars = reducer2(state.pars, action)
      return pars != state.pars ? { ...state, pars } : state
  }
}

const connector = connect<ITestProps, ITestDispatchProps, {}>(
  (state: IMyState) => state.connectTest,
  dispatch => ({
    changeName: value => dispatch({ type: Consts.NAME, value } as IAction),
    changeFromUrl: value => dispatch({ type: Consts.FROM_URL, value } as IAction)
  } as ITestDispatchProps),
  //undefined,
  //{ //render on same value, some behavior as default
  //  areStatesEqual: (s1: IMyState, s2: IMyState) => shallowEqual(s1.connectTest, s2.connectTest)
  //}
  //undefined,
  //{ //no render on same value
  //  areStatesEqual: (s1: IMyState, s2: IMyState) => s1.connectTest.name === s2.connectTest.name && s1.connectTest.value.value === s2.connectTest.value.value
  //}
  undefined,
  //{
  //  areStatesEqual: (s1: IMyState, s2: IMyState) => {
  //    return s1.connectTest.name === s2.connectTest.name
  //  }
  //}
)

const reducer2: App.IReducer<ITestValue> = (state, action: IAction) => {
  if (!state) return { fromUrl: 'IV ', state: '' }
  switch (action.type) {
    case Consts.FROM_URL: return { ...state, fromUrl: action.value }
    case Consts.STATE: return { ...state, state: action.value }
    default: return state
  }
}

const app: React.SFC<ITestProps & ITestDispatchProps> = props => {
  return <div>
    Render count: {renderCount++}
    <h3 key={11}>NAME</h3>
    <input value={props.name} onChange={e => props.changeName(e.target.value)} /> = {props.name}
    <div key={21} onClick={() => props.changeName(props.name)}>the same name</div>
    <h3 key={12}>VALUE</h3>
    {renderCount % 2 ? <App2 key='1' id={0} name={'n1'} /> : <App2 key='2' id={1} name={props.name} />}
    fromUrl: {props.pars.fromUrl}
    <div key={22} onClick={() => props.changeFromUrl(props.pars.fromUrl + 'x')}>
      change fromUrl
    </div>
    {!(renderCount % 2) ? <App2 key='1' id={0} name={'n1'} /> : <App2 key='2' id={1} name={props.name} />}
  </div>
}
let renderCount = 0

export const ConnectTest = connector(app)

interface IApp2OwnProps { id: number; name: string }
const connector2 = connect<ITestValue, ITestDispatchProps, IApp2OwnProps>(
  (state: IMyState) => state.connectTest.pars,
  dispatch => ({
    changeFromUrl: value => dispatch({ type: Consts.FROM_URL, value } as IAction),
    changeState: value => dispatch({ type: Consts.STATE, value } as IAction),
  } as ITestDispatchProps),
  undefined,
  //{
  //  areStatesEqual: (s1: IMyState, s2: IMyState) => {
  //    return shallowEqual(s1.connectTest.pars, s2.connectTest.pars)
  //  }
  //}
)
const app2: React.SFC<ITestValue & IApp2OwnProps & ITestDispatchProps> = props => {
  return <blockquote>
    <hr key={1} />
    <h3 key={2}>APP2 {props.id}</h3>
    Render count: {renderCount2[props.id]++}<br />
    SUB: {`FromUrl: ${props.fromUrl}, Name: ${props.name}, State: ${props.state}`}
    <div key={3} onClick={() => props.changeState(props.state + 's')}>
      change state
  </div>
    <div key={4} onClick={() => props.changeFromUrl(props.fromUrl + 'x')}>
      change fromUrl
    </div>
    <hr key={5} />
  </blockquote>
}
let renderCount2 = [0, 0]
const App2 = connector2(app2)

