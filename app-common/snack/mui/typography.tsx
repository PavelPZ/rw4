//https://github.com/vitalets/react-native-extended-stylesheet
//https://github.com/alekhurst/react-native-elevated-view/blob/master/index.js
//jspm build ./app-native/snack/mui/index.js ./app-native/snack/mui/bundle.js
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import createMuiTheme from 'rw-mui/styles/createMuiTheme'
import Typography from 'rw-mui/Typography/Typography'
import MuiThemeProvider from 'rw-mui/styles/MuiThemeProvider'

const app = () => <MuiThemeProvider theme={createMuiTheme({})}>
  <ScrollView style={{ marginTop: 20 }}>
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>noWrap</Typography>
    <Typography noWrap style={{ width:200 }}>noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap noWrap </Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>MARGINS</Typography>
    <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
    <Typography paragraph>paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph paragraph </Typography>
    <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
    <Typography gutterBottom>gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom gutterBottom </Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>FONTS</Typography>
    <Typography style={{ fontFamily: 'Roboto' }}>Roboto</Typography>
    <Typography style={{ fontFamily: 'Roboto_Light' }}>Roboto_Light</Typography>
    <Typography style={{ fontFamily: 'Roboto_Medium' }}>Roboto_Medium</Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>COLORS</Typography>
    <Typography>undefined</Typography>
    <Typography color='inherit'>inherit</Typography>
    <Typography color='accent'>accent</Typography>
    <Typography color='error'>error</Typography>
    <Typography color='default'>default</Typography>
    <Typography color='secondary'>secondary</Typography>
    <Typography color='primary'>primary</Typography>
    {/**/}
    <Typography type='headline' style={{ textDecorationLine: 'underline' }}>TYPES</Typography>
    <Typography>undefined</Typography>
    <Typography type='body1' align="right">body1</Typography>
    <Typography type='body2' align="center">body2</Typography>
    <Typography type='button' align="left">button</Typography>
    <Typography type='caption'>caption</Typography>
    <Typography type='headline'>headline</Typography>
    <Typography type='subheading'>subheading</Typography>
    <Typography type='title'>title</Typography>
    <Typography type='display1'>display1</Typography>
    <Typography type='display2'>display2</Typography>
    <Typography type='display3'>display3</Typography>
    <Typography type='display4'>display4</Typography>
  </ScrollView>
</MuiThemeProvider>

export default app

//<Typography>Colors</Typography>
//<Text>{JSON.stringify(createMuiTheme({}), null, 2)}</Text>