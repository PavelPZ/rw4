// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

import { Dimensions, PixelRatio } from 'react-native'

//https://github.com/facebook/react-native/issues/7687
//const round = (value: number) => Math.round(value * 1e5) / 1e5
//const lineHeight = (value: number) => round(value * 16)

const defaultFonts = {
  light: {
    fontFamily: 'Roboto_Light',
    //fontFile: 'Roboto-Light.ttf',
    fontWeight: '300'
  },
  regular: {
    fontFamily: 'Roboto',
    //fontFile: 'Roboto-Regular.ttf',
    fontWeight: '400'
  },
  medium: {
    fontFamily: 'Roboto_Medium',
    //fontFile: 'Roboto-Medium.ttf',
    fontWeight: '500'
  }
}

export type TypographyClassKey = 'display1' | 'display2' | 'display3' | 'display4' | 'headline' | 'title' | 'subheading' | 'body1' | 'body2' | 'caption'
export type TypographyClassKeys = TypographyClassKey | 'button';

interface TypographyOptions extends Mui.TypographyOptions {
  expoFontAssetPath?: string
  expoFonts?: typeof defaultFonts
  fontSize?: number
  htmlFontSize?: number
}

export default function createTypography(palette: Mui.Palette, typography: Partial<TypographyOptions> | ((palette: Mui.Palette) => TypographyOptions), _fontSizes?: Partial<TFontSizes>) {
  const {
    expoFontAssetPath = 'libs/rw-mui-n/fonts/',
    fontSize = 14, // px
    expoFonts = defaultFonts,
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography

  const fontSizes = { ...mobile_fontSizes, ..._fontSizes || null }
  const fontSizeNormalizer = fontSizes.getFontSizeNormalizer(PixelRatio.get(), Dimensions.get('window').width, Dimensions.get('window').height)

  //http://typecast.com/blog/a-more-modern-scale-for-web-typography
  const typo = {
    fontSizeNormalizer,
    expoFontAssetPath,
    fontSize,
    //fontFamily,
    //fontWeightLight,
    //fontWeightRegular,
    //fontWeightMedium,
    ...{
      display4: {
        fontSize: fontSizeNormalizer(fontSizes.display4),
        ...expoFonts.light,
        //lineHeight: lineHeight(128 / 112),
        marginLeft: -.06 * htmlFontSize,
        color: palette.text.secondary,
      },
      display3: {
        fontSize: fontSizeNormalizer(fontSizes.display3),
        ...expoFonts.regular,
        //lineHeight: lineHeight(73 / 56),
        marginLeft: -.04 * htmlFontSize,
        color: palette.text.secondary,
      },
      display2: {
        fontSize: fontSizeNormalizer(fontSizes.display2),
        ...expoFonts.regular,
        //lineHeight: lineHeight(48 / 45),
        marginLeft: -.04 * htmlFontSize,
        color: palette.text.secondary,
      },
      display1: {
        fontSize: fontSizeNormalizer(fontSizes.display1),
        ...expoFonts.regular,
        //lineHeight: lineHeight(41 / 34),
        marginLeft: -.04 * htmlFontSize,
        color: palette.text.secondary,
      },
      headline: {
        fontSize: fontSizeNormalizer(fontSizes.headline),
        ...expoFonts.regular,
        //lineHeight: lineHeight(32.5 / 24),
        color: palette.text.primary,
      },
      title: {
        fontSize: fontSizeNormalizer(fontSizes.title),
        ...expoFonts.medium,
        //lineHeight: lineHeight(24.5 / 21),
        color: palette.text.primary,
      },
      subheading: {
        fontSize: fontSizeNormalizer(fontSizes.subheading),
        ...expoFonts.regular,
        //lineHeight: lineHeight(24 / 16),
        color: palette.text.primary,
      },
      body2: {
        fontSize: fontSizeNormalizer(fontSizes.body2),
        ...expoFonts.medium,
        //lineHeight: lineHeight(24 / 14),
        color: palette.text.primary,
      },
      body1: {
        fontSize: fontSizeNormalizer(fontSizes.body1),
        ...expoFonts.regular,
        //lineHeight: lineHeight(20.5 / 14),
        color: palette.text.primary,
      },
      caption: {
        fontSize: fontSizeNormalizer(fontSizes.caption),
        ...expoFonts.regular,
        //lineHeight: lineHeight(16.5 / 12),
        color: palette.text.secondary,
      },
      button: {
        fontSize: fontSizeNormalizer(fontSize),
        ...expoFonts.medium,
      },
    } as Record<TypographyClassKeys, TextStyle>
  }
  return deepmerge(
    typo,
    other,
    {
      clone: false, // No need to clone deep
    },
  ) as typeof typo
}

//https://stackoverflow.com/questions/36015691/obtaining-the-return-type-of-a-function
const fnReturnType = (false as true) && createTypography(null, null)
export type Typography = typeof fnReturnType
export type TCreateTypography = typeof createTypography

//https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js
const pixelRatio = PixelRatio.get()

//export const normalizeFontSize = (size: number) => size / pixelRatio

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const getFontSizeNormalizer = (pixelRatio: number, deviceWidth: number, deviceHeight: number) => (size: number) => {
  if (pixelRatio >= 2 && pixelRatio < 3) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.15;
    }
    // older phablets
    return size * 1.25;
  } else if (pixelRatio >= 3 && pixelRatio < 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi 
    return size * 1.27;
  } else if (pixelRatio >= 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    if (deviceWidth <= 360) {
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      return size * 1.25;
    }
    // catch larger phablet devices
    return size * 1.4;
  } else
    // if older device ie pixelRatio !== 2 || 3 || 3.5
    return size;
}

//RN unit are dp: https://stackoverflow.com/questions/34493372/what-is-the-default-unit-of-style-in-react-native
//http://typecast.com/blog/a-more-modern-scale-for-web-typography
export const mobile_fontSizes = {
  display4: 32,
  display3: 26,
  display2: 22,
  display1: 18,
  headline: 20,
  title: 18,
  subheading: 16,
  body2: 14,
  body1: 14,
  caption: 12,
  getFontSizeNormalizer: getFontSizeNormalizer
}

export type TFontSizes = typeof mobile_fontSizes

//const mui_fontSizes = {
//  display4: 112,
//  display3: 56,
//  display2: 45,
//  display1: 34,
//  headline: 24,
//  title: 20,
//  subheading: 16,
//  body2: 14,
//  body1: 14,
//  caption: 12,
//  getFontSizeNormalizer: (pixelRatio: number, deviceWidth: number, deviceHeight: number) => (size: number) => size / pixelRatio
//}

