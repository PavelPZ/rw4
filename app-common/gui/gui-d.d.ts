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

interface IState {
  gui?: GUI.IState
}