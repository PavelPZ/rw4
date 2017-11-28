declare namespace MuiIcon {

  type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';
  type ClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type Shape = {
    common: Record<ClassKey, Mui.RNIconStyle>
    native
    web:''
    style: Mui.RNIconStyle
    props: {
      color?: Colors
      children?: GUI.mdi_icons
    }
  }

}