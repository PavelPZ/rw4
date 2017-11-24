import React from 'react'
import { Platform, View, Text } from 'react-native'

import withStyles from 'rw-mui/styles/withStyles'
import ButtonBase, { styles as baseStyles } from '../ButtonBase/ButtonBase'

import { expandStyles } from 'rw-mui-u/styles/styler'
import { expandStyle, classNames } from 'rw-mui-n/styles/styler'

const styles: Mui.StyleRulesCallback<Mui.IButtonStyle> = theme => expandStyles({
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
    borderRadius: 56 / 2,
    padding: 0,
    minWidth: 0,
    width: 56,
    height: 56,
    boxShadow: theme.shadows[6],
  },
})

const button: Mui.SFC<Mui.IButtonProps, Mui.IButtonStyle> = props => {
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
  const viewStyle = classNames<RN.ViewStyle>(
    classes.root,
    (raised || fab) && classes.raised,
    fab && classes.fab,
    !flat && color === 'accent' && classes.raisedAccent,
    !flat && color === 'primary' && classes.raisedPrimary,
    dense && classes.dense,
    disabled && classes.disabled,
    expandStyle(style),
  )
  const textStyle = classNames<RN.TextStyle>(
    classes.rootLabel,
    flat && color === 'accent' && classes.flatLabelAccent,
    flat && color === 'contrast' && classes.flatLabelContrast,
    flat && color === 'primary' && classes.flatLabelPrimary,
    !flat && color === 'accent' && classes.raisedLabelAccent,
    !flat && color === 'contrast' && classes.raisedLabelContrast,
    !flat && color === 'primary' && classes.raisedLabelPrimary,
    dense && classes.denseLabel,
    disabled && classes.disabledLabel,
  )

  //console.log(viewStyle, textStyle)

  const childs = React.Children.toArray(children).map(ch => {
    if (typeof ch === 'string' || typeof ch === 'number') return <Text style={textStyle}>{ch}</Text>
    else return React.cloneElement(ch, { ...ch.props, style: { ...textStyle, ...ch.props.style || null } })
  })

  return <ButtonBase style={viewStyle} disabled={disabled} {...other}>{childs}</ButtonBase>
}

const Button = withStyles(styles, { name: 'MuiButton-n' })<Mui.IButtonProps>(button)

//const btn = <Button classes={{ root: {}, denseLabel: { color: '' } }} color='accent' onClick={null} />

export default Button