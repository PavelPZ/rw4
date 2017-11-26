declare namespace Mui2 {
}
declare namespace Mui {

  type TextStyleKeys = 'display1' | 'display2' | 'display3' | 'display4' | 'headline' | 'title' | 'subheading' | 'body1' | 'body2' | 'caption'
  type TypographyClassKey = TextStyleKeys | 'button'

  type TypographyClasses = Record<TypographyClassKey, TextStyle>

  interface FontStyle {
    fontFamily: string
    fontSize: number
    fontWeightLight: CSSProperties['fontWeight']
    fontWeightRegular: CSSProperties['fontWeight']
    fontWeightMedium: CSSProperties['fontWeight']
    htmlFontSize?: number
  }


  interface TypographyStyle {
    color?: string
    fontFamily: string
    fontSize: number
    fontWeight: StyleAll['fontWeight']
    letterSpacing?: StyleAll['letterSpacing']
    lineHeight?: StyleAll['lineHeight']
    textTransform?: React.CSSProperties['textTransform']
  }

  type Typography = TypographyClasses & FontStyle & {
    fontSizeNormalizer: (size: number) => number
    expoFontAssetPath?: string
    fontSize?: number
    htmlFontSize?: number
  };

  type TypographyOptions = Partial<FontStyle> & Partial<Typography>
}