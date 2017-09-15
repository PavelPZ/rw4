import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

//https://blog.bam.tech/developper-news/5-tips-to-make-a-great-component-to-page-animation-in-react-native
//https://github.com/oblador/react-native-animatable
//https://github.com/leecade/react-native-swiper
//https://blog.callstack.io/react-native-animations-revisited-part-i-783143d4884
export default class App extends React.Component {
  state = {
    showFirst: 0
  };

  _onPress = () => {
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut, duration: 500 })
    this.setState({ ...this.state, showFirst: this.state.showFirst + 1 })
    setTimeout(() => this._onPress(), 500)
  }

  render() {
    return (
      <View style={styles.container}>
        {!(this.state.showFirst % 3) && <View key={1} style={[styles.box]}><Text>ANIM 1</Text></View>}
        {!(this.state.showFirst % 2) && <View key={2} style={[styles.box, { backgroundColor: 'blue', }]}><Text>ANIM 2 ANIM 2 ANIM 2 ANIM 2</Text></View >}
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})