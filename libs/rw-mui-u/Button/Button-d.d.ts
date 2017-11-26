declare namespace Mui {

  interface IButtonProps {
    fab?: boolean
    dense?: boolean
    href?: string
    raised?: boolean
    rootRef?: React.Ref<any>
    color?: PropTypes.Color | 'contrast' | 'default'
  }

  type ButtonClassKeyView = ButtonBaseClassKeyView | 'root' | 'dense' | 'raised' | 'disabled' | 'fab' | 'raisedPrimary' | 'raisedAccent'
  type ButtonClassKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type IButtonStyle = Record<ButtonClassKeyText, CSS.TextStyle> & PartialRecord<ButtonClassKeyView, ViewStyle>

  //type ButtonType = Mui.ComponentType<IButtonProps, IButtonStyle>

}
