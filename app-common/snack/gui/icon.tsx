import React from 'react'
import { Container, Header, Content, Text, Icon } from '../../gui/gui'

const App = () => {
  return <Container style={{ marginTop: 100 }}>
    <Header />
    <Content style={{ flex: 1 }}>
      <Icon key={1} name={GUI.IonicNames.apps} color={GUI.Colors.BlueGrey} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={2} name={GUI.IonicNames.apps} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S100} active style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={3} logoId={GUI.IonicLogos.logoChrome} color='red' style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={4} logoId={GUI.IonicLogos.logoChrome} color={GUI.Colors.dark} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={5} logoId={GUI.IonicLogos.logoChrome} color={GUI.Colors.danger} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={6} name={GUI.IonicNames.apps} OS='ios' color={GUI.Colors.secondary} style={{ paddingLeft: 30, fontSize: 24 }} />
      <Icon key={7} name={GUI.IonicNames.apps} OS='ios' color={GUI.Colors.success} active style={{ paddingLeft: 30, fontSize: 24 }} />
    </Content>
  </Container>
}

export default App

