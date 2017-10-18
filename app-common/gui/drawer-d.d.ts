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
    style?: RN.ViewStyle | RN.ViewStyle[]
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
    header?: IHeader
    content?: IMenuContent
  }
  interface IHeader extends TAllProps {
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
    header?: IHeader
    content?: IContentContent
  }
  
  interface IContentContent extends TAllProps {
    node?: TGetNode
    items?: JSX.Element[]
  }

}

interface IState {
  drawer?: Drawer.IState
}

