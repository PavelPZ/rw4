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

  interface IDispatchProps {
    showDrawer?(isShow: boolean)
  }
  type IStateProps = IState & Router.IPageProps

  interface IStyled {
    style?: CSSProperties
  }

  type TAllProps = Drawer.IDispatchProps & Drawer.IStateProps & IStyled & { children?: React.ReactNode }

  interface IOwnProps extends TAllProps {
    menu: IMenu
    content?: IContent
  }
  interface IMenu extends IStyled {
    nodeType?: React.ComponentType<IMenu>
    node?: JSX.Element
    nodeChilds?: React.ComponentType<IMenu>[]
    header?: IMenuHeader
    content?: IMenuContent
  }
  interface IMenuHeader {
    node?: JSX.Element
    left?: JSX.Element
    right?: JSX.Element
  }
  interface IMenuContent {
    node?: JSX.Element
  }
  interface IContent extends TAllProps {
    nodeType?: React.ComponentType<IContent>
    node?: JSX.Element
    nodeChilds?: React.ComponentType<IContent>[]
    header?: IContentHeader
    content?: IContentContent
  }
  interface IContentHeader extends TAllProps {
    node?: React.ComponentType<IContentHeader>
    nodeChilds?: React.ComponentType<IContentHeader>[]
    left?: JSX.Element
    body?: JSX.Element
    right?: IContentRight
  }
  interface IContentRight {
    node?: JSX.Element
    navItems?: JSX.Element[]
  }
  interface IContentContent extends TAllProps {
    node?: React.ComponentType<IContentContent>
  }

}

interface IState {
  drawer?: Drawer.IState
}

