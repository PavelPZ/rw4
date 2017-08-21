import React from 'react';

import StackRouter from 'react-navigation/lib/routers/StackRouter'
import createNavigator from 'react-navigation/lib/navigators/createNavigator'
import createNavigationContainer from 'react-navigation/lib/createNavigationContainer'
import addNavigationHelpers from 'react-navigation/lib/addNavigationHelpers'

import { StackNavigatorConfig, NavigationRouteConfigMap, } from 'react-navigation';

const STACK = 'react-navigation/STACK';
const TABS = 'react-navigation/TABS';
const DRAWER = 'react-navigation/DRAWER';

export const StackNavigator = (routeConfigMap: NavigationRouteConfigMap, stackConfig: StackNavigatorConfig = {}) => {

  const {
    initialRouteName,
    initialRouteParams,
    navigationOptions,
  } = stackConfig;
  const stackRouterConfig = {
    initialRouteName,
    initialRouteParams,
    navigationOptions,
  };

  const router = StackRouter(routeConfigMap, stackRouterConfig);

  const navigator = createNavigator(
    router,
    routeConfigMap,
    stackConfig,
    STACK
  )(props => {
    const { state, dispatch } = props.navigation;
    const { routes, index } = state;
    const Component = router.getComponentForState(state);
    let childNavigation = { dispatch, state: routes[index] };
    childNavigation = addNavigationHelpers(childNavigation);
    return <Component {...props} navigation={childNavigation} />;
  });

  return createNavigationContainer(navigator);

}