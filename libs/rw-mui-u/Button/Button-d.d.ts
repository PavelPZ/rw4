declare namespace MuiButton {

  interface Shape {
    common: Record<MuiButtonBase.CommonKey | CommonKey, RN.ViewStyle>
    native: Record<NativeKeyText | MuiButtonBase.NativeKeyText, RN.TextStyle>
    web: 'label' | 'keyboardFocused'
    style: RN.ViewStyle
    props: IProps
    webProps: React.ButtonHTMLAttributes<HTMLButtonElement> //React.AnchorHTMLAttributes<HTMLAnchorElement> & 
  }

  export type CommonKey =
    //| MuiButtonBase.muiKey
    | 'dense'
    //| 'label'
    | 'flatPrimary'
    | 'flatAccent'
    | 'flatContrast'
    | 'colorInherit'
    | 'raised'
    //| 'keyboardFocused'
    | 'raisedPrimary'
    | 'raisedAccent'
    | 'raisedContrast'
    | 'fab'
    ;


  interface IProps extends MuiButtonBase.IProps {
    color?: Mui.PropTypes.Color | 'contrast' | 'default'
    dense?: boolean
    fab?: boolean
    href?: string
    raised?: boolean
    rootRef?: React.Ref<any>
  }

  //type ClassKeyView = MuiButtonBase.NativeKey | 'dense' | 'raised' | 'disabled' | 'fab' | 'raisedPrimary' | 'raisedAccent'
  type NativeKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

}
