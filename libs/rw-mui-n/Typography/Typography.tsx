import React from 'react'

import { capitalizeFirstLetter } from 'material-ui/utils/helpers'
import { Text } from 'react-native'

import withStyles, { WithStyles } from '../styles/withStyles'
import { Theme } from '../styles/createMuiTheme'
import { normalizeFontSize, Style } from '../styles/createTypography'
import { PropTypes } from '../index'


export interface ITypographyProps {
  align?: PropTypes.Alignment
  color?: PropTypes.Color | 'secondary' | 'error'
  gutterBottom?: boolean
  noWrap?: boolean
  paragraph?: boolean
  type?: Style
}

export type TypographyClassKey = Style | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent'

type ITypographyStyle = Record<TypographyClassKey, RN.TextStyle> & { noWrap: RN.TextProperties }

export const styles = (theme: Theme) => ({
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
  },
  gutterBottom: { marginBottom: normalizeFontSize(0.35 * 16) },
  paragraph: { marginBottom: theme.spacing.unit * 2, },
  colorInherit: { color: 'inherit', },
  colorPrimary: { color: theme.palette.primary[500], },
  colorSecondary: { color: theme.palette.text.secondary, },
  colorAccent: { color: theme.palette.secondary.A400, },
  colorError: { color: theme.palette.error.A400, },
} as ITypographyStyle)

const typography: React.SFC<ITypographyProps & WithStyles<ITypographyStyle>> = props => {
  const {
    align = 'inherit',
    classes,
    color = 'default',
    gutterBottom,
    noWrap,
    paragraph,
    type = 'body1',
    ...other
  } = props
  const style = {
    ...classes.root,
    ...classes[type],
    ...(color !== 'default' && classes[`color${capitalizeFirstLetter(color)}`]),
    ...(gutterBottom && classes.gutterBottom),
    ...(paragraph && classes.paragraph),
    ...(align !== 'inherit' && classes[`align${capitalizeFirstLetter(align)}`]),
  }
  return <Text style={style} {...(noWrap && classes.noWrap) } {...other} />
}

const Typography = withStyles(styles)<ITypographyProps>(typography)

export default Typography