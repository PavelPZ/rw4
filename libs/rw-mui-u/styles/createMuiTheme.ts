import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'

import { createTypographyNative, createTypographyWeb, shadowsNative, shadowsWeb } from 'rw-mui/styles/createMuiTheme'

//import createTypography from 'material-ui/styles/createTypography'
//import createTypographyNative from 'rw-mui-n/styles/createTypography'
//import shadows from 'material-ui/styles/shadows'
//import shadowsNative from 'rw-mui-n/styles/shadows'
import createBreakpoints from 'material-ui/styles/createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import transitions from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'
import { toPlatformSheetLow } from 'rw-mui-u/styles/toPlatform'

export const platformOverrides = (source: Mui.OverridesSource) => {
  if (!source) return null
  const result: Mui.Overrides = {}
  for (const p in source) result[p] = toPlatformSheetLow(source[p], false)
  return result
}


const getTypographyOptions = (optionsOrCreator: Mui.TypographyOptionsCreator) => {

  const getOptions = (options, isNative: boolean) => {
    const { fontFamily, fontSize, fontWeightLight, fontWeightRegular, fontWeightMedium, htmlFontSize, fontSizeNormalizerNative, fontAssetPathNative, ...rest } = options
    return {
      ...(isNative ? { htmlFontSize, fontSize, fontSizeNormalizerNative, fontAssetPathNative } : { htmlFontSize, fontSize, fontFamily, fontWeightLight, fontWeightRegular, fontWeightMedium }),
      ...toPlatformSheetLow({ common: rest }, isNative)
    }
  }

  if (typeof optionsOrCreator == 'function') {
    return { optionsWeb: (palette => getOptions(optionsOrCreator(palette), false)) as Mui.web.TypographyOptionsCreator, optionsNative: (palette => getOptions(optionsOrCreator(palette), true)) as Mui.native.TypographyOptionsCreator }
  } else
    return { optionsWeb: getOptions(optionsOrCreator, false) as Mui.web.TypographyOptionsCreator, optionsNative: getOptions(optionsOrCreator, true) as Mui.native.TypographyOptionsCreator }
}

function createMuiTheme(options: Mui.ThemeOptions = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput,
    shadows: shadowsInput,
    shadowsNative: shadowsNativeInput,
    transitions: transitionsInput,
    spacing: spacingInput,
    zIndex: zIndexInput,
    overrides,
    ...other
  } = options

  const palette = createPalette(paletteInput)
  const breakpoints = createBreakpoints(breakpointsInput)

  const typographyOptions = getTypographyOptions(typographyInput)

  const muiTheme: Mui.Theme = {
    direction: 'ltr',
    palette,
    typography: createTypographyWeb(palette, typographyOptions.optionsWeb),
    typographyNative: createTypographyNative(palette, typographyOptions.optionsNative),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: shadowsInput || shadowsWeb,
    shadowsNative: shadowsNativeInput || shadowsNative,
    overrides: platformOverrides(overrides),
    ...deepmerge(
      {
        transitions,
        spacing,
        zIndex,
      },
      {
        transitionsInput,
        spacingInput,
        zIndexInput,
        ...other
      },
      //{
      //  clone: false, // No need to clone deep
      //},
    ),
  };

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  )

  return muiTheme
}

export default createMuiTheme