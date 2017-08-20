import React from 'react'
import { TextFieldProps } from './react-md'
import { editor } from '../app-common/validate'

export class webEditor<T> extends editor<T> {
  getFieldProps(propId: keyof T) {
    const state = this.state[propId]
    const props = this.props.metaData[propId]
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
}