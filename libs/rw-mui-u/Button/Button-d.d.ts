declare namespace MuiButton {

  type CommonKey = 'dense' | 'flatPrimary' | 'flatAccent' | 'flatContrast' | 'colorInherit' | 'raised' | 'raisedPrimary' | 'raisedAccent' | 'raisedContrast' | 'fab'
  type NativeKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type Shape = {
    common: Record<MuiButtonBase.CommonKey | CommonKey, RN.ViewStyle>
    native: Record<NativeKeyText | MuiButtonBase.NativeKeyText, RN.TextStyle>
    web: 'label' | 'keyboardFocused'
    style: RN.ViewStyle
    props: {
      color?: Mui.PropTypes.Color | 'contrast' | 'default'
      dense?: boolean
      fab?: boolean
      href?: string
      raised?: boolean
      rootRef?: React.Ref<any>
    }
    webProps: React.ButtonHTMLAttributes<HTMLButtonElement> //React.AnchorHTMLAttributes<HTMLAnchorElement> & 
  }

}
