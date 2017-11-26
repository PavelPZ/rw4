declare namespace Mui2 {

  type IconColor = 'inherit' | 'accent' | 'action' | 'contrast' | 'disabled' | 'error' | 'primary';

  type IIconProps = {
    color?: IconColor
    children?: GUI.mdi_icons
  }

  //type IIconProps = Props<IIconProps, IIconSheet>
  //type IIconPropsCode = CodeProps<IIconProps, IIconSheet>

  type IconClassKey = 'root' | 'colorAccent' | 'colorAction' | 'colorContrast' | 'colorDisabled' | 'colorError' | 'colorPrimary' | 'colorInherit'

  type IIconSheet = Record<IconClassKey, CSS.RNIconStyle>

  //type IconType = ComponentType<IIconProps, IIconSheet>

}