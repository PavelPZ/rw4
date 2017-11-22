declare namespace Mui {

  type IconColor = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

  interface IIconProps extends Mui.StandardProps<{}, IIconStyle> {
    color?: IconColor
    children?: GUI.mdi_icons
  }

  type IconClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type IIconStyle = PartialRecord<IconClassKey, TextStyle>

  type IconType = Mui.ComponentType<IIconProps, IIconStyle>

}