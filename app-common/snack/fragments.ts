/*
LM
D:\rw\rw4\node_modules\@types\react-redux\index.d.ts
https://github.com/reactjs/react-redux/blob/master/docs/api.md
    areStatesEqual?: (olsState, newState) => boolean
    areStatePropsEqual?: (olsState, newState) => boolean
    areOwnPropsEqual?: (olsState, newState) => boolean
*/
//export const areStateWithoutOnRefEqual = (st1, st2) => {
//  const {onRef: ign1, ...st1: st1OK} = st1
//  const {onRef: ign2, ...st2: st2OK} = st2
//  return shallowEqual(st1OK, st2OK)
//}

//********* PROMISE EX
//https://gist.github.com/domenic/8ed6048b187ee8f2ec75
//https://github.com/promises-aplus/cancellation-spec/issues/6

//function promiseEx(executor: (resolve, reject) => Promise<any>) { //constructor: save and modify resolve x reject
//  let resolve, reject
//  let selfPlace: { self?: PromiseDesignTime } = { }
//  const self = selfPlace.self = new Promise((res, rej) => {
//    resolve = r => { selfPlace.self.state = PromiseStates.resolved; return res(r) }
//    reject = r => { selfPlace.self.state = PromiseStates.rejected; return rej(r) }
//    return executor(resolve, reject)
//  }) as any
//  self.__proto__ = promiseEx.prototype
//  self.resolve = resolve
//  self.reject = reject
//  return self
//}
//promiseEx.prototype.__proto__ = Promise.prototype

////extension methods
//promiseEx.prototype['abort'] = function (this: PromiseDesignTime, msg) {
//  if (this.state) return this
//  this.state = PromiseStates.aborted
//  if (this.abortHandler) this.abortHandler()
//  this.resolve(msg || PromiseResults.abort)
//  return this
//}
//promiseEx.prototype['onAbort'] = function (this: PromiseDesignTime, handler) {
//  this.abortHandler = handler
//  return this
//}
//promiseEx.prototype['timeout'] = function (this: PromiseDesignTime, time: number, func?: () => void) {
//  if (this.state) return this
//  this._timer = setTimeout(() => {
//    if (this.state) return
//    this.state = PromiseStates.timeouted
//    if (func) func()
//    this.resolve(PromiseResults.timeout)
//  }, time);
//  return this;
//}