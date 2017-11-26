declare namespace Mui2 {

  type IconColor = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

  type props = {
    color?: IconColor
    children?: GUI.mdi_icons
  }

  type IIconProps = Props<props, IIconSheet>
  type IIconPropsCode = CodeProps<props, IIconSheet>

  type IconClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type IIconSheet = Record<IconClassKey, IconStyle>

  type IconType = ComponentType<IIconProps, IIconSheet>

}