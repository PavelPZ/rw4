declare namespace MuiButton {

  type CommonKey = 'dense' | 'flatPrimary' | 'flatAccent' | 'flatContrast' | 'colorInherit' | 'raised' | 'raisedPrimary' | 'raisedAccent' | 'raisedContrast' | 'fab'
  type NativeKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type Shape = Overwrite<Mui.EmptyShape, {
    native: Record<NativeKeyText | MuiButtonBase.NativeKey, RN.TextStyle> & Record < MuiButtonBase.CommonKey | CommonKey, RN.ViewStyle >
    props: {
      color?: Mui.PropTypes.Color | 'contrast' | 'default'
      dense?: boolean
      fab?: boolean
      href?: string
      raised?: boolean
      rootRef?: React.Ref<any>
    }
    propsNative: RN.TouchableOpacityProperties
  }>

}
