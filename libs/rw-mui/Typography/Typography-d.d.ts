declare namespace Typography {
  interface IProps extends Mui.StandardProps<{}, IStyle> {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: TypographyClassKey
  }

  type TypographyClassKey = Mui.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent'

  type IStyle = PartialRecord<TypographyClassKey, CSS.TextStyle> & { noWrap?: any /*RN.TextProperties*/ }

  type TypographyType = Mui.ComponentType<IProps, IStyle>

}