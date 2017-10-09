declare namespace GUI {

  export interface IColorPair {
    background: string
    text: string
  }

  const enum Colors {
    primary = 'primary',
    secondary = 'secondary',
    default = 'default',
    info = 'info',
    danger = 'danger',
    warning = 'warning',
    success = 'success',
    dark = 'dark',
    //---
    Red = 'Red',
    Pink = 'Pink',
    Purple = 'Purple',
    DeepPurple = 'Deep Purple',
    Indigo = 'Indigo',
    Blue = 'Blue',
    LightBlue = 'Light Blue',
    Cyan = 'Cyan',
    Teal = 'Teal',
    Green = 'Green',
    LightGreen = 'Light Green',
    Lime = 'Lime',
    Yellow = 'Yellow',
    Amber = 'Amber',
    Orange = 'Orange',
    DeepOrange = 'Deep Orange',
    //---
    Brown = 'Brown',
    Grey = 'Grey',
    BlueGrey = 'Blue Grey',
    //---
    White = 'White',
    Black = 'Black', 
  }
  const enum Shadows {
    S50 = '50',
    S100 = '100',
    S200 = '200',
    S300 = '300',
    S400 = '400',
    S500 = '500',
    S600 = '600',
    S700 = '700',
    S800 = '800',
    S900 = '900',
    A100 = 'A100',
    A200 = 'A200',
    A400 = 'A400',
    A700 = 'A700',
  }

  const enum TextShadows {
    S500 = '500',
    text = 'text',
    Primary = 'Primary',
    Secondary = 'Secondary',
    Icons = 'Icons',
    Disabled = 'Disabled',
    Hint = 'Hint',
    Dividers = 'Dividers',
  }

  interface IColor {
    color: Colors
    shadow?: Shadows
  }

  interface ITextColor {
    color: Colors
    shadow?: Shadows
    textShadow?: TextShadows
  }


}
