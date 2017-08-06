import React from 'react'
import { connect } from 'react-redux'
import { registerRouter, navigate as routerNavigate } from '../../app-common/router'
import { View, Text, Button } from '../../polyfill/index'

const appRouterComp = (props: AppRouter.IRoutePar) => <View style={{ flex: 1, marginTop: 30 }}>
  <Text style={{ fontSize: 24 }}>{props.title}</Text>
</View>

//*** EXPORTS

export const navigate = (par: AppRouter.IRoutePar) => routerNavigate(AppRouter.Consts.name, par)

export const AppRouterComp = registerRouter(appRouterComp, AppRouter.Consts.name)
