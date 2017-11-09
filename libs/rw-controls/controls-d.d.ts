declare namespace Button {

  const enum ButtonFixed {
    tr = 'tr',
    tl = 'tl',
    br = 'br',
    bl = 'bl',
  }

  interface IButtonProps extends GUI.IColorProps, GUI.IIconPropsLow {

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
}

