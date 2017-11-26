declare namespace Mui {

  type TextStyleKeys = 'display1' | 'display2' | 'display3' | 'display4' | 'headline' | 'title' | 'subheading' | 'body1' | 'body2' | 'caption'
  type TypographyClassKey = TextStyleKeys | 'button'

  type TypographySheet = Record<TypographyClassKey, RN.TextStyle>

  type FontWeightNative = RN.TextStyle['fontWeight'] //| CSSProperties['fontWeight']
  type FontWeightWeb = CSSProperties['fontWeight']

  interface FontStyle {
    fontFamily: string
    fontSize: number
    fontWeightLight: FontWeightWeb
    fontWeightRegular: FontWeightWeb
    fontWeightMedium: FontWeightWeb
    htmlFontSize?: number
  }


  interface TypographyStyle {
    color?: string
    fontFamily: string
    fontSize: number
    fontWeight: FontWeightWeb
    letterSpacing?: number
    lineHeight?: number
    textTransform?
  }

  type Typography = TypographySheet & FontStyle & {
    fontSizeNormalizer: (size: number) => number
    expoFontAssetPath?: string
    fontSize?: number
    htmlFontSize?: number
  };

  type TypographyOptions = Partial<FontStyle> & Partial<Typography>
}