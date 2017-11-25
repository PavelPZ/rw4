declare namespace Mui {

  interface IButtonBaseProps extends Mui.Props<{}, IButtonBaseStyle> {
    disabled?: boolean
    disableRipple?: boolean
    onClick: (ev) => void
    rootRef?: React.Ref<any>
  }

  type ButtonBaseClassKeyView = 'root' | 'ripple' | 'disabled'

  type IButtonBaseStyle = PartialRecord<ButtonBaseClassKeyView, ViewStyle>

  type ButtonBaseType = Mui.ComponentType<IButtonBaseProps, IButtonBaseStyle>
}