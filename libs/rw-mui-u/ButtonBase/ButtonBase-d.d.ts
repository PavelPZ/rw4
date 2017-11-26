declare namespace MuiButtonBase {

  interface IProps {
    disabled?: boolean
    disableRipple?: boolean
    onClick: (ev) => void
    rootRef?: React.Ref<any>
  }

  type ClassKeyView = 'root' | 'ripple' | 'disabled'

  type ISheet = Record<ClassKeyView, RN.ViewStyle>

  //type ButtonBaseType = Mui.ComponentType<IButtonBaseProps, IButtonBaseStyle>
}