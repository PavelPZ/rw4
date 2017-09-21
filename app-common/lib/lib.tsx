import React from 'react'
import PropTypes from 'prop-types'

export const getAppId = (domains: App.InstancePars<string>) => {
  if (!window.location) return null
  const domain = window.location.host.toLowerCase()
  //alert(JSON.stringify(window.location,null,2))
  for (var p in domains) if (domains[p] == domain) return p as App.InstanceKeys
  throw new Error(`Missing domain definition: ${domain}`)
}

export const promiseAll = (promises: any[]) => Promise.all(promises.filter(p => isPromise(p)))
export const isPromise = obj => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'

export const storeContextType = <T extends {}>(comp: React.ComponentType<T>) => {
  comp.contextTypes = { ...comp.contextTypes, store: PropTypes.any }
  return comp
}

export class WaitForRendering extends React.PureComponent<{ finalContent: Promise<JSX.Element>, waitContent: JSX.Element }> {
  state = { finalContent: null }
  render() {
    if (this.state.finalContent) {
      return this.state.finalContent
    }
    this.props.finalContent.then(cont => this.setState({ finalContent: cont }))
    return this.props.waitContent
  }
}

const hasOwn = Object.prototype.hasOwnProperty

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

export const shallowEqual = (objA, objB) => {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}

export class PromiseExtensible<T = void> implements IPromiseExtensible<T> {
  constructor(executor?: (resolve: (value?: T | PromiseLike<T> | PromiseResults) => void, reject: (reason?: any) => void) => void) {
    //window == null && super(executor)
    this._promise = new Promise<T | PromiseResults>((resolve, reject) => {
      this.resolve = r => { if (this._state) return; this._state = PromiseStates.resolved; resolve(r) }
      this.reject = r => { if (this._state) return; this._state = PromiseStates.rejected; reject(r) }
      if (executor) return executor(this.resolve, this.reject)
    })
  }
  _promise: Promise<any>
  _state: PromiseStates
  _started: boolean
  start() : PromiseExtensible<T | PromiseResults > {
    if (this._started || this._state) return this
    this.doStart()
    return this
  }
  doStart() { throw ('doStart')}
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T | PromiseResults) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): PromiseExtensible<TResult1 | TResult2 | PromiseResults> {
    this._promise.then(onfulfilled, onrejected)
    return this as any
  }
  catch(msg) { this._promise.catch(msg); return this }
  resolve: (res?: T | PromiseLike<T> | PromiseResults) => void
  reject: (reason?: any) => void
  abortHandler: () => void
  onAbort(handler: () => void): PromiseExtensible<T | PromiseResults> {
    this.abortHandler = handler
    return this
  }
  abort(msg?): PromiseExtensible<T | PromiseResults> {
    if (this._state) return this
    this._state = PromiseStates.aborted
    if (this.abortHandler) this.abortHandler()
    this.resolve(msg as any || PromiseResults.abort)
    return this
  }
  timeout(time: number, func?: () => void): PromiseExtensible<T | PromiseResults> {
    if (this._state) return this
    this._timer = setTimeout(() => {
      if (this._state) return
      this._state = PromiseStates.timeouted
      if (func) func()
      this.resolve(PromiseResults.timeout)
    }, time);
    return this;
  }
  _timer:number
}

const testPromiseEx = () => {
  const call3 = async () => {
    //promise = new PromiseExEx<string>(resolve => setTimeout(() => resolve('on resolve'), 1000)).onAbort(() => alert('on abort')).timeout(500, () => alert('on timeout'))
    const promise: IPromiseExtensible<number> = new PromiseExtensible<number>(resolve => setTimeout(() => resolve(123), 1000)).onAbort(() => alert('on abort')).timeout(5000, () => alert('on timeout'))
    setTimeout(() => promise.abort(), 3000)
    const res = await promise
    switch (res) {
      case PromiseResults.abort:
      case PromiseResults.timeout: 
        alert(res)
        break
      default:
        alert(res)
        break
    }
    const PR = new PromiseExtensible<string>(res => setTimeout(() => res('Hallo'), 1000)).then(r => alert(r)).timeout(5000)
    setTimeout(() => PR.abort(), 2000)
    const res2 = await PR
  }
  call3()
}
//testPromiseEx()
