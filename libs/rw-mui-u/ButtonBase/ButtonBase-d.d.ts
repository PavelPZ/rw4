declare namespace MuiButtonBase {

  interface IProps {
    disabled?: boolean
    disableRipple?: boolean
    disableFocusRipple?: boolean;
    //onClick?: (ev?) => void
    rootRef?: React.Ref<any>
  }

  //type muiKey = CommonKey
  type NativeKey = 'ripple'
  type CommonKey = 'root' | 'disabled'


  interface Shape {
    common: Record<CommonKey, RN.ViewStyle>
    native: Record<NativeKey, RN.ViewStyle>
    web
    style: RN.ViewStyle
    props: IProps
    webProps: React.AnchorHTMLAttributes<HTMLAnchorElement> & React.ButtonHTMLAttributes<HTMLButtonElement>
    nativeProps: {onClick?: (ev?) => void}
  }
  //type ISheet = Record<ClassKeyView, RN.ViewStyle>

  //type ButtonBaseType = Mui.ComponentType<IButtonBaseProps, IButtonBaseStyle>
}