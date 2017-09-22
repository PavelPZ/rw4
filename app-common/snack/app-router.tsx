import React from 'react'
import { Container, Header, Content, Text, Button, H2, View, Page } from '../gui/gui'
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

class appRouterComp extends React.PureComponent<AppRouter.IRoutePar> {
  render() {
    const props = this.props
    const { children, refForAnimation, ...par } = props
    const isModal = props.query && props.query.isModal
    //console.log('appRouterComp')
    return <Page refForAnimation={refForAnimation}>
      <Container style={{ flex: 1 }}>
        <Header key={1}>
          {isModal ? <View></View> : <View></View>}
        </Header>
        <Content key={2}>
          <H2>{props.title + ' ' + counter++}</H2>
          <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
          <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
          <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
          <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
          {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
        </Content>
      </Container>
    </Page>
  }
}

let counter = 0

//*** EXPORTS
export const AppRouterComp: Router.IRouteComponent<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
})
