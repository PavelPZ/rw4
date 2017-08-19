import React from 'react'

export class editor<T> extends React.PureComponent<Validate.IProps<T>, Validate.IState<T>> {
  constructor(props) {
    super(props)
    const st = {} as any
    for (const p in this.props.data) {
      const conv = this.convertors[p] = { ...this.props.items[p].convertors, ...defaultConvertors } as Validate.IConvertors
      st[p] = { blured: false, error: null, value: conv.fromData(this.props.data[p]) }
    }
    this.state = st
  }
  convertors: { [prop: string]: Validate.IConvertors } = {}
  validateProp(propId: keyof T): boolean {
    const validators = this.props.items[propId].validators
    if (!validators) true
    const st = this.state[propId]
    validators.find(v => {
      st.error = v(st.value)
      return !!st.error
    })
    return !st.error
  }
  validate(): boolean {
    let res = true
    for (const p in this.props.data) res = res && this.validateProp(p)
    this.forceUpdate()
    return res
  }
  onSubmit() {
    for (const p in this.props.data) this.state[p].blured = true
    if (!this.validate()) return
    const res = {} as T
    for (const p in this.props.data)
      res[p] = this.convertors[p].toData(this.state[p].value)
    this.props.onEdited(res)
  }
}

export const numberConvertors: Validate.IConvertors<number> = {
  toData: value => value ? parseInt(value) : 0,
  fromData: value => value ? value.toString() : '',
}

export const trimConvertors: Validate.IConvertors<string> = {
  toData: value => value ? value.trim() : value,
  fromData: null //default = value.toString
}

export const defaultConvertors: Validate.IConvertors<any> = {
  toData: value => value,
  fromData: value => value.toString(),
}

export const requiredValidator: Validate.IValidatorFactory = () => (value: string) => value ? null : 'Required'
export const intValidator: Validate.IValidatorFactory = () => (value: string) => parseInt(value).toString() == value.trim() ? null : 'Number required'
export const rangeValidator: Validate.IValidatorFactory = (min: number, max: number) => (value: string) => {
  const val = parseInt(value)
  return val > min && val < max ? null : 'Range error'
}

