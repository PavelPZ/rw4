import React from 'react'
import { Platform, View, Text } from 'react-native'

import { withStyles, classNames, sheetCreator, toRule } from 'rw-mui-n/styles/withStyles'

import ButtonBase, { sheet as baseStyles } from '../ButtonBase/ButtonBase'

const sheet = sheetCreator<MuiButton.Shape>(par => ({
  //...baseStyles(theme),
  common: {
    root: {
      minWidth: 88,
      minHeight: 36,
      paddingTop: par.spacing.unit,
      paddingBottom: par.spacing.unit,
      paddingLeft: par.spacing.unit * 2,
      paddingRight: par.spacing.unit * 2,
      borderRadius: 2,
    },
    dense: {
      paddingTop: par.spacing.unit - 1,
      paddingBottom: par.spacing.unit - 1,
      paddingLeft: par.spacing.unit,
      paddingRight: par.spacing.unit,
      minWidth: 64,
      minHeight: 32,
    },

    flatPrimary: {}, flatAccent: {}, flatContrast: {}, colorInherit: {}, raisedContrast: {},//TODO

    raised: {
      backgroundColor: par.palette.grey[300],
      native: {
        //boxShadow: theme.shadows[2],
      }
    },
    raisedPrimary: { backgroundColor: par.palette.primary[500] },
    raisedAccent: { backgroundColor: par.palette.secondary.A200, },

    disabled: {
      backgroundColor: par.palette.text.divider,
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
      ...toRule(par.typography.common.button),
      color: par.palette.text.primary,
    },
    denseLabel: { fontSize: par.typography.fontSizeNormalizerNative((par.typography.fontSize as number) - 1), },

    flatLabelPrimary: { color: par.palette.primary[500], },
    flatLabelAccent: { color: par.palette.secondary.A200, },
    flatLabelContrast: { color: par.palette.getContrastText(par.palette.primary[500]), },

    raisedLabelAccent: { color: par.palette.getContrastText(par.palette.secondary.A200), },
    raisedLabelContrast: { color: par.palette.getContrastText(par.palette.primary[500]), },
    raisedLabelPrimary: { color: par.palette.getContrastText(par.palette.primary[500]), },

    disabledLabel: { color: par.palette.action.disabled, },

    ripple: {}, //TODO
  },
  web: {} as any
}))

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


const Button = withStyles<MuiButton.Shape>(sheet, { name: Mui.Names.Button })(button)


//const btn = <Button classes={{ root: {}, denseLabel: { color: '' } }} color='accent' onClick={null} />

export default Button