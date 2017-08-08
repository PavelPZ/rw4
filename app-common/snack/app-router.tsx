import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter, actRoute } from '../../app-common/router'
import { isLogged, createLoginButton } from '../../app-common/login'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button {...rest}
    title={logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={doLoginAction} />
})

const appRouterComp = (props: AppRouter.IRoutePar) => {
  return <View style={{ flex: 1, marginTop: 30 }}>
    <Text style={{ fontSize: 24 }}>{props.title}</Text>
    <Button tabIndex={1} title='Add to title' onPress={() => AppRouterComp.navigate({ title: props.title + ' | xxx' })} />
    <LoginButton tabIndex={2}/>
  </View>
}

//*** EXPORTS

export const AppRouterComp: Router.IRoute<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, {
  load: par => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), 200)),
  needsLogin: par => par.title.length >= 'START TITLE | xxx'.length,
})
