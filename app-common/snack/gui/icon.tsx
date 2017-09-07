import React from 'react'
import { Icon, View, getColor } from '../../gui/gui'

const App = () => <View style={{ marginTop: 30, flexWrap: 'wrap', flexDirection: 'row' }}>
  <Icon name={GUI.IonicNames.apps} style={{ color: 'maroon', paddingLeft: 30 }} />
  <Icon name={GUI.IonicNames.apps} active style={{ color: 'maroon', paddingLeft: 30 }} />
  <Icon logoId={GUI.IonicLogos.logoChrome} style={{ color: getColor(GUI.Colors.DeepPurple), paddingLeft: 30 }} />
  <Icon logoId={GUI.IonicLogos.logoChrome} style={{ color: getColor(GUI.Colors.DeepPurple, GUI.Shadows.S200), paddingLeft: 30 }} />
  <Icon logoId={GUI.IonicLogos.logoChrome} style={{ color: getColor(GUI.Colors.DeepPurple, GUI.Shadows.S700), paddingLeft: 30 }} />
  <Icon name={GUI.IonicNames.apps} OS='ios' style={{ color: 'maroon', paddingLeft: 30 }} />
  <Icon name={GUI.IonicNames.apps} OS='ios' active style={{ color: 'maroon', paddingLeft: 30 }} />
</View>

export default App

