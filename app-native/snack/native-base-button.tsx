import React from 'react'
import { Container, Header, Content, Button, Text, Icon, StyleProvider, getTheme } from 'native-base'
import { View } from 'react-native'
import { theme } from '../gui/theme'

const xx = {
  ".btn_Deep_Orange_500": {
    "NativeBase.Text": {
      "color": "#ffffff"
    },
    "NativeBase.Icon": {
      "color": "#ffffff"
    },
    "backgroundColor": "#FF5722"
  },
  ".btn_bordered_Deep_Orange_500": {
    "NativeBase.Text": {
      "color": "#FF5722"
    },
    "NativeBase.Icon": {
      "color": "#FF5722"
    },
    "backgroundColor": null,
    "borderColor": "#FF5722"
  },
  ".btn_transparent_Deep_Orange_500": {
    ".transparent": {
      "NativeBase.Text": {
        "color": "#FF5722"
      },
      "NativeBase.Icon": {
        "color": "#FF5722"
      },
      "backgroundColor": null
    }
  },
}

theme['NativeBase.Button'] = {
  ...theme['NativeBase.Button'],
  ...xx,
  "NativeBase.Text": {
    color: "white"
  },
  "NativeBase.Icon": {
    color: "white"
  },
  backgroundColor: 'red',
}

console.log('adjustBtnTheme: ', JSON.stringify(theme['NativeBase.Button'], null, 2))

const app = () => <Container>
  <Header />
  <Content>
    <Button {...{ 'btn_Deep_Orange_500': true } as any} iconLeft>
      <Icon name='alert' />
      <Text>LABEL 1</Text>
    </Button>
    <Button transparent {...{ 'btn_transparent_Deep_Orange_500': true } as any} iconRight>
      <Text>LABEL 2</Text>
      <Icon name='alert' />
    </Button>
    <Button bordered {...{ 'btn_bordered_Deep_Orange_500': true } as any} iconLeft>
      <Icon name='alert' />
      <Text>LABEL 3</Text>
    </Button>
    <Button rounded {...{ 'btn_Deep_Orange_500': true } as any}>
      <Icon name='alert' />
    </Button>
  </Content>
</Container>

export default app
