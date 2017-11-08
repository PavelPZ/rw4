export class PromiseExtensible<T = void> implements Utils.IPromise<T> {
  constructor(executor?: (resolve: (value?: T | PromiseLike<T> | Utils.PromiseResults) => void, reject: (reason?: any) => void) => void) {
    this._promise = new Promise<T | Utils.PromiseResults>((resolve, reject) => {
      this.reject = r => { if (this._state) return; this._state = PromiseStates.rejected; reject(r) }
      this.resolve = (r, state) => { if (this._state) return; this._state = state || PromiseStates.resolved; resolve(r); this.finished(r) }
      if (executor) return executor(this.resolve, this.reject)
    })
  }
  readonly [Symbol.toStringTag] = "Promise"
  resolve: (res?: T | PromiseLike<T> | Utils.PromiseResults, state?: PromiseStates) => void
  reject: (reason?: any) => void
  abortHandler: () => void
  _promise: Promise<any>
  _state: PromiseStates
  _started: boolean

  finished(res: T | PromiseLike<T> | Utils.PromiseResults) { }
  start(): this {
    if (this._started || this._state) return this
    this.doStart()
    return this
  }
  doStart() { throw ('doStart') }
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2> {
    this._promise.then(onfulfilled, onrejected)
    return this as any
  }
  //then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T | Utils.PromiseResults) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseExtensible<TResult1 | TResult2> {
  //  this._promise.then(onfulfilled, onrejected)
  //  return this as any
  //}
  catch(msg) { this._promise.catch(msg); return this }
  onAbort(handler: () => void): this {
    this.abortHandler = handler
    return this
  }
  abort(msg?): this {
    if (this._state) return this
    if (this.abortHandler) this.abortHandler()
    this.resolve(msg as any || Utils.PromiseResults.abort, PromiseStates.aborted)
    return this
  }
  timeout(time: number, func?: () => void): this {
    if (this._state) return this
    this._timer = setTimeout(() => {
      if (this._state) return
      if (func) func()
      this.resolve(Utils.PromiseResults.timeout, PromiseStates.timeouted)
    }, time);
    return this;
  }
  _timer: number
  static delay(msec: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, msec))
  }
}