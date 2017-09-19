import React from 'react'
import { doTween } from '../gui/lib'

export class Animate implements Router.IRouterAnimate {
  constructor(private div: HTMLElement, private display: boolean) { }
  async animate() {
    const tweenTime = 0.15
    const animProps = { opacity: 0.05 }

    const { div, display } = this

    if (!display) await doTween(div, tweenTime, { ...animProps, ease: Power0.easeIn, cancel: this.onCancel, })

    if (display) await doTween(div, tweenTime, { ...animProps, ease: Power0.easeOut, cancel: this.onCancel, tweenProc: TweenLite.from })
  }
  cancel() {
    const { cancel: doCancel } = this.onCancel
    if (doCancel) doCancel()
  }

  onCancel: GUI.ITweenCancel = {}

  static renderRouter(nodes: JSX.Element[]): JSX.Element {
    return <div>{nodes}</div>
  }
}
