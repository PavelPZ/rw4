declare namespace App {
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

  interface IGlobal {
    store?: Store
    platform: IPlatforms
    //initializers: Promise<any>[]
  }

  //type IInitializerItem = Promise<any> | (() => void)
  //interface IInitializers {
  //  stage1?: IInitializerItem[]
  //  stage2?: IInitializerItem[]
  //  stage3?: IInitializerItem[]
  //  stage4?: IInitializerItem[]
  //}
  //type IInitializerNames = keyof IInitializers

  interface IReducer<TState = IState> { (state: TState, action: Action): TState }

  interface SCF<P = {}> {
    (props: P & { children?: React.ReactNode }, context?: IContext): React.ReactElement<any> | null
    propTypes?: React.ValidationMap<P>
    contextTypes?: React.ValidationMap<any>
    defaultProps?: Partial<P>
    displayName?: string
  }

  interface IPlatform {
    initBefore?: () => void
    initAfter?: () => void
    initBeforeAsync?: () => Promise<any>
    initAfterAsync?: () => Promise<any>
  }

}

interface Window {
  lmGlobal: App.IGlobal
}

interface IState { }

interface IPlatforms { }

interface IContext {
  store?: App.Store
}

declare const __moduleName: string