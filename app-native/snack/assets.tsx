import React from 'react'
import { View, Text, Button } from 'react-native'
import { Asset } from 'expo'

//import '../../App_Data/recording'

//const imageURI = Asset.fromModule(require('../../app_data/recording.json')).uri;

const App = props => {

  const proc = async () => {
    //const imageURI = Asset.fromModule(require('../../app_data/recording.json')).uri;
    //const ass = new Asset({ name: 'recording', type: 'json', hash: '', uri: 'file:///app_data/recording.json', width: '', height: '' })
    //const promise: Promise<any> = ass.downloadAsync() as any
    //const res = await promise
  }

  return <View style={{ marginTop:20 }}>
    <Button title='LOAD' onPress={proc} />
  </View>
}

export default App