//https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-icon-base/index.d.ts

import React from 'react'
import { Text, Button, View, TouchableHighlightProperties, TextProperties, TextStyle } from 'react-native'

//NENI POTREBA
// //prvni moznost, vyzaduje instalaci "react-native-vector-icons". Umi buttony, tab header apod. Font umi byt je soucasti textu.
// //pro web je kod https://github.com/oblador/react-native-vector-icons/blob/master/directory/src/App.js
//import Icon from 'react-native-vector-icons/FontAwesome' 
//<Icon.Button name="facebook" backgroundColor="#3b5998" onPress={() => { }}>Login with Facebook</Icon.Button>
//  <Text>Hallo world <Icon name="rocket" size={30} color="#900" /> ICON</Text>


//fonty jsou jiz soucasti instalace expo aplikace na mobilu
import { Ionicons, IconProps } from '@expo/vector-icons' 

//https://github.com/oblador/react-native-vector-icons
interface IButtonProps extends TextProperties {
  backgroundColor?: string,
  borderRadius?: number,
  color?: string,
  size?: number,
  name: string,
  iconStyle?: TextStyle, // eslint-disable-line react/forbid-prop-types
  onPress:() => void,
}

const XButton: React.ComponentClass<IButtonProps> = (Ionicons as any).Button;

const App = () => <View style={{ marginTop: 30 }}>
  <Text>Hallo world <Ionicons name="md-checkmark-circle" size={32} color="green" /> ICON</Text>
  <XButton name="md-checkmark-circle" backgroundColor="#3b5998" onPress={() => { }}>Login with Facebook</XButton>
</View>

export default App

