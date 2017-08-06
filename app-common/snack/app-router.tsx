import React from 'react'
import { View, Text } from '../../polyfill/index'
import { registerRouter } from '../../app-common/router'

const appRouterComp = (props: AppRouter.IRoutePar) => <View style={{ flex: 1, marginTop: 30 }}>
  <Text style={{ fontSize: 24 }}>{props.title}</Text>
</View>

//*** EXPORTS

export const AppRouterComp = registerRouter(appRouterComp, AppRouter.Consts.name, {
  load: par => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), 1000))
})
