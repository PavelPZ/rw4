import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter, actRoute } from '../../app-common/router'
import { isLogged, createLoginButton } from '../../app-common/login'

const LoginButton = createLoginButton(props => {
  if (props.logged == Login.TLoginStatus.unsupported) return null
  return <Button
    title={props.logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={props.doLoginAction} />
})

const appRouterComp = (props: AppRouter.IRoutePar) => {
  const logSt = isLogged()
  const { loginPlatform } = window.lmGlobal.platform
  return <View style={{ flex: 1, marginTop: 30 }}>
    <Text style={{ fontSize: 24 }}>{props.title}</Text>
    <Button title='Add to title' onPress={() => AppRouterComp.navigate({ title: props.title + ' | xxx' })} />
    <LoginButton/>
  </View>
}

//*** EXPORTS

export const AppRouterComp: Router.IRoute<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, {
  load: par => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), 200)),
  needsLogin: par => par.title == 'START TITLE | xxx',
})
