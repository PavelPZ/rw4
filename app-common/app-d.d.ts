declare namespace App {
  interface IAppProps {
    platform: IPlatform
  }

  interface Action {
    type: any;
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
    platform?: IPlatform
  }

  interface IReducer<TState = IState> { (state: TState, action: Action): TState }

}

interface Window {
  lmGlobal: App.IGlobal
}

interface IState { }

interface IPlatform { }