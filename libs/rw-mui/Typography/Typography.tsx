import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { Text } from 'react-native'

import withStyles from '../styles/withStyles'
import { styleNative } from 'rw-styler/index'


export const styles: Mui.StyleRulesCallback<Mui.ITypographyStyle> = theme => ({
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

  root: { margin: 0, },
  alignLeft: { textAlign: 'left', },
  alignCenter: { textAlign: 'center', },
  alignRight: { textAlign: 'right', },
  noWrap: {
    ellipsizeMode: 'tail',
    numberOfLines: 1
  },
  gutterBottom: { marginBottom: theme.typography.fontSizeNormalizer(0.35 * 16) },
  paragraph: { marginBottom: theme.spacing.unit * 2, },
  colorInherit: { color: undefined, },
  colorPrimary: { color: theme.palette.primary[500], },
  colorSecondary: { color: theme.palette.text.secondary, },
  colorAccent: { color: theme.palette.secondary.A400, },
  colorError: { color: theme.palette.error.A400, },
})

const typography: React.SFC<Mui.ITypographyProps & Mui.WithStyles<Mui.ITypographyStyle>> = props => {
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
  const actStyle = {
    ...classes.root || null,
    ...classes[type] || null,
    ...(color !== 'default' && classes[`color${capitalizeFirstLetter(color)}`]) || null,
    ...(gutterBottom && classes.gutterBottom) || null,
    ...(paragraph && classes.paragraph) || null,
    ...(align !== 'inherit' && classes[`align${capitalizeFirstLetter(align)}`]) || null,
    ...style || null
  }
  //console.log(type, classes[type], actStyle)
  return <Text style={styleNative(actStyle, theme.OS)} {...(noWrap && classes.noWrap) } {...other} />
}

const Typography = withStyles(styles, { name: 'MuiTypography-n' })<Mui.ITypographyProps, TextStyle>(typography)

export default Typography