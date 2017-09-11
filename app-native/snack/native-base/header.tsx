import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Subtitle, Text } from 'native-base';
import { Constants } from 'expo'

export default class HeaderTitleSubtitleExample extends Component {
  render() {
    return (
      <Container style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Title</Title>
            {/*<Subtitle>Subtitle</Subtitle>*/}
          </Body>
          <Right>
            <Button transparent>
              <Text>Cancel</Text>
            </Button>
            <Button transparent>
              <Text>OK</Text>
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }
}