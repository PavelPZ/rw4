declare namespace Validate {

  interface IProps<T extends {}> {
    data: T
    items: { [P in keyof T]: IFieldProp<T[P]> }
    onEdited: (newData: T) => void
  }

  type IState<T extends {}> = {
    [P in keyof T]: IFieldState
  }


  type IError = string

  type IValidator = (value: string) => IError
  
  type IValidatorFactory = (...props: any[]) => IValidator

  interface IFieldProp<T extends any = any> {
    convertors?: IConvertors<T>
    validators?: IValidator[]
  }

  interface IConvertors<T extends any = any> {
    toData?: (value: string) => T
    fromData?: (value: T) => string
  }

  interface IFieldState {
    value: string
    blured?: boolean
    error:string
  }

}