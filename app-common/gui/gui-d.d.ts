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

  //**** SWIPER
  type TOnSwipe = (isEdge: boolean, gestureState: ReactNative.PanResponderGestureState, e: ReactNative.GestureResponderEvent) => void
  const enum swipeDirections {
    SWIPE_UP = 'SWIPE_UP',
    SWIPE_DOWN = 'SWIPE_DOWN',
    SWIPE_LEFT = 'SWIPE_LEFT',
    SWIPE_RIGHT = 'SWIPE_RIGHT'
  }
  
  interface ISwiperProps extends ReactNative.ViewProperties {
    onSwipe?: (swipeDirection: swipeDirections, gestureState: ReactNative.PanResponderGestureState, e: ReactNative.GestureResponderEvent) => void
    onSwipeUp?: TOnSwipe
    onSwipeDown?: TOnSwipe
    onSwipeLeft?: TOnSwipe
    onSwipeRight?: TOnSwipe
  }

  //**** ANIMATED VIEW
  interface IAnimatedViewProps extends ReactNative.ViewProperties {
    anim?: {
      propName: string //jmeno animacni property, napr. LEFT, OPACITY apod
      targetValue: number //cilova hodnota animace
      duration?: number
      backdropShow?: boolean //render anim komponenty vraci null. objevi se a zacne se animovat pri backdropShow===true. Pri backdropShow===false provede animaci a render vrati null
    }
    onPress?:() => void
  }
}

interface IState {
  gui?: GUI.IState
}