//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'
import { View, Text, ScrollView, ViewStyle } from 'react-native'
import createMuiTheme from 'rw-mui-u/styles/createMuiTheme'
import Typography from 'rw-mui/Typography/Typography'
import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'


const theme = createMuiTheme({})

const app = () => <MuiThemeProvider theme={theme}>
  <ScrollView style={{ marginTop: 20 }}>
    {theme.shadows.map((sh:any, idx) => <View key={idx} style={{ width: 50, height: 50, marginLeft: 50, marginTop: 30, borderWidth: 0, padding:10, borderColor: 'black', borderStyle: 'solid', ...sh }}>
      <Text>{idx}</Text>
    </View>)}
  </ScrollView>
</MuiThemeProvider>

export default app

//<Typography>Colors</Typography>
//<Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text>