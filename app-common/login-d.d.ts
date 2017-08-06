declare namespace Login {

  const enum Consts {
    name = 'login',
    LOGIN_START = 'LOGIN_START', LOGIN_SUCCESS = 'LOGIN_SUCCESS', LOGIN_ERROR = 'LOGIN_ERROR',
    LOGOUT_START = 'LOGOUT_START', LOGOUT_SUCCESS = 'LOGOUT_SUCCESS', LOGOUT_ERROR = 'LOGOUT_ERROR',
  }

  interface IState {
    logged?: boolean
    email?: string
  }

  interface IPlatform {
    doLogin(): Iterator<any>;
  }

}

interface IState {
  login?: Login.IState
}

interface IPlatform {
  login: Login.IPlatform
}