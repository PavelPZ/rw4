//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import createMuiTheme from 'xmui/common/styles/createMuiTheme'
import MuiThemeProvider from 'xmui/styles/MuiThemeProvider'

const app = () => <MuiThemeProvider theme={createMuiTheme({})}><ScrollView><Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text></ScrollView></MuiThemeProvider>

export default app
