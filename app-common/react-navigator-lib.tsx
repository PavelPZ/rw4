import React from 'react';
import {  NavigationContainer, NavigationAction, NavigationRoute } from 'react-navigation';

export interface IScreenProps<TNavigatorScreenProps = {}, TRouteProps = {}> {
  screenProps?: TNavigatorScreenProps;
  navigation: NavigationScreenProp<TRouteProps>;
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

export type NavigationScreenProp<TRouteProps> = {
  state: NavigationRoute<TRouteProps> & { siblings: string[] },
  dispatch: (action: NavigationAction) => boolean,
  goBack: (routeKey?: (string | null)) => boolean,
  navigate: (routeName: string, params?: {}, action?: NavigationAction) => boolean,
  setParams: (newParams: TRouteProps) => boolean,
}
