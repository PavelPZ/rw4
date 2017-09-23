import React from 'react'
import { connect } from 'react-redux'
import { registerRouter } from '../../app-common/lib/router'
import { Page } from '../../app-common/gui/gui'
//import { shallowEqual } from '../../app-common/lib/lib'

interface IRouteProps extends Router.IPageProps {
  title:string
}

//cannot prevent re-render during ROUTER animation
const app1: React.SFC<IRouteProps> = props => <Page refForAnimation={props.refForAnimation} >
  <h1>APP 1 {props.title}: {renderCounter1++}</h1>
  <div onClick={() => App2.navigate({title:'from app1'})}>GOTO APP 2</div>
  <div onClick={() => App3.navigate({ title: 'from app1'})}>GOTO APP 3</div>
</Page>
export const App1: Router.IRouteComponent<IRouteProps> = registerRouter(app1, 'router-new-app1', '/:title')
let renderCounter1 = 0

//shouldComponentUpdate with shallowEqual prevents re-render during ROUTER animation
class app2 extends React.Component<IRouteProps> {
  render() {
    return <Page refForAnimation={this.props.refForAnimation}>
      <h1>APP 2 {this.props.title}: {renderCounter2++}</h1>
      <div onClick={() => App1.navigate({ title: 'from app2'})}>GOTO APP 1</div>
      <div onClick={() => App3.navigate({ title: 'from app2'})}>GOTO APP 3</div>
    </Page>
  }
  //shouldComponentUpdate(nextProps, nextState, nextContext): boolean {
  //  return !areStateWithoutOnRefEqual(nextProps, this.props) 
  //  //return !shallowEqual(nextProps, this.props) //default does no work, re-render due to changed onRef prop value
  //}
}
export const App2: Router.IRouteComponent<IRouteProps> = registerRouter(app2, 'router-new-app2', '/:title')
let renderCounter2 = 0

//clasic REDUX prevents re-render during ROUTER animation
class _app3 extends React.Component<IRouteProps & { click, fromConnect}> {
  render() {
    return <Page refForAnimation={this.props.refForAnimation}>
      <h1>APP 3 {this.props.title + ' ' + this.props.fromConnect}: {renderCounter3++}</h1>
      <div onClick={() => App1.navigate({ title: 'from app3'})}>GOTO APP 1</div>
      <div onClick={() => App2.navigate({ title: 'from app3'})}>GOTO APP 2</div>
      <div onClick={this.props.click}>ACTION</div>
    </Page>
  }
}
const app3 = connect<{}, { click }, IRouteProps>(
  (state: IState, ownProps: IRouteProps) => ({ fromConnect: ' from connect ' }), //({ x: {} }) forces re-render, shallowEqual does not work
  dispatch => ({
    click: () => {
      dispatch({ type: 'app3/click', text: ' t' })
    }
  }),
  //undefined,
  //{ 
  //  areOwnPropsEqual: (p1,p2) => {
  //    return areStateWithoutOnRefEqual(p1,p2) 
  //    //return shallowEqual(p1,p2) //default does no work, re-render due to changed onRef prop value
  //  }
  //}
)(_app3)
export const app3Reducer: App.IReducer<IState> = (state, action:any) => {
  //if (!state) return {}
  switch (action.type) {
    //case 'app3/click': return { ...state, router: { ...state.router, router: { ...state.router.router, params: { ...state.router.router.params, title: state.router.router.params.title + action.text } } } }
    case 'app3/click': return state // => not re-render
    default: return state
  }
}
export const App3: Router.IRouteComponent<IRouteProps> = registerRouter(app3, 'router-new-app3', '/:title')
let renderCounter3 = 0

