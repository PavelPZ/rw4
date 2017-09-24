declare namespace GUI {

  interface IPlatform {
    Button: React.SFC<GUI.IButtonProps>
    Icon: React.SFC<IIconProps>
    H1: React.ComponentType<NativeBase.H1>
    H2: React.ComponentType<NativeBase.H2>
    H3: React.ComponentType<NativeBase.H3>
    View: React.ComponentType<NativeBase.View>
    Text: React.ComponentType<NativeBase.Text>
    Container: React.ComponentType<NativeBase.View>
    Header: React.ComponentType<NativeBase.View>
    Footer: React.ComponentType<NativeBase.View>
    Content: React.ComponentType<NativeBase.View>
    Page: React.ComponentType<Router.IRoutePar>
    colorToStyle: { [color: string]: string }
    Platform: ReactNative.PlatformStatic
  }

  interface IState {
  }

  interface IToolbarButton {
    onPress:() => void
  }
  interface IToolbarIconButton extends IToolbarButton {
    icon: GUI.IonicNames
  }
  interface IToolbarTextButton extends IToolbarButton {
    title: string
  }

  interface IToolbar {
    title?: string
    subTitle?: string,
    startButton: IToolbarIconButton,
    actions: IToolbarButton | IToolbarButton[]
  }

  //**** BUTTON

  const enum ButtonMode {
    raised = 'raised',
    flat = 'flat',
    fixedTR = 'fixedTR',
    fixedTL = 'fixedTL',
    fixedBR = 'fixedBR',
    fixedBL = 'fixedBL',
    rounded = 'rounded',
    roundedMini = 'roundedMini',
    icon = 'icon',
    bordered = 'bordered', //for Nativebase only
  }

  interface IButtonProps { //default raised, primary
    onPress?: () => void
    mode?: ButtonMode
    href?: Router.IState //for RN vygeneruje onPress a navigaci, pro WEB vygeneruje navigate URL
    iconName?: GUI.IonicNames
    iconLogo?: GUI.IonicLogos
    iconRight?: boolean
    iconOS?: string //ignoruje se pro RN
    iconActive?: boolean
    label?: string //label=='' || !label && icon => icon in button else standalone icon
    //secondary?: boolean
    color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
    shadow?: Shadows
    disabled?: boolean

  }

}

interface IPlatforms {
  guiPlatform?: GUI.IPlatform
}

interface IState {
  gui?: GUI.IState
}