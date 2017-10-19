import React from 'react'
import { View, Button } from '../../gui/gui'


const app = () => <View style={{ flex: 1, marginTop: 30 }}>
  <View style={{ flex: 1, padding: 8, backgroundColor:'yellow' }}>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button key={111}>primaryx</Button>
      <Button outline key={112}>outline</Button>
      <Button flat key={114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button iconName={GUI.IonicIcons.bookmark} key={2111}>primary</Button>
      <Button iconName={GUI.IonicIcons.bookmark} outline key={2112}>outline</Button>
      <Button iconName={GUI.IonicIcons.bookmark} floating key={2113}>floating</Button>
      <Button iconName={GUI.IonicIcons.bookmark} flat key={2114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button iconName={GUI.IonicIcons.bookmark} key={2111}></Button>
      <Button iconName={GUI.IonicIcons.bookmark} outline key={2112}></Button>
      <Button iconName={GUI.IonicIcons.bookmark} flat key={2114}></Button>
      <Button iconName={GUI.IonicIcons.bookmark} flat disabled key={2115}></Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button iconName={GUI.IonicIcons.bookmark} iconAfter key={3111}>primary</Button>
      <Button iconName={GUI.IonicIcons.bookmark} iconAfter outline key={3112}>outline</Button>
      <Button iconName={GUI.IonicIcons.bookmark} iconAfter flat key={3114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button dark key={4111}>primary</Button>
      <Button dark outline key={4112}>outline</Button>
      <Button dark flat key={4114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button dark iconName={GUI.IonicIcons.bookmark} key={5111}>primary</Button>
      <Button dark iconName={GUI.IonicIcons.bookmark} outline key={5112}>outline</Button>
      <Button dark iconName={GUI.IonicIcons.bookmark} floating key={5113}>floating</Button>
      <Button dark iconName={GUI.IonicIcons.bookmark} flat key={5114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button dark disabled iconName={GUI.IonicIcons.bookmark} key={5111}>primary</Button>
      <Button dark disabled iconName={GUI.IonicIcons.bookmark} outline key={5112}>outline</Button>
      <Button dark disabled iconName={GUI.IonicIcons.bookmark} floating key={5113}>floating</Button>
      <Button dark disabled iconName={GUI.IonicIcons.bookmark} flat key={5114}>flat</Button>
    </View>

    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'space-around' }}>
      <Button iconName={GUI.IonicIcons.bookmark} danger key={2111}>danger</Button>
      <Button iconName={GUI.IonicIcons.bookmark} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconAfter key={2112}>after</Button>
      <Button iconName={GUI.IonicIcons.bookmark} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} floating key={2114}></Button>
    </View>


    {/*
    <Button key={1} light onPress={() => console.log('pressed')}>light</Button>
    <Button key={2}>primary</Button>
    <Button key={3} secondary>secondary</Button>
    <Button key={4} info>info</Button>
    <Button key={5} danger>danger</Button>
    <Button key={6} dark>dark</Button>
    <Button key={7} warning>warning</Button>
    <Button key={8} color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button>
    <Button key={9} success>success</Button>
    <Button key={41} raised info>info</Button>
    <Button key={51} raised danger>danger</Button>
    <Button key={61} raised dark>dark</Button>
    <Button key={11} success disabled iconName={GUI.IonicIcons.bookmark} onPress={() => console.log('pressed')}>success disabled iconName</Button>
    <Button key={71} reverse warning>warning</Button>
    <Button key={82} reverse color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button>
    <Button key={111} success iconName={GUI.IonicIcons.arrowUp} onPress={() => console.log('pressed')} />
    <Button key={25} floating onPress={() => console.log('pressed')} color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive}>asdfasd</Button>
    <Button key={26} floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive} disabled>asdfasd disabled</Button>
    <Button key={27} floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button>
    <Button key={28} floating light iconName={GUI.IonicIcons.attach}>asdfasd</Button>
    <Button key={251} reverse floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive} onPress={() => console.log('pressed')}>asdfasd</Button>
    <Button key={261} reverse floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive} disabled>asdfasd disabled</Button>
    <Button key={271} reverse floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button>
    <Button key={281} reverse floating light iconName={GUI.IonicIcons.attach}>asdfasd</Button>
    <Button key={19} flat info>flat info</Button>
    <Button key={191} flat light>flat light</Button>
    <Button key={21} flat danger iconName={GUI.IonicIcons.bookmark}>flat warning iconName</Button>
    <Button key={22} flat danger iconName={GUI.IonicIcons.bookmark} />
    <Button key={23} flat danger iconName={GUI.IonicIcons.bookmark} disabled></Button>
*/}
    {/*
    <Button key={12} bordered primary>bordered primary</Button>
    <Button key={13} bordered dark>bordered dark</Button>
    <Button key={14} bordered danger iconName={GUI.IonicIcons.alert}>bordered danger iconName</Button>
    <Button key={141} bordered danger iconName={GUI.IonicIcons.archive}></Button>
    <Button key={15} bordered danger iconAfter iconName={GUI.IonicIcons.bookmark}>bordered danger iconAfter iconName</Button>
    <Button key={16} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>bordered color shadow</Button>
    <Button key={17} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.bookmark}>bordered color shadow icon</Button>
    <Button key={18} bordered color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.bookmark} disabled>bordered color shadow icon disabled</Button>


    <Button key={71} mode={GUI.ButtonMode.fixedBL} color={GUI.Colors.DeepOrange} iconName={GUI.IonicNames.alert} />
    <Button key={72} mode={GUI.ButtonMode.fixedBR} color={GUI.Colors.Blue} iconName={GUI.IonicNames.americanFootball} />
    <Button key={73} mode={GUI.ButtonMode.fixedTL} color={GUI.Colors.Cyan} iconLogo={GUI.IonicLogos.logoFacebook} />
    <Button key={74} mode={GUI.ButtonMode.fixedTR} color={GUI.Colors.DeepPurple} iconName={GUI.IonicNames.analytics} iconActive />
*/}
  </View>
</View >

export default app