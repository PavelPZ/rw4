declare namespace Drawer {

  const enum Consts {
    SHOW = 'drawer/SHOW',
    TOOGLE = 'drawer/TOOGLE'
  }

  interface Action {
    type: Consts.SHOW | Consts.TOOGLE
    visible?: boolean
  }

  interface IState {
    drawerVisible?: boolean
  }

  interface IDispatch {
    showDrawer?(isShow: boolean)
  }

  type IOwn = IPageContent & Router.IRouterPageProps
  type IStateDispatch = IState & IDispatch
  type IProps = IStateDispatch & IOwn

  interface IStyled {
    style?: ReactNative.ViewStyle
    key?: string | number
    web?: React.HTMLAttributes<any>,
    webStyle?: CSSProperties
  }

  type TAllProps = IStateDispatch & IStyled & Router.IRouterPageProps //& { children?: React.ReactNode }

  type TGetNode = (par: IStyled) => JSX.Element

  interface IPageContent {
    menu: IMenu
    content?: IContent
  }
  interface IMenu extends TAllProps {
    node?: TGetNode
    header?: IMenuHeader
    content?: IMenuContent
  }
  interface IMenuHeader extends TAllProps {
    node?: JSX.Element
    left?: JSX.Element
    title?: string,
    right?: JSX.Element[]
  }
  interface IMenuContent extends TAllProps {
    node?: TGetNode
    items?: JSX.Element[]
  }
  interface IContent extends TAllProps {
    node?: TGetNode
    children?: React.ReactNode
    header?: IContentHeader
    content?: IContentContent
  }
  interface IContentHeader extends TAllProps {
    node?: TGetNode
    left?: JSX.Element
    title?: string,
    right?: JSX.Element[]
  }
  interface IContentContent extends TAllProps {
    node?: TGetNode
    items?: JSX.Element[]
  }

}

interface IState {
  drawer?: Drawer.IState
}

