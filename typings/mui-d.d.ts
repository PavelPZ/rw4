declare namespace Mui {

  //************* CHANGED
  const enum Names {
    rootRule = 'root',
    Icon = 'MuiIcon-n'
  }

  interface IMuiThemeProps { theme: Theme | ((theme: Theme) => Theme) }
  type TMuiThemeContextValue = { theme: Theme }

  type StyleRules = Record<string, Partial<CSS.Style>>
  type StyleRulesCallback<TRules extends StyleRules = StyleRules> = (theme: Theme) => TRules

  //interface StyledComponentProps<TRules extends StyleRules> {
  //  classes?: Partial<TRules> | Partial<Record<keyof TRules, string>>
  //  innerRef?: React.Ref<any>
  //}

  //export interface WithStyles<TRules extends StyleRules> {
  //  classes: TRules
  //  theme?: Theme
  //}

  export interface WithStylesOptions {
    flip?: boolean
    withTheme?: boolean
    name?: string
  }

  type Props<C, TRules extends StyleRules, Removals extends keyof C = never> = {
      innerRef?: React.Ref<any>
      classes?: Partial<TRules> | Partial<Record<keyof TRules, string>>
      style?: TRules[Names.rootRule] //StyleAll;
      theme?: Mui.Theme
      flip?: boolean
  } & Omit<C & { classes: any }, 'classes' | Removals>
  //& StyledComponentProps<TRules> 

  type SFC<C, TRules extends StyleRules, Removals extends keyof C = never> = React.SFC<Props<C, TRules, Removals>>
  type ComponentType<C, TRules extends StyleRules, Removals extends keyof C = never> = React.ComponentType<Props<C, TRules, Removals>>

  type withStyles = <TRules extends StyleRules>
  (style: TRules | StyleRulesCallback<TRules>, options?: WithStylesOptions)
    => <C, Removals extends keyof C = never>(component: Mui.ComponentType<C, TRules>)
      => ComponentType<C, TRules, Removals>


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


  //************* mui/styles/withStyles


  /**
     * This is basically the API of JSS. It defines a Map<string, CSS>,
     * where
     *
     * - the `keys` are the class (names) that will be created
     * - the `values` are objects that represent CSS rules (`React.CSSProperties`).
     */
  //type StyleRules<ClassKey extends string = string> = Record<ClassKey, Partial<React.CSSProperties>>;


  //type StyleRulesCallback<ClassKey extends string = string> = (theme: Theme) => StyleRules<ClassKey>;


  //interface WithStylesOptions {
  //  flip?: boolean;
  //  withTheme?: boolean;
  //  name?: string;
  //}


  //type ClassNameMap<ClassKey extends string = string> = Record<ClassKey, string>;


  //interface WithStyles<ClassKey extends string = string> {
  //  classes: ClassNameMap<ClassKey>
  //  theme?: Theme
  //}


  //interface StyledComponentProps<ClassKey extends string = string> {
  //  classes?: Partial<ClassNameMap<ClassKey>>;
  //  innerRef?: React.Ref<any>;
  //}


  //************* mui/styles/withTheme


  //************* mui/styles/index


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


 


  //************* mui/index


  /**
   * All standard components exposed by `material-ui` are `StyledComponents` with
   * certain `classes`, on which one can also set a top-level `className` and inline
   * `style`.
   */
  //type StandardProps<C, ClassKey extends string, Removals extends keyof C = never> =
  //  & Omit<C & { classes: any }, 'classes' | Removals>
  //  & StyledComponentProps<ClassKey>
  //  & {
  //    className?: string;
  //    style?: Partial<React.CSSProperties>;
  //  }


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


  /**
   * Utilies types based on:
   * https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-307871458
   */
  type Diff<T extends string, U extends string> = ({[P in T]: P } &
    {[P in U]: never } & { [x: string]: never })[T];

  type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;


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


  interface ThemeOptions {
    breakpoints?: Partial<BreakpointsOptions> & Partial<Breakpoints>;
    mixins?: Partial<Mixins>;
    palette?: Partial<Palette>;
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
    shadows?: Shadows;
    transitions?: Partial<Transitions>;
    spacing?: Partial<Spacing>;
    zIndex?: Partial<ZIndex>;
    overrides?: { [name: string]: StyleRules };
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
    overrides?: { [name: string]: StyleRules }
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
