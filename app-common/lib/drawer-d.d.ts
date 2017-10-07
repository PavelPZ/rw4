declare namespace Drawer {

  const enum Consts {
    SHOW = 'drawer/SHOW'
  }

  interface Action {
    type: Consts.SHOW
    visible:boolean
  }

  interface IState {
    drawerVisible?: boolean
  }
  
  interface IDispatchProps {
    showDrawer?(isShow:boolean)
  }
  type IStateProps = IState & Router.IPageProps

  interface IOwnProps {
    navItems?: JSX.Element[]
    headerLeft?:JSX.Element
    headerDesktop?: JSX.Element
    drawerMenu
  }

}

interface IState {
  drawer?: Drawer.IState
}

