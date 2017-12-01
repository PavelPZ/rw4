import React from 'react'
import { Platform, View, Text } from 'react-native'

import { withStyles, classNames, sheetCreator, toRule } from 'rw-mui-n/styles/withStyles'

import ButtonBase, { sheet as baseStyles } from '../ButtonBase/ButtonBase'

const sheet = sheetCreator<MuiButton.Shape>(({ typographyNative: typo, palette, spacing }) => ({
  //...baseStyles(theme),
  native: {
    root: {
      minWidth: 88,
      minHeight: 36,
      paddingTop: spacing.unit,
      paddingBottom: spacing.unit,
      paddingLeft: spacing.unit * 2,
      paddingRight: spacing.unit * 2,
      borderRadius: 2,
    },
    dense: {
      paddingTop: spacing.unit - 1,
      paddingBottom: spacing.unit - 1,
      paddingLeft: spacing.unit,
      paddingRight: spacing.unit,
      minWidth: 64,
      minHeight: 32,
    },

    flatPrimary: {}, flatAccent: {}, flatContrast: {}, colorInherit: {}, raisedContrast: {},//TODO

    raised: {
      backgroundColor: palette.grey[300],
      native: {
        //boxShadow: theme.shadows[2],
      }
    },
    raisedPrimary: { backgroundColor: palette.primary[500] },
    raisedAccent: { backgroundColor: palette.secondary.A200, },

    disabled: {
      backgroundColor: palette.text.divider,
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
    rootLabel: {
      ...typo.button,
      color: palette.text.primary,
    },
    denseLabel: { fontSize: typo.fontSizeNormalizerNative(typo.fontSize - 1), },

    flatLabelPrimary: { color: palette.primary[500], },
    flatLabelAccent: { color: palette.secondary.A200, },
    flatLabelContrast: { color: palette.getContrastText(palette.primary[500]), },

    raisedLabelAccent: { color: palette.getContrastText(palette.secondary.A200), },
    raisedLabelContrast: { color: palette.getContrastText(palette.primary[500]), },
    raisedLabelPrimary: { color: palette.getContrastText(palette.primary[500]), },

    disabledLabel: { color: palette.action.disabled, },

    ripple: {}, //TODO
  },
  common: {},
  web: {},
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