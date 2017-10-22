declare namespace GUI {

  //interface AnimatedViewStyle {
  //  opacity?: RN.Animated.Value
  //  width?: RN.Animated.Value
  //  height?: RN.Animated.Value
  //  left?: RN.Animated.Value
  //  right?: RN.Animated.Value
  //  top?: RN.Animated.Value
  //  bottom?: RN.Animated.Value
  //}

  //interface AnimatedViewProps extends RN.ViewProperties {
  //  animatedStyle?: AnimatedViewStyle
  //}

  interface IState {
  }

  //interface IToolbarButton {
  //  onPress:() => void
  //}
  //interface IToolbarIconButton extends IToolbarButton {
  //  icon: GUI.IonicNames
  //}
  //interface IToolbarTextButton extends IToolbarButton {
  //  title: string
  //}

  //interface IToolbar {
  //  title?: string
  //  subTitle?: string,
  //  startButton: IToolbarIconButton,
  //  actions: IToolbarButton | IToolbarButton[]
  //}

  const enum ButtonFixed {
    tr = 'tr',
    tl = 'tl',
    br = 'br',
    bl = 'bl',
  }

  interface IColorProps {
    primary?: boolean
    secondary?: boolean
    light?: boolean
    dark?: boolean
    success?: boolean
    info?: boolean
    warning?: boolean
    danger?: boolean
    disabled?: boolean
    color?: GUI.Colors
    shadow?: GUI.Shadows
  }

  interface IIconPropsLow {
    iconName?: GUI.IonicIcons
    iconOS?: RN.PlatformOSType
    active?: boolean
  }


  //**** BUTTON
  interface IButtonProps extends IColorProps, IIconPropsLow {

    //icon
    iconAfter?: boolean

    //mode
    //raised?: boolean
    flat?: boolean
    floating?: boolean
    //bordered?: boolean
    outline?: boolean

    //press
    onPress?: () => void
    href?: Router.IState

    //fixed
    fixed?: boolean
    fixedPosition?: ButtonFixed

    //web ex
    web?: React.HTMLAttributes<any>
    webStyle?: CSSProperties
  }

    //const enum ButtonMode {
  //  raised = 'raised',
  //  flat = 'flat',
  //  fixedTR = 'fixedTR',
  //  fixedTL = 'fixedTL',
  //  fixedBR = 'fixedBR',
  //  fixedBL = 'fixedBL',
  //  rounded = 'rounded',
  //  roundedMini = 'roundedMini',
  //  icon = 'icon',
  //  bordered = 'bordered', //for Nativebase only
  //}

  //interface IButtonProps { //default raised, primary
  //  onPress?: () => void
  //  mode?: ButtonMode
  //  href?: Router.IState //for RN vygeneruje onPress a navigaci, pro WEB vygeneruje navigate URL
  //  iconName?: GUI.IonicNames
  //  iconLogo?: GUI.IonicLogos
  //  iconRight?: boolean
  //  iconOS?: RN.PlatformOSType //ignoruje se pro RN
  //  iconActive?: boolean
  //  label?: string //label=='' || !label && icon => icon in button else standalone icon
  //  color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
  //  shadow?: Shadows
  //  disabled?: boolean

  //}

  //**** DRAWER

  interface IAnimatedMobileDrawerProps extends Drawer.IProps {
    drawerWidth: number
    screenWidth: number
    duration?: number
  }

  //interface IAnimatedViewProps extends RN.ViewProperties {
  //  anim?: {
  //    propName: string //jmeno animacni property, napr. LEFT, OPACITY apod
  //    targetValue: number //cilova hodnota animace
  //    duration?: number
  //    backdropShow?: boolean //render anim komponenty vraci null. objevi se a zacne se animovat pri backdropShow===true. Pri backdropShow===false provede animaci a render vrati null
  //  }
  //  onPress?: () => void
  //}
}

interface IState {
  gui?: GUI.IState
}


