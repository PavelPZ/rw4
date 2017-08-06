import React from 'react'
import { View, Text, Button } from '../../polyfill/index'
import { registerRouter } from '../../app-common/router'

const loginComp = () => <View style={{ flex: 1, marginTop: 30 }}>
  <Text style={{ fontSize: 24 }}>LOGIN</Text>
</View>

//*** EXPORTS

export const LoginComp = registerRouter(loginComp, Login.Consts.name)