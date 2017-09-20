import React from 'react'
import { Container, Header, Content, Text, Button, H2, View } from '../gui/gui'
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
    return <div>
      <Container testID='xxxxx' style={{ flex: 1 }}>
        <Header>
          {isModal ? <View></View> : <View></View>}
        </Header>
        <Content>
          <H2>{props.title}</H2>
          <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
          <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
          <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
          <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
          {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
        </Content>
      </Container>
    </div>
  }

}

const appRouterComp_: React.SFC<AppRouter.IRoutePar> = props => {
  const { children, ...par } = props
  const isModal = props.query && props.query.isModal
  return <Container testID='xxxxx' style={{ flex: 1 }}>
    <Header>
      {isModal ? <View></View> : <View></View>}
    </Header>
    <Content>
      <H2>{props.title}</H2>
      <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
      <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
      <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
      <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
      {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
    </Content>
  </Container>
}
let counter = 0

//*** EXPORTS
export const AppRouterComp: Router.IRouteComponent<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
})
