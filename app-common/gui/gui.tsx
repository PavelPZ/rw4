﻿export let Animated: typeof ReactNative.Animated
export let Button: React.ComponentType<GUI.IButtonProps>
export let Icon: React.ComponentType<GUI.IIconProps>
export let H1: React.ComponentType<NativeBase.H1>
export let H2: React.ComponentType<NativeBase.H2>
export let View: React.ComponentType<ReactNative.ViewProperties>
export let Text: React.ComponentType<ReactNative.TextProperties>
export let Platform: ReactNative.PlatformStatic
export let AnimatedView: React.ComponentType<ReactNative.ViewProperties>

export let Container: React.ComponentType<ReactNative.ViewProperties & { ref?}>
export let Content: React.ComponentType<ReactNative.ViewProperties>
export let Header: React.ComponentType<ReactNative.ViewProperties>
export let Footer: React.ComponentType<ReactNative.ViewProperties>
export let Page: React.ComponentType<Router.IPageProps>
export let DrawerLayout: React.ComponentType<Drawer.IOwnProps>
export let colorToStyle: { [color: string]: string }

export const initGUI = async (pl: IPlatform) => {
  Animated = pl.Animated
  View = pl.View
  Button = pl.Button
  Icon = pl.Icon
  H1 = pl.H1
  H2 = pl.H2
  Text = pl.Text
  Platform = pl.Platform
  AnimatedView = pl.AnimatedView
  Container = pl.Container
  Content = pl.Content
  Header = pl.Header
  Footer = pl.Footer
  Page = pl.Page
  DrawerLayout = pl.DrawerLayout
  colorToStyle = pl.colorToStyle
}

interface IPlatform {
  Button: React.SFC<GUI.IButtonProps>
  Icon: React.SFC<GUI.IIconProps>
  H1: React.ComponentType<NativeBase.H1>
  H2: React.ComponentType<NativeBase.H2>
  H3: React.ComponentType<NativeBase.H3>
  View: React.ComponentType<NativeBase.View>
  AnimatedView: React.ComponentType<ReactNative.ViewProperties>
  Text: React.ComponentType<NativeBase.Text>
  Container: React.ComponentType<NativeBase.View>
  Header: React.ComponentType<NativeBase.View>
  Footer: React.ComponentType<NativeBase.View>
  Content: React.ComponentType<NativeBase.View>
  Page: React.ComponentType<Router.IRoutePar>
  DrawerLayout: React.ComponentType<Drawer.IOwnProps>
  colorToStyle: { [color: string]: string }
  Platform: ReactNative.PlatformStatic
  Animated: typeof ReactNative.Animated
}