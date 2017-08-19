import React from 'react'
import { TextField, TextFieldProps, Button } from '../react-md'

interface IData {
  id: number
  name: string
}

class editor<T> extends React.PureComponent<Validate.IProps<T>, Validate.IState<T>> {
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
  getFieldProps(propId: keyof T) {
    const state = this.state[propId]
    const props = this.props.items[propId]
    return {
      value: state.value,
      onChange: (v: string) => {
        state.value = v
        if (state.blured) this.validateProp(propId)
        this.forceUpdate()
      },
      onBlur: () => {
        state.blured = true
        this.validateProp(propId)
        this.forceUpdate()
      },
      error: !!state.error,
      errorText: state.error,
    } as TextFieldProps
  }
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

const numberConvertors: Validate.IConvertors<number> = {
  toData: value => value ? parseInt(value) : 0,
  fromData: value => value ? value.toString() : '',
}

const trimConvertors: Validate.IConvertors<string> = {
  toData: value => value ? value.trim() : value,
  fromData: null //default = value.toString
}

const defaultConvertors: Validate.IConvertors<any> = {
  toData: value => value,
  fromData: value => value.toString(),
}

class Editor extends editor<IData> {
  render() {
    return <div>
      <TextField {...this.getFieldProps('id') } /><br />
      <TextField {...this.getFieldProps('name') } />
      <Button primary raised onClick={() => this.onSubmit()} label='Submit' />
    </div>
  }
}

const requiredValidator: Validate.IValidatorFactory = () => (value: string) => value ? null : 'Required'
const intValidator: Validate.IValidatorFactory = () => (value: string) => parseInt(value).toString() == value.trim() ? null : 'Number required'
const rangeValidator: Validate.IValidatorFactory = (min: number, max: number) => (value: string) => {
  const val = parseInt(value)
  return val > min && val < max ? null : 'Range error'
}

const App: React.SFC = () => <Editor
  data={{ id: 10, name: '' }}
  items={{
    id: { convertors: numberConvertors, validators: [intValidator(), rangeValidator(11,15)] },
    name: { validators: [requiredValidator()] }
  }}
  onEdited={data => alert(JSON.stringify(data))} />

export default App