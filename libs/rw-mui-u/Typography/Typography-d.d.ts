declare namespace Typography {

  type ITypographyProps = {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: TypographyClassKey
  }

  //type ITypographyProps = Mui2.Props<props, ITypographySheet>
  //type ITypographyPropsCode = Mui2.CodeProps<props, ITypographySheet>

  type TypographyClassKey = Mui.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'

  type ITypographySheet = Record<TypographyClassKey, RN.TextStyle> & { noWrap?: any /*RN.TextProperties*/ }

  type TypographyType = Mui.ComponentType<ITypographyProps, ITypographySheet>

}