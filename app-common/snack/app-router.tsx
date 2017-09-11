import React from 'react'
import { Container, Header, Content, Text, Button, H2 } from '../gui/gui'
import { registerRouter, navigatePushHome } from '../lib/router'
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

const appRouterComp: React.SFC<AppRouter.IRoutePar> = props => {
  const { children, ...par } = props
  return <Container style={{ flex: 1 }}>
    <Header />
    <Content>
      <H2>{props.title}</H2>
      <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
      <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
      <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName:null }/*home*/} />
      <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
      {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
    </Content>
  </Container>
}

//*** EXPORTS
export const AppRouterComp: Router.IRouteComponent<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
})


export const reducer: App.IReducer = (state, action: Router.IAction) => {
  if (!state) return {}
  switch (action.type) {
    //case Router.Consts.NAVIGATE_END:
    //let drawerStates: IState
    //if (action.newState.routeName != AppRouter.Consts.name) drawerStates = {
    //  drawerChildren: { routeName: AppRouter.Consts.name as string },
    //  drawerHeaderChildren: { routeName: AppRouter.Consts.name as string },
    //  toolbarTitle: { routeName: AppRouter.Consts.name as string, title: 'App Router' },
    //  toolbarActions: { routeName: AppRouter.Consts.name as string },
    //}
    //return { state, ...drawerStates }
    default: return state
  }
}
