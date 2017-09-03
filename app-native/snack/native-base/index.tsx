import React, { Component } from 'react'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, H1, H2 } from 'native-base'
import { Root } from 'native-base/src/basic/Root'
import { Font, Asset } from 'expo'

export default class ButtonTransparentExample extends Component {

  state = { loaded: false }

  async componentWillMount() {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    })
    this.setState({ loaded: true })
  }

  render() {
    if (!this.state.loaded) return null
    return (
      <Root>
        <Container>
          <Header>
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
            </Right>
          </Header>
          <Content>
            <Text style={{ padding: 10 }}>
              asd f asd fsa dfsad {' '}
              <H1>
                This is H1 Content Section
          </H1>
              {' '}asd f asd fsa dfsad{' '}
              <H2>
                This is H3 Content Section
          </H2>
              {' '}asd f asd fsa dfsad
          </Text>
          </Content>
          <Footer>
            <FooterTab>
              <Button>
                <Text>Footer</Text>
              </Button>
              <Button>
                <Icon name="apps" />
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Root>
    )
  }
}