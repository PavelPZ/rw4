import React from 'react'
import { Button, H2, primaryColor, secondaryColor } from '../../gui/gui'
import { View } from '../../../polyfill/index'

const app = () => <View style={{ flex: 1 }}>
  <Button key={1} mode={GUI.ButtonMode.fixedBL} iconName={GUI.IonicNames.alert} />
  <Button key={2} mode={GUI.ButtonMode.fixedBR} color={GUI.Colors.secondary} iconName={GUI.IonicNames.americanFootball} />
  <Button key={3} mode={GUI.ButtonMode.fixedTL} color={GUI.Colors.default} iconLogo={GUI.IonicLogos.logoFacebook} />
  <Button key={4} mode={GUI.ButtonMode.fixedTR} color={GUI.Colors.DeepOrange} iconName={GUI.IonicNames.analytics} iconActive />
  <View key={11} style={{ marginLeft: 100, marginRight: 100, alignItems: 'flex-start' }}>
    <H2 key={5} >Flat</H2>
    <Button key={6} mode={GUI.ButtonMode.flat} iconName={GUI.IonicNames.alert} />
    <Button key={7} mode={GUI.ButtonMode.flat} color={GUI.Colors.secondary} iconName={GUI.IonicNames.americanFootball} label='FLAT 1' />
    <Button key={8} mode={GUI.ButtonMode.flat} color={GUI.Colors.default} iconLogo={GUI.IonicLogos.logoFacebook} iconRight label='FLAT 2' />
    <Button key={9} mode={GUI.ButtonMode.flat} color={GUI.Colors.DeepOrange} label='FLAT 3' />
  </View>
  <View key={12} style={{ marginLeft: 100, marginRight: 100, alignItems: 'flex-start' }}>
    <H2 key={5} >Raise</H2>
    <Button key={6} iconName={GUI.IonicNames.alert} label=''/>
    <Button key={7} color={GUI.Colors.secondary} iconName={GUI.IonicNames.americanFootball} label='FLAT 1' />
    <Button key={8} color={GUI.Colors.default} iconLogo={GUI.IonicLogos.logoFacebook} iconRight label='FLAT 2' />
    <Button key={9} color={GUI.Colors.DeepOrange} label='FLAT 3' />
  </View>
  <View key={13} style={{ marginLeft: 100, marginRight: 100, alignItems: 'flex-start' }}>
    <H2 key={5} >Icon</H2>
    <Button key={6} iconName={GUI.IonicNames.alert} />
    <Button key={7} color={GUI.Colors.secondary} iconName={GUI.IonicNames.americanFootball} />
    <Button key={8} color={GUI.Colors.default} iconLogo={GUI.IonicLogos.logoFacebook} />
    <Button key={9} color={GUI.Colors.DeepOrange} iconName={GUI.IonicNames.apps} />
  </View>
  <View key={14} style={{ marginLeft: 100, marginRight: 100, alignItems: 'flex-start' }}>
    <H2 key={5} >Rounded</H2>
    <Button key={6} mode={GUI.ButtonMode.rounded} iconName={GUI.IonicNames.alert} label=''/>
    <Button key={7} mode={GUI.ButtonMode.rounded} color={GUI.Colors.secondary} iconName={GUI.IonicNames.americanFootball} label=''/>
    <Button key={8} mode={GUI.ButtonMode.rounded} color={GUI.Colors.default} iconLogo={GUI.IonicLogos.logoFacebook} label=''/>
    <Button key={9} mode={GUI.ButtonMode.rounded} color={GUI.Colors.DeepOrange} iconName={GUI.IonicNames.apps} label=''/>
  </View>
</View>

export default app