declare namespace Mui {
  interface ITypographyProps extends Mui.StandardProps<{}, ITypographyStyle, ITypographyStyle['root']> {
    align?: Mui.PropTypes.Alignment
    color?: Mui.PropTypes.Color | 'secondary' | 'error'
    gutterBottom?: boolean
    noWrap?: boolean
    paragraph?: boolean
    type?: TypographyClassKey
  }

  type TypographyClassKey = Mui.Style | 'root' | 'alignLeft' | 'alignCenter' | 'alignRight' | 'gutterBottom' | 'paragraph' | 'colorInherit' | 'colorSecondary' | 'colorAccent'

  type ITypographyStyle = Record<TypographyClassKey, CSS.TextStyle> & { noWrap: any /*RN.TextProperties*/ }

  type TypographyType = React.ComponentType<ITypographyProps & StyledComponentProps<ITypographyStyle>>

}