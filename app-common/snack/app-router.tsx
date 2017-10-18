import React from 'react'
import { connect, ComponentDecorator } from 'react-redux'
import { Text, Button, H2, View, DrawerLayout } from '../gui/gui'
import { registerRouter } from '../lib/router'
import { isLogged, createLoginButton } from '../lib/login'
import { storeContextType } from '../lib/lib'
import { contextType as locContextType } from '../lib/loc'

//import { Button as MDButton } from 'react-md'

const LoginButton = createLoginButton(props => {
  const { logged, doLoginAction, ...rest } = props
  if (logged == Login.TLoginStatus.unsupported) return null
  return <Button onPress={doLoginAction}>{logged == Login.TLoginStatus.logged ? 'LOGOUT' : 'LOGIN'}</Button>
})

const enum Consts {
  name = 'app-router',
  urlMask = '/:title',
  loadDelay = 600,
}

interface IRoutePar extends Router.IRoutePar {
  title?: string
}

type IOwn = Router.IRouterPageProps<IRoutePar>

interface IState {
  title2: string
}
interface IDispatch {
  onClick
  toogleDrawer
}

type IStateDispatch = IState & IDispatch
type IProps = IStateDispatch & IOwn

//*** PAGE
const appPage: React.SFC<IOwn> = routerProps => {
  const drawerProps: Drawer.IPageContent = {
    menu: {
      header: {
        //left: <MDButton icon>menu</MDButton>,
        title: 'MENU',
        //right: [<MDButton icon key={1}>menu</MDButton>]
      },
      content: {
        node: props => <View {...props}><Text>MENU{menuCounter++}</Text></View>
        //items: props => <Text>MENU{menuCounter++}</Text>
      }
    },
    content: {
      header: {
        //left: <MDButton icon>menu</MDButton>,
        title: 'Colored',
        //right: [<MDButton key={1} flat>C</MDButton>, <MDButton icon key={2}>menu</MDButton>, <MDButton icon key={3}>menu</MDButton>]
      },
      content: {
        node: props => <AppPageLowContent {...props} {...routerProps} />
      }
    }
  }

  return <DrawerLayout {...drawerProps} {...routerProps} />
}

//*** PAGE CONTENT
const appPageLowContent: React.SFC<IProps & Drawer.IStyled> = props => {
  const { title, title2, onClick, toogleDrawer, query, windowSize, debugSetWindowSize } = props
  const isModal = query && query.isModal

  return <View style={{ flex: 1 }}>
    <Text key={11} onPress={() => {
      debugSetWindowSize(windowSize == Media.TWindowSize.desktop ? Media.TWindowSize.mobile : (windowSize == Media.TWindowSize.tablet ? Media.TWindowSize.desktop : Media.TWindowSize.tablet))
    }}>Window size: {windowSize}</Text>
    <Text key={21} onPress={() => { /*debugger;*/ toogleDrawer() }}>Drawer visible Drawer visible Drawer visible</Text>

    <H2 key={23}>{title + ' ' + title2 + ' ' + counter++}</H2>
    <Button web={{ tabIndex: 1 }} key={1} href={AppPage.getRoute({ ...props, title: title + ' | xxx' } as IRoutePar)}>Add to title</Button>
    <Button web={{ tabIndex: 2 }} key={2} href={AppPage.getRoute({ ...props, title: title + ' | mmm' } as IRoutePar, true)} >Show Modal</Button>
    <Button web={{ tabIndex: 3 }} key={3} href={{ routeName: null }/*home*/} >Goto HOME</Button>
    <Button web={{ tabIndex: 4 }} key={4} >DUMMY</Button>
    <Button web={{ tabIndex: 5 }} key={41} onPress={() => onClick(title2 + ' t2')} >TITLE2</Button>
    {!window.rn && <LoginButton key={6} tabIndex={2} />}
  </View>
}

let counter = 0
let menuCounter = 0

const provider: ComponentDecorator<IStateDispatch, IOwn & Drawer.TAllProps> = connect(
  (state: IAppState) => state.xxx,
  (dispatch) => ({
    onClick: title2 => dispatch({ type: 'CLICK', title2 }),
    toogleDrawer: () => dispatch({ type: Drawer.Consts.TOOGLE })
  } as IDispatch)
)

const AppPageLowContent = provider(appPageLowContent)

class Menu extends React.Component {
  render() {
    return <Text>{'SITE MENU'}</Text>
  }
}

//*** EXPORTS
export const AppPage: Router.IRouteComponent<IRoutePar> = registerRouter(appPage, Consts.name, Consts.urlMask, {
  beforeLoad: params => new Promise<Router.TUnloader>(resolve => setTimeout(() => resolve(), Consts.loadDelay)),
  needsLogin: params => !window.rn && params.title.length >= 'START TITLE | xxx'.length,
  reducer: (state: IAppState, action: Router.ICreateDestroyAction | Router.IAction | App.Action<'CLICK'>) => {
    const initState = { title2: 'start' }
    const changeState = false/*!action.routeChanged*/
    switch (action.type) {
      case Router.Consts.ROUTE_CREATE: console.log(Router.Consts.ROUTE_CREATE); return changeState ? state : { ...state, xxx: initState }
      case Router.Consts.NAVIGATE_END: console.log(Router.Consts.NAVIGATE_END); return { ...state, xxx: initState } //nova navigace: initialni stav
      case Router.Consts.ROUTE_DESTROY: console.log(Router.Consts.ROUTE_DESTROY); if (changeState) return state; const { xxx, ...rest } = state; return rest //opusteni router: clear jeho STATE
      case 'CLICK': return { ...state, xxx: { title2: (action as any).title2 } }
      default: return state
    }
  }
})

interface IAppState extends App.IGlobalState {
  xxx: IState
}
