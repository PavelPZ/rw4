import React from 'react'
import { View, Icon } from '../../gui/gui'

const App = () => {
  return <View style={{ marginTop: 30 }}>
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <Icon key={1} name={GUI.IonicIcons.apps} color={GUI.Colors.BlueGrey} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={2} name={GUI.IonicIcons.apps} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S100} active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={3} name={GUI.IonicIcons.logoChrome} color={GUI.Colors.Purple} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={4} name={GUI.IonicIcons.logoChrome} native={{ raised:true }} color={GUI.Colors.dark} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={5} name={GUI.IonicIcons.logoChrome} color={GUI.Colors.danger} style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />
      <Icon key={6} name={GUI.IonicIcons.apps} reverse OS='ios' color={GUI.Colors.secondary} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={7} name={GUI.IonicIcons.apps} OS='ios' color={GUI.Colors.success} active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={8} name={GUI.IonicIcons.apps} OS='ios' color={GUI.Colors.secondary} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={9} name={GUI.IonicIcons.apps} reverse native={{ raised: true }} color={GUI.Colors.success} active style={{ paddingLeft: 30, fontSize: 24 }} />

      <Icon key={10} name={GUI.IonicIcons.apps} light reverse style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={11} name={GUI.IonicIcons.apps} dark reverse style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={12} name={GUI.IonicIcons.apps} info active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={13} name={GUI.IonicIcons.logoChrome} warning style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={14} name={GUI.IonicIcons.logoChrome} danger native={{ raised: true }} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={15} name={GUI.IonicIcons.logoChrome} primary style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />
      <Icon key={16} name={GUI.IonicIcons.apps} secondary reverse native={{ raised: true }} active style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />
    </View>
  </View>
}

export default App

