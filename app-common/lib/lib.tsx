import React from 'react'
import PropTypes from 'prop-types'

export const promiseAll = (promises: any[]) => Promise.all(promises.filter(p => isPromise(p)))
export const isPromise = obj => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'

export const storeContextType = <T extends {}>(comp: React.ComponentType<T>) => {
  comp.contextTypes = { ...comp.contextTypes, store: PropTypes.any }
  return comp
}

export class WaitForRendering extends React.PureComponent<{ finalContent: Promise<JSX.Element>, waitContent: JSX.Element }> {
  state = { finalContent: null }
  render() {
    console.log('1')
    if (this.state.finalContent) {
      console.log('2')
      return this.state.finalContent
    }
    this.props.finalContent.then(cont => this.setState({ finalContent: cont}))
    console.log('3')
    return this.props.waitContent
  }
}
