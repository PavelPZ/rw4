declare namespace Drawer {

  const enum Consts {
    SHOW = 'drawer/SHOW'
  }

  interface Action {
    type: Consts.SHOW
    isShow:boolean
  }

  interface IState {
    visible: boolean
  }

  interface IPlatform {
    getContent: () => React.ReactElement<{}>
  }

  type IStateProps = IState
  interface IDispatchProps {
    show()
    hide()
  }
  type IProps = IStateProps & IDispatchProps

  interface IDrawerPartsState {
    routeName: string
  }

  interface IToolbarTitle extends IDrawerPartsState {
    title?: string
  }

  interface IToolbarActions extends IDrawerPartsState {
  }

  interface IDrawerChildren extends IDrawerPartsState {
  }

  interface IDrawerHeaderChildren extends IDrawerPartsState {
    title?: string
  }

}

interface IState {
  drawer?: Drawer.IState
  toolbarTitle?: Drawer.IToolbarTitle
  toolbarActions?: Drawer.IToolbarActions
  drawerChildren?: Drawer.IDrawerChildren
  drawerHeaderChildren?: Drawer.IDrawerHeaderChildren
}

interface IPlatforms {
  drawerPlatform?: Drawer.IPlatform
}
