export * from './drawer'

export let Button: React.SFC<GUI.IButtonProps>
export let Icon: React.ComponentType<GUI.IIconProps>
export let H1: React.ComponentType<TextProperties>
export let H2: React.ComponentType<TextProperties>
export let H3: React.ComponentType<TextProperties>
export let View: React.ComponentType<ViewProperties>
export let Text: React.ComponentType<TextProperties>
export let AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>
export let colorToStyle: { [color: string]: GUI.Colors }

export const initGUI = async (pl: IPlatform) => {
  View = pl.View
  Button = pl.Button
  Icon = pl.Icon
  H1 = pl.H1
  H2 = pl.H2
  H3 = pl.H3
  Text = pl.Text
  AnimatedDrawer = pl.AnimatedDrawer
  colorToStyle = pl.colorToStyle
}

interface IPlatform {
  Button: React.SFC<GUI.IButtonProps>
  Icon: React.ComponentType<GUI.IIconProps>
  H1: React.ComponentType<TextProperties>
  H2: React.ComponentType<TextProperties>
  H3: React.ComponentType<TextProperties>
  View: React.ComponentType<ViewProperties>
  AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>
  Text: React.ComponentType<NativeBase.Text>
  colorToStyle: { [color: string]: GUI.Colors }
}