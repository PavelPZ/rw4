import React from 'react'
import { Platform, View, Text } from 'react-native'

import { withStyles, classNames, toPlatformSheet } from 'rw-mui-n/styles/withStyles'

import ButtonBase, { styles as baseStyles } from '../ButtonBase/ButtonBase'


const styles: Mui.SheetCreator<MuiButton.Shape> = theme => toPlatformSheet<MuiButton.Shape>({
  //...baseStyles(theme),
  common: {
    root: {
      minWidth: 88,
      minHeight: 36,
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
      borderRadius: 2,
    },
    dense: {
      paddingTop: theme.spacing.unit - 1,
      paddingBottom: theme.spacing.unit - 1,
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      minWidth: 64,
      minHeight: 32,
    },

    raised: {
      backgroundColor: theme.palette.grey[300],
      native: {
        //boxShadow: theme.shadows[2],
      }
    },
    raisedPrimary: { backgroundColor: theme.palette.primary[500] },
    raisedAccent: { backgroundColor: theme.palette.secondary.A200, },

    disabled: {
      backgroundColor: theme.palette.text.divider,
      //native: theme.shadows[0]
      //boxShadow: theme.shadows[0],
    },

    fab: {
      //borderRadius: 56 / 2,
      padding: 0,
      minWidth: 0,
      width: 56,
      height: 56,
      borderRadius: 56 / 2,
      //boxShadow: theme.shadows[6],
    },
  },
  native: {
    rootLabel: {
      ...theme.typography.button as any,
      color: theme.palette.text.primary,
    },
    denseLabel: { fontSize: theme.typography.fontSizeNormalizerNative((theme.typography.fontSize as number) - 1), },

    flatLabelPrimary: { color: theme.palette.primary[500], },
    flatLabelAccent: { color: theme.palette.secondary.A200, },
    flatLabelContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },

    raisedLabelAccent: { color: theme.palette.getContrastText(theme.palette.secondary.A200), },
    raisedLabelContrast: { color: theme.palette.getContrastText(theme.palette.primary[500]), },
    raisedLabelPrimary: { color: theme.palette.getContrastText(theme.palette.primary[500]), },

    disabledLabel: { color: theme.palette.action.disabled, },
  }
})

const button: Mui.CodeSFCNative<MuiButton.Shape> = props => {
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
  } = props

  const flat = !raised && !fab
  const viewStyle = classNames<RN.ViewStyle>(
    classes.root,
    (raised || fab) && classes.raised,
    fab && classes.fab,
    !flat && color === 'accent' && classes.raisedAccent,
    !flat && color === 'primary' && classes.raisedPrimary,
    dense && classes.dense,
    disabled && classes.disabled,
    style,
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

  const childs = React.Children.toArray(children).map((ch, idx) => {
    if (typeof ch === 'string' || typeof ch === 'number') return <Text key={idx} style={textStyle}>{ch}</Text>
    else return React.cloneElement(ch, { ...ch.props, style: { ...textStyle, ...ch.props.style || null } })
  })

  return <ButtonBase style={viewStyle} disabled={disabled} {...other}>{childs}</ButtonBase>
}


const Button = withStyles<MuiButton.Shape>(styles, { name: Mui.Names.Button })(button)


//const btn = <Button classes={{ root: {}, denseLabel: { color: '' } }} color='accent' onClick={null} />

export default Button