import { PromiseExtensible } from './index'

export class TweensPromise extends PromiseExtensible<void> {

  animate(el: HTMLElement, secs: number, pars: GUI.ITweenParsEx, to?: any): TweensPromise {
    if (this._state) return this
    const { tweenProc, ...rest } = pars
    this.tw = (tweenProc || TweenLite.to)(el, secs, { ...rest, onComplete: () => { delete this.tw; if (this._state) return; this.resolve() } }, to)
    return this
  }

  abort(msg?) {
    if (this.tw) this.tw.progress(1, true)
    delete this.tw
    if (this._state) return this
    return super.abort(msg)
  }
  stop() {
    if (this.tw) this.tw.pause()
    delete this.tw
    return super.abort('stop')
  }
  tw: gsap.TweenLite
}

export class TweensAnimate extends TweensPromise {
  constructor(el: HTMLElement, secs: number, pars: GUI.ITweenParsEx, to?: any) {
    super()
    this.animate(el, secs, pars, to)
  }
}
