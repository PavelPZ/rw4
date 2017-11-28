declare namespace Mui {

  interface IMuiThemeProps { theme: Theme | ((theme: Theme) => Theme) }
  type TMuiThemeContextValue = { theme: Theme }

  //************* mui/styles/colorManipulator
  type ColorFormat = 'rgb' | 'rgba' | 'hsl' | 'hsla';

  type ColorObject = {
    type: ColorFormat;
    color: [number, number, number] | [number, number, number, number];
  };


  //************* mui/styles/createBreakpoints
  type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  type BreakpointValues = {[key in Breakpoint]: number };


  interface BreakpointsOptions {
    values: BreakpointValues;
    unit: string;
    step: number;
  }


  interface Breakpoints {
    keys: Breakpoint[];
    values: BreakpointValues;
    up: (key: Breakpoint | number) => string;
    down: (key: Breakpoint | number) => string;
    between: (start: Breakpoint, end: Breakpoint) => string;
    only: (key: Breakpoint) => string;
    width: (key: Breakpoint) => number;
  }


  //************* mui/styles/createGenerateClassName


  //************* mui/styles/spacing
  type Spacing = {
    unit: number;
  };


  //************* mui/styles/createMixins


  interface Mixins {
    gutters: (styles: Object) => Object;
    toolbar: Object;
  }


  //************* mui/styles/MuiThemeProvider


  interface MuiThemeProviderProps {
    theme?: Theme<any>;
    sheetsManager?: Object;
    children: React.ReactNode;
  }

  
    //************* mui/colors/common
  interface CommonColors {
    black: string;
    white: string;
    transparent: string;
    fullBlack: string;
    darkBlack: string;
    lightBlack: string;
    minBlack: string;
    faintBlack: string;
    fullWhite: string;
    darkWhite: string;
    lightWhite: string;
  }


  //************* mui/styles/createTypography
  
  type Contrast = 'light' | 'dark';

  interface Color {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
    contrastDefaultColor: Contrast;
  }

  namespace PropTypes {
    type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify';
    type Color = 'inherit' | 'primary' | 'accent' | 'default';
    type Margin = 'none' | 'dense' | 'normal';
  }


  //************* mui/styles/createPalette


  type ShadeText = {
    primary: string;
    secondary: string;
    disabled: string;
    hint: string;
    icon: string;
    divider: string;
    lightDivider: string;
  };


  type ShadeInput = {
    bottomLine: string;
    helperText: string;
    labelText: string;
    inputText: string;
    disabled: string;
  };


  type ShadeAction = {
    active: string;
    disabled: string;
  };


  type ShadeBackground = {
    default: string;
    paper: string;
    appBar: string;
    contentFrame: string;
    status: string;
  };


  type Shade = {
    text: ShadeText;
    input: ShadeInput;
    action: ShadeAction;
    background: ShadeBackground;
  };


  type Palette = {
    common: CommonColors;
    type: Contrast;
    primary: Color;
    secondary: Color;
    error: Color;
    grey: Color;
    shades: {
      dark: Shade;
      light: Shade;
    };
    text: ShadeText;
    input: ShadeInput;
    action: ShadeAction;
    background: ShadeBackground;
    getContrastText: (color: string) => string;
  };


  //************* mui/styles/shadows
  type Shadows = [
    'none',
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ];


  //************* mui/styles/transitions
  interface Easing {
    easeInOut: string;
    easeOut: string;
    easeIn: string;
    sharp: string;
  }


  interface Duration {
    shortest: number;
    shorter: number;
    short: number;
    standard: number;
    complex: number;
    enteringScreen: number;
    leavingScreen: number;
  }


  interface Transitions {
    easing: Easing;
    duration: Duration;
    create(
      props: string | string[],
      options?: Partial<{ duration: number; easing: string; delay: number }>
    ): string;
    getAutoHeightDuration(height: number): number;
  }


  //************* mui/styles/zIndex
  interface ZIndex {
    mobileStepper: number;
    menu: number;
    appBar: number;
    drawerOverlay: number;
    navDrawer: number;
    dialogOverlay: number;
    dialog: number;
    layer: number;
    popover: number;
    snackbar: number;
    tooltip: number;
  }


  //************* mui/styles/createMuiTheme

  type OverridesSource = { [name: string]: Mui.PartialSheet<Mui.Shape> }
  type Overrides = { [name: string]: Mui.PlatformSheet<Mui.Shape> }

  interface ThemeOptions {
    breakpoints?: Partial<BreakpointsOptions> & Partial<Breakpoints>;
    mixins?: Partial<Mixins>;
    palette?: Partial<Palette>;
    typography?: TypographyOptionsCreator
    shadows?: Shadows;
    transitions?: Partial<Transitions>;
    spacing?: Partial<Spacing>;
    zIndex?: Partial<ZIndex>;
    overrides?: OverridesSource;
  }


  type Theme<T = {}> = {
    OS: RN.PlatformOSType
    direction: 'ltr' | 'rtl';
    palette: Palette;
    typography: Typography;
    mixins: Mixins;
    breakpoints: Breakpoints;
    shadows: Shadows;
    transitions: Transitions;
    spacing: Spacing;
    zIndex: ZIndex;
    overrides?: Overrides
  } & T;


  //************* mui/styles/themeListener
  // This is using the API from https://github.com/vesparny/brcast
  interface MuiContext {
    getState(): Object;
    subscribe(callback: Function): Function;
  }


  interface ThemeListener {
    contextTypes: {
      'material-ui': object;
    };
    initial(context: Object): Object;
    subscribe(context: Object, callback: Function): Function;
  }
}
