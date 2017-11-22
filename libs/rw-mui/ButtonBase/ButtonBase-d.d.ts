declare namespace Mui {

  interface IButtonBaseProps extends Mui.StandardProps<{}, IButtonBaseStyle, IButtonBaseStyle['root']> {
    disabled?: boolean
    disableRipple?: boolean
    onClick: () => void
    rootRef?: React.Ref<any>
  }

  type ButtonBaseClassKeyView = 'root' | 'ripple' | 'disabled'

  type IButtonBaseStyle = PartialRecord<ButtonBaseClassKeyView, ViewStyle>

  type ButtonBaseType = React.ComponentType<IButtonBaseProps & WithStyles<IButtonBaseStyle>>
}