declare namespace MuiButtonBase {

  type NativeKeyText = 'ripple'
  type CommonKey = 'root' | 'disabled'

  type Shape = {
    common: Record<CommonKey, RN.ViewStyle>
    native: Record<NativeKeyText, RN.ViewStyle>
    web:''
    style: RN.ViewStyle
    props: {
      disabled?: boolean
      disableRipple?: boolean
      disableFocusRipple?: boolean;
      rootRef?: React.Ref<any>
    }
    webProps: React.ButtonHTMLAttributes<HTMLButtonElement> //React.AnchorHTMLAttributes<HTMLAnchorElement> & 
  }
}