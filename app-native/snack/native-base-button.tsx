import React from 'react'
import { Container, Header, Content, Button, Text, Icon, StyleProvider, getTheme } from 'native-base'
import { View } from 'react-native'

//import getTheme from '../../native-base-theme/components/index'
//import material from '../../native-base-theme/variables/platform'

//let theme = getTheme(material)

//console.log('theme:', JSON.stringify(theme, null, 2)) 

//theme = {
//  ...theme,
//  'NativeBase.Button': {
//    '.xxx': {
//      "NativeBase.Text": {
//        color: "pink"
//      },
//      "NativeBase.Icon": {
//        color: "pink"
//      },
//      "NativeBase.IconNB": {
//        color: "pink"
//      },
//      backgroundColor: 'red'
//    },
//    '.yyy': {
//      "NativeBase.Text": {
//        color: "blue"
//      },
//      "NativeBase.Icon": {
//        color: "blue"
//      },
//      "NativeBase.IconNB": {
//        color: "blue"
//      },
//      backgroundColor: 'yellow'
//    },
//    '.zzz': {
//      "NativeBase.Text": {
//        color: "maroon"
//      },
//      "NativeBase.Icon": {
//        color: "maroon"
//      },
//      "NativeBase.IconNB": {
//        color: "maroon"
//      },
//      backgroundColor: 'gray'
//    },
//    ...theme['NativeBase.Button']
//  },
//}

//theme['NativeBase.Button']['.xxx'] = {
//  "NativeBase.Text": {
//    color: "pink"
//  },
//  "NativeBase.Icon": {
//    color: "pink"
//  },
//  "NativeBase.IconNB": {
//    color: "pink"
//  },
//  backgroundColor: 'red'
//}

//theme['NativeBase.Button']['.yyy'] = {
//  "NativeBase.Text": {
//    color: "blue"
//  },
//  "NativeBase.Icon": {
//    color: "blue"
//  },
//  "NativeBase.IconNB": {
//    color: "blue"
//  },
//  backgroundColor: 'yellow'
//}

//theme['NativeBase.Button']['.zzz'] = {
//  "NativeBase.Text": {
//    color: "maroon"
//  },
//  "NativeBase.Icon": {
//    color: "maroon"
//  },
//  "NativeBase.IconNB": {
//    color: "maroon"
//  },
//  backgroundColor: 'gray'
//}

const app = () => <StyleProvider style={getTheme()}><Container>
  <Header />
  <Content>
    <Button>
      <Icon name='alert' />
      <Text>LABEL</Text>
    </Button>
    <Button transparent>
      <Icon name='alert' />
      <Text>LABEL 2</Text>
    </Button>
    <Button bordered>
      <Icon name='alert' />
      <Text>LABEL 3</Text>
    </Button>
    <Button rounded primary>
      <Icon name='alert' />
    </Button>
  </Content>
</Container ></StyleProvider>
//<StyleProvider style={getTheme()}></StyleProvider>


export default app

    //<Button {...{ xxx: true } as any}>
    //  <Icon name='alert' />
    //  <Text>LABEL 1</Text>
    //</Button>
    //<Button transparent {...{ xxx: true } as any}>
    //  <Icon name='alert' />
    //  <Text>LABEL 2</Text>
    //</Button>
    //<Button bordered {...{ xxx: true } as any}>
    //  <Icon name='alert' />
    //  <Text>LABEL 3</Text>
    //</Button>
    //<Button rounded {...{ xxx: true } as any}>
    //  <Icon name='alert' />
    //</Button>
