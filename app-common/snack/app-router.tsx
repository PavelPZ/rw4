﻿import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { Container, Header, Content, Text, Button, H2, View, DrawerLayout } from '../gui/gui'
import { registerRouter } from '../lib/router'
import { isLogged, createLoginButton } from '../lib/login'
import { storeContextType } from '../lib/lib'
import { contextType as locContextType } from '../lib/loc'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button
    label={logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={doLoginAction} />
})

const enum Consts {
  name = 'app-router',
  urlMask = '/:title',
  loadDelay = 600,
}

interface IRoutePar extends Router.IRoutePar {
  title?: string
}

type IOwnProps = Router.IPageProps<IRoutePar>
interface IStateProps {
  title2: string
}
type IState = IStateProps
interface IDispatchProps {
  onClick
}

type IProps = IStateProps & IDispatchProps

class appPageLow extends React.PureComponent<IOwnProps & IStateProps & IDispatchProps> {
  render() {
    const props = this.props
    const { children, ...par } = props
    const pageProps = {
      ...par,
      sidebarMenu:{navItems: [<Menu key={0}/>]}
    }
    const isModal = props.query && props.query.isModal
    //console.log('appRouterComp', props)
    return <DrawerLayout {...par} drawerMenu={{navItems:[<Menu key={0}/>]}}>
      <Container style={{ flex: 1 }}>
        <Header key={1}>
          <View><Text style={{ color: 'lightgray' }}>{JSON.stringify(props)}</Text></View>
        </Header>
        <Content key={2}>
          <H2>{props.title + ' ' + props.title2 + ' ' + counter++}</H2>
          <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppPage.getRoute({ ...par, title: props.title + ' | xxx' } as IRoutePar)} />
          <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppPage.getRoute({ ...par, title: props.title + ' | mmm' } as IRoutePar, true)} />
          <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
          <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
          <Button /*tabIndex={1}*/ key={41} label='TITLE2' onPress={() => props.onClick(props.title2 + ' t2') } />
          {!window.lmGlobal.isNative && <LoginButton key={5} tabIndex={2} />}
        </Content>
      </Container>
    </DrawerLayout>
  }
}
let counter = 0

const provider: ComponentDecorator<IStateProps & IDispatchProps, IOwnProps> = connect(
  (state: IAppState) => state.xxx,
  (dispatch) => ({
    onClick: title2 => dispatch({ type: 'CLICK', title2 }),
    //showDrawer: visible => dispatch({ type: 'CLICK' }),
  } as IDispatchProps)
)

const appPage = provider(appPageLow)

class Menu extends React.Component {
  render() {
    return <Text>{'SITE MENU'}</Text>
  }
}

//*** EXPORTS
export const AppPage: Router.IRouteComponent<IRoutePar> = registerRouter(appPage, Consts.name, Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
  reducer: (state: IAppState, action: Router.ICreateDestroyAction | Router.IAction | App.Action<'CLICK'>) => {
    const initState = { title2: 'start' }
    const changeState = false/*!action.routeChanged*/
    switch (action.type) {
      case Router.Consts.ROUTE_CREATE: console.log(Router.Consts.ROUTE_CREATE); return changeState ? state : { ...state, xxx: initState }
      case Router.Consts.NAVIGATE_END: console.log(Router.Consts.NAVIGATE_END); return { ...state, xxx: initState } //nova navigace: initialni stav
      case Router.Consts.ROUTE_DESTROY: console.log(Router.Consts.ROUTE_DESTROY); if (changeState) return state; const { xxx, ...rest } = state; return rest //opusteni router: clear jeho STATE
      case 'CLICK': return { ...state, xxx: { title2: (action as any).title2 } }
      default: return state
    }
  }
})

interface IAppState extends App.IGlobalState {
  xxx: IState
}
