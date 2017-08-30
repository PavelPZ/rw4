import React from 'react';
import { NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';

export interface IPropsParams<TProps = {}, TState = {}> {
  screenProps?: TProps;
  navigation: NavigationScreenProp<TState>;
}

export const modifyNavigator = (navig: NavigationContainer) => {
  const defaultGetStateForAction = navig.router.getStateForAction
  navig.router.getStateForAction = (action, state) => {
    const res = defaultGetStateForAction(action, state)
    const last = res.routes[res.routes.length - 1]
    last.siblings = res.routes.map(r => r.key);
    console.log('getStateForAction: ' + JSON.stringify({ action, res }, null, 2))
    return res
  }
}

export interface NavigationScreenProp<TState> {
  state: NavigationRoute<TState> & { siblings: string[] }
  dispatch: (action: NavigationAction) => boolean
  goBack: (routeKey?: (string | null)) => boolean
  navigate<TPar={}>(routeName: string, params?: TPar, action?: NavigationAction): boolean
  setParams: (newParams: TState) => boolean
}

export interface IScreen<TProps = {}, TState = {}> {
  (props: IPropsParams<TProps, TState>): JSX.Element
  navigate?: (props: IPropsParams<TProps, TState>, par?: TState, action?: NavigationAction) => boolean
  setParams?: (props: IPropsParams<TProps, TState>, par: TState) => boolean
  id?: string
  routeConfig?: () => { [id: string]: { screen: any } }
}

export const modifyScreen = (screen: IScreen, id: string) => {
  screen.navigate = (props: IPropsParams, par?, action?: NavigationAction) => props.navigation.navigate(screen.id, par, action)
  screen.setParams = (props: IPropsParams, par) => props.navigation.setParams(par)
  screen.id = id
  screen.routeConfig = () => ({ [id]: { screen: screen } })
}

