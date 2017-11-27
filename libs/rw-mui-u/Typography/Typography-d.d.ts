declare namespace MuiTypography {

  type IProps = {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: ClassKey
  }

  type ClassKey = Mui.TypographyClassKey | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent' | 'colorPrimary' | 'colorError'

  type ISheet = Record<ClassKey, RN.TextStyle> & { noWrap?: any /*RN.TextProperties*/ }

}