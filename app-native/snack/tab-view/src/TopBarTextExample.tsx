/* @flow */
import React, { PureComponent } from 'react';

import { StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, TabBarProps, NavigationState } from 'react-native-tab-view';
import SimplePage from './SimplePage';

type Route = {
  key: string,
  title: string,
};

type State = NavigationState<Route>;

export default class TopBarTextExample extends PureComponent<any, State> {
  static title = 'Scrollable top bar';
  static appbarElevation = 0;

  state: State = {
    index: 1,
    routes: [
      { key: '1', title: 'First' },
      { key: '2', title: 'Second' },
      { key: '3', title: 'Third' },
      { key: '4', title: 'Fourth' },
      { key: '5', title: 'Fiveth' },
    ],
  };

  _handleIndexChange = index => {
    this.setState({
      index,
    });
  };

  _renderHeader = props => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
      case '1':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#ff4081' }}
          />
        );
      case '2':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#673ab7' }}
          />
        );
      case '3':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#4caf50' }}
          />
        );
      case '4':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: '#2196f3' }}
          />
        );
      case '5':
        return (
          <SimplePage
            state={this.state}
            style={{ backgroundColor: 'yellow' }}
          />
        )
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[styles.container, this.props.style]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleIndexChange}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: 'gray',
    height:30,
    //paddingLeft:50
  } as ReactNative.ViewStyle,
  tab: {
    width: Dimensions.get("window").width / 3.5,
    height: 30,
  } as ReactNative.ViewStyle,
  indicator: {
    backgroundColor: 'yellow',
  },
  label: {
    color: 'white',
    fontWeight: '400',
  },
});
