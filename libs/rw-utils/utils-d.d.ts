declare namespace Utils {
  const enum PromiseResults {
    timeout = 'pr/timeout',
    abort = 'pr/abort',
  }

  type TPromiseResult<T> = T | PromiseResults

  interface IPromise<T = void> extends Promise<TPromiseResult<T>> {
    catch(msg)
    onAbort(handler: () => void): this
    abort(msg?): this
    timeout(time: number, func?: () => void): this
    start(): this
  }
}