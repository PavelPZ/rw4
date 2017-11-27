declare namespace MuiButton {

  interface IProps extends MuiButtonBase.IProps{
    color?: Mui.PropTypes.Color | 'contrast' | 'default'
    dense?: boolean
    fab?: boolean
    href?: string
    raised?: boolean
    rootRef?: React.Ref<any>
  }

  type ClassKeyView = MuiButtonBase.ClassKeyView | 'root' | 'dense' | 'raised' | 'disabled' | 'fab' | 'raisedPrimary' | 'raisedAccent'
  type ClassKeyText = 'rootLabel' | 'denseLabel' | 'disabledLabel' | 'flatLabelPrimary' | 'flatLabelAccent' | 'flatLabelContrast' | 'raisedLabelAccent' | 'raisedLabelContrast' | 'raisedLabelPrimary'

  type ISheet = Record<ClassKeyText, RN.TextStyle> & PartialRecord<ClassKeyView, RN.ViewStyle>
}
