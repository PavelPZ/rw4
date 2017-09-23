import React from 'react'
import { Container, Header, Content, Text, Button, H2, View, Page } from '../gui/gui'
import { registerRouter } from '../lib/router'
import { isLogged, createLoginButton } from '../lib/login'
import { storeContextType } from '../lib/lib'
import { contextType as locContextType } from '../lib/loc'

//import { Page } from '../../app-native/lib/native-root-layers'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button
    label={logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={doLoginAction} />
})

class appPage extends React.PureComponent<AppRouter.IRouteProps> {
  render() {
    const props = this.props
    const { children, refForAnimation, ...par } = props
    const isModal = props.query && props.query.isModal
    //console.log('appRouterComp', props)
    return <Page refForAnimation={refForAnimation} sidebarMenu={<Menu />} >
      <Container style={{ flex: 1 }}>
        <Header key={1}>
          <View><Text style={{ color: 'lightgray' }}>{JSON.stringify(props)}</Text></View>
        </Header>
        <Content key={2}>
          <H2>{props.title + ' ' + counter++}</H2>
          <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppPage.getRoute({ ...par, title: props.title + ' | xxx' })} />
          <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppPage.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
          <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
          <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
          {!window.lmGlobal.isNative && <LoginButton key={5} tabIndex={2} />}
        </Content>
      </Container>
    </Page>
  }
}

class Menu extends React.Component {
  render() {
    return <Text>{'SITE MENU'}</Text>
  }
}

let counter = 0

//*** EXPORTS
export const AppPage: Router.IRouteComponent<AppRouter.IRouteProps> = registerRouter(appPage, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
  //reducer: (state: IAppState, action) => {
  //  if (!state.xxx) return { ...state, xxx: {}}
  //  switch (action.type) {
  //    case Router.Consts.ROUTE_CREATE: console.log(Router.Consts.ROUTE_CREATE); return { ...state, xxx: {} }
  //    case Router.Consts.NAVIGATE_END: console.log(Router.Consts.NAVIGATE_END); return state
  //    case Router.Consts.ROUTE_DESTROY: console.log(Router.Consts.ROUTE_DESTROY); const { xxx, ...rest } = state; return rest
  //    default: return state
  //  }
  }
})

interface IAppState extends IState {
  xxx
}
