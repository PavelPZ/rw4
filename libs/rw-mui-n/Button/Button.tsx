import React from 'react'
import { Platform, View, Text } from 'react-native'

import withStyles, { StyleRulesCallback, WithStyles } from 'rw-mui-n/styles/withStyles'
import ButtonBase, { styles as baseStyles, ButtonBaseClassKeyView, IButtonBaseProps } from '../ButtonBase/ButtonBase'

import { PropTypes } from '../index'

export interface IButtonProps extends IButtonBaseProps {
  fab?: boolean
  dense?: boolean
  href?: string
  raised?: boolean
  classes?: IButtonStyle
  rootRef?: React.Ref<any>
  color?: PropTypes.Color | 'contrast' | 'default'
}

export type ButtonClassKeyView = ButtonBaseClassKeyView | 'root' | 'dense' | 'raised' | 'disabled' | 'fab' | 'raisedPrimary' | 'raisedAccent' 
export type ButtonClassKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

type IButtonStyle = Record<ButtonClassKeyText, RN.TextStyle> & Record<ButtonClassKeyView, RN.ViewStyle>

const styles: StyleRulesCallback<IButtonStyle> = theme => ({
  ...baseStyles(theme),
  root: {
    minWidth: 88,
    minHeight: 36,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    borderRadius: 2,
  },
  rootLabel: {
    ...theme.typography.button as any,
    color: theme.palette.text.primary,
  },
  dense: {
    paddingTop: theme.spacing.unit - 1,
    paddingBottom: theme.spacing.unit - 1,
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    minWidth: 64,
    minHeight: 32,
  },

  denseLabel: { fontSize: theme.typography.fontSizeNormalizer((theme.typography.fontSize as number) - 1), },

  flatLabelPrimary: { color: theme.palette.primary[500], },
  flatLabelAccent: { color: theme.palette.secondary.A200, },
  flatLabelContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },

  raised: {
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2],
  },
  raisedPrimary: { backgroundColor: theme.palette.primary[500] },
  raisedAccent: { backgroundColor: theme.palette.secondary.A200, },
  
  raisedLabelAccent: { color: theme.palette.getContrastText(theme.palette.secondary.A200), },
  raisedLabelContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
  raisedLabelPrimary: { color: theme.palette.getContrastText(theme.palette.primary[500]), },

  disabled: {
    backgroundColor: theme.palette.text.divider,
    boxShadow: theme.shadows[0],
  },
  disabledLabel: { color: theme.palette.action.disabled, },

  fab: {
    borderRadius: 56/2,
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
  },
})

const button: React.SFC<IButtonProps & WithStyles<IButtonStyle>> = props => {
  const {
    children,
    classes,
    color = 'default',
    dense,
    disabled,
    fab,
    style,
    raised,
    ...other
  } = props;

  const flat = !raised && !fab
  const viewStyle = {
    ...classes.root || null,
    ...((raised || fab) && classes.raised) || null,
    ...(fab && classes.fab) || null,
    ...(!flat && color === 'accent' && classes.raisedAccent) || null,
    ...(!flat && color === 'primary' && classes.raisedPrimary) || null,
    ...(dense && classes.dense) || null,
    ...(disabled && classes.disabled) || null,
    ...style || null,
  }
  const textStyle = {
    ...classes.rootLabel || null,
    ...(flat && color === 'accent' && classes.flatLabelAccent) || null,
    ...(flat && color === 'contrast' && classes.flatLabelContrast) || null,
    ...(flat && color === 'primary' && classes.flatLabelPrimary) || null,
    ...(!flat && color === 'accent' && classes.raisedLabelAccent) || null,
    ...(!flat && color === 'contrast' && classes.raisedLabelContrast) || null,
    ...(!flat && color === 'primary' && classes.raisedLabelPrimary) || null,
    ...(dense && classes.denseLabel) || null,
    ...(disabled && classes.disabledLabel) || null,
  }

  //console.log(viewStyle, textStyle)

  const childs = React.Children.toArray(children).map(ch => {
    if (typeof ch === 'string' || typeof ch === 'number') return <Text style={textStyle}>{ch}</Text>
    else return React.cloneElement(ch, { ...ch.props, style: { ...textStyle, ...ch.props.style || null } })
  })

  return <ButtonBase style={viewStyle} disabled={disabled} {...other}>{childs}</ButtonBase>
}

const Button = withStyles(styles, { name: 'MuiButton-n' })<IButtonProps>(button)

export default Button