declare namespace Typography {

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


  //const x: Mui.Rule<ISheet[Mui.Names.rootRule]>
  //const x: Mui.Props<IProps, ISheet>
  //x.style.
  

}