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

  interface IProps extends IState {
    windowSize:Media.TWindowSize
  }

  interface IShowDrawer {
    showDrawer?(isShow:boolean)
  }
  interface IOwnProps extends IShowDrawer {
    navItems: JSX.Element[]
    headerLeft?:JSX.Element
    headerDesktop?:JSX.Element
  }

}

interface IState {
  drawer?: Drawer.IState
}

