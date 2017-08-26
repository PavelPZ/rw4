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

