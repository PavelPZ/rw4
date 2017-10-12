import React from 'react';
import { Footer, FooterTab, Icon, Title, Subtitle, Container, Header, Content, Text, Button, H2, View, Left, Right, Body } from 'native-base'
import { getColors, getTextColor } from '../../app-common/gui/colors'
import { getIcon2 } from '../../app-common/gui/ionic'

const app: React.SFC<any> = props => <View style={{ flexDirection: 'row', flex:1, marginTop: 24}}>
  <Container key={1} style={{ width: 256, backgroundColor: '#fafafa', ...elevation }}>
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
      <Button2/>
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
    <Content key={2} style={{ paddingLeft:10 }}>
      <Button2>none</Button2>
      <Button2 primary>primary</Button2>
      <Button2 dark>dark</Button2>
      <Button2 color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200}>color shadow</Button2>
      <Button2 success>success</Button2>
      <Button2 flat info>flat info</Button2>
      <Button2 flat danger iconName={GUI.IonicIcons.bookmark}>flat warning iconName</Button2>
      <Button2 flat warning iconAfter iconName={GUI.IonicIcons.archive}>flat warning iconAfter iconName</Button2>
      <Button2 floating color={GUI.Colors.Cyan} iconName={GUI.IonicIcons.archive}>asdfasd</Button2>
      <Button2 floating danger iconName={GUI.IonicIcons.attach}>asdfasd</Button2>
      <Button2 icon iconName={GUI.IonicIcons.close} primary>asdfasd</Button2>
      <Button2 icon iconName={GUI.IonicIcons.clock} primary swapped></Button2>
      <Button2 icon danger iconName={GUI.IonicIcons.clock} ></Button2>
      <Button2 icon danger swapped iconName={GUI.IonicIcons.logoFacebook} ></Button2>
      <Button2 icon swapped color={GUI.Colors.Cyan} shadow={GUI.Shadows.S200} iconName={GUI.IonicIcons.logoGoogle} ></Button2>
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

const Button2: React.SFC<GUI.IButtonProps2> = props => {
  const { flat, floating, icon, raised, active, iconAfter, iconName, children, swapped, color, shadow, secondary, web, ...rest } = props

  const iconId = getIcon2(iconName)
  const IC = iconId && <Icon key={1} name={iconId} />
  const text = children && React.Children.count(children) == 1 && React.Children.toArray(children)[0] as string
  const TXT = text && <Text key={2}>{text}</Text>

  let comps = iconAfter ? [TXT, IC] : [IC, TXT]
    
  const mdProps: NativeBase.Button = {
    ...rest, transparent: flat, bordered: swapped && raised,
    ...raised || flat ? (iconAfter ? { iconRight: true } : { iconLeft: true }) : undefined
  }
  return <Button {...mdProps}>{comps}</Button>
}

export default app

const elevation = {
  elevation: 6,
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