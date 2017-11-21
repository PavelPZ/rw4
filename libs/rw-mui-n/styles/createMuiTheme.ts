import deepmerge from 'deepmerge' // < 1kb payload overhead when lodash/merge is > 3kb.
import warning from 'warning'
import { Platform } from 'react-native'
import createTypography, { Typography } from './createTypography'
import shadows, { Shadows } from './shadows'
import createBreakpoints, { BreakpointsOptions, Breakpoints } from 'material-ui/styles/createBreakpoints'
import createPalette, { Palette } from 'material-ui/styles/createPalette'
import createMixins, { Mixins } from 'material-ui/styles/createMixins'
import { Transitions, duration } from 'material-ui/styles/transitions'
import zIndex from 'material-ui/styles/zIndex'
import spacing from 'material-ui/styles/spacing'

import { Theme, ThemeOptions } from 'material-ui/styles/createMuiTheme'
import { TypographyOptions } from 'material-ui/styles/createTypography'

//export interface ThemeOptions {
//  breakpoints?: Partial<BreakpointsOptions> & Partial<Breakpoints>
//  mixins?: Partial<Mixins>
//  palette?: Partial<Palette>
//  typography?: TypographyOptions | ((palette: Palette) => TypographyOptions)
//  shadows?: Shadows
//}

//export type Theme<T = {}> = {
//  direction: 'ltr' | 'rtl'
//  palette: Palette
//  typography: Typography
//  mixins: Mixins
//  breakpoints: Breakpoints
//  shadows: Shadows
//  transitions: Transitions
//  spacing: typeof spacing
//  zIndex: typeof zIndex
//  overrides?: {
//    [name: string]: {}
//  }
//} & T;



function createMuiTheme(options: ThemeOptions = {}) {
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
  } = options;

  const palette = createPalette(paletteInput);
  const breakpoints = createBreakpoints(breakpointsInput);

  const muiTheme: Theme = {
    OS: Platform.OS,
    direction: 'ltr',
    palette,
    typography: createTypography(palette, typographyInput as TypographyOptions),
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
  );

  return muiTheme;
}

export default createMuiTheme;
