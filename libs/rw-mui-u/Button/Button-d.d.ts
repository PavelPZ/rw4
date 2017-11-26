declare namespace MuiButton {

  interface IButtonProps {
    fab?: boolean
    dense?: boolean
    href?: string
    raised?: boolean
    rootRef?: React.Ref<any>
    color?: Mui.PropTypes.Color | 'contrast' | 'default'
  }

  type ClassKeyView = MuiButtonBase.ClassKeyView | 'root' | 'dense' | 'raised' | 'disabled' | 'fab' | 'raisedPrimary' | 'raisedAccent'
  type ClassKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type ISheet = Record<ClassKeyText, RN.TextStyle> & PartialRecord<ClassKeyView, RN.ViewStyle>

  //type ButtonType = Mui.ComponentType<IButtonProps, IButtonStyle>

}
