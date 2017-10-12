import React from 'react';
import { Footer, FooterTab, Icon, Title, Subtitle, Container, Header, Content, Text, Button, H2, View, Left, Right, Body } from 'native-base'

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
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
      <H2>Menu</H2>
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
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
      <H2>CONTENT</H2>
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