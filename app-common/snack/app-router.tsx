import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter } from '../../app-common/router'
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

export const AppRouterComp: Router.IRouteComponent<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => params.title.length >= 'START TITLE | xxx'.length,
})


export const reducer: App.IReducer = (state, action: Router.IAction) => {
  if (!state) return {} as IState
  switch (action.type) {
    case Router.Consts.NAVIGATE_END:
      let drawerStates: IState
      if (action.newState.routeName != AppRouter.Consts.name) drawerStates = {
        drawerChildren: { routeName: AppRouter.Consts.name as string },
        drawerHeaderChildren: { routeName: AppRouter.Consts.name as string },
        toolbarTitle: { routeName: AppRouter.Consts.name as string, title: 'App Router' },
        toolbarActions: { routeName: AppRouter.Consts.name as string },
      }
      return { state, ...drawerStates }
    default: return state
  }
}
