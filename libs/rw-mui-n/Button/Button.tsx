import React from 'react'
import { Platform, View, TouchableHighlight, TouchableNativeFeedback, Text } from 'react-native'

import withStyles, { StyleRules, WithStyles, StyleRulesCallback, StyledComponentProps } from 'rw-mui-n/styles/withStyles'
import MuiThemeProvider from 'rw-mui-n/styles/MuiThemeProvider'

export interface IButtonProps {
  disabled?: boolean
  fab?: boolean
  dense?: boolean
  href?: string
  raised?: boolean
  classes?: IButtonStyle
  onclick: () => void
  rootRef?: React.Ref<any>
}

interface IButtonStyle {
  root: RN.ViewStyle
  label: RN.TextStyle
}

const styles: StyleRulesCallback<IButtonStyle> = theme => ({
  root: {
  },
  label: { color: 'blue' },
})

const button: React.SFC<IButtonProps> = props => {
  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight
  return <Touchable>
    <View>
      <Text></Text>
    </View>
  </Touchable>
}

