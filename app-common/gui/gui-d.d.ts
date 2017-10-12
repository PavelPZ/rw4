﻿declare namespace GUI {

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
    icon?: boolean //nm: ???
    swapped?: boolean //md: swapTheming, raised+swapped = nb:bordered
    disabled?: boolean
    primary?: boolean
    secondary?: boolean
    light?: boolean //nb: nic
    iconName?: GUI.IonicIcons, //md: iconChildren, nb: <Icon name='icon' />
    iconAfter?: boolean //md: iconBefore={false}, nb:iconLeft x iconRight
    //nb colors:
    dark?: boolean
    success?: boolean
    info?: boolean
    warning?: boolean
    danger?: boolean
    color?: GUI.Colors
    shadow?: GUI.Shadows
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
    iconOS?: ReactNative.PlatformOSType //ignoruje se pro RN
    iconActive?: boolean
    label?: string //label=='' || !label && icon => icon in button else standalone icon
    //secondary?: boolean
    color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
    shadow?: Shadows
    disabled?: boolean

  }

  //**** DRAWER

  interface IAnimatedMobileDrawerProps {
    content: JSX.Element
    menu: JSX.Element
    willBeVisible: boolean
    drawerWidth: number
    screenWidth
    doShowDrawer: (isShow: boolean) => void
    isTablet?: boolean
    duration?: number
  }

  interface IAnimatedViewProps extends ReactNative.ViewProperties {
    anim?: {
      propName: string //jmeno animacni property, napr. LEFT, OPACITY apod
      targetValue: number //cilova hodnota animace
      duration?: number
      backdropShow?: boolean //render anim komponenty vraci null. objevi se a zacne se animovat pri backdropShow===true. Pri backdropShow===false provede animaci a render vrati null
    }
    onPress?: () => void
  }
}

interface IState {
  gui?: GUI.IState
}

type ViewProperties = ReactNative.ViewProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties }
type TextProperties = ReactNative.TextProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties }

