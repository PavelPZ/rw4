import React from 'react'
import { doTween } from '../gui/lib'

export class Animate implements Router.IRouterAnimate {
  constructor(private oldEl: HTMLElement, private newEl: HTMLElement) {
  }
  async animate() {
    const tweenTime = 0.15
    const animProps = { opacity: 0.05 }
    const { oldEl, newEl } = this
    //this.timer = setTimeout(resolve, 1000)
    const newDispl = newEl.style.display
    newEl.style.display = 'none'
    //hide old and show new
    if (!doTween(oldEl, tweenTime, { ...animProps, ease: Power0.easeIn, cancel: this.cancels.oldCanc, })) {
      newEl.style.display = newDispl
      return
    }
    oldEl.style.display = 'none'
    newEl.style.display = newDispl
    if (!await doTween(newEl, tweenTime, { ...animProps, ease: Power0.easeOut, cancel: this.cancels.newCanc, tweenProc: TweenLite.from })) {
    }
  }
  cancel() {
    const { oldCanc: { cancel: oldCanc }, newCanc: { cancel: newCanc } } = this.cancels
    if (!oldCanc && !newCanc) return
    if (oldCanc) oldCanc()
    if (newCanc) newCanc()
  }

  cancels: { oldCanc: GUI.ITweenCancel, newCanc: GUI.ITweenCancel } = { oldCanc: {}, newCanc: {} }

  static renderRouter(nodes: JSX.Element[]): JSX.Element {
    return <div>{nodes}</div>
  }
}

