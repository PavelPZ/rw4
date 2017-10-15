import React from 'react'
import { View, Button, Container, Header, Content, Footer } from '../../gui/gui'


const app = () => <Container style={{ marginTop: 30 }}>
  <Header />
  <Content style={{ flex: 1, padding: 8, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
    {/*
    <Button key={71} mode={GUI.ButtonMode.fixedBL} color={GUI.Colors.DeepOrange} iconName={GUI.IonicNames.alert} />
    <Button key={72} mode={GUI.ButtonMode.fixedBR} color={GUI.Colors.Blue} iconName={GUI.IonicNames.americanFootball} />
    <Button key={73} mode={GUI.ButtonMode.fixedTL} color={GUI.Colors.Cyan} iconLogo={GUI.IonicLogos.logoFacebook} />
    <Button key={74} mode={GUI.ButtonMode.fixedTR} color={GUI.Colors.DeepPurple} iconName={GUI.IonicNames.analytics} iconActive />
*/}
    <Button key={1} light onPress={() => alert('press')}>light</Button>
    <Button key={2}>primary</Button>
    <Button key={3} secondary>secondary</Button>
    <Button key={4} info>info</Button>
    <Button key={5} danger>danger</Button>
    <Button key={6} dark>dark</Button>
    <Button key={7} warning>warning</Button>
    <Button key={8} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button>
    <Button key={9} success>success</Button>
    <Button key={11} success disabled iconName={GUI.IonicIcons.bookmark} onPress={() => alert('press')}>success disabled iconName</Button>
    <Button key={111} success iconName={GUI.IonicIcons.arrowUp} onPress={() => alert('press')} />
    <Button key={12} bordered primary>bordered primary</Button>
    <Button key={13} bordered dark>bordered dark</Button>
    <Button key={14} bordered danger iconName={GUI.IonicIcons.alert}>bordered danger iconName</Button>
    <Button key={141} bordered danger iconName={GUI.IonicIcons.bookmark}></Button>
    <Button key={15} bordered danger iconAfter iconName={GUI.IonicIcons.bookmark}>bordered danger iconAfter iconName</Button>
    <Button key={16} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>bordered color shadow</Button>
    <Button key={17} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.bookmark}>bordered color shadow icon</Button>
    <Button key={18} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.bookmark} disabled>bordered color shadow icon disabled</Button>
    <Button key={19} flat info>flat info</Button>
    <Button key={191} flat light>flat light</Button>
    <Button key={21} flat danger iconName={GUI.IonicIcons.bookmark}>flat warning iconName</Button>
    <Button key={22} flat danger iconName={GUI.IonicIcons.bookmark} />
    <Button key={23} flat danger iconName={GUI.IonicIcons.bookmark} disabled></Button>
    <Button key={24} flat warning iconAfter iconName={GUI.IonicIcons.archive}>flat warning iconAfter iconName</Button>
    <Button key={25} floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive}>asdfasd</Button>
    <Button key={26} floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive} disabled>asdfasd disabled</Button>
    <Button key={27} floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button>
    <Button key={28} floating light iconName={GUI.IonicIcons.attach}>asdfasd</Button>
  </Content>
</Container >

export default app