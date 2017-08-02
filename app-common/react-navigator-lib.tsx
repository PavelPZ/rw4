import React from 'react';
import {  NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';

export interface IScreenProps<TNavigatorProps = {}, TScreenProps = {}> {
  screenProps?: TNavigatorProps;
  navigation: NavigationScreenProp<TScreenProps>;
}

export const modifyNavigator = (navig: NavigationContainer) => {
  const defaultGetStateForAction = navig.router.getStateForAction
  navig.router.getStateForAction = (action, state) => {
    const res = defaultGetStateForAction(action, state)
    const last = res.routes[res.routes.length - 1]
    last.siblings = res.routes.map(r => r.key);
    console.log('getStateForAction: ' + JSON.stringify({ action, state, res }, null, 2))
    return res
  }
}

export interface NavigationScreenProp<TScreenProps> {
  state: NavigationRoute<TScreenProps> & { siblings: string[] }
  dispatch: (action: NavigationAction) => boolean
  goBack: (routeKey?: (string | null)) => boolean
  navigate<TPar={}> (routeName: string, params?: TPar, action?: NavigationAction): boolean
  setParams: (newParams: TScreenProps) => boolean
}

export interface IScreen<TNavigatorProps = {}, TScreenProps = {}> {
  (props: IScreenProps<TNavigatorProps, TScreenProps>): JSX.Element
  navigate?: (props: IScreenProps<TNavigatorProps, TScreenProps>, routeName: string, par?: TScreenProps, action?: NavigationAction) => boolean 
  setParams?: (props: IScreenProps<TNavigatorProps, TScreenProps>, par: TScreenProps) => boolean
}

export const modifyScreen = (screen: IScreen) => {
  screen.navigate = (props: IScreenProps, routeName: string, par?, action?: NavigationAction) => props.navigation.navigate(routeName, par, action)
  screen.setParams = (props: IScreenProps, par) => props.navigation.setParams(par)
}

