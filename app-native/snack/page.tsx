import React from 'react';
import { Footer, FooterTab, Icon, Title, Subtitle, Container, Header, Content, Text, Button, H2, View, Left, Right, Body } from 'native-base'
import { getColors } from '../../app-common/gui/colors'
import { getIcon } from '../../app-common/gui/ionic'
import { navigateUrl } from '../../app-common/lib/router'

//import { colorToStyle } from '../../app-common/gui/gui'

const app: React.SFC<any> = props => <View style={{ flexDirection: 'row', flex: 1, marginTop: 24 }}>
  <Container key={1} style={{ flex:0, width:256, backgroundColor: '#fafafa', ...elevation }}>
    <Header key={1} style={{ height: 45, ...noElevation }}>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Icon name='menu' />
      </Body>
      <Right>
        <Button transparent>
          <Text>C</Text>
        </Button>
      </Right>
    </Header>
    <Content key={2}>
      <Button2 />
    </Content>
    <Footer key={3} style={{ height: 40 }}>
      <FooterTab>
        <Text>FFF</Text>
      </FooterTab>
    </Footer>
  </Container>
  <Container key={2} style={{ flex: 1 }}>
    <Header key={1}>
      <Left>
        <Button transparent>
          <Icon name='menu' />
        </Button>
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>
          <Icon name='menu' />
        </Button>
        <Button transparent>
          <Text>C</Text>
        </Button>
      </Right>
    </Header>
    <Content key={2} contentContainerStyle={{ padding: 10, flexWrap: 'wrap', flexDirection:'row', justifyContent: 'space-between'}}>
      <Button2 onPress={() => alert('press')}>none</Button2>
      <Button2 primary>primary</Button2>
      <Button2 secondary>secondary</Button2>
      <Button2 info>info</Button2>
      <Button2 danger>danger</Button2>
      <Button2 dark>dark</Button2>
      <Button2 warning>warning</Button2>
      <Button2 color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button2>
      <Button2 success>success</Button2>
      <Button2 success disabled iconName={GUI.IonicIcons.bookmark}>success disabled iconName</Button2>
      <Button2 flat info>flat info</Button2>
      <Button2 flat danger iconName={GUI.IonicIcons.bookmark}>flat warning iconName</Button2>
      <Button2 flat danger iconName={GUI.IonicIcons.bookmark}></Button2>
      <Button2 flat danger iconName={GUI.IonicIcons.bookmark} disabled></Button2>
      <Button2 flat warning iconAfter iconName={GUI.IonicIcons.archive}>flat warning iconAfter iconName</Button2>
      <Button2 floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive}>asdfasd</Button2>
      <Button2 floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive} disabled>asdfasd disabled</Button2>
      <Button2 floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button2>
    </Content>
    <Footer key={3}>
      <FooterTab>
        <Button>
          <Text>Apps</Text>
        </Button>
        <Button>
          <Icon name="apps" />
        </Button>
        <Button vertical>
          <Icon name="apps" />
          <Text>Apps</Text>
        </Button>
      </FooterTab>
    </Footer>
  </Container>
</View>

const Button2: React.SFC<GUI.IButtonProps> = props => {
  const { flat, floating, active, iconAfter, iconName, children, color, shadow, secondary, web, onPress: press, href, light, ...rest } = props
  const { primary, dark, success, info, warning, danger, disabled } = props
  const bordered = false

  //CUSTOM color
  let colorPair = disabled ? {backgroundColor:'lightgray', color: 'white'} : getColors(color, shadow)
  if (colorPair && (flat || bordered)) colorPair = { backgroundColor: 'transparent', color: colorPair.backgroundColor } //invert colors for flat and bordered
  const textStyle: RN.StyleProp<RN.TextStyle> = colorPair ? { color: colorPair.color } : {} //set color to text
  const colorStyle: RN.ViewStyle = colorPair && !bordered ? { backgroundColor: colorPair.backgroundColor } : {} //set color to background
  if (colorPair && bordered) colorStyle.borderColor = colorPair.color //set color to border

  //floating
  const floatingStyle: RN.ViewStyle = floating && { width: floatingSize, height: floatingSize, borderRadius: floatingSize / 2, justifyContent: 'center', alignItems: 'center' }
  const floatingIconStyle: RN.TextStyle = floating && { marginLeft: 0, marginRight: 0 }

  //CHILDREN
  const iconId = getIcon(iconName)
  const IC = iconId && <Icon key={1} name={iconId} style={[textStyle, floatingIconStyle]} />
  const text = children && !floating && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
  const TXT = text && <Text key={2} style={textStyle}>{text}</Text>
  let comps = iconAfter ? [TXT, IC] : [IC, TXT] //CHILDREN order

  //click
  let onPress = () => { }
  if (press) onPress = press; else if (typeof href != 'undefined') onPress = () => navigateUrl(href)

  const mdProps: NativeBase.Button = {
    style: [colorStyle, floatingStyle] as any,
    primary: primary || !light && !dark && !success && !info && !warning && !danger && !color && !secondary, //default is PRIMARY
    danger: danger || secondary || false,
    transparent: flat || false,
    onPress,
    //...rest,
    //...raised || flat ? (iconAfter ? { iconRight: true } : { iconLeft: true }) : undefined
  }

  //console.log(mdProps, textStyle, floatingStyle, floatingIconStyle)
  return <Button {...mdProps}>{comps}</Button>
}
const floatingSize = 52

export default app

const elevation = {
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 1.2,
}

const noElevation = {
  elevation: 0,
  shadowColor: 'transparent',
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0,
  shadowRadius: 0,
}