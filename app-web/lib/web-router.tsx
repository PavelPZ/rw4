import React from 'react'
import { TweensPromise } from '../gui/lib'
import { Drawer } from './web-drawer'
import { Toolbar, Button } from '../gui/react-md'
import classNames from 'classnames'

export class PageTransitionTweensPromise extends TweensPromise {
  constructor(private div: HTMLElement, private display: boolean) { super() }
  doStart() {
    const { div, display } = this
    this.animate(div, 0.15, { opacity: 0.05, ease: display ? Power0.easeIn : Power0.easeOut, tweenProc: display ? TweenLite.to : TweenLite.from })
  }
}

export const getAnimator = (div: HTMLElement, display: boolean) => new PageTransitionTweensPromise(div, display)

//className={'md-drawer-relative'}

export const Page: React.ComponentType<Router.IPageProps> = props => { 
  let divEl:HTMLElement
  return <div>
  <Drawer key={0} {...props.drawerMenu} showDrawer={visible => {
      divEl && (divEl.className = classNames({'md-drawer-relative' : visible}));  props.showDrawer(visible)
    }} />
  <div key={1} ref={div => {divEl = div; props.refForAnimation(div)}}>
    <Toolbar colored style={{backgroundColor:'black'}} nav={props.windowSize==Media.TWindowSize.desktop ? undefined : <Button icon onClick={() => props.showDrawer(true)}>close</Button>} className="md-divider-border md-divider-border--bottom" />
    {props.children}
  </div>
  </div>
}
