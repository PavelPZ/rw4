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
    toolbarTitle: React.ReactNode
    toolbarActions?: React.ReactElement<any> | React.ReactElement<any>[]
    drawerChildren?: React.ReactNode
    drawerHeaderChildren?: React.ReactNode
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

  interface IRenderProps {
    drawer: JSX.Element
  }

}

interface IState {
  drawer?: Drawer.IState
}

interface IPlatforms {
  drawerPlatform?: Drawer.IPlatform
}

