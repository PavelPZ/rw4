﻿declare namespace GUI {

  interface IPlatform {
    Button: React.SFC<GUI.IButtonProps>
    Icon: React.SFC<IIconProps>
    H1: React.ComponentType<NativeBase.H1>
    H2: React.ComponentType<NativeBase.H2>
    H3: React.ComponentType<NativeBase.H3>
    View: React.ComponentType<NativeBase.View>
    Text: React.ComponentType<NativeBase.Text>
    Container: React.ComponentType<NativeBase.View>
    Header: React.ComponentType<NativeBase.View>
    Footer: React.ComponentType<NativeBase.View>
    Content: React.ComponentType<NativeBase.View>
    colorToStyle: { [color: string]: string }
    Platform: ReactNative.PlatformStatic
  }

  //**** PAGE TEMPLATE

  interface IPageTemplateProps<T extends TPageHeader = TPageHeader> {
    headerProps?: T
    headerNode?: React.ReactNode | T
    content: React.ReactNode
    footerNode?: React.ReactNode
    footerProps?: IPageFooterOwnProps
    //ownProps: {}
  }

  //HEADER
  const enum PageHeaderType {
    modalOKCancel = 'modalOKCancel',
    modalOK = 'modalOK',
    drawer = 'drawer',
    other = 'other',
  }
  interface IPageHeader {
    type: string
    bodyTitle?: string
    bodySubtitle?: string
  }
  interface IPageHeaderRight extends IPageHeader {
    right?: React.ReactNode
  }
  //---
  interface IPageHeaderModalOKCancel extends IPageHeader {
    type: PageHeaderType.modalOKCancel
    okText?: string
    onOK: () => void
    onCancel: () => void
  }
  interface IPageHeaderModalOK extends IPageHeaderRight {
    type: PageHeaderType.modalOK
    onOK: () => void
  }
  interface IPageHeaderDrawer extends IPageHeaderRight {
    type: PageHeaderType.drawer
    onDrawer: () => void
  }
  interface IPageHeaderOther extends IPageHeaderRight {
    type: PageHeaderType.other
    left?: React.ReactNode
  }
  type TPageHeader = IPageHeaderModalOKCancel | IPageHeaderModalOK | IPageHeaderDrawer | IPageHeaderOther
  
  //FOOTER

  interface IPageFooterAction {
    icon: GUI.IonicNames
    title?: string
    onPress: () => void
  }
  interface IPageFooterMenuItem {
    title: string
    onPress: () => void
  }
  interface IPageFooterOwnProps {
    actions: IPageFooterAction[]
    menu?: IPageFooterMenuItem[]
  }

  interface IPageFooterState {
    expanded:boolean
  }

  type IPageFooterProps = IPageFooterState & IPageFooterOwnProps
  
  //**** BUTTON

  const enum ButtonMode {
    raised = 'raised',
    flat = 'flat',
    fixedTR = 'fixedTR',
    fixedTL = 'fixedTL',
    fixedBR = 'fixedBR',
    fixedBL = 'fixedBL',
    rounded = 'rounded',
    roundedMini = 'roundedMini',
    icon = 'icon',
    bordered = 'bordered', //for Nativebase only
  }

  interface IButtonProps { //default raised, primary
    onPress?: () => void
    mode?: ButtonMode
    href?: Router.IState //for RN vygeneruje onPress a navigaci, pro WEB vygeneruje navigate URL
    iconName?: GUI.IonicNames
    iconLogo?: GUI.IonicLogos
    iconRight?: boolean
    iconOS?: string //ignoruje se pro RN
    iconActive?: boolean
    label?: string //label=='' || !label && icon => icon in button else standalone icon
    //secondary?: boolean
    color?: Colors //https://react-md.mlaursen.com/components/buttons: flat and icon buttons will theme the text color in the button while raised and floating will theme the background of the button.
    shadow?: Shadows
    disabled?: boolean
    
  }

  //*** TABS

  interface ITabState {
    index: number
  }
  interface ITabOwnProps {
    buttons: ITabButton[]
    //for user action:
    userAction?: ITabUserAction //
    //for reducer:
    statePath?: string[] //cesta ke state
    initIndex?: number //selected index
  }
  interface ITabDispatch {
    changeIndex: (idx: number) => void
  }
  type ITabProps = ITabState & ITabOwnProps
  interface ITabButton {
    icon: IonicNames
    iconLogo: IonicLogos
    title: string
    idx?: number
    data?
  }
  const enum TabConsts {
    SET_INDEX = 'tab/SET_INDEX'
  }
  interface ITabAction extends ITabState {
    type: TabConsts.SET_INDEX
    statePath: string[]
  }
  interface ITabUserAction extends App.Action {
    idx?: number
    data?
  }
  //interface ITabNavigateAction<TName extends string = string, TParams extends Router.IRoutePar = any> extends ITabUserAction {
  //  data?: Router.IState<TName, TParams>
  //}

  //*** STATE
  interface IState {
    footer: IPageFooterState
  }
}

interface IPlatforms {
  guiPlatform?: GUI.IPlatform
}

interface IState {
  gui?: GUI.IState
}