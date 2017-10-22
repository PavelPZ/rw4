declare namespace App {

  const enum Consts {
    animationDurationMsec = 200
  }

  interface Action<T = string> {
    type: T
  }

  interface Dispatch {
    <A extends Action>(action: A): A
  }
  interface Store {
    dispatch: <A extends Action>(action: A) => A
    getState(): IState
  }

  const enum PlatformOSType { ios = 'ios', android = 'android', windows = 'windows', web = 'web'}

  interface IGlobal {
    store?: Store
    platform: IPlatforms
    topMargin: number
    OS: RN.PlatformOSType
  }

  interface IReducer<TState = IState> { (state: TState, action: Action): TState }

  interface SCF<P = {}> {
    (props: P & { children?: React.ReactNode }, context?: IContext): React.ReactElement<any> | null
    propTypes?: React.ValidationMap<P>
    contextTypes?: React.ValidationMap<any>
    defaultProps?: Partial<P>
    displayName?: string
  }

  type IGlobalState = IState

  //Application instance
  interface InstancePars<T> {
    localhost?: T
    test?: T
  }

  type InstanceKeys = keyof InstancePars<any>

  interface IPlatform {
    instanceId: InstanceKeys
  }

}

interface Window {
  //lmGlobal: App.IGlobal
  store: App.Store
  platform: IPlatforms
  rn:boolean
}

interface IState { }

interface IPlatforms {
  OS: RN.PlatformOSType
}

interface IContext {
  store?: App.Store
}

interface IPlatforms {
  appPlatform?: App.IPlatform
}
declare const __moduleName: string
type CSSProperties = DStyles.CSSProperties// & DStyles.NestedCSSSelectors // & DFela.IExtend & { className?: string; dir?: string; }


declare const enum PromiseResults {
  timeout = 'pr/timeout',
  abort = 'pr/abort',
}

declare const enum PromiseStates {
  resolved = 'pr/resolved',
  aborted = 'pr/aborted',
  rejected = 'pr/rejected',
  timeouted = 'pr/timeouted',
}

interface IPromiseExtensibleConstructor {
  new <T = void>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>
}

interface IPromiseExtensible<T = void> {
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T | PromiseResults) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): IPromiseExtensible<TResult1 | TResult2 | PromiseResults>
  catch(msg)
  onAbort(handler: () => void): IPromiseExtensible<T | PromiseResults>
  abort(msg?): IPromiseExtensible<T | PromiseResults> 
  timeout(time: number, func?: () => void): IPromiseExtensible<T | PromiseResults>
  start(): IPromiseExtensible<T | PromiseResults>
}


//interface Promise<T> {
//  timeout(msec:number, handler?:() => void): this
//  onAbort(handler: () => void): this
//  abort(message?:string): this
//  state: PromiseStates
//}

//interface PromiseConstructorEx {
//  new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T | PromiseResults>;
//}

//type PromiseDesignTime = Promise<any> & { resolve: (res) => void; reject: (msg) => void; __proto__; abortHandler: () => void; _timer: number }
