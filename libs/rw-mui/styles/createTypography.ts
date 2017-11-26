// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

import { Dimensions, PixelRatio } from 'react-native'
//import { expandStyles } from 'rw-mui-u/styles/styler'

import { toPlatformSheet } from 'rw-mui/styles/withStyles'

//https://github.com/facebook/react-native/issues/7687
//const round = (value: number) => Math.round(value * 1e5) / 1e5
//const lineHeight = (value: number) => round(value * 16)

const nativeFonts = {
  light: {
    fontFamily: 'Roboto_Light',
    //fontFile: 'Roboto-Light.ttf',
    fontWeight: '300'
  } as RN.TextStyle,
  regular: {
    fontFamily: 'Roboto',
    //fontFile: 'Roboto-Regular.ttf',
    fontWeight: '400'
  } as RN.TextStyle,
  medium: {
    fontFamily: 'Roboto_Medium',
    //fontFile: 'Roboto-Medium.ttf',
    fontWeight: '500'
  } as RN.TextStyle
}

interface TypographyOptions extends Mui.TypographyOptions {
   expoFonts?: typeof nativeFonts
}

export default function createTypography(palette: Mui.Palette, typography: Partial<TypographyOptions> | ((palette: Mui.Palette) => TypographyOptions), _fontSizes?: Partial<TFontSizes>) {
  const {
    fontFamily = '"Roboto", "Helvetica", "Arial", sans-serif',
    expoFontAssetPath = 'libs/rw-mui-n/fonts/',
    fontSize = 14, // px
    expoFonts = nativeFonts,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography

  const pxToRem = (value: number) => `${value / htmlFontSize}rem`
  const round = (value: number) => Math.round(value * 1e5) / 1e5

  const fontSizes = { ...mobile_fontSizes, ..._fontSizes || null }
  const fontSizeNormalizer = fontSizes.getFontSizeNormalizer(PixelRatio.get(), Dimensions.get('window').width, Dimensions.get('window').height)

  //http://typecast.com/blog/a-more-modern-scale-for-web-typography
  const typo = {
    native: {
      fontSizeNormalizer,
      expoFontAssetPath,
    },
    web: {
      pxToRem,
      fontFamily,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
    },
    fontSize,
  }
  const sheet = toPlatformSheet<Mui.TypographySheet>({
    display4: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.display4),
        ...expoFonts.light,
        marginLeft: -.06 * htmlFontSize,
      },
      web: {
        fontSize: pxToRem(112),
        fontWeight: fontWeightLight,
        fontFamily,
        letterSpacing: '-.04em',
        lineHeight: `${round(128 / 112)}em`,
        marginLeft: '-.06em',
      },
      color: palette.text.secondary,
    },
    display3: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.display3),
        ...expoFonts.regular,
        marginLeft: -.04 * htmlFontSize,
      },
      web: {
        fontSize: pxToRem(56),
        fontWeight: fontWeightRegular,
        fontFamily,
        letterSpacing: '-.02em',
        lineHeight: `${round(73 / 56)}em`,
        marginLeft: '-.04em',
      },
      color: palette.text.secondary,
    },
    display2: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.display2),
        ...expoFonts.regular,
        marginLeft: -.04 * htmlFontSize,
      },
      web: {
        fontSize: pxToRem(45),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(48 / 45)}em`,
        marginLeft: '-.04em',
      },
      color: palette.text.secondary,
    },
    display1: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.display1),
        ...expoFonts.regular,
        marginLeft: -.04 * htmlFontSize,
      },
      web: {
        fontSize: pxToRem(34),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(41 / 34)}em`,
        marginLeft: '-.04em',
      },
      color: palette.text.secondary,
    },
    headline: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.headline),
        ...expoFonts.regular,
      },
      web: {
        fontSize: pxToRem(24),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(32.5 / 24)}em`,
      },
      color: palette.text.primary,
    },
    title: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.title),
        ...expoFonts.medium,
      },
      web: {
        fontSize: pxToRem(21),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24.5 / 21)}em`,
      },
      color: palette.text.primary,
    },
    subheading: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.subheading),
        ...expoFonts.regular,
      },
      web: {
        fontSize: pxToRem(16),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(24 / 16)}em`,
      },
      color: palette.text.primary,
    },
    body2: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.body2),
        ...expoFonts.medium,
      },
      web: {
        fontSize: pxToRem(14),
        fontWeight: fontWeightMedium,
        fontFamily,
        lineHeight: `${round(24 / 14)}em`,
      },
      color: palette.text.primary,
    },
    body1: {
      native: {
        fontSize: fontSizeNormalizer(fontSizes.body1),
        ...expoFonts.regular,
      },
      web: {
        fontSize: pxToRem(14),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(20.5 / 14)}em`,
      },
      color: palette.text.primary,
    },
    caption: {
      fontSize: fontSizeNormalizer(fontSizes.caption),
      native: {
        ...expoFonts.regular,
      },
      web: {
        fontSize: pxToRem(12),
        fontWeight: fontWeightRegular,
        fontFamily,
        lineHeight: `${round(16.5 / 12)}em`,
      },
      color: palette.text.secondary,
    },
    button: {
      native: {
        fontSize: fontSizeNormalizer(fontSize),
        ...expoFonts.medium,
      },
      web: {
        fontSize: pxToRem(fontSize),
        textTransform: 'uppercase',
        fontWeight: fontWeightMedium,
        fontFamily,
      },
    },
  })

  return deepmerge(
    //expandStyles(typo as any),
    sheet,
    other,
    {
      clone: false, // No need to clone deep
    },
  )
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

