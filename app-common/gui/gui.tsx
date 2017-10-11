export * from './drawer'

export let Animated: typeof ReactNative.Animated
export let Button: React.ComponentType<GUI.IButtonProps>
export let Icon: React.ComponentType<GUI.IIconProps>
export let H1: React.ComponentType<NativeBase.H1>
export let H2: React.ComponentType<NativeBase.H2>
export let View: React.ComponentType<ReactNative.ViewProperties>
export let Text: React.ComponentType<ReactNative.TextProperties>
export let AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>

export let Container: React.ComponentType<ReactNative.ViewProperties & { ref?}>
export let Content: React.ComponentType<ReactNative.ViewProperties>
export let Header: React.ComponentType<ReactNative.ViewProperties>
export let Footer: React.ComponentType<ReactNative.ViewProperties>
//export let Page: React.ComponentType<Router.IPageProps>
//export const DrawerLayout = _DrawerLayout
export let colorToStyle: { [color: string]: string }

export const initGUI = async (pl: IPlatform) => {
  Animated = pl.Animated
  View = pl.View
  Button = pl.Button
  Icon = pl.Icon
  H1 = pl.H1
  H2 = pl.H2
  Text = pl.Text
  AnimatedDrawer = pl.AnimatedDrawer
  Container = pl.Container
  Content = pl.Content
  Header = pl.Header
  Footer = pl.Footer
  //Page = pl.Page
  colorToStyle = pl.colorToStyle
}

interface IPlatform {
  Button: React.ComponentType<GUI.IButtonProps>
  Icon: React.ComponentType<GUI.IIconProps>
  H1: React.ComponentType<NativeBase.H1>
  H2: React.ComponentType<NativeBase.H2>
  H3: React.ComponentType<NativeBase.H3>
  View: React.ComponentType<NativeBase.View>
  AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>
  Text: React.ComponentType<NativeBase.Text>
  Container: React.ComponentType<NativeBase.View>
  Header: React.ComponentType<NativeBase.View>
  Footer: React.ComponentType<NativeBase.View>
  Content: React.ComponentType<NativeBase.View>
  //Page: React.ComponentType<Router.IRoutePar>
  colorToStyle: { [color: string]: string }
  Animated: typeof ReactNative.Animated
}