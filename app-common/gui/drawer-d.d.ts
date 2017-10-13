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
    style?: ReactNative.ViewStyle
  }

  type TAllProps = Drawer.IDispatchProps & Drawer.IStateProps & IStyled & { children?: React.ReactNode }

  interface IOwnProps extends TAllProps {
    menu: IMenu
    content?: IContent
  }
  interface IMenu extends TAllProps {
    node?: JSX.Element
    header?: IMenuHeader
    content?: IMenuContent
  }
  interface IMenuHeader extends TAllProps {
    node?: JSX.Element
    left?: JSX.Element
    title?:string,
    right?: JSX.Element[]
  }
  interface IMenuContent extends TAllProps {
    node?: JSX.Element
    items?: (props: TAllProps) => React.ReactNode
  }
  interface IContent extends TAllProps {
    node?: JSX.Element
    header?: IContentHeader
    content?: IContentContent
  }
  interface IContentHeader extends TAllProps {
    node?: JSX.Element
    left?: JSX.Element
    title?: string,
    right?: JSX.Element[]
  }
  interface IContentContent extends TAllProps {
    node?: JSX.Element
    items?: (props: TAllProps) => React.ReactNode
  }

}

interface IState {
  drawer?: Drawer.IState
}

