import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { Text } from 'react-native'

import { toPlatformSheet, toRule, withStyles, classNames } from 'rw-mui-n/styles/withStyles2'
//import {  } from 'rw-mui/styles/withStyles2'

//import { withStyles } from 'rw-mui-w/styles/withStyles2'

//import withStyles from '../styles/withStyles'
//import { expandStyles } from 'rw-mui-u/styles/styler'
//import { expandStyle, classNames } from 'rw-mui-n/styles/styler'

export const sheet: Mui2.SheetCreator<Typography.ITypographySheet> = theme => toPlatformSheet<Typography.ITypographySheet>({
  root: { margin: 0, },

  display4: theme.typography.display4,
  display3: theme.typography.display3,
  display2: theme.typography.display2,
  display1: theme.typography.display1,
  headline: theme.typography.headline,
  title: theme.typography.title,
  subheading: theme.typography.subheading,
  body2: theme.typography.body2,
  body1: theme.typography.body1,
  caption: theme.typography.caption,
  button: theme.typography.button,

  alignLeft: { textAlign: 'left', },
  alignCenter: { textAlign: 'center', },
  alignRight: { textAlign: 'right', },
  noWrap: {
    ellipsizeMode: 'tail',
    numberOfLines: 1
  } as any,
  gutterBottom: { marginBottom: theme.typography.fontSizeNormalizer(0.35 * 16) },
  paragraph: { marginBottom: theme.spacing.unit * 2, },
  colorInherit: { color: undefined, },
  colorPrimary: { color: theme.palette.primary[500], },
  colorSecondary: { color: theme.palette.text.secondary, },
  colorAccent: { color: theme.palette.secondary.A400, },
  colorError: { color: theme.palette.error.A400, },
})

const typography: Mui2.CodeSFC<Typography.ITypographyProps, Typography.ITypographySheet> = (props => {
  //const typography: Mui.SFC<Typography.IProps, Typography.IStyle> = props => {
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
  return <Text style={actStyle} {...(noWrap && classes.noWrap) } {...other} />
})

const Typography = withStyles(sheet as Mui2.SheetCreatorNative<Typography.ITypographySheet>, { name: Mui.Names.Typography })<Typography.ITypographyProps>(typography)

//const Typography = withStyles(styles, { name: 'MuiTypography-n' })<Typography.IProps>(typography)

export default Typography