import React from 'react'
import { addNavigationHelpers, DrawerNavigator, StackNavigator } from 'react-navigation';
import { Provider as RouterProvider } from '../../app-common/lib/router'
import { connect } from 'react-redux'

//export const AppNavigator = StackNavigator({
//  Drawer: {
//    screen: DrawerNavigator({
//      Root: {
//        screen: RouterProvider
//      }
//    })
//  },
//  Modal: {
//    screen: RouterProvider
//  }
//})

export const AppNavigator = DrawerNavigator({
  Drawer: {
    screen: StackNavigator({
      Modal: {
        screen: RouterProvider
      }
    })
  },
  Root: {
    screen: RouterProvider
  }
})

const provider: React.SFC<{ navProp, dispatch }> = ({ navProp, dispatch }) => <AppNavigator navigation={addNavigationHelpers({ dispatch: dispatch, state: navProp })} />

export const Provider = connect((state: IState) => ({ navProp: state.router }))(provider);
