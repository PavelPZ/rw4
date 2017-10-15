declare namespace GUI {

  //interface AnimatedViewStyle {
  //  opacity?: ReactNative.Animated.Value
  //  width?: ReactNative.Animated.Value
  //  height?: ReactNative.Animated.Value
  //  left?: ReactNative.Animated.Value
  //  right?: ReactNative.Animated.Value
  //  top?: ReactNative.Animated.Value
  //  bottom?: ReactNative.Animated.Value
  //}

  //interface AnimatedViewProps extends ReactNative.ViewProperties {
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

  //**** BUTTON
  interface IButtonProps2 {
    flat?: boolean //nb: transparent
    raised?: boolean //nb: nic
    floating?: boolean
    bordered?: boolean //md: raised+swapped
    disabled?: boolean
    iconName?: GUI.IonicIcons, //md: iconChildren, nb: <Icon name='icon' />
    iconAfter?: boolean //md: iconBefore={false}, nb:iconLeft x iconRight
    active?: boolean,

    onPress?: () => void
    href?: Router.IState

    primary?: boolean
    secondary?: boolean
    light?: boolean //nb: nic
    //nb colors:
    dark?: boolean
    success?: boolean
    info?: boolean
    warning?: boolean
    danger?: boolean
    color?: GUI.Colors
    shadow?: GUI.Shadows
    web?: React.HTMLAttributes<any>
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
  //  iconOS?: ReactNative.PlatformOSType //ignoruje se pro RN
  //  iconActive?: boolean
  //  label?: string //label=='' || !label && icon => icon in button else standalone icon
  //  color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
  //  shadow?: Shadows
  //  disabled?: boolean

  //}

  //**** DRAWER

  interface IAnimatedMobileDrawerProps extends Drawer.IProps {
    getContent: (pars: Drawer.IContent, st: Drawer.IStyled) => JSX.Element
    getMenu: (pars: Drawer.IMenu, st: Drawer.IStyled) => JSX.Element
    drawerWidth: number
    screenWidth: number
    isTablet?: boolean
    duration?: number
  }

  //interface IAnimatedViewProps extends ReactNative.ViewProperties {
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

type ViewProperties = ReactNative.ViewProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties, webRef?: (div: HTMLElement) => void }
type TextProperties = ReactNative.TextProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties, webRef?: (span: HTMLElement) => void }

