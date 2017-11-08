import createHistory from 'history/createBrowserHistory'
import { TweensPromise } from 'rw-utils/promise/animate-w'

import { init as initLow } from './index'

export const init = (startRoute: Router.IState, rootUrl: string, loginProcessing: Router.TLoginProcessing) => {
  initLow(startRoute, createHistory() as Router.IHistory, getAnimator, rootUrl, loginProcessing)
}

class PageTransitionTweensPromise extends TweensPromise {
  constructor(private div: HTMLElement, private display: boolean) { super() }
  doStart() {
    const { div, display } = this
    this.animate(div, 0.15, { opacity: 0.05, ease: display ? Power0.easeIn : Power0.easeOut, tweenProc: display ? TweenLite.to : TweenLite.from })
  }
}

const getAnimator = (div: HTMLElement, display: boolean) => new PageTransitionTweensPromise(div, display)

