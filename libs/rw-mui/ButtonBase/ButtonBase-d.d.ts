declare namespace Mui {

  interface IButtonBaseProps extends Mui.StandardProps<{}, IButtonBaseStyle> {
    disabled?: boolean
    disableRipple?: boolean
    onClick: (ev) => void
    rootRef?: React.Ref<any>
  }

  type ButtonBaseClassKeyView = 'root' | 'ripple' | 'disabled'

  type IButtonBaseStyle = PartialRecord<ButtonBaseClassKeyView, ViewStyle>

  type ButtonBaseType = React.ComponentType<IButtonBaseProps & WithStyles<IButtonBaseStyle>>
}