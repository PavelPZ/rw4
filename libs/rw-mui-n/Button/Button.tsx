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
    ...theme.typography.button,
    minWidth: 88,
    minHeight: 36,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    borderRadius: 2,
    color: theme.palette.text.primary,
  },
  dense: {
    paddingTop: theme.spacing.unit-1,
    paddingBottom: theme.spacing.unit-1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    minWidth: 64,
    minHeight: 32,
    fontSize: theme.typography.fontSizeNormalizer(theme.typography.fontSize - 1),
  },
  flatLabelPrimary: {
    color: theme.palette.primary[500],
  },    
  flatLabelAccent: {
    color: theme.palette.secondary.A200,
  },    
  flatLabelContrast: {
    color: theme.palette.getContrastText(theme.palette.primary[500]),
  },    

  raised: {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
  },
  disabled: {
    color: theme.palette.action.disabled,
    backgroundColor: theme.palette.text.divider,
  },

  label: { color: 'blue' },
  fab: {
    borderRadius: '50%',
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
  },
})

const button: React.SFC<IButtonProps> = props => {
  const Touchable = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableHighlight
  return <Touchable>
    <View>
      <Text></Text>
    </View>
  </Touchable>
}

