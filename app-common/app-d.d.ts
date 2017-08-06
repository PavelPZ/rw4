declare namespace App {
  interface IAppProps {
    platform: IPlatforms
  }

  interface Action<T extends string = string> {
    type: T;
  }

  interface Dispatch {
    <A extends Action>(action: A): A;
  }
  interface Store {
    dispatch: Dispatch;
    getState(): IState;
  }

  interface IGlobal {
    store: Store
    platform?: IPlatforms
    initializers: Promise<any>[]
  }

  type IInitializerItem = Promise<any> | (() => void)
  interface IInitializers {
    stage1?: IInitializerItem[];
    stage2?: IInitializerItem[];
    stage3?: IInitializerItem[];
    stage4?: IInitializerItem[];
  }
  type IInitializerNames = keyof IInitializers;

  interface IReducer<TState = IState> { (state: TState, action: Action): TState }

}

interface Window {
  lmGlobal: App.IGlobal
}

interface IState { }

interface IPlatforms { }