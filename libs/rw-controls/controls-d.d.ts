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

declare namespace Icon {

  interface IIconProps extends React.Attributes {
    style?: RN.TextStyle
    src: GUI.mdi_icons
    color?: string
    size?: number
  }

}

declare namespace Text {

  interface ITextProps extends React.Attributes {
    style?: TextStyle_wn
    n: RN.TextProperties
    w: React.HTMLAttributes<HTMLSpanElement>
    style_w?: CSSProperties
    style_n?: RN.TextStyle
    onPress?: () => void
  }

}