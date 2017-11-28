declare namespace MuiButtonBase {

  interface IProps {
    disabled?: boolean
    disableRipple?: boolean
    disableFocusRipple?: boolean;
    //onClick?: (ev?) => void
    rootRef?: React.Ref<any>
  }

  //type muiKey = CommonKey
  type NativeKeyText = 'ripple'
  type CommonKey = 'root' | 'disabled'


  interface Shape {
    common: Record<CommonKey, RN.ViewStyle>
    native: Record<NativeKeyText, RN.ViewStyle>
    web
    style: RN.ViewStyle
    props: IProps
    webProps: React.ButtonHTMLAttributes<HTMLButtonElement> //React.AnchorHTMLAttributes<HTMLAnchorElement> & 
  }
  //type ISheet = Record<ClassKeyView, RN.ViewStyle>

  //type ButtonBaseType = Mui.ComponentType<IButtonBaseProps, IButtonBaseStyle>
}