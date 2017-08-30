import React from 'react'

export class editor<T> extends React.PureComponent<Validate.IProps<T>, Validate.IState<T>> {
  constructor(props) {
    super(props)
    const st = {} as any
    for (const p in this.props.data) {
      let conv = this.props.metaData[p].convertors
      if (!conv) conv = defaultConvertors; else if (!conv.fromData) conv.fromData = defaultConvertors.fromData; else if (!conv.toData) conv.toData = defaultConvertors.toData
      this.convertors[p] = conv
      st[p] = { blured: false, error: null, value: conv.fromData(this.props.data[p]) }
    }
    this.state = st
  }
  convertors: { [prop: string]: Validate.IConvertors } = {}
  validateProp(propId: keyof T): boolean {
    const validators = this.props.metaData[propId].validators
    if (!validators) return true
    const st = this.state[propId]
    validators.find(validator => {
      st.error = validator(st.value)
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

//TODO: pouzit https://github.com/chriso/validator.js/
export const requiredValidator: Validate.IValidatorFactory = () => (value: string) => value.trim() ? null : 'Required'
export const intValidator: Validate.IValidatorFactory = () => (value: string) => parseInt(value).toString() == value.trim() ? null : 'Number required'
export const rangeValidator: Validate.IValidatorFactory = (min: number, max: number) => (value: string) => {
  const val = parseInt(value)
  return val >= min && val <= max ? null : 'Range error'
}

