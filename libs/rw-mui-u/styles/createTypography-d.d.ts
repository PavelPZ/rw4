declare namespace Mui {

  type TextStyleKeys = 'display1' | 'display2' | 'display3' | 'display4' | 'headline' | 'title' | 'subheading' | 'body1' | 'body2' | 'caption'
  type TypographyClassKey = TextStyleKeys | 'button' | 'root'

  type TypographySheet = {
    common: never
    web: never
    native: Record<TypographyClassKey, RN.TextStyle>
    style: never
    props: never
  }

  type FontSizesNative = Record<TextStyleKeys, number>
  type FontNative = { fontFamily: string; fontWeight: FontWeight }
  type FontNativeKey = 'light' | 'regular' | 'medium'

  interface FontStyle {
    fontSize: number
    htmlFontSize: number
  }
  type FontStyleNativeLow = FontStyle & {
    fontSizeNormalizerNative: (size: number) => number
    fontAssetPathNative: string
  }
  type FontStyleNative = FontStyleNativeLow & {
    fontsNative: Record<FontNativeKey, FontNative>
    fontSizesNative: FontSizesNative
  }
  type FontStyleNativePartial = FontStyleNativeLow & {
    fontsNative: PartialRecord<FontNativeKey, Partial<FontNative>>
    fontSizesNative: Partial<FontSizesNative>
  }

  type FontStyleWeb = FontStyle & {
    fontFamily: string
    fontWeightLight: FontWeight
    fontWeightRegular: FontWeight
    fontWeightMedium: FontWeight
  }
  type FontWeight = RN.TextStyle['fontWeight']

  type TypographyWeb = FontStyle & FontStyleNative & PlatformSheetWeb<TypographySheet>
  type TypographyNative = FontStyle & FontStyleNative & PlatformSheetNative<TypographySheet>
  type Typography = TypographyWeb | TypographyNative

  //cross platform typography options
  type TypographyOptions = {
    fontStyle?: Partial<FontStyle> & {
      web?: Partial<FontStyleWeb>
      native?: Partial<FontStyleNativePartial>
    }
    sheet?: PartialSheet<TypographySheet>
  }
  type TypographyOptionsCreator = PlatformTypographyOptions | ((palette: Palette) => PlatformTypographyOptions)
  type TypographyOptionsCreatorWeb = PlatformTypographyOptionsWeb | ((palette: Mui.Palette) => PlatformTypographyOptionsWeb)
  type TypographyOptionsCreatorNative = PlatformTypographyOptionsNative | ((palette: Mui.Palette) => PlatformTypographyOptionsNative)

  //platform specific typography options
  type PlatformTypographyOptionsWeb = Partial<FontStyle & FontStyleWeb & PlatformSheetWeb<TypographySheet>>
  type PlatformTypographyOptionsNative = Partial<FontStyle & FontStyleNative & PlatformSheetNative<TypographySheet>>
  type PlatformTypographyOptions = PlatformTypographyOptionsWeb | PlatformTypographyOptionsNative
}