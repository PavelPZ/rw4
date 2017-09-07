declare namespace GUI {

  interface IPlatform {
    Button: React.SFC<GUI.IButtonProps>
    Icon: React.SFC<IIconProps>
    H1: React.ComponentType<NativeBase.H1>
    H2: React.ComponentType<NativeBase.H2>
    View: React.ComponentType<ReactNative.ViewProperties>
    Text: React.ComponentType<ReactNative.TextProperties> 
  }

  const enum Colors {
    primary = 'primary',
    secondary = 'secondary',
    default = 'default',
    //---
    Red = 'Red',
    Pink = 'Pink',
    Purple = 'Purple',
    DeepPurple = 'Deep Purple',
    Indigo = 'Indigo',
    Blue = 'Blue',
    LightBlue = 'Light Blue',
    Cyan = 'Cyan',
    Teal = 'Teal',
    Green = 'Green',
    LightGreen = 'Light Green',
    Lime = 'Lime',
    Yellow = 'Yellow',
    Amber = 'Amber',
    Orange = 'Orange',
    DeepOrange = 'Deep Orange',
    //---
    Brown = 'Brown',
    Grey = 'Grey',
    BlueGrey = 'Blue Grey',
    //---
    White = 'White',
    Black = 'Black', 
  }
  const enum Shadows {
    S50 = '50',
    S100 = '100',
    S200 = '200',
    S300 = '300',
    S400 = '400',
    S500 = '500',
    S600 = '600',
    S700 = '700',
    S800 = '800',
    S900 = '900',
    A100 = 'A100',
    A200 = 'A200',
    A400 = 'A400',
    A700 = 'A700',
  }

  const enum TextShadows {
    S500 = '500',
    text = 'text',
    Primary = 'Primary',
    Secondary = 'Secondary',
    Icons ='Icons',
    Disabled = 'Disabled',
    Hint = 'Hint',
    Dividers = 'Dividers',
  }

  interface IColor {
    color: Colors
    shadow?: Shadows
  }

  interface ITextColor {
    color: Colors
    shadow?: Shadows
    textShadow?: TextShadows
  }

  const enum ButtonMode {
    raised = 'raised',
    flat = 'flat',
    fixedTR = 'fixedTR',
    fixedTL = 'fixedTL',
    fixedBR = 'fixedBR',
    fixedBL = 'fixedBL',
    rounded = 'rounded',
    roundedMini = 'roundedMini',
    icon = 'icon'
  }

  interface IButtonProps { //default raised, primary
    onPress?: () => void
    mode?: ButtonMode
    href?: Router.IState //for RN vygeneruje onPress a navigaci, pro WEB vygeneruje navigate URL
    iconName?: GUI.IonicNames
    iconLogo?: GUI.IonicLogos
    iconRight?: boolean
    iconOS?: string //ignoruje se pro RN
    iconActive?:boolean
    label?: string //label=='' || !label && icon => icon in button else standalone icon
    secondary?: boolean
    color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
    shadow?: Shadows
    disabled?: boolean
  }
}

interface IPlatforms {
  guiPlatform?: GUI.IPlatform
}