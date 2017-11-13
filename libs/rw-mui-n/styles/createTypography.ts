// @flow

import deepmerge from 'deepmerge'; // < 1kb payload overhead when lodash/merge is > 3kb.

import { Dimensions, PixelRatio } from 'react-native'
import { Palette } from 'material-ui/styles/createPalette'

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const defaultFonts = {
  light: {
    fontFamily: 'Roboto_Light',
    fontFile: 'Roboto-Light.ttf',
    fontSize: 300
  },
  regular: {
    fontFamily: 'Roboto',
    fontFile: 'Roboto-Regular.ttf',
    fontSize: 400
  },
  medium: {
    fontFamily: 'Roboto_Medium',
    fontFile: 'Roboto-Medium.ttf',
    fontSize: 500
  }
}

export type IFonts = typeof defaultFonts
export interface TypographyOptions {
  fontAssetPath?: string, 
  fonts?: IFonts
  fontSize?: number
  htmlFontSize?: number
}

export default function createTypography(palette: Palette, typography: Partial<TypographyOptions> | ((palette: Palette) => TypographyOptions)) {
  const {
    fontAssetPath = 'libs/rw-mui-n/fonts/',
    fontSize = 14, // px
    fonts = defaultFonts,
    htmlFontSize = 16, // 16px is the default font-size used by browsers on the html element.
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  const typo = {
    normalizeFontSize,
    fontAssetPath,
    fontSize,
    //fontFamily,
    //fontWeightLight,
    //fontWeightRegular,
    //fontWeightMedium,
    display4: {
      fontSize: normalizeFontSize(112),
      ...fonts.light,
      lineHeight: round(128 / 112),
      marginLeft: -.06 * htmlFontSize,
      color: palette.text.secondary,
    } as RN.TextStyle,
    display3: {
      fontSize: normalizeFontSize(56),
      ...fonts.regular,
      lineHeight: round(73 / 56),
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    } as RN.TextStyle,
    display2: {
      fontSize: normalizeFontSize(45),
      ...fonts.regular,
      lineHeight: round(48 / 45),
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    } as RN.TextStyle,
    display1: {
      fontSize: normalizeFontSize(34),
      ...fonts.regular,
      lineHeight: round(41 / 34),
      marginLeft: -.04 * htmlFontSize,
      color: palette.text.secondary,
    } as RN.TextStyle,
    headline: {
      fontSize: normalizeFontSize(24),
      ...fonts.regular,
      lineHeight: round(32.5 / 24),
      color: palette.text.primary,
    } as RN.TextStyle,
    title: {
      fontSize: normalizeFontSize(21),
      ...fonts.medium,
      lineHeight: round(24.5 / 21),
      color: palette.text.primary,
    } as RN.TextStyle,
    subheading: {
      fontSize: normalizeFontSize(16),
      ...fonts.regular,
      lineHeight: round(24 / 16),
      color: palette.text.primary,
    } as RN.TextStyle,
    body2: {
      fontSize: normalizeFontSize(14),
      ...fonts.medium,
      lineHeight: round(24 / 14),
      color: palette.text.primary,
    } as RN.TextStyle,
    body1: {
      fontSize: normalizeFontSize(14),
      ...fonts.regular,
      lineHeight: round(20.5 / 14),
      color: palette.text.primary,
    } as RN.TextStyle,
    caption: {
      fontSize: normalizeFontSize(12),
      ...fonts.regular,
      lineHeight: round(16.5 / 12),
      color: palette.text.secondary,
    } as RN.TextStyle,
    button: {
      fontSize: normalizeFontSize(fontSize),
      textTransform: 'uppercase',
      ...fonts.medium,
    } as RN.TextStyle,
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

//https://github.com/react-native-training/react-native-elements/blob/master/src/helpers/normalizeText.js
const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const normalizeFontSize = (size: number) => {
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