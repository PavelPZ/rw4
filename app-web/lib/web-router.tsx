import React from 'react'
import { TweensPromise } from '../gui/lib'

class PageTransitionTweensPromise extends TweensPromise {
  pageTransition(div: HTMLElement, display: boolean): TweensPromise {
    return this.animate(div, 0.15, { opacity: 0.05, ease: display ? Power0.easeIn : Power0.easeOut, tweenProc: display ? TweenLite.to : TweenLite.from })
  }
}

export const getAnimator = (div: HTMLElement, display: boolean) => new PageTransitionTweensPromise().pageTransition(div, display)
