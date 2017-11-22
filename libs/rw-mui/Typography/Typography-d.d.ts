declare namespace Mui {
  interface ITypographyProps extends Mui.StandardProps<{}, ITypographyStyle> {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: TypographyClassKey
  }

  type TypographyClassKey = Mui.Style | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent'

  type ITypographyStyle = PartialRecord<TypographyClassKey, CSS.TextStyle> & { noWrap?: any /*RN.TextProperties*/ }

  type TypographyType = Mui.ComponentType<ITypographyProps, ITypographyStyle>

}