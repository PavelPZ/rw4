import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { Text as TextRN } from 'react-native'

import { toPlatformSheet, toRule, withStyles, classNames } from 'rw-mui-n/styles/withStyles'

export const sheet: Mui.PlatformSheetCreator<Typography.ISheet> = theme => {
  const typo = theme.typography.common //as Mui.TypographyNative
  return toPlatformSheet<Typography.ISheet>({
    common: {
      root: { margin: 0, },

      display4: typo.display4,
      display3: typo.display3,
      display2: typo.display2,
      display1: typo.display1,
      headline: typo.headline,
      title: typo.title,
      subheading: typo.subheading,
      body2: typo.body2,
      body1: typo.body1,
      caption: typo.caption,
      button: typo.button,

      alignLeft: { textAlign: 'left', },
      alignCenter: { textAlign: 'center', },
      alignRight: { textAlign: 'right', },
      noWrap: {
        ellipsizeMode: 'tail',
        numberOfLines: 1
      } as any,
      gutterBottom: { marginBottom: theme.typography.fontSizeNormalizerNative(0.35 * 16) },
      paragraph: { marginBottom: theme.spacing.unit * 2, },
      colorInherit: { color: undefined, },
      colorPrimary: { color: theme.palette.primary[500], },
      colorSecondary: { color: theme.palette.text.secondary, },
      colorAccent: { color: theme.palette.secondary.A400, },
      colorError: { color: theme.palette.error.A400, },
    }
  })
}

const typography: Mui.CodeSFCNative<Typography.ISheet> = (props => {
  const {
    align = 'inherit',
    classes,
    color = 'default',
    gutterBottom,
    noWrap,
    paragraph,
    type = 'body1',
    style,
    theme,
    ...other
  } = props

  const actStyle = classNames(
    classes.root,
    classes[type],
    color !== 'default' && classes[`color${capitalizeFirstLetter(color)}`],
    gutterBottom && classes.gutterBottom,
    paragraph && classes.paragraph,
    align !== 'inherit' && classes[`align${capitalizeFirstLetter(align)}`],
    toRule(style)
  )

  //console.log(type, classes[type], actStyle)
  return <TextRN style={actStyle} {...(noWrap && classes.noWrap) } {...other} />
})

export const Typography = withStyles<Typography.ISheet>(sheet, { name: Mui.Names.Typography })(typography)
export const Text = withStyles<Typography.ISheet>(sheet, { name: Mui.Names.Text })(typography)

//export default Typography