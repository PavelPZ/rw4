declare namespace RestAPI {

  const enum Types { NO = 'NO', ERROR = 'ERROR', STRING = 'STRING', JSON = 'JSON', ARRAYBUFFER = 'ARRAYBUFFER' }

  type TArrayViews = Uint8Array | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array 

  interface IInp<T extends {} = {}> {
    module: string  //e.g. 'RECORDING'
    action: string //e.g. rec/SAVE
    par?: T
    dataType?: Types
    data?: string | ArrayBuffer //ArrayBuffer does not works in RN. WOrkaround is convert all to BASE64 (by means of thord party library, e.g. https://github.com/dankogai/js-base64) TArrayViews | Blob | DataView and other, see https://github.github.io/fetch/. !!! is not in React Native
  }

  interface IOut<T, TData> {
    dataType: Types
    par: T
    data?: string | TData /*for JSON*/ | ArrayBuffer  //ArrayBuffer does not works in RN. Blob and other, see https://github.github.io/fetch/
  }

  interface IConfig {
    serviceUrl: string
  }

}

interface IPlatforms {
  restAPIPlatform?: RestAPI.IConfig
}

