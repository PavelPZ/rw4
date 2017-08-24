﻿import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter, actRoute } from '../../app-common/router'
import { isLogged, createLoginButton } from '../../app-common/login'
import { storeContextType } from '../../app-common/lib'
import { contextType as locContextType } from '../../app-common/loc'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button {...rest}
    title={logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={doLoginAction} />
})

const appRouterComp = storeContextType(locContextType<AppRouter.IRoutePar>((props, ctx) => <View style={{ flex: 1, marginTop: 30 }}>
    <Text style={{ fontSize: 24 }}>{props.title}</Text>
    <Button /*tabIndex={1}*/ title='Add to title' onPress={() => AppRouterComp.navigate({ title: props.title + ' | xxx' })} />
    {window.lmGlobal.isNative ? null : <LoginButton tabIndex={2} />}
  </View>
))

//*** EXPORTS

export const AppRouterComp: Router.IRoute<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  load: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => params.title.length >= 'START TITLE | xxx'.length,
})

