import React from 'react'
//import { Button, NavigationDrawer, NavigationDrawerProps, DrawerProps, DrawerPositions, MediaTypes, DrawerTypes, MobileDrawerTypes, DrawerTypesType } from '../lib/react-md'
import { Toolbar, Button } from '../gui/react-md'

import { PromiseExtensible, promiseAll } from '../../app-common/lib/lib'
import { TweensAnimate } from 'rw-utils/promise/animate-w'

import { ruleToClassNames as renderCSS } from 'rw-mui-w/styles/fela'

const drawerWidth = 250
const fixedStyle: CSSProperties = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }

class Drawer extends React.PureComponent<{ windowSize: Media.TWindowSize, changeWindowSize: (windowSize: Media.TWindowSize) => void }> {

  state = { visible: this.props.windowSize != Media.TWindowSize.mobile };

  async changeVisible(visible: boolean) {
    //wait for HTML elements render
    this.renderedPromise = new PromiseExtensible()
    this.setState({ visible })
    await this.renderedPromise
    delete this.renderedPromise
    //animation
    this.animPromise = new DrawerPromise({ ...this.promisePars, windowSize: this.props.windowSize, visible }).start()
    const res = await this.animPromise
    delete this.animPromise
  }

  renderedPromise: PromiseExtensible //ceka se na vykresleni root DIVu
  animPromise: PromiseExtensible //animace
  promisePars: IDrawerPromise = {} as any //HTML elementy pro animaci
  contentProps: IContentProps = { //parametr pro content komponentu. Je immutable v ramci existence SimpleDrawer (meni se az pri zmene windowSize), aby se content zbytecne nevykresloval
    myContent: content => this.promisePars.content = content,
    windowSize: this.props.windowSize
  }
  drawerProps: IDrawerProps = {
    changeVisible: visible => this.changeVisible(visible),
    windowSize: this.props.windowSize,
    myDrawer: drawer => this.promisePars.drawer = drawer,
  }

  render() {
    const { promisePars, contentProps, drawerProps, state: { visible }, props: { windowSize, changeWindowSize }, animPromise } = this
    if (animPromise) { animPromise.abort(); delete this.animPromise }

    contentProps.button = <span ref={span => promisePars.tabletOpenButton = span} style={{ visibility: windowSize == Media.TWindowSize.mobile ? 'visible' : 'hidden' }}>
      <Button icon onClick={() => this.changeVisible(true)}>menu</Button>
    </span>

    contentProps.initLeft = visible && windowSize != Media.TWindowSize.mobile ? drawerWidth : 0
    drawerProps.initLeft = (contentProps.initLeft ? 0 : -drawerWidth)

    return <div ref={() => this.renderedPromise && this.renderedPromise.resolve()}>
      {/*page content*/}
      <Content key={0} changeWindowSize={changeWindowSize} drawerProps={contentProps} />
      {/*backdrop pro zakryti mobile contentu*/}
      {this.props.windowSize == Media.TWindowSize.mobile && <div key={1} ref={div => promisePars.mobileBackDrop = div} className={renderCSS({ ...fixedStyle, backgroundColor: 'gray' })} style={{ display: 'none', opacity: 0 }} onClick={() => {
        this.changeVisible(false)
      }} />}
      {/*drawer*/}
      <DrawerMenu key={2} drawerAble={drawerProps} />
      {/*blockGUI pro fazi animace*/}
      <div key={3} ref={div => promisePars.backDrop = div} className={renderCSS(fixedStyle)} style={{ display: 'none' }} />
    </div>
  }

}

export default class App extends React.PureComponent {
  state = { windowSize: Media.TWindowSize.mobile }
  render() {
    return <Drawer key={count++} windowSize={this.state.windowSize} changeWindowSize={windowSize => this.setState({ windowSize })} />
  }
}
let count = 0

class DrawerMenu extends React.PureComponent<{ drawerAble: IDrawerProps }> {
  render() {
    const { windowSize, changeVisible, myDrawer, initLeft } = this.props.drawerAble
    return <div key={2} ref={div => myDrawer(div)} className={renderCSS({ ...fixedStyle, backgroundColor: 'lightgray', width: drawerWidth })} style={{ left: initLeft }}>
      <Toolbar key={0} colored style={{ backgroundColor: 'gray' }} actions={windowSize == Media.TWindowSize.tablet ? [<Button icon onClick={() => changeVisible(false)}>arrow_back</Button>] : undefined} className="md-divider-border md-divider-border--bottom" />
      {drRenderCount++}
    </div>
  }
}
let drRenderCount = 0

class Content extends React.PureComponent<{ changeWindowSize: (windowSize: Media.TWindowSize) => void, drawerProps: IContentProps }> {
  render() {
    const { changeWindowSize, drawerProps: { button, myContent, initLeft, windowSize } } = this.props
    return <div key={1} ref={div => myContent(div)} className={renderCSS({ ...fixedStyle, backgroundColor: 'yellow' })} style={{ left: initLeft }}>
      <Toolbar key={0} colored style={{ backgroundColor: 'black' }} nav={windowSize != Media.TWindowSize.desktop ? button : undefined} className="md-divider-border md-divider-border--bottom" />
      <h1 key={1}>CONTENT: {windowSize}, {renderCount++}</h1>
      <Button key={2} raised primary onClick={() => changeWindowSize(windowSize == Media.TWindowSize.desktop ? Media.TWindowSize.mobile : (windowSize == Media.TWindowSize.tablet ? Media.TWindowSize.desktop : Media.TWindowSize.tablet))}>CHANGE SCREEN</Button>
      <br />
      asdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd
 sdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd asdf as f as fas df asd f asd
    </div>
  }
}
let renderCount = 0

interface IDrawerProps {
  windowSize: Media.TWindowSize
  myDrawer: (drawer: HTMLElement) => void
  changeVisible: (visible: boolean) => void
  initLeft?: number
}


interface IContentProps {
  button?: JSX.Element
  myContent: (content: HTMLElement) => void
  initLeft?: number
  windowSize: Media.TWindowSize
}

export interface IDrawerPromise {
  drawer: HTMLElement
  content: HTMLElement
  backDrop: HTMLElement
  tabletOpenButton: HTMLElement
  mobileBackDrop: HTMLElement
  windowSize?: Media.TWindowSize
  visible?: boolean
}

const secs = 0.3

export class DrawerPromise extends PromiseExtensible<void> {

  constructor(private pars: IDrawerPromise) { super() }

  doStart() {
    if (this._state) return
    const { drawer, content, backDrop, mobileBackDrop, visible, windowSize, tabletOpenButton } = this.pars
    backDrop.style.display = 'block'
    if (mobileBackDrop && visible) mobileBackDrop.style.display = 'block'
    if (tabletOpenButton) tabletOpenButton.style.visibility = visible ? 'hidden' : 'visible'
    const drawer$left = visible ? new TweensAnimate(drawer, secs, { left: 0 }) : new TweensAnimate(drawer, secs, { left: -drawerWidth })
    const mobileBackDrop$opacity = !mobileBackDrop ? null : (visible ? new TweensAnimate(mobileBackDrop, secs, { opacity: 0.8 }) : new TweensAnimate(mobileBackDrop, secs, { opacity: 0 }))
    const content$left = windowSize != Media.TWindowSize.tablet ? null : (visible ? new TweensAnimate(content, secs, { left: drawerWidth }) : new TweensAnimate(content, secs, { left: 0 }))
    promiseAll([drawer$left, mobileBackDrop$opacity, content$left]).then(() => {
      if (mobileBackDrop && !visible) mobileBackDrop.style.display = 'none'
      backDrop.style.display = 'none'
      this.resolve()
    })
  }

}




