import React from 'react'
import { View, Icon } from '../../gui/gui'

const App = () => {
  return <View style={{ marginTop: 30 }}>
    <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      <Icon key={1} iconName={GUI.IonicIcons.apps} color={GUI.Colors.BlueGrey} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={2} iconName={GUI.IonicIcons.apps} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S100} active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={3} iconName={GUI.IonicIcons.logoChrome} color={GUI.Colors.Purple} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={4} iconName={GUI.IonicIcons.logoChrome} color={GUI.Colors.dark} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={5} iconName={GUI.IonicIcons.logoChrome} color={GUI.Colors.danger} style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />
      <Icon key={6} iconName={GUI.IonicIcons.apps} reverse iconOS='ios' color={GUI.Colors.secondary} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={7} iconName={GUI.IonicIcons.apps} iconOS='ios' color={GUI.Colors.success} active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={8} iconName={GUI.IonicIcons.apps} iconOS='ios' color={GUI.Colors.secondary} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={9} iconName={GUI.IonicIcons.apps} reverse color={GUI.Colors.success} active style={{ paddingLeft: 30, fontSize: 24 }} />

      <Icon key={10} iconName={GUI.IonicIcons.apps} light reverse style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={11} iconName={GUI.IonicIcons.apps} dark reverse style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={12} iconName={GUI.IonicIcons.apps} info active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={13} iconName={GUI.IonicIcons.logoChrome} warning style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={14} iconName={GUI.IonicIcons.logoChrome} danger style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={15} iconName={GUI.IonicIcons.logoChrome} primary style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />
      <Icon key={16} iconName={GUI.IonicIcons.apps} secondary reverse active style={{ paddingLeft: 30, fontSize: 24 }} onPress={() => console.log('PRESSED')} />

      <Icon key={21} iconName={GUI.IonicIcons.apps} disabled light reverse style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={22} iconName={GUI.IonicIcons.apps} disabled light style={{ paddingLeft: 30, fontSize: 24 }} />

    </View>
  </View>
}

export default App

