import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter } from '../../app-common/router'

const appRouterComp = (props: AppRouter.IRoutePar) => <View style={{ flex: 1, marginTop: 30 }}>
  <Text style={{ fontSize: 24 }}>{props.title}</Text>
  <Button title='Add to title' onPress={() => AppRouterComp.navigate({ title: props.title + ' | xxx' })} />
</View>

//*** EXPORTS

export const AppRouterComp: Router.IRoute<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, {
  load: par => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), 1000)),
  needsLogin: par => par.title == 'START TITLE | xxx',
})
