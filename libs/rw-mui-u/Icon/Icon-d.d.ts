﻿declare namespace MuiIcon {

  type Colors = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

  type IProps = {
    color?: Colors
    children?: GUI.mdi_icons
  }

  type ClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type ISheet = Record<ClassKey, Mui.RNIconStyle>

}