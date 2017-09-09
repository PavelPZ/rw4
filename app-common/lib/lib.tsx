import React from 'react'
import PropTypes from 'prop-types'

export const getAppId = (domains: App.InstancePars<string>) => {
  if (!window.location) return null
  const domain = window.location.host.toLowerCase()
  alert(JSON.stringify(window.location,null,2))
  for (var p in domains) if (domains[p] == domain) return p as App.InstanceKeys
  throw new Error (`Missing domain definition: ${domain}`)
}

export const promiseAll = (promises: any[]) => Promise.all(promises.filter(p => isPromise(p)))
export const isPromise = obj => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'

export const storeContextType = <T extends {}>(comp: React.ComponentType<T>) => {
  comp.contextTypes = { ...comp.contextTypes, store: PropTypes.any }
  return comp
}

export class WaitForRendering extends React.PureComponent<{ finalContent: Promise<JSX.Element>, waitContent: JSX.Element }> {
  state = { finalContent: null }
  render() {
    if (this.state.finalContent) {
      return this.state.finalContent
    }
    this.props.finalContent.then(cont => this.setState({ finalContent: cont}))
    return this.props.waitContent
  }
}
