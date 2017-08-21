import React from 'react';

export default class SceneView extends React.PureComponent {
  static childContextTypes = {
    navigation: React.PropTypes.any
  };

  props;

  getChildContext() {
    return {
      navigation: this.props.navigation,
    };
  }

  render() {
    const { screenProps, navigation, component: Component } = this.props;
    return <Component screenProps={screenProps} navigation={navigation} />;
  }
}