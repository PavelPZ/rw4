import React from 'react'
import PropTypes from 'prop-types'

export const getAppId = (domains: App.InstancePars<string>) => {
  if (!window.location) return null
  const domain = window.location.host.toLowerCase()
  //alert(JSON.stringify(window.location,null,2))
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

const hasOwn = Object.prototype.hasOwnProperty

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y
  } else {
    return x !== x && y !== y
  }
}

export const shallowEqual = (objA, objB) => {
  if (is(objA, objB)) return true

  if (typeof objA !== 'object' || objA === null ||
    typeof objB !== 'object' || objB === null) {
    return false
  }

  const keysA = Object.keys(objA)
  const keysB = Object.keys(objB)

  if (keysA.length !== keysB.length) return false

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) ||
      !is(objA[keysA[i]], objB[keysA[i]])) {
      return false
    }
  }

  return true
}
