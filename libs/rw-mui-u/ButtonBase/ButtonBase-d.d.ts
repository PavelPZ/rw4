declare namespace MuiButtonBase {

  type NativeKeyText = 'ripple'
  type CommonKey = 'root' | 'disabled'

  type Shape = Overwrite<Mui.EmptyShape, {
    common: Record<CommonKey, RN.ViewStyle>
    native: Record<NativeKeyText, RN.ViewStyle>
    props: {
      disabled?: boolean
      disableRipple?: boolean
      disableFocusRipple?: boolean;
      rootRef?: React.Ref<any>
    }
    propsWeb: React.ButtonHTMLAttributes<HTMLButtonElement> //& React.AnchorHTMLAttributes<HTMLAnchorElement>
    propsNative: RN.TouchableOpacityProperties
 }>
}