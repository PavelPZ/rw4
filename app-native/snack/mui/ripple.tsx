import React, { PureComponent } from 'react';
import { View, TouchableWithoutFeedback, Animated, Easing, Platform, Text, LayoutRectangle } from 'react-native';
//import withStyles, { WithStyles, StyleRulesCallback } from 'rw-mui-n/styles/withStyles'
import ButtonBase from 'rw-mui-n/ButtonBase/ButtonBase'
import { Ionicons, IconProps } from '@expo/vector-icons'

class TestPage extends PureComponent {
  render() {
    return (
      <View style={{ margin: 50, width: '50%', height: '20%' }}>
        <Text>START</Text>
        <ButtonBase classes={{ ripple: { backgroundColor: 'yellow' } }} onClick={() => { }}>
          <Text style={{ color: 'white' }}>ICON START</Text>
          <Ionicons name="md-checkmark-circle" size={32} color="yellow" />
          {/*<Icon src={icon} size={size} color={color} />*/}
          <Text style={{ color: 'white' }}>ICON END</Text>
        </ButtonBase>
        <Text>END</Text>
      </View>
    );
  }
}

export default TestPage;

//        <IconToggle icon={GUI.mdi_icons.star} color='black' width={80} height={40} />
