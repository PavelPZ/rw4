declare namespace Mui2 {

  type IconColor = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

  type IIconProps = {
    color?: IconColor
    children?: GUI.mdi_icons
  }

  type IconClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type IIconSheet = Record<IconClassKey, CSS.RNIconStyle>

}