import React from 'react'
import { Container, Header, Content, Text, Button, H2, View } from '../gui/gui'
import { registerRouter, navigatePushHome } from '../lib/router'
import { isLogged, createLoginButton } from '../lib/login'
import { storeContextType } from '../lib/lib'
import { contextType as locContextType } from '../lib/loc'

//import { PageTemplate } from '../../app-native/lib/native-root-layers'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button
    label={logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}
    onPress={doLoginAction} />
})

class appRouterComp extends React.PureComponent<AppRouter.IRoutePar> {
  render() {
    const props = this.props
    const { children, onRef, ...par } = props
    const isModal = props.query && props.query.isModal
    return <div ref={root => root && onRef && onRef(root)}>
      <Container testID='xxxxx' style={{ flex: 1 }}>
        <Header>
          {isModal ? <View></View> : <View></View>}
        </Header>
        <Content>
          <H2>{props.title}</H2>
          <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
          <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
          <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
          <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
          {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
        </Content>
      </Container>
    </div>
  }
}

const appRouterComp_: React.SFC<AppRouter.IRoutePar> = props => {
  const { children, ...par } = props
  const isModal = props.query && props.query.isModal
  //const hdr: GUI.IPageTemplateProps<GUI.IPageHeaderDrawer & GUI.IPageHeaderModalOKCancel> = {
  //  headerProps: {
  //    type: isModal ? GUI.PageHeaderType.modalOKCancel as any : GUI.PageHeaderType.drawer,
  //    bodyTitle: (isModal ? 'MODAL ' : 'TITLE ') + counter,
  //    //bodySubtitle: props.title,
  //    okText: isModal && 'Success',
  //    right: !isModal && <Button mode={GUI.ButtonMode.flat} label='ACTION' color={GUI.Colors.White} />,
  //    onDrawer: () => alert('onDrawer'),
  //    onOK: () => alert('onOK'),
  //    onCancel: () => alert('onCancel')
  //  },
  //  content: [
  //    <H2 key={0} style={{ marginTop: counter++ % 2 ? 0 : 20 }}>{props.title}</H2>,
  //    <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />,
  //    <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />,
  //    <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />,
  //    <Button /*tabIndex={1}*/ key={4} label='DUMMY' />,
  //    window.lmGlobal.isNative ? undefined : <LoginButton key={5} tabIndex={2} />,
  //  ],
  //  //footerNode: isModal ? undefined : 'FOOTER'
  //  footerProps: {
  //    actions: [
  //      { icon: GUI.IonicNames.alarm, onPress: () => { } },
  //      { icon: GUI.IonicNames.close, onPress: () => { } },
  //    ]
  //  }
  //}
  ////return <Text>XXXXXXX</Text>
  //return <PageTemplate {...hdr}/>
  return <Container testID='xxxxx' style={{ flex: 1 }}>
    <Header>
      {isModal ? <View></View> : <View></View>}
    </Header>
    <Content>
      <H2>{props.title}</H2>
      <Button /*tabIndex={1}*/ key={1} label='Add to title' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | xxx' })} />
      <Button /*tabIndex={1}*/ key={2} label='Show Modal' href={AppRouterComp.getRoute({ ...par, title: props.title + ' | mmm' }, true)} />
      <Button /*tabIndex={1}*/ key={3} label='Goto HOME' href={{ routeName: null }/*home*/} />
      <Button /*tabIndex={1}*/ key={4} label='DUMMY' />
      {window.lmGlobal.isNative ? null : <LoginButton key={5} tabIndex={2} />}
    </Content>
  </Container>
}
let counter = 0

//*** EXPORTS
export const AppRouterComp: Router.IRouteComponent<AppRouter.IRoutePar> = registerRouter(appRouterComp, AppRouter.Consts.name, AppRouter.Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), AppRouter.Consts.loadDelay)),
  needsLogin: params => !window.lmGlobal.isNative && params.title.length >= 'START TITLE | xxx'.length,
})


//export const reducer: App.IReducer = (state, action: Router.IAction) => {
//  if (!state) return {}
//  switch (action.type) {
//    //case Router.Consts.NAVIGATE_END:
//    //let drawerStates: IState
//    //if (action.newState.routeName != AppRouter.Consts.name) drawerStates = {
//    //  drawerChildren: { routeName: AppRouter.Consts.name as string },
//    //  drawerHeaderChildren: { routeName: AppRouter.Consts.name as string },
//    //  toolbarTitle: { routeName: AppRouter.Consts.name as string, title: 'App Router' },
//    //  toolbarActions: { routeName: AppRouter.Consts.name as string },
//    //}
//    //return { state, ...drawerStates }
//    default: return state
//  }
//}
