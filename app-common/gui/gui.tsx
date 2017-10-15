export * from './drawer'

export let Animated: typeof ReactNative.Animated
export let Button: React.ComponentType<GUI.IButtonProps2>
export let Icon: React.ComponentType<GUI.IIconProps>
export let H1: React.ComponentType<TextProperties>
export let H2: React.ComponentType<TextProperties>
export let H3: React.ComponentType<TextProperties>
export let View: React.ComponentType<ViewProperties>
export let Text: React.ComponentType<TextProperties>
export let AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>

export let Container: React.ComponentType<ViewProperties>
export let Content: React.ComponentType<ViewProperties>
export let Header: React.ComponentType<ViewProperties>
export let Footer: React.ComponentType<ViewProperties>
//export let Page: React.ComponentType<Router.IPageProps>
//export const DrawerLayout = _DrawerLayout
export let colorToStyle: { [color: string]: GUI.Colors }
export let getDrawerHeader: (isContent: boolean, props: Drawer.IHeader) => React.ReactNode

export const initGUI = async (pl: IPlatform) => {
  Animated = pl.Animated
  View = pl.View
  Button = pl.Button
  Icon = pl.Icon
  H1 = pl.H1
  H2 = pl.H2
  H3 = pl.H3
  Text = pl.Text
  AnimatedDrawer = pl.AnimatedDrawer
  Container = pl.Container
  Content = pl.Content
  Header = pl.Header
  Footer = pl.Footer
  //Page = pl.Page
  colorToStyle = pl.colorToStyle
  getDrawerHeader = pl.getDrawerHeader
}

interface IPlatform {
  Button: React.ComponentType<GUI.IButtonProps2>
  Icon: React.ComponentType<GUI.IIconProps>
  H1: React.ComponentType<TextProperties>
  H2: React.ComponentType<TextProperties>
  H3: React.ComponentType<TextProperties>
  View: React.ComponentType<NativeBase.View>
  AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>
  getDrawerHeader:(isContent: boolean, props: Drawer.IHeader) => React.ReactNode
  Text: React.ComponentType<NativeBase.Text>
  Container: React.ComponentType<ViewProperties>
  Header: React.ComponentType<ViewProperties>
  Footer: React.ComponentType<ViewProperties>
  Content: React.ComponentType<ViewProperties>
  //Page: React.ComponentType<Router.IRoutePar>
  colorToStyle: { [color: string]: GUI.Colors }
  Animated: typeof ReactNative.Animated
}