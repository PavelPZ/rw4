declare namespace MuiButtonBase {

  type NativeKey = 'ripple'
  type CommonKey = 'root' | 'disabled'

  type Shape = Overwrite<Mui.EmptyShape, {
    native: Record<NativeKey | CommonKey, RN.ViewStyle>
    props: {
      disabled?: boolean
      disableRipple?: boolean
      disableFocusRipple?: boolean;
      rootRef?: React.Ref<any>
    }
    propsNative: RN.TouchableOpacityProperties
 }>
}