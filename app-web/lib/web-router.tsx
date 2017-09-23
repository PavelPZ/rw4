import React from 'react'
import { TweensPromise } from '../gui/lib'

class PageTransitionTweensPromise extends TweensPromise {
  constructor(private div: HTMLElement, private display: boolean) { super() }
  doStart() {
    const { div, display } = this
    this.animate(div, 0.15, { opacity: 0.05, ease: display ? Power0.easeIn : Power0.easeOut, tweenProc: display ? TweenLite.to : TweenLite.from })
  }
}

export const getAnimator = (div: HTMLElement, display: boolean) => new PageTransitionTweensPromise(div, display)

export const Page: React.ComponentType<Router.IPageProps> = props => <div ref={props.refForAnimation}>{props.children}</div>
