import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'
import { Platform } from 'react-native'
import createTypography from 'rw-mui/styles/createTypography'
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

  return platformOverrides(muiTheme)
}

export default createMuiTheme