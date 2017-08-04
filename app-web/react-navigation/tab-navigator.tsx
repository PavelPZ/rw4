import React from 'react';

import TabRouter from 'react-navigation/lib/routers/TabRouter'
import SceneView from './scene-view'
import createNavigator from 'react-navigation/lib/navigators/createNavigator'
import createNavigationContainer from 'react-navigation/lib/createNavigationContainer'
import addNavigationHelpers from 'react-navigation/lib/addNavigationHelpers'
import withCachedChildNavigation from 'react-navigation/lib/withCachedChildNavigation'

import { TabNavigatorConfig, NavigationRouteConfigMap, } from 'react-navigation';

const STACK = 'react-navigation/STACK';
const TABS = 'react-navigation/TABS';
const DRAWER = 'react-navigation/DRAWER';

//class TabView extends React.Component<any> {
//  render() {
//    const { state, dispatch } = this.props.navigation;
//    const { routes, index } = state;
//    const route = routes[index];
//    const TabComponent = this.props.router.getComponentForRouteName(route.routeName);
//    //const childNavigation = this.props.childNavigationProps[route.key]; //spojeno s const TabViewEx = withCachedChildNavigation(TabView) nize
//    let childNavigation2 = { dispatch, state: route };
//    childNavigation2 = addNavigationHelpers(childNavigation2);
//    return <TabComponent navigation={childNavigation2} />
//    //return <SceneView component={TabComponent} navigation={childNavigation} /> //je v original kodu
//  }
//}

////const TabViewEx = withCachedChildNavigation(TabView)
//const TabViewEx = TabView

export const TabNavigator = (routeConfigs: NavigationRouteConfigMap, config: TabNavigatorConfig = {}) => {

  const router = TabRouter(routeConfigs, config);

  const navigator = createNavigator(
    router,
    routeConfigs,
    config,
    STACK
  )(props => {
    const { state, dispatch } = props.navigation;
    const { routes, index } = state;
    const route = routes[index];
    const TabComponent = props.router.getComponentForRouteName(route.routeName);
    //const childNavigation = this.props.childNavigationProps[route.key]; //spojeno s const TabViewEx = withCachedChildNavigation(TabView) nize
    let childNavigation2 = { dispatch, state: route };
    childNavigation2 = addNavigationHelpers(childNavigation2);
    return <TabComponent navigation={childNavigation2} />
    //return <TabViewEx {...props} />
  });

  return createNavigationContainer(navigator);

}

