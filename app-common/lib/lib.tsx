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

//********* PROMISE EX
//https://gist.github.com/domenic/8ed6048b187ee8f2ec75
//https://github.com/promises-aplus/cancellation-spec/issues/6

function promiseEx(executor: (resolve, reject) => Promise<any>) { //constructor: save and modify resolve x reject
  let resolve, reject
  let selfPlace: { self?: promiseEx } = { }
  const self = selfPlace.self = new Promise((res, rej) => {
    resolve = r => { selfPlace.self.state = PromiseStates.resolved; return res(r) }
    reject = r => { selfPlace.self.state = PromiseStates.rejected; return rej(r) }
    return executor(resolve, reject)
  }) as any
  self.__proto__ = promiseEx.prototype
  self.resolve = resolve
  self.reject = reject
  return self
}
promiseEx.prototype.__proto__ = Promise.prototype

//extension methods
promiseEx.prototype['abort'] = function (this: promiseEx, msg) {
  if (this.state) return this
  this.state = PromiseStates.aborted
  if (this.abortHandler) this.abortHandler()
  this.resolve(msg || PromiseResults.abort)
  return this
}
promiseEx.prototype['onAbort'] = function (this: promiseEx, handler) {
  this.abortHandler = handler
  return this
}
promiseEx.prototype['timeout'] = function (this: promiseEx, time: number, func?: () => void) {
  if (this.state) return this
  this._timer = setTimeout(() => {
    if (this.state) return
    this.state = PromiseStates.timeouted
    if (func) func()
    this.resolve(PromiseResults.timeout)
  }, time);
  return this;
}
type promiseEx = Promise<any> & { resolve: (res) => void; reject: (msg) => void; __proto__; abortHandler: () => void; _timer: number }

export const PromiseEx: PromiseConstructorEx = promiseEx as any

//TEST dalsiho ancestora
function promiseExEx(executor: (resolve, reject) => Promise<any>) { const p: any = new PromiseEx(executor); p.__proto__ = promiseExEx.prototype; return p } promiseExEx.prototype.__proto__ = PromiseEx.prototype
promiseExEx.prototype['abort'] = function (this: promiseEx, msg) { PromiseEx.prototype.abort.call(this, 'promiseExEx abort') }
export const PromiseExEx: PromiseConstructor = promiseExEx as any

const testPromiseEx = () => {
  const call3 = async () => {
    //promise = new PromiseExEx<string>(resolve => setTimeout(() => resolve('on resolve'), 1000)).onAbort(() => alert('on abort')).timeout(500, () => alert('on timeout'))
    const promise = new PromiseEx<number>(resolve => setTimeout(() => resolve(999), 1000)).onAbort(() => alert('on abort')).timeout(500, () => alert('on timeout'))
    setTimeout(() => promise.abort(), 300)
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
  }
  call3()
}
testPromiseEx()
