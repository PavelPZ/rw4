declare namespace Mui {

  interface IButtonBaseProps {
    disabled?: boolean
    disableRipple?: boolean
    onClick: (ev) => void
    rootRef?: React.Ref<any>
  }

  type ButtonBaseClassKeyView = 'root' | 'ripple' | 'disabled'

  type IButtonBaseSheet = Record<ButtonBaseClassKeyView, ViewStyle>

  //type ButtonBaseType = Mui.ComponentType<IButtonBaseProps, IButtonBaseStyle>
}