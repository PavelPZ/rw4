import React from 'react'
import { connect } from 'react-redux'
import { registerRouter } from '../../app-common/router'

const loginComp: Router.IRoute = () => null
loginComp.name = Login.Consts.name

const loginConnector = connect((state: IState) => state.login)
export const LoginComp = loginConnector(loginComp)


