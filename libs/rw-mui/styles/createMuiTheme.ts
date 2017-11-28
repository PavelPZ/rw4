import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'
import { Platform } from 'react-native'
import createTypography, { toPlatformTypographyOptions } from 'rw-mui-n/styles/createTypography'
import shadows from 'rw-mui/styles/shadows'
import createBreakpoints from 'material-ui/styles//createBreakpoints'
import createPalette from 'material-ui/styles/createPalette'
import createMixins from 'material-ui/styles/createMixins'
import { duration } from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'
import { platformOverrides } from 'rw-mui-u/styles/createMuiTheme'

function createMuiTheme(options: Mui.ThemeOptions = {}) {
  const {
    palette: paletteInput = {},
    breakpoints: breakpointsInput = {},
    mixins: mixinsInput = {},
    typography: typographyInput = {},
    shadows: shadowsInput,
    transitions: transitionsInput,
    spacing: spacingInput,
    zIndex: zIndexInput,
    overrides,
    ...other
  } = options

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme: Mui.Theme = {
    direction: 'ltr',
    palette,
    typography: createTypography(palette, typographyInput),
    mixins: createMixins(breakpoints, spacing, mixinsInput),
    breakpoints,
    shadows: shadowsInput || shadows,
    overrides: platformOverrides(overrides),
    ...deepmerge(
      {
        transitions: { duration },
        spacing,
        zIndex,
      },
      {
        transitionsInput,
        spacingInput,
        zIndexInput,
        ...other
      },
    ),
  };

  warning(
    muiTheme.shadows.length === 25,
    'Material-UI: the shadows array provided to createMuiTheme should support 25 elevations.',
  )

  return muiTheme
}

export default createMuiTheme