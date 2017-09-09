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
    isNative: boolean
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
  lmGlobal: App.IGlobal
}

interface IState { }

interface IPlatforms { }

interface IContext {
  store?: App.Store
}

interface IPlatforms {
  appPlatform?: App.IPlatform
}
declare const __moduleName: string
type CSSProperties = DStyles.CSSProperties & DStyles.NestedCSSSelectors // & DFela.IExtend & { className?: string; dir?: string; }
